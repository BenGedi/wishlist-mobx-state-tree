import React, {Component} from 'react';
import {observer} from 'mobx-react';

class WishListItemEdit extends Component {

    onNameChange = event => {
        this.props.item.changeName(event.target.value);
    }
    onPriceChange = event => {
        const price = parseInt(event.target.value);
        if (!isNaN(price)) this.props.item.changePrice(price);
    }
    onImageChange = event => {
        this.props.item.changeImage(event.target.value);
    }

    render () {
        const { item } = this.props;

        return (
            <div className="item-edit">
                <div className="text-field">
                    <span>Thing:</span><input value={item.name} onChange={this.onNameChange}/>
                </div>
                <div className="text-field">
                    <span>Price:</span><input value={item.price} onChange={this.onPriceChange}/>
                </div>
                <div className="text-field">
                    <span>Image:</span><input value={item.image} onChange={this.onNameChange}/>
                </div>
            </div>
        );
    }
}

export default observer(WishListItemEdit);