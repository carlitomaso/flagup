import CenteredImage from "../components/CenteredImage";
import PlayerCode from "../components/PlayerCode";

const Home = () => {
  return (
    <>
      <CenteredImage
        src="public\flaglogo.png"
        alt="flag up logo"
        duration={1000}
      />
      <img
        src="public\flaglogo.png"
        style={{ height: "300px", width: "auto" }}
      />
      <PlayerCode />
    </>
  );
};

export default Home;
