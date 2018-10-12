import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import myStore from '../store2.js'
const _store = myStore;

class ClickCount extends React.Component {
	constructor(){
		super();
		this.state = {
			clickCount: 0
		}
	}

	componentWillMount(){
		_store.subscribe(()=> {
  		var newState = _store.getState();
			this.setState({
				clickCount: newState.clickCountReducer.clickCount
			})
		});
	}

	render(){
		return (
			<p>
      	<span>Click Count: {this.state.clickCount}</span>
      </p>
		)
	}
}

export default ClickCount