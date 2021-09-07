import LandingPage from "./components/LandingPage";
import {Switch,Route, BrowserRouter as Router} from 'react-router-dom';
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <div>
      <Router>
        <Switch>         
          <Route exact path = "/" component = {LandingPage}></Route>
          <Route exact path = "/login" component = {Login}></Route>
          <Route exact path = "/signup" component = {Signup}></Route>
       </Switch>
      </Router>
      </div>

  ) 
}

export default App;
