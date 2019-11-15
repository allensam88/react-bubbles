import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Private from './utils/PrivateRoute';
import Login from "./components/Login";
import BubblePage from './components/BubblePage';
import AddColor from './components/AddColor';
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <Private path="/bubble-page" component={BubblePage} />
        <Private path="/add-color" component={AddColor} />
      </div>
    </Router>
  );
}

export default App;
