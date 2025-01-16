import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";

// Component to display the user profile

function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/user/:userId"
              element={
                <>
                  <NavLink to={"/"}>
                    <div className="HomeButton">
                      <img src="/flaglogo.png" />
                    </div>
                  </NavLink>
                  <UserProfile />
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
