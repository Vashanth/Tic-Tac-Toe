import React from 'react';
import "./App.css"
import Mode from  './components/Mode'
import Nav from "./components/Nav"
import About from './components/About'
import Xo from './components/Xo'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <div>
      <Nav />
    </div>
    <Switch>
      <Route exact path="/" component={Mode} />
      <Route path="/about" component={About} />
      <Route path="/play/:id" component={Xo} />
    </Switch>
    </BrowserRouter>
  );
}

export default App;
