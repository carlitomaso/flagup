import React, { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { db } from "../firebase-config"; // Ensure this is your Firebase configuration file
import { collection, addDoc } from "firebase/firestore";

// Define the types as required
export type team = number;
export interface game {
  gameid: string;
  teams: [team, team];
  winner: team | null; // Always null
  startTime: Date; // Only ask for the time, date is fixed
}

const AddGame = () => {
  const [gameId, setGameId] = useState<string>("");
  const [team1, setTeam1] = useState<team>(1);
  const [team2, setTeam2] = useState<team>(2);
  const [startTime, setStartTime] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!gameId || !startTime) {
      alert("Game ID and start time are required.");
      return;
    }

    if (team1 == team2) {
      alert("Teams should not play against themselves");
      return;
    }

    const gameDetails: game = {
      gameid: gameId,
      teams: [team1, team2],
      winner: null, // Always null
      startTime: new Date(`${"2025-01-20"}T${startTime}`), // Fixed date, time is taken from the input
    };

    try {
      const gameCollectionRef = collection(db, "Games");
      await addDoc(gameCollectionRef, gameDetails);
      alert("Game added successfully!");
      setGameId("");
      setStartTime("");
      setTeam1(1);
      setTeam2(2);
    } catch (err) {
      console.error("Error adding game:", err);
      alert("Failed to add game. Please try again.");
    }
  };

  return (
    <Container className="">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formGameId">
          <Form.Label>Game ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Game ID"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTeam1">
          <Form.Label>First Team</Form.Label>
          <Form.Select
            value={team1}
            onChange={(e) => setTeam1(parseInt(e.target.value))}
          >
            <option value={1}>Team 1</option>
            <option value={2}>Team 2</option>
            <option value={3}>Team 3</option>
            <option value={4}>Team 4</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTeam2">
          <Form.Label>Second Team</Form.Label>
          <Form.Select
            value={team2}
            onChange={(e) => setTeam2(parseInt(e.target.value))}
          >
            <option value={1}>Team 1</option>
            <option value={2}>Team 2</option>
            <option value={3}>Team 3</option>
            <option value={4}>Team 4</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formStartTime">
          <Form.Label>Start Time</Form.Label>
          <Form.Control
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Game
        </Button>
      </Form>
    </Container>
  );
};

export default AddGame;
