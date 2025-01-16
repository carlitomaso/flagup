import React, { useState } from "react";
import { Button, Form, FormControl, Alert } from "react-bootstrap";
import { db } from "../firebase-config"; // Ensure this is your Firebase configuration file
import { collection, addDoc } from "firebase/firestore";

export type privilege = "Player" | "FlagUp";
export type team = number;

export interface player {
  playercode: string;
  firstname: string;
  lastname: string;
  team: team;
  privilege: privilege;
}

const AddPlayer = () => {
  const [playerCode, setPlayerCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [team, setTeam] = useState<team>(1); // Default to team 1
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!playerCode || !firstName || !lastName) {
      setError("All fields are required.");
      setSuccess(false);
      return;
    }

    const newPlayer: player = {
      playercode: playerCode,
      firstname: firstName,
      lastname: lastName,
      team: team,
      privilege: "Player", // Privilege is always Player
    };

    try {
      const playerCollectionRef = collection(db, "Players");
      await addDoc(playerCollectionRef, newPlayer);
      setSuccess(true);
      setError(null);
      setPlayerCode("");
      setFirstName("");
      setLastName("");
      setTeam(1);
    } catch (err) {
      console.error("Error adding player:", err);
      setError("Failed to add player. Please try again.");
      setSuccess(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Player</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formPlayerCode">
          <Form.Label className="text-start">Player Code</Form.Label>
          <FormControl
            type="text"
            placeholder="Enter Player Code"
            value={playerCode}
            onChange={(e) => setPlayerCode(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label className="text-start">First Name</Form.Label>
          <FormControl
            type="text"
            placeholder="Enter First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label className="text-start">Last Name</Form.Label>
          <FormControl
            type="text"
            placeholder="Enter Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTeam">
          <Form.Label className="text-start">Select Team</Form.Label>
          <Form.Select
            value={team}
            onChange={(e) => setTeam(parseInt(e.target.value))}
          >
            <option value={1}>Team 1</option>
            <option value={2}>Team 2</option>
            <option value={3}>Team 3</option>
            <option value={4}>Team 4</option>
          </Form.Select>
        </Form.Group>

        <Button variant="secondary" type="submit" className="mb-3">
          Add Player
        </Button>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">Player added successfully!</Alert>}
      </Form>
    </div>
  );
};

export default AddPlayer;
