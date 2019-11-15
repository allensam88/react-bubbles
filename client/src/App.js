import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Private from './utils/PrivateRoute';
import BubblePage from './components/BubblePage';
import Login from "./components/Login";
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <Private path="/bubble-page" component={BubblePage} />
      </div>
    </Router>
  );
}

export default App;
