import { useEffect, useState } from "react";
import { db } from "../firebase-config"; // Make sure this path is correct
import {
  collection,
  onSnapshot,
  query,
  where,
  Unsubscribe,
} from "firebase/firestore";
import { Table, Spinner } from "react-bootstrap";
import { player } from "../project_types";

interface PlayerStatViewProps {
  team: number;
}

const ViewTeammates: React.FC<PlayerStatViewProps> = ({ team }) => {
  const [players, setPlayers] = useState<player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortedBy, setSortedBy] = useState<keyof player>("firstname"); // Track sorting column
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Track sorting order

  // Fetch players data in real-time, filtered by 'Player' privilege
  const fetchPlayers = () => {
    try {
      const playersCollection = collection(db, "Players");

      // Query players where team matches the selected team
      const playersQuery = query(playersCollection, where("team", "==", team));

      // Listen for changes in the 'players' collection
      const unsubscribe: Unsubscribe = onSnapshot(playersQuery, (snapshot) => {
        const playersList: player[] = [];

        snapshot.forEach((doc) => {
          const data = doc.data() as player;
          playersList.push(data);
        });

        setPlayers(playersList);
        setLoading(false);
      });

      return unsubscribe;
    } catch (err) {
      console.error("Error fetching players:", err);
      setError("Failed to load players. Please try again.");
      setLoading(false);
      return undefined;
    }
  };

  const handleSort = (column: keyof player) => {
    const newSortOrder =
      sortedBy === column && sortOrder === "asc" ? "desc" : "asc";
    setSortedBy(column);
    setSortOrder(newSortOrder);

    const sortedPlayers = [...players].sort((a, b) => {
      if (a[column] < b[column]) return sortOrder === "asc" ? -1 : 1;
      if (a[column] > b[column]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setPlayers(sortedPlayers);
  };

  useEffect(() => {
    const unsubscribe = fetchPlayers();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  // If data is loading, show a spinner
  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: "100%" }}>
      <h2 className="mb-3">Team {team} Roster</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Scrollable Table with Max Height */}
      <div style={{ maxHeight: "540px", overflowY: "auto" }}>
        <Table hover responsive="md" style={{ width: "100%" }}>
          <thead>
            <tr className="ViewPlayersHeader">
              <th onClick={() => handleSort("firstname")}>Full Name</th>
              <th onClick={() => handleSort("team")}>Team</th>
              <th onClick={() => handleSort("position")}>Pos</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr
                key={index}
                style={{ cursor: "pointer" }}
                className="ViewPlayersRow"
              >
                <td>
                  {player.firstname} {player.lastname}
                </td>
                <td>{player.team}</td>
                <td>{player.position}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ViewTeammates;
