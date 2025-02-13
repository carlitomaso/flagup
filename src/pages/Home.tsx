import CenteredImage from "../components/CenteredImage";
import PlayerCode from "../components/PlayerCode";
import MaiQueen from "./MaiQueen";

const x = "b";

const Home = () => {
  return (
    <>
      {x !== "b" ? (
        <>
          <CenteredImage
            src="flaglogo.png"
            alt="flag up logo"
            duration={1000}
          />
          <img
            src="flaglogo.png"
            style={{ height: "300px", width: "auto" }}
            className="jitter-on-hover"
          />
          <PlayerCode />{" "}
        </>
      ) : (
        <MaiQueen />
      )}
    </>
  );
};

export default Home;
