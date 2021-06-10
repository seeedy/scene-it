import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Pregame, Search, Guesser, Scorer, Transition } from './pages';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <div id='app-content'>
          <Route exact path='/search' component={Search} />
          <Route exact path='/' component={Pregame} />
          <Route exact path='/scorer' component={Scorer} />
          <Route exact path='/guesser' component={Guesser} />
          <Route exact path='/transition' component={Transition} />
        </div>
      </BrowserRouter>
    );
  }
}
