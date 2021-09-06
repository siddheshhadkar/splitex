import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage}></Route>
          <Route exact path="/dashboard" component={Dashboard}></Route>
        </Switch>
      </Router>
    </div>

  )
}

export default App;
