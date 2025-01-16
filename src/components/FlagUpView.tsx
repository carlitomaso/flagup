import AddPlayer from "./AddPlayer";
import { Col, Container, Row } from "react-bootstrap";
import ViewPlayers from "./ViewPlayers";
import FillPlayerStats from "./FillPlayerStats";
import GamesView from "./GamesView";
import { useState } from "react";

const FlagUpView = () => {
  const [selectedPlayerName, setSelectedPlayer] = useState<string>("");
  const [selectedPlayerCode, setSelectedPlayerCode] = useState<string>("");
  const [selectedPlayerTeam, setSelectedPlayerTeam] = useState<number>(0);
  const [selectedGameId, setSelectedGameId] = useState<string>("");

  console.log(selectedGameId);

  return (
    <>
      <Container className="FlagUpContainer">
        <Row>
          <Col xs={12} sm={12} md={12} lg={6}>
            <AddPlayer />
          </Col>
          <Col xs={12} sm={12} md={12} lg={6}>
            <ViewPlayers
              setPlayerCode={setSelectedPlayerCode}
              setPlayerName={setSelectedPlayer}
              setPlayerTeam={setSelectedPlayerTeam}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} sm={12} md={12} lg={6}>
            <FillPlayerStats
              playerCode={selectedPlayerCode}
              playerTeam={selectedPlayerTeam}
              playerName={selectedPlayerName}
              playgameid={selectedGameId}
            />
          </Col>
          <Col xs={12} sm={12} md={12} lg={6}>
            <GamesView setGameId={setSelectedGameId} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FlagUpView;
