import LandingPage from "./components/LandingPage";
import {Switch,Route, BrowserRouter as Router} from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Switch>         
          <Route exact path = "/" component = {LandingPage}></Route>
       </Switch>
      </Router>
      </div>

  ) 
}

export default App;
