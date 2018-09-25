import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Search from './search';
import Pregame from './pregame';


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
                </div>

            </BrowserRouter>
        );


    }




}
