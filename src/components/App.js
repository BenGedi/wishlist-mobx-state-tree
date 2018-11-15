import React, { Component } from 'react';
import logo from '../assets/santa-claus.png';
import { toJS } from 'mobx';

import WishListView from './WishListView';

class App extends Component {
	constructor(props) {
		super();

		this.state = {
			selectedUser: null
		}
	}

	onSelectUser = event => {
		this.setState({ selectedUser: event.target.value });
	}

	render() {
		const wishList = this.props.wishList;
		const selectedUser = wishList.users.get(this.state.selectedUser);
		const users = Object.values(toJS(wishList).users);

		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">WishList</h1>
				</header>
				<select onChange={this.onSelectUser}>
					<option>- Select user -</option>
					{users.map(user =>
						<option value={user.id} key={user.id}>
							{user.name}
						</option>
					)}
				</select>
				{selectedUser && <WishListView wishList={selectedUser.wishList} />}
			</div>
		);
	}
}

export default App;