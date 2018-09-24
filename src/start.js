import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import reducer from './reducers';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getSocket } from './socket';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));

getSocket(store);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('main')
);

// function HelloWorld() {
//     return (
//         <div>Hello, World!</div>
//     );
// }
