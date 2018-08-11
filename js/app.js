// this is the test react file with ES6

import React, { Component } from 'react';
import logo from '../images/index.jpg';
import '../css/index.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
				<img src={ logo } className="APP-logo" alt="logo">
				<h1 className="App-title">I like React</h1>
				</header>
				<p className="App-intro">
					To get started, edit <code> src </code> and save to reload.
				</p>
			</div>
		);
	}
}