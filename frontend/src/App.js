import { useState } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";

import GetUserService from "./services/GetUserService";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (localStorage.getItem("token") !== null && !isLoggedIn) {
    (async () => {
      const resultUser = await GetUserService();
      if (resultUser.success && resultUser.data) {
        setIsLoggedIn(true);
      } else {
        alert(resultUser.errorMessage);
        localStorage.removeItem("token");
        history.push("/login");
      }
    })();
  }

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

  return <div>{isLoggedIn ? loggedInComponent : loggedOutComponent}</div>;
}

export default App;
