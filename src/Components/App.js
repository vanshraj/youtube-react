import React, {Component} from 'react';
import Home from './Home';
import Video from './Video';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path='/' exact component={Home}/>
              <Route path='/:yid' exact component={Video}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
