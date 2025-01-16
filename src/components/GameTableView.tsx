import { useEffect, useState } from "react";
import { Table, Container, Spinner, Button, Modal } from "react-bootstrap";
import { db } from "../firebase-config"; // Ensure this is your Firebase configuration file
import {
  collection,
  onSnapshot,
  query,
  where,
  deleteDoc,
  getDocs,
  QueryDocumentSnapshot,
  doc,
  Timestamp,
} from "firebase/firestore";
import { game } from "./AddGame"; // Import your game interface
import { GamesViewProps } from "./GamesView";

const GameTableView: React.FC<GamesViewProps> = ({ setGameId }) => {
  const [games, setGames] = useState<game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [gameToDelete, setGameToDelete] = useState<string | null>(null);

  // Real-time listener to fetch and update games from Firestore
  useEffect(() => {
    const gamesCollectionRef = collection(db, "Games");

    const unsubscribe = onSnapshot(gamesCollectionRef, (snapshot) => {
      const gamesList: game[] = [];
      snapshot.forEach((doc) => {
        const gameData = doc.data() as game;
        gamesList.push(gameData);
      });
      setGames(gamesList);
      setLoading(false);
    });

    // Clean up the listener on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  // Function to delete a game by querying based on gameid
  const deleteGame = async (gameid: string) => {
    try {
      // Reference to the "players" collection
      const playersCollectionRef = collection(db, "Games");

      // Create a query to find the player with the specified gameid
      const q = query(playersCollectionRef, where("gameid", "==", gameid));

      // Get the documents that match the query
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // If we find the player, delete the first matching document (assuming playerCode is unique)
        querySnapshot.forEach(async (docSnapshot: QueryDocumentSnapshot) => {
          const docRef = doc(db, "Games", docSnapshot.id); // Get reference to the document
          await deleteDoc(docRef); // Delete the document
        });
        console.log("Game deleted successfully.");
      } else {
        console.log("No game found with the given gameid.");
      }
    } catch (err) {
      console.error("Error deleting game:", err);
    }
  };

  const handleDelete = () => {
    if (gameToDelete) {
      deleteGame(gameToDelete);
      setShowModal(false); // Close the modal after deleting
    }
  };

  const openModal = (gameid: string) => {
    setGameToDelete(gameid); // Set the gameID to delete
    setShowModal(true); // Open the modal
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal without deleting
    setGameToDelete(null); // Reset the gameID
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="mt-3">
      <div
        style={{
          maxHeight: "542px", // Set maximum height for the table rows container
          overflowY: "auto", // Allow scrolling if content exceeds max height
        }}
      >
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Game ID</th>
              <th>Teams</th>
              <th>Start Time</th>
              <th>Winner</th>
              <th></th> {/* Added Actions column */}
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr
                key={game.gameid}
                style={{ cursor: "pointer" }}
                onClick={() => setGameId(game.gameid)}
              >
                <td>{game.gameid}</td>
                <td>{`Team ${game.teams[0]} vs Team ${game.teams[1]}`}</td>
                <td>
                  {game.startTime instanceof Date
                    ? game.startTime.toLocaleTimeString() // If it's a Date, use toLocaleString directly
                    : (game.startTime as Timestamp)
                        .toDate()
                        .toLocaleTimeString()}
                </td>
                <td>{game.winner ? `Team ${game.winner}` : "TBD"}</td>
                <td>
                  <a
                    className="PlayerDeleteButton"
                    onClick={() => openModal(game.gameid)}
                  >
                    x
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal for confirming deletion */}
      <Modal show={showModal} onHide={closeModal} style={{ color: "black" }}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this game?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete Game
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default GameTableView;
