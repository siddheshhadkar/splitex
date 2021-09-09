import { useState } from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLogInState = () => {
    setIsLoggedIn((prevState) => !prevState);
  };

  const loggedInComponent = (
    <Switch>
      <Route
        path="/dashboard"
        exact
        render={() => <Dashboard toggleLogInState={toggleLogInState} />}
      />
      <Redirect to="/dashboard" />
    </Switch>
  );

  const loggedOutComponent = (
    <Switch>
      <Route path="/" exact component={LandingPage} />
      <Route
        path="/login"
        exact
        render={() => <Login toggleLogInState={toggleLogInState} />}
      />
      <Route
        path="/signup"
        exact
        render={() => <Signup toggleLogInState={toggleLogInState} />}
      />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <div>
      <Router>{isLoggedIn ? loggedInComponent : loggedOutComponent}</Router>
    </div>
  );
}

export default App;
