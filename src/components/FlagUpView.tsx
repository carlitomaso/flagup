import AddPlayer from "./AddPlayer";
import { Col, Container, Row } from "react-bootstrap";
import ViewPlayers from "./ViewPlayers";
import FillPlayerStats from "./FillPlayerStats";
import GamesView from "./GamesView";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase-config"; // Ensure this points to your Firebase config file
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setLoading(true); // Show loading indicator

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully!");
      // Redirect or perform additional actions after login
    } catch (err: any) {
      setError(err.message); // Display error message
    } finally {
      setLoading(false); // Remove loading indicator
    }
  };

  return (
    <div className="container mt-5">
      {error && <div className="alert alert-danger">{error}</div>}
      <div style={{ maxWidth: "500px", margin: "0px auto" }}>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-secondary"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

const LoggedInView = () => {
  const [selectedPlayerName, setSelectedPlayer] = useState<string>("");
  const [selectedPlayerCode, setSelectedPlayerCode] = useState<string>("");
  const [selectedPlayerTeam, setSelectedPlayerTeam] = useState<number>(0);
  const [selectedGameId, setSelectedGameId] = useState<string>("");

  console.log(selectedGameId);

  return (
    <>
      <Container className="FlagUpContainer">
        <Row>
          <Col xs={12} sm={12} md={12} lg={6}>
            <AddPlayer />
          </Col>
          <Col xs={12} sm={12} md={12} lg={6}>
            <ViewPlayers
              setPlayerCode={setSelectedPlayerCode}
              setPlayerName={setSelectedPlayer}
              setPlayerTeam={setSelectedPlayerTeam}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} sm={12} md={12} lg={6}>
            <FillPlayerStats
              playerCode={selectedPlayerCode}
              playerTeam={selectedPlayerTeam}
              playerName={selectedPlayerName}
              playgameid={selectedGameId}
            />
          </Col>
          <Col xs={12} sm={12} md={12} lg={6}>
            <GamesView setGameId={setSelectedGameId} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

const FlagUpView: React.FC = () => {
  const [user, setUser] = useState<User | null>(null); // Tracks the authenticated user
  const [loading, setLoading] = useState<boolean>(true); // Tracks the loading state

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update the user state
      setLoading(false); // Stop the loading spinner
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Replace with your spinner or loading indicator
  }

  return (
    <div>
      {user ? (
        <LoggedInView /> // User is logged in
      ) : (
        <Login />
      )}
    </div>
  );
};

export default FlagUpView;
