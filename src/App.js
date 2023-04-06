import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';
import Form from './Form';
import Dashboard from './Dashboard'; 

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <nav>
            <Link to="/">Form</Link>
            <span> | </span>
            <Link to="/dashboard">Dashboard</Link>
          </nav>
          <Switch>
            <Route exact path="/" component={Form} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </header>
      </Router>
    </div>
  );
}

export default App;