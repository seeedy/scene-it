import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Search from './Search';
import Pregame from './Pregame';
import Scorer from './Scorer';
import Guesser from './Guesser';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state={};
    }





    render() {
        return (
            <BrowserRouter>
                <div id="app-content">
                    <Route
                        exact path="/search"
                        component={ Search }
                    />
                    <Route
                        exact path="/"
                        component={ Pregame }
                    />
                    <Route
                        exact path="/scorer"
                        component={ Scorer }
                    />
                    <Route
                        exact path="/guesser"
                        component={ Guesser }
                    />
                </div>

            </BrowserRouter>
        );


    }




}
