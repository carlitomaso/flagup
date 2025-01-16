import { Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import PlayerStatView from "./PlayerStatView";
import ViewTeammates from "./ViewTeammates";
import ViewTeamGames from "./ViewTeamGames";

const KeyOrder = ["playercode", "firstname", "lastname", "team", "position"];

const getKey = (key: string) => {
  switch (key) {
    case "firstname":
      return "First Name";
    case "lastname":
      return "Last Name";
    case "playercode":
      return "Player Code";
    default:
      return String(key).charAt(0).toUpperCase() + String(key).slice(1);
  }
};

const PlayerView = () => {
  const location = useLocation();

  const playerDetails = location.state?.playerDetails;

  const playerCode = String(playerDetails["playercode"]);
  const teamNumber = playerDetails["team"];
  console.log(teamNumber);

  return (
    <>
      <Container className="FlagUpContainer">
        <Row>
          <Col xs={12} sm={12} md={12} lg={6} style={{ marginBottom: "80px" }}>
            <div>
              <div className="PlayerDetails">
                <h3 className="mb-3">Player Details</h3>
                <Container>
                  {Object.entries(playerDetails)
                    .filter(([key]) => {
                      // Filter condition: Keep only entries with value greater than 30
                      return key != "privilege";
                    })
                    .sort(([keyA], [keyB]) => {
                      return KeyOrder.indexOf(keyA) - KeyOrder.indexOf(keyB);
                    })
                    .map(([key, value]) => {
                      return (
                        <Row className="mb-3" key={key}>
                          <Col style={{ textAlign: "right" }}>
                            {getKey(key)}
                          </Col>
                          <Col style={{ textAlign: "left" }}>
                            {value != "" ? String(value) : ""}
                          </Col>
                        </Row>
                      );
                    })}
                </Container>
              </div>
              <div
                className="PlayerDetails PlayerStats"
                style={{ marginTop: "80px" }}
              >
                <h3 className="mb-3">Player Stats</h3>
                <PlayerStatView playerCode={playerCode} />
              </div>
            </div>
          </Col>

          <Col xs={12} sm={12} md={12} lg={6}>
            <ViewTeammates team={teamNumber} />
            <ViewTeamGames team={teamNumber} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PlayerView;
