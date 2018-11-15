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
		const group = this.props.group;
		const selectedUser = group.users.get(this.state.selectedUser);
		const users = Object.values(toJS(group).users);

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
				{selectedUser && <button onClick={selectedUser.getSuggestions}>Suggestion</button> }
			</div>
		);
	}
}

export default App;