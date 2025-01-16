import AddPlayer from "./AddPlayer";
import { Col, Container, Row } from "react-bootstrap";
import ViewPlayers from "./ViewPlayers";

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
      </Container>
    </>
  );
};

export default FlagUpView;
