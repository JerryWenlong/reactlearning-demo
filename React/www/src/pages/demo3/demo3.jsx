import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';

// class Demo3 extends React.Component{
//   constructor(){
//     super()
//   }
//   render(){
    
//     console.log(this.props);
//     var a = parseInt(this.props["data-a"]);
//     var b = parseInt(this.props["data-b"]);
//     // this.props["data-b"] = a + b  //Props are Read-Only
//     return (
//       <div> 
//         <p> This is my component. </p>
//         <p> a + b = {a + b} </p>
//       </div>
//     )
//   }
// }

function Demo3(props){
    var a = parseInt(props["data-a"]);
    var b = parseInt(props["data-b"]);
    // this.props["data-b"] = a + b  //Props are Read-Only
  return (
    <div>
      <h4>Hello, {props.name} </h4> 
      <p> This is my component. </p>
      <p> a + b = {a + b} </p>
    </div>
  )
}

ReactDOM.render(
  <Demo3 name='jerry' data-a='1' data-b='2' />,
  document.getElementById('demo3')
)