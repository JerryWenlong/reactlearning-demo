import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';

class Clock extends React.Component {
  constructor() {
    super()
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }


  componentWillMount(){
    console.log("componentWillMount")
  }

  componentWillUpdate(nextProps, nextState){
    console.log("componentWillUpdate")
  }
  componentDidUpdate(prevProps, prevState){
    console.log("componentDidUpdate")
  }
  componentWillReceiveProps(nextProps){
    console.log("componentWillReceiveProps")
  }

  shouldComponentUpdate(nextProps, nextState){
    return true
  }

  update(){
    clearInterval(this.timerID);
    this.forceUpdate()
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        <span className='btn' onClick={this.update.bind(this)}>force update</span>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('demo4')
);
