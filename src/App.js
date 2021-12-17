import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Form from './Form';
import Homepage from './Homepage';
import "./App.css";


const App = () => {
  return (
    <div className="header">
      <h1>Lets make some Pizza!</h1>
      <nav>
      <Link to="/"><button id="home-button">Home</button></Link>
      
      </nav>
      <Switch>
      <Route path="/pizza" component={Form} />
        <Route path="/" component={Homepage} />
      </Switch>
    </div>
  );
};
export default App;

