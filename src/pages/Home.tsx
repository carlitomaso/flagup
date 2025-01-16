import CenteredImage from "../components/CenteredImage";
import PlayerCode from "../components/PlayerCode";

const Home = () => {
  return (
    <>
      <CenteredImage src="flaglogo.png" alt="flag up logo" duration={1000} />
      <img
        src="flaglogo.png"
        style={{ height: "300px", width: "auto" }}
        className="jitter-on-hover"
      />
      <PlayerCode />
    </>
  );
};

export default Home;
