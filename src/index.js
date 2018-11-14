import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './components/App';
// import * as serviceWorker from './serviceWorker';

import { WishList } from './models/WishList';

const wishList = WishList.create({
    items: [
        {
            name: 'Lego Mindstorms EV3',
            price: 349.95,
            image: 'https://expressbuy.eu/media/products/3525d4d8aadb00624ee2c877812fa6f7/images/thumbnail/large_lego-31313-mindstorms-ev3.png?lm=1484739064'
        },
        {
            name: 'Miracles - C.S Lewis',
            price: 12.91,
            image: 'https://images-na.ssl-images-amazon.com/images/I/51a7xaMpneL._SX329_BO1,204,203,200_.jpg'
        }
    ]
})

ReactDOM.render(<App wishList={wishList} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();


// setInterval(() => {
// 	wishList.items[0].changePrice(wishList.items[0].price +1);
// }, 1000);