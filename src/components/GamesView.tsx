import { useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import AddGame from "./AddGame";

const GamesView = () => {
  const [showNewGame, setShowNewGame] = useState(false);

  return (
    <div className="FillPlayerStats mt-4">
      <Container>
        <Row>
          <Col xs={6} md={8}>
            <h4 style={{ paddingLeft: "10%" }}>Games</h4>
          </Col>
          <Col xs={6} md={4}>
            <Button variant="secondary" onClick={() => setShowNewGame(true)}>
              New Game
            </Button>
          </Col>
        </Row>
      </Container>
      <Modal
        show={showNewGame}
        style={{ color: "black" }}
        centered
        onHide={() => setShowNewGame(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Schedule a Game
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddGame />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowNewGame(false)} variant="secondary">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GamesView;
