import React from "react";
import AddPlayer from "./AddPlayer";
import { Col, Container, Row } from "react-bootstrap";

const FlagUpView = () => {
  return (
    <>
      <Container className="FlagUpContainer">
        <Row>
          <Col>
            <AddPlayer />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
};

export default FlagUpView;
