import { useLocation } from "react-router-dom";
import FlagUpView from "../components/FlagUpView";

const UserProfile = () => {
  const location = useLocation();

  const playerDetails = location.state?.playerDetails;
  console.log(playerDetails);
  return (
    <>
      {playerDetails["privilege"] === "FlagUp" ? <FlagUpView /> : <p>Player</p>}
    </>
  );
};

export default UserProfile;
