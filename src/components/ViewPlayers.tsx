import { useEffect, useState } from "react";
import { db } from "../firebase-config"; // Make sure this path is correct
import {
  collection,
  onSnapshot,
  query,
  where,
  deleteDoc,
  doc,
  Unsubscribe,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { Table, Spinner, Button, Modal } from "react-bootstrap";
import { player } from "../project_types";

interface ViewPlayerProps {
  setPlayerCode: (newvalue: string) => void;
  setPlayerTeam: (newvalue: number) => void;
  setPlayerName: (newvalue: string) => void;
}

const ViewPlayers: React.FC<ViewPlayerProps> = ({
  setPlayerCode,
  setPlayerTeam,
  setPlayerName,
}) => {
  const [players, setPlayers] = useState<player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortedBy, setSortedBy] = useState<keyof player>("firstname"); // Track sorting column
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Track sorting order
  const [showModal, setShowModal] = useState<boolean>(false);
  const [playerToDelete, setPlayerToDelete] = useState<player | null>(null); // Track player to delete

  // Fetch players data in real-time, filtered by 'Player' privilege
  const fetchPlayers = () => {
    try {
      const playersCollection = collection(db, "Players");

      // Query players where privilege is "Player"
      const playersQuery = query(
        playersCollection,
        where("privilege", "==", "Player")
      );

      // Listen for changes in the 'players' collection where privilege is "Player"
      const unsubscribe: Unsubscribe = onSnapshot(playersQuery, (snapshot) => {
        const playersList: player[] = [];

        snapshot.forEach((doc) => {
          const data = doc.data() as player;
          playersList.push(data);
        });

        setPlayers(playersList);
        setLoading(false);
      });

      // Return unsubscribe function for cleanup
      return unsubscribe;
    } catch (err) {
      console.error("Error fetching players:", err);
      setError("Failed to load players. Please try again.");
      setLoading(false);
      return undefined; // Return undefined if there's an error
    }
  };

  const deletePlayer = async (playerCode: string) => {
    try {
      // Reference to the "players" collection
      const playersCollectionRef = collection(db, "Players");

      // Create a query to find the player with the specified playerCode
      const q = query(
        playersCollectionRef,
        where("playercode", "==", playerCode)
      );

      // Get the documents that match the query
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // If we find the player, delete the first matching document (assuming playerCode is unique)
        querySnapshot.forEach(async (docSnapshot: QueryDocumentSnapshot) => {
          const docRef = doc(db, "Players", docSnapshot.id); // Get reference to the document
          await deleteDoc(docRef); // Delete the document
        });
        console.log("Player deleted successfully.");
      } else {
        console.log("No player found with the given playerCode.");
      }
    } catch (err) {
      console.error("Error deleting player:", err);
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

    // Ensure unsubscribe is defined before calling it
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

  // Color coding based on the team
  const getRowColor = (team: number) => {
    switch (team) {
      case 1:
        return "bg-primary text-white"; // Blue for team 1
      case 2:
        return "bg-success text-white"; // Green for team 2
      case 3:
        return "bg-warning"; // Yellow for team 3
      case 4:
        return "bg-danger text-white"; // Red for team 4
      default:
        return "";
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-3">Players List</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      <div style={{ maxHeight: "542px", overflowY: "auto" }}>
        <Table hover responsive="md" className="ViewPlayersTable">
          <thead>
            <tr className="ViewPlayersHeader">
              <th onClick={() => handleSort("firstname")}>Full Name</th>
              <th onClick={() => handleSort("team")}>Team</th>
              <th onClick={() => handleSort("position")}></th>
              <th onClick={() => handleSort("playercode")}>Player Code</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr
                key={index}
                style={{ cursor: "pointer" }}
                className="ViewPlayersRow"
                onClick={() => {
                  setPlayerName(player.firstname + " " + player.lastname);
                  setPlayerCode(player.playercode);
                  setPlayerTeam(player.team);
                }}
              >
                <td className={getRowColor(player.team)}>
                  {player.firstname} {player.lastname}
                </td>
                <td className={getRowColor(player.team)}>{player.team}</td>
                <td className={getRowColor(player.team)}>{player.position}</td>
                <td className={getRowColor(player.team)}>
                  {player.playercode}
                </td>
                <td className={getRowColor(player.team)}>
                  <a
                    onClick={() => {
                      setPlayerToDelete(player);
                      setShowModal(true);
                    }}
                    className="PlayerDeleteButton"
                  >
                    x
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        style={{ color: "black" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the player "
          {playerToDelete?.firstname} {playerToDelete?.lastname}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              if (playerToDelete) {
                deletePlayer(playerToDelete.playercode);
              }
              setShowModal(false);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewPlayers;
