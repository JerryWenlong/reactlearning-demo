import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import $ from 'jquery'
import CryptoJs from 'crypto-js'

class GeoComponent extends React.Component {
	constructor(){
		super()
	}

	componentWillMount(){
		// navigator.geolocation.getCurrentPosition(success=>{
		// 	debugger
		// },err=>{
		// 	debugger
		// }
		// )
		// var url = "https://api.seniverse.com/v3/location/search.json?key=txvgdpwxttpysggq&q=39.93:116.40"
		// $.get(url, function(res){
		// 	debugger
		// })
		
		// debugger
		var that = this;
		var url = 'https://api.seniverse.com/v3/weather/now.json?key=txvgdpwxttpysggq&location=shanghai&language=zh-Hans&unit=c'
		// debugger
		this.getCity();
		this.getWeather();
	}
	getCity(){
		var url = "https://api.seniverse.com/v3/location/search.json?q=220.181.111.86";
		var requestUrl = this.getUrl(url);
		$.ajax({
			url: requestUrl,
			type:'get',
			dataType: 'jsonp',
			jsonp: 'callback',
			jsonpCallback: 'showLocation',
			success: function(data){
				console.log("city")
				console.log(data)
			}
		})
	}

	getWeather(){
		var url = "https://api.seniverse.com/v3/weather/now.json?location=shanghai"
		var requestUrl = this.getUrl(url)
		$.ajax({
			url: requestUrl,
			type:'get',
			dataType: 'jsonp',
			jsonp: 'callback',
			jsonpCallback: 'showWeather',
			success: function(data){
				console.log("Weather")
				console.log(data)
			}
		})
	}

	getUrl(requestUrl){
		var ts = Date.parse(new Date());
		var ttl = 1800;
		var uid = "UC568A2272";
		var key = "txvgdpwxttpysggq";
		var str = "ts=" + ts + "&ttl="+ttl+"&uid="+uid;

		var hash = CryptoJs.HmacSHA1(str, key);
		var base = hash.toString(CryptoJs.enc.Base64);
		var sig = encodeURIComponent(base);
		var url = requestUrl + "&" + str + "&sig=" + sig;
		return url
	}


	render(){
		return(
			<h3>Hello</h3>
		)
	}
}

ReactDOM.render(
  <GeoComponent></GeoComponent>,
  document.getElementById('example')
)