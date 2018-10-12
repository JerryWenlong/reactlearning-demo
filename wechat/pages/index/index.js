//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
import CryptoJs from '../../libs/crypto-js/crypto-js.js'

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    latitude: '',
    longitude: '',
    city:'',
    cityName: '',
    weather: '',
    location: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  goCalendar: function(){
    wx.navigateTo({
      url: '../calendar/index'
    })
  },
  onLoad: function () {
    var that = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.getLocation(fn=>{
      // that.getWeather()
      // that.setData({
      //   weather:{
      //     temperature: 18,
      //     text: '多云'
      //   },
      //   location:{
      //     name: '上海'
      //   }
      // })
    });
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  },

  getLocation:function(cb){
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        var result = JSON.stringify(res);
        this.setData({ 
          latitude: res.latitude,
          longitude: res.longitude
        })
        if(cb) cb()
      }
    })
  },

  openWxMap: function(){ 
    var that = this;
    wx.openLocation({
      latitude: that.data.latitude,
      longitude: that.data.longitude,
      scale: 14,
    })
  },

  getCity:function(){
    var that = this;
    var url = "https://api.seniverse.com/v3/location/search.json?q={0}:{1}";
    url = util.stringFormat(url, [that.data.latitude, that.data.longitude])
    var requestUrl = this.getUrl(url);
    
    wx.request({
      url: requestUrl,
      type:'GET',
      dataType:'jsonp',
      jsonp:'callback',
      jsonpCallback:'showCity',
      success:function(data){
        if(data.statusCode == 200){
          var res = JSON.parse(data.data)
          var result = res.results[0]
          that.setData({
            city: result.path,
            cityName: result.name
          })
          that.getWeather()
        }
        
      }
    })
  },
  getWeather:function(){
    var that = this;
    var url = "https://api.seniverse.com/v3/weather/now.json?location={0}:{1}&unit=c"
    url = util.stringFormat(url, [that.data.latitude, that.data.longitude])
    var requestUrl = this.getUrl(url);
    
    wx.request({
      url: requestUrl,
      type:'GET',
      dataType:'jsonp',
      jsonp:'callback',
      jsonpCallback:'showWeather',
      success:function(data){
        if(data.statusCode == 200){
          var res = JSON.parse(data.data)
          var result = res.results[0]
          that.setData({
            weather: result.now,
            location: result.location
          })
        }
      }
    })
  },
  getUrl:function(requestUrl){
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
  },

  chooseImg: function(){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        debugger
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths
      } 
    })
  }
  
})
