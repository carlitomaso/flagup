import React, { useEffect, useState } from "react";
import { Table, Spinner } from "react-bootstrap";
import { db } from "../firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { game } from "./AddGame"; // Import your game interface
import { Timestamp } from "firebase/firestore";

interface ViewTeamGamesProps {
  team: number; // Team ID passed as a prop
}

const ViewTeamGames: React.FC<ViewTeamGamesProps> = ({ team }) => {
  const [games, setGames] = useState<game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const gamesCollectionRef = collection(db, "Games");

    const gamesQuery = query(
      gamesCollectionRef,
      where("teams", "array-contains", team) // Filter games by team participation
    );

    const unsubscribe = onSnapshot(gamesQuery, (snapshot) => {
      const gamesList: game[] = [];
      snapshot.forEach((doc) => {
        const gameData = doc.data() as game;
        gamesList.push(gameData);
      });
      gamesList.sort((a, b) => {
        const timeA =
          a.startTime instanceof Timestamp ? a.startTime.toDate() : a.startTime;
        const timeB =
          b.startTime instanceof Timestamp ? b.startTime.toDate() : b.startTime;

        return timeA.getTime() - timeB.getTime(); // Ascending sort by time
      });
      setGames(gamesList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [team]);

  // If data is loading, show a spinner
  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Team {team} Games</h2>

      <div style={{ maxHeight: "270px", overflowY: "auto" }}>
        <Table hover responsive="md">
          <thead>
            <tr>
              <th>Opponent</th>
              <th>Start Time</th>
              <th>Winner</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game.gameid}>
                <td>
                  Team {team === game.teams[0] ? game.teams[1] : game.teams[0]}
                </td>
                <td>
                  {game.startTime instanceof Date
                    ? game.startTime.toLocaleTimeString()
                    : (game.startTime as any).toDate().toLocaleTimeString()}
                </td>
                <td>{game.winner ? `Team ${game.winner}` : "TBD"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ViewTeamGames;
