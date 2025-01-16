import { useEffect, useState } from "react";
import { Table, Container, Spinner, Button } from "react-bootstrap";
import { db } from "../firebase-config"; // Ensure this is your Firebase configuration file
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { game } from "./AddGame"; // Import your game interface

const GameTableView = () => {
  const [games, setGames] = useState<game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  // Function to delete a game
  const deleteGame = async (gameId: string) => {
    try {
      const gameDocRef = doc(db, "Games", gameId);
      await deleteDoc(gameDocRef);
      console.log("Game deleted successfully!");
    } catch (error) {
      console.error("Error deleting game: ", error);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="mt-5">
      <h2>Game List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Game ID</th>
            <th>Teams</th>
            <th>Start Time</th>
            <th>Winner</th>
            <th>Actions</th> {/* Added Actions column */}
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.gameid}>
              <td>{game.gameid}</td>
              <td>{`Team ${game.teams[0]} vs Team ${game.teams[1]}`}</td>
              <td>{game.startTime.toLocaleString()}</td>
              <td>{game.winner ? `Team ${game.winner}` : "TBD"}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => deleteGame(game.gameid)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default GameTableView;
