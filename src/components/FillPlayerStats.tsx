import React, { useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { db } from "../firebase-config"; // Ensure this is your Firebase configuration file
import { collection, addDoc } from "firebase/firestore";
import { stats, statistic, team } from "../project_types";

interface FillPlayerStatsProps {
  playerCode: string;
  playerTeam: team;
}

const FillPlayerStats: React.FC<FillPlayerStatsProps> = ({
  playerCode,
  playerTeam,
}) => {
  const [gameId, setGameId] = useState<string>("");
  const [statType, setStatType] = useState<stats>("Touchdown");
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Prepare the statistic entry
      const newStat: statistic = {
        gameid: gameId,
        playercode: playerCode,
        team: playerTeam, // Use the team number passed as a prop
        amount: amount,
      };

      // Add the entry to the relevant Firestore collection
      const statCollectionRef = collection(db, statType);
      await addDoc(statCollectionRef, newStat);

      setSuccess(`Successfully added ${amount} to ${statType}`);
      setGameId("");
      setAmount(0);
      setStatType("Touchdown");
    } catch (err) {
      console.error("Error adding statistic:", err);
      setError("Failed to add statistic. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="FillPlayerStats mt-4">
      <h2>Fill Player Statistics</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formGameId">
          <Form.Label>Game ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Game ID"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formStatType">
          <Form.Label>Statistic Type</Form.Label>
          <Form.Select
            value={statType}
            onChange={(e) => setStatType(e.target.value as stats)}
            required
          >
            <option value="Touchdown">Touchdown</option>
            <option value="TouchdownPass">Touchdown Pass</option>
            <option value="FlagPull">Flag Pull</option>
            <option value="Interception">Interception</option>
            <option value="Block">Block</option>
            <option value="Catch">Catch</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAmount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
            min={0}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Add Statistic"}
        </Button>

        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
        {success && (
          <Alert variant="success" className="mt-3">
            {success}
          </Alert>
        )}
      </Form>
    </div>
  );
};

export default FillPlayerStats;
