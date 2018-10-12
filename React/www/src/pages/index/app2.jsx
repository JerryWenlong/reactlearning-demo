import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import myStore from '../../store2.js'
import { changeName, updateClickCount } from '../../action.js'

import ClickCount from '../../jsx/clickCount.jsx'

const _store2 = myStore;


class MyComponent extends React.Component {
	// getInitialState(){
	// 	return {
	// 		myName: '',
	// 		inputValue: ''
	// 	}
	// }
	constructor(){
		super();
		this.state = {
			myName: '',
			inputValue: '',
			tryReducerResult: 0
		}
	}
	clickHandler(){
		// this.setState({
		// 	myName: this.state.inputValue
		// })
		_store2.dispatch(changeName(this.state.inputValue))
		_store2.dispatch(updateClickCount())
	}
	inputHandler(event){
		this.setState({
			inputValue: event.target.value
		})
	}
	handleClick2(){
    var inputValue2 = this.refs.myTextInput.value;
    // set state
    // this.setState({myName: inputValue2})

    // dispatch -----------
    // _store2.dispatch({
    // 	type: 'changeName', 
    // 	demoObj: {
    // 		name: inputValue2
    // 	}
    // })

		// dispatch -----------
    _store2.dispatch(changeName(inputValue2))
    _store2.dispatch(updateClickCount())
  }

  componentWillMount(){
  	_store2.subscribe(()=> {
  		var newState = _store2.getState();
			this.setState({
				myName: newState.myReducer.demoObj.name,
			})
		})
  	// try{
  	// 	console.log(this.refs.myTextInput.value)
  	// }catch(err){
  	// 	alert(err)
  	// }
  }


	render(){
		let buttonName = "click1";
		let inputStyle = {
		  "display":"inline-block",
		  "lineHeight":"30px",
		  "textAlign":"center",
		  "backgroundColor":"#FF8342",
		  "borderRadius":'3px',
		  "width":"80px",
		  "height":"30px",
		  "cursor":"pointer"
		};

		var showName = this.state.myName || this.props.name
		return (
		  <div>
		    <h1>Hello {showName}!</h1>
		    <p>
		    	<input type="text" value={this.state.inputValue} placeholder="please input something." onChange={this.inputHandler.bind(this)} />
		    	<span className='btn' onClick={this.clickHandler.bind(this)}>{buttonName}</span>
		    </p>

		    <p>
          <input type="text" ref="myTextInput" defaultValue="" placeholder="please input something." />
          <span className='btn' onClick={this.handleClick2.bind(this)}>click2</span>
        </p>

        <ClickCount></ClickCount>

		  </div>
		);
	}
}

ReactDOM.render(
  <MyComponent name="World"></MyComponent>,
  document.getElementById('example2')
)