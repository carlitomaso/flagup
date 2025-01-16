import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { userId } = useParams();
  return <h1>User Profile for User ID: {userId}</h1>;
};

export default UserProfile;
