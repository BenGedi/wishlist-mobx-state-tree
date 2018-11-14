import React, {Component} from 'react';
import { observer } from 'mobx-react';
import { clone, getSnapshot, applySnapshot } from 'mobx-state-tree';

import WishListItemEdit from './WishlistItemEdit';

class WishListItemView extends Component {
    state = {
        isEditing: false
    }

    onToggleEdit = () => {
        // this.setState((state, props) => {
        //     console.log('onToggleEdit - props: ',props);
        //     return {isEditing: !state.isEditing};
        // });

        this.setState({
            isEditing: true,
            clone: clone(this.props.item)
        });    
    }

    onCancelEdit = () => {
        this.setState({isEditing: false});
    }

    onSaveEdit = () => {
        // assign the clone with the new data to the reference props
        applySnapshot(this.props.item, getSnapshot(this.state.clone));

        this.setState({
            isEditing: false,
            clone: null
        })
    }

    render () {
        const { item } = this.props;
        const classNameEdit = this.state.isEditing && 'edit-mode';
        return this.state.isEditing ? (
            <li className={`item ${classNameEdit}`}>
                <WishListItemEdit item={this.state.clone} />
                <div className="action-buttons">
                    <button onClick={this.onSaveEdit}>
                        <span role="img" aria-label="save">💾</span>
                    </button>
                    <button onClick={this.onCancelEdit}>
                        <span role="img" aria-label="cancel">❌</span>
                    </button>
                </div>
            </li>
        ) :(
            <li className="item">
                {item.image && <div className="item-image"><img src={item.image} alt={item.name}/></div>}
                <h3>{item.name}</h3>

                <span>
                {item.price} <button onClick={this.onToggleEdit}>
                    <span role="img" aria-label="edit">✏️</span>
                </button>
                <button onClick={item.remove}>
                        <span role="img" aria-label="cancel">❌</span>
                    </button>
                </span>
            </li>
        );
    }
}

export default observer(WishListItemView);