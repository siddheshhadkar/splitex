import LandingPage from "./components/LandingPage";

import Dashboard from "./components/Dashboard";
import {Switch,Route, BrowserRouter as Router} from 'react-router-dom';
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <div>
      <Router>
        <Switch>         
          <Route exact path = "/" component = {LandingPage}></Route>
          <Route exact path="/dashboard" component={Dashboard}></Route>
          <Route exact path = "/login" component = {Login}></Route>
          <Route exact path = "/signup" component = {Signup}></Route>
       </Switch>
      </Router>
    </div>

  )
}

export default App;
