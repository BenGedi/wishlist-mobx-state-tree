import React, {Component} from 'react';
import { observer } from 'mobx-react';

import WishlistItemEdit from './WishlistItemEdit';
import { WishListItem } from '../models/WishList';

class WishListItemEntry extends Component {
    state = {
        entry: WishListItem.create({
            name: '',
            price: 0
        })
    }

    onAdd = () => {
        this.props.wishList.add(this.state.entry);
        this.setState({
            entry: WishListItem.create({
            name: '',
            price: 0
        })});
    }

    render() {
        return (
            <div className="add-item">
                <WishlistItemEdit item={this.state.entry} />
                <button onClick={this.onAdd}>Add</button>
            </div>
        );
    }
}

export default observer(WishListItemEntry);
