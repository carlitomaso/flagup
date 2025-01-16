import { useLocation } from "react-router-dom";
import FlagUpView from "../components/FlagUpView";
import PlayerView from "../components/PlayerView";

const UserProfile = () => {
  const location = useLocation();

  const playerDetails = location.state?.playerDetails;
  return (
    <>
      {playerDetails["privilege"] === "FlagUp" ? (
        <FlagUpView />
      ) : (
        <PlayerView />
      )}
    </>
  );
};

export default UserProfile;
