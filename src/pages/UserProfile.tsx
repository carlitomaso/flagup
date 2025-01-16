import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlagUpView from "../components/FlagUpView";
import PlayerView from "../components/PlayerView";

const UserProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if location.state is not defined
    if (!location.state) {
      navigate("/"); // Redirect to the homepage if no state exists
    }
  }, [location.state, navigate]); // Add location.state and navigate as dependencies

  // If location.state does not exist, prevent rendering to avoid errors
  if (!location.state) {
    return null; // Or a loading spinner/placeholder
  }

  const playerDetails = location.state?.playerDetails;

  return (
    <>
      {playerDetails.privilege === "FlagUp" ? <FlagUpView /> : <PlayerView />}
    </>
  );
};

export default UserProfile;
