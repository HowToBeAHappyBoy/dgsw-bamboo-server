import React, { Component } from 'react';
import './App.css';
import Head from './Head';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import User from './user';
import Post from './post';
import Login from './Login';



class App extends Component {


  render() {
    return (
      <Router>
        <div className="App">
        <Head/>
          <div>
            <Route exact path="/" component={User}/>
            <Route path="/admin" component={Login}/>
            <Route path="/write" component={Post}/>
            <Route path="/login" Component={Login}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
