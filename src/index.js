import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import './assets/index.css';

import { Group } from './models/Group';
import { getSnapshot } from 'mobx-state-tree';

let initialState = {
    users: {
        'a342': {
            id: 'a342',
            name: 'Homer',
            gender: 'm'
        },
        '5fc2': {
            id: '5fc2',
            name: 'Marge',
            gender: 'f'
        },
        '663b': {
            id: '663b',
            name: 'Bart',
            gender: 'm'
        },
        '65aa': {
            id: '65aa',
            name: 'Maggie',
            gender: 'f'
        },
        'ba32': {
            id: 'ba32',
            name: 'Lisa',
            gender: 'f'
        },
    }
};

// for Hot Modules Reloading when model definitions change

let wishList = Group.create(initialState);

function renderApp() {
    ReactDOM.render(<App wishList={wishList} />, document.getElementById('root'));
}

renderApp();

if (module.hot) {
    module.hot.accept(['./components/App'], () => {
        // new components
        renderApp();
    })

    module.hot.accept(['./models/WishList'], () => {
        // new model definitions
        const snapshot = getSnapshot(wishList);
        // initial wishList with the new defenition of WishList model (which injected by webpack) based on the old snapshot
        wishList = Group.create(snapshot);
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