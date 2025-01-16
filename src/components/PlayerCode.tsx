import React, { useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config"; // Ensure this path is correct
import { collection, query, where, getDocs } from "firebase/firestore";

const PlayerCode = () => {
  const [playerCode, setPlayerCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("Enter key pressed: " + playerCode);
      await checkPlayerCode();
    }
  };

  const checkPlayerCode = async () => {
    try {
      // Create a query to search for the playerCode field in the "players" collection
      const q = query(
        collection(db, "Players"),
        where("playercode", "==", playerCode)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const playerData = querySnapshot.docs[0].data(); // Extracts the document data

        navigate(`/user/${playerCode}`, {
          state: { playerDetails: playerData },
        });
      } else {
        // Player code does not exist
        console.log("No such player!");
        setError("Player code does not exist.");
      }
    } catch (error) {
      console.error("Error checking player code:", error);
      setError("Error checking player code.");
    }
  };

  return (
    <>
      <FormControl
        placeholder="Enter Player Code: "
        className="mb-3"
        onChange={(e) => setPlayerCode(e.target.value)}
        onKeyDown={handleEnter}
      />
      <Button variant="secondary" onClick={checkPlayerCode}>
        Enter
      </Button>

      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
    </>
  );
};

export default PlayerCode;
