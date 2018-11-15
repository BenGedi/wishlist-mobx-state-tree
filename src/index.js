import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import './assets/index.css';

import { Group } from './models/Group';
import { getSnapshot, addMiddleware } from 'mobx-state-tree';

let initialState = { users: {} };

// for Hot Modules Reloading when model definitions change

let group = (window.group = Group.create(initialState));

addMiddleware(group, (call, next) => {
    console.log(`[${call.type}] ${call.name}`);
    return next(call);
});

function renderApp() {
    ReactDOM.render(<App group={group} />, document.getElementById('root'));
}

renderApp();

if (module.hot) {
    module.hot.accept(['./components/App'], () => {
        // new components
        renderApp();
    })

    module.hot.accept(['./models/WishList'], () => {
        // new model definitions
        const snapshot = getSnapshot(group);
        // initial wishList with the new defenition of WishList model (which injected by webpack) based on the old snapshot
        group = window.group = Group.create(snapshot);
        renderApp();
    })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();


// setInterval(() => {
// 	wishList.items[0].changePrice(wishList.items[0].price +1);
// }, 1000);