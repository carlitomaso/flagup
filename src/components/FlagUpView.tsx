import AddPlayer from "./AddPlayer";
import { Col, Container, Row } from "react-bootstrap";
import ViewPlayers from "./ViewPlayers";
import FillPlayerStats from "./FillPlayerStats";

const FlagUpView = () => {
  return (
    <>
      <Container className="FlagUpContainer">
        <Row>
          <Col xs={12} sm={12} md={12} lg={6}>
            <AddPlayer />
          </Col>
          <Col xs={12} sm={12} md={12} lg={6}>
            <ViewPlayers />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} sm={12} md={12} lg={6}>
            <FillPlayerStats playerCode="2" playerTeam={2} />
          </Col>
          <Col xs={12} sm={12} md={12} lg={6}></Col>
        </Row>
      </Container>
    </>
  );
};

export default FlagUpView;
