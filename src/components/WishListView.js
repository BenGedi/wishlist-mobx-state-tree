import React from 'react';
import WishListItemView from './WishListItemView';
import { observer } from 'mobx-react';

const WishListView = ({ wishList }) => (
    <div className="list">
        <ul>
            {
                wishList.items.map((item, idx) => <WishListItemView key={idx} item={item} />)
            }
        </ul>
        Total: {wishList.totalPrice} $
    </div>
);

export default observer(WishListView);