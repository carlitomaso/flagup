import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>Page Does Not Exist</h1>
      <NavLink to="/">Please go back to the homepage</NavLink>
    </div>
  );
};

export default NotFound;
