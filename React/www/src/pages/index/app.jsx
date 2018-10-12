import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import myStore from '../../store.js'
import { changeName, updateClickCount } from '../../action.js'
import { myReducer } from '../../reducer/myReducer.js'

import Rx from 'rxjs/Rx';

// import ClickCount from '../../jsx/clickCount.jsx'

const _store = myStore;


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
		_store.dispatch(changeName(this.state.inputValue))
		_store.dispatch(updateClickCount())
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
    // _store.dispatch({
    // 	type: 'changeName', 
    // 	demoObj: {
    // 		name: inputValue2
    // 	}
    // })

		// dispatch -----------
    _store.dispatch(changeName(inputValue2))
    _store.dispatch(updateClickCount())
  }
  tryReducer(){
  	var _arr=[
  		{type: "ACTION_TRY_REDUCER", add_to: 5},
  		{type: "ACTION_TRY_REDUCER", add_to: 8},
  		{type: "ACTION_TRY_REDUCER", add_to: 2},
  		{type: "ACTION_TRY_REDUCER", add_to: -10}
  	]
  	var _result = _arr.reduce(myReducer);
  	this.setState({
  		tryReducerResult: _result.add_to
  	})
  }
  componentWillMount(){
  	_store.subscribe(()=> {
  		var newState = _store.getState();
			this.setState({
				myName: newState.demoObj.name,
			})
		})
  	// try{
  	// 	console.log(this.refs.myTextInput.value)
  	// }catch(err){
  	// 	alert(err)
  	// }
  }
  shouldComponentUpdate(nextProps, nextState){
  	// if(nextState.myName == this.state.myName && nextState.inputValue == this.state.inputValue){
  	// 	console.log('inputValue2 equals name, no need update');
  	// 	return false
  	// }else{
  	// 	return true
  	// }
  	return true
  }
  componentDidMount(){
  	this.rxTest()
  }

  rxTest(){
  	// var input = document.getElementById('myTextInput');
  	var input = this.refs.myTextInput;
  	const search$ = Rx.Observable.fromEvent(input, 'input')
  		.map(e=>e.target.value)
  		.filter(val=>val.length>=1)
  		.throttleTime(100)
  		.distinctUntilChanged()
  		// .switchMap(val=>'msg:'+val)
  		.subscribe(
  			x=>{
  				console.log(x)
  			}
  		)

  	// var subject = new Rx.Subject()
  	// subject.subscribe({next: (v)=> console.log('observerA:' + v)});
  	// subject.subscribe({next: (v)=> console.log('observerB:' + v)});

  	// subject.next(1)
  	// subject.next(3)

  	//subject 
  	// var source = Rx.Observable.from([1,2,3]);
  	// var subject = new Rx.Subject();
  	// subject.subscribe({
  	// 	next: (v) => console.log('observerA: ' + v)
  	// })
  	// subject.subscribe({
  	// 	next: (v) => console.log('observerB: ' + v)
  	// })
  	// subject.subscribe({
  	// 	next: (v) => console.log('observerC: ' + v)
  	// })
  	// source.subscribe(subject)

  	// var source = Rx.Observable.from([1,2,3]);
  	// var subject = new Rx.Subject();
  	// var multicasted = source.multicast(subject);
  	// multicasted.subscribe({
  	// 	next: (v) => console.log('observerA: ' + v)
  	// });
  	// multicasted.subscribe({
  	//   next: (v) => console.log('observerB: ' + v)
  	// });
  	// multicasted.connect();

  	var subject = new Rx.ReplaySubject(3);
  	subject.subscribe({
  		next: v=> console.log('obA:' + v)
  	})
  	subject.next(1)
  	subject.next(2)
  	subject.next(3)
  	subject.next(4)
  	subject.next(5)

  	subject.subscribe({
  		next: v=> console.log('obB:' + v)
  	})

  	subject.next(6)


  	function multiplyByTen(input){
  		var output = Rx.Observable.create(observer=>{
  			input.subscribe({
  				next: (v)=> observer.next(10*v),
  				error: (err)=> observer.error(err),
  				complete: ()=>observer.complete()
  			});
  		})
  		return output
  	}

  	var input = Rx.Observable.from([1,2,3,4])
  	var output = multiplyByTen(input)
  	output.subscribe(x=>console.log(x))

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
          <input type="text" ref="myTextInput" id="myTextInput" defaultValue="" placeholder="please input something." />
          <span className='btn' onClick={this.handleClick2.bind(this)}>click2</span>
        </p>

        <p>
        	<span>Try Result: {this.state.tryReducerResult}</span>
        	<span className='btn' onClick={this.tryReducer.bind(this)}>click3</span>
        </p>
		  </div>
		);
	}
}

ReactDOM.render(
  <MyComponent name="World"></MyComponent>,
  document.getElementById('example')
)