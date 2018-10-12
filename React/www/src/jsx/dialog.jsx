import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
let DialogWrap = function(props){
	return (
		<div className="Dialog-wrap">
			<div className="Dialog-content"> 
				{props.children}
			</div>
		</div>
	)
}

let Dialog = function (props) {
	return (
		<DialogWrap color='' alpha=''>
			<h1 className="Dialog-title">
				{props.title}
			</h1>
			<p className="Dialog-msg">
				{props.message}
			</p>
			{props.children}
		</DialogWrap>
	)
}

let Dialog1 = function(){
	return (
		<Dialog title="Dialog Demo-1" message="Thank you for your visiting!" />
	)
}

class Dialog2 extends React.Component{
	constructor(){
		super();
		this.state={
			customer: ''
		}
	}
	handleChange(event){
		this.setState({
			customer: event.target.value
		})
	}
	handleClick(){
		alert(this.state.customer)
	}
	render(){
		return(
			<Dialog title="Dialog Demo-2" message="Sign up dialog">
				<input value={this.state.customer} onChange={this.handleChange.bind(this)}/>
				<span className="btn" onClick={this.handleClick.bind(this)}>Sign up!</span>
			</Dialog>
		)
	}
} 

ReactDOM.render(
	<Dialog1 />,
	document.getElementById('dialog-demo-1')
)

ReactDOM.render(
	<Dialog2 />,
	document.getElementById('dialog-demo-2')
)