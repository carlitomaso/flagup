import React, { useEffect, useState } from "react";
import { db } from "../firebase-config"; // Ensure this is your Firebase configuration file
import { collection, query, where, getDocs } from "firebase/firestore";
import { Spinner, Alert, Container, Row, Col } from "react-bootstrap";
import { stats, statistic } from "../project_types";

const statsCollections: stats[] = [
  "Touchdown",
  "TouchdownPass",
  "FlagPull",
  "Interception",
  "Block",
  "Catch",
];

interface PlayerStatViewProps {
  playerCode: string;
}

const getKey = (key: string) => {
  switch (key) {
    case "TouchdownPass":
      return "Touchdown Passes";
    case "FlagPull":
      return "Flag Pulls";
    case "Catch":
      return "Catches";
    default:
      return key + "s";
  }
};

const PlayerStatView: React.FC<PlayerStatViewProps> = ({ playerCode }) => {
  const [totals, setTotals] = useState<Record<stats, number>>({
    Touchdown: 0,
    TouchdownPass: 0,
    FlagPull: 0,
    Interception: 0,
    Block: 0,
    Catch: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsTotals: Record<stats, number> = {
          Touchdown: 0,
          TouchdownPass: 0,
          FlagPull: 0,
          Interception: 0,
          Block: 0,
          Catch: 0,
        };

        for (const stat of statsCollections) {
          // Query Firestore for each stat collection
          const statCollectionRef = collection(db, stat);
          const statQuery = query(
            statCollectionRef,
            where("playercode", "==", playerCode)
          );

          const querySnapshot = await getDocs(statQuery);
          let total = 0;

          querySnapshot.forEach((doc) => {
            const data = doc.data() as statistic;
            total += data.amount;
          });

          statsTotals[stat] = total;
        }

        setTotals(statsTotals);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching player stats:", err);
        setError("Failed to load stats. Please try again.");
        setLoading(false);
      }
    };

    fetchStats();
  }, [playerCode]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="PlayerStatView mt-4">
      <Container>
        {Object.entries(totals).map(([stat, total]) => (
          <Row key={stat} className="mb-3">
            <Col style={{ textAlign: "right" }}>{getKey(stat)}</Col>
            <Col style={{ textAlign: "left" }}>{total}</Col>
          </Row>
        ))}
      </Container>
    </div>
  );
};

export default PlayerStatView;
