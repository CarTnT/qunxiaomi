var app = getApp()
Page({
  data: {
    currentTab: 0,
    allData: { signed: [{ date: "2018-01-05", starter_icon: "http://p1.meituan.net/165.220/movie/266d24fe8567632e078b3717a096d104359095.jpg", headline: "solo", note: "some notes...", likes: "20", signed_num: "40" }, { date: "2017-01-05", starter_icon: "http://p1.meituan.net/165.220/movie/266d24fe8567632e078b3717a096d104359095.jpg", headline: "solo", note: "some notes...", likes: "20", signed_num: "40" }, { date: "2028-01-05", starter_icon: "http://p1.meituan.net/165.220/movie/266d24fe8567632e078b3717a096d104359095.jpg", headline: "solo", note: "some notes...", likes: "20", signed_num: "40" }, { date: "2019-12-08", starter_icon: "http://p1.meituan.net/165.220/movie/dc07682883ccbcdfb3ae532e2a90d4ff1342251.jpg", headline: "quiet", note: "some notes...", likes: "60", signed_num: "140" }], unsigned: [{ date: "2019-12-08", starter_icon: "http://p1.meituan.net/165.220/movie/dc07682883ccbcdfb3ae532e2a90d4ff1342251.jpg", headline: "quiet", note: "some notes...", likes: "60", signed_num: "140" }, { date: "2018-01-05", starter_icon: "http://p1.meituan.net/165.220/movie/266d24fe8567632e078b3717a096d104359095.jpg", headline: "solo", note: "some notes...", likes: "20", signed_num: "40" }]},
    current_signed_pre: [],
    current_signed_pos: [],
    current_unsigned_pre: [],
    current_unsigned_pos: []
  },

  onShow: function (options) {
    //从服务器读取allData

    //按时间排序
    this.data.allData.signed.sort(function(s, t) {
      var a = parseInt(s.date.replace(/-/g, ""));
      var b = parseInt(t.date.replace(/-/g, ""));
      if(a < b) {
        return 1;
      }
      else if(a > b) {
        return -1;
      }
      else {
        return 0;
      }
    });
    this.data.allData.unsigned.sort(function (s, t) {
      var a = parseInt(s.date.replace(/-/g, ""));
      var b = parseInt(t.date.replace(/-/g, ""));
      if (a < b) {
        return 1;
      }
      else if (a > b) {
        return -1;
      }
      else {
        return 0;
      }
    });
    
    //按时间分类
    var current_signed_pre = [];
    var current_signed_pos = [];
    var current_unsigned_pre = [];
    var current_unsigned_pos = [];
    var util = require('../../utils/util.js');
    var time = parseInt(util.formatTime(new Date()).slice(0,10).replace(/\//g, "")); 
    for(var i=0; i<this.data.allData.signed.length; i++) {
      if(parseInt(this.data.allData.signed[i].date.replace(/-/g, ""))<time) {
        current_signed_pre.push(this.data.allData.signed[i]);
      }
      else {
        current_signed_pos.push(this.data.allData.signed[i]);
      }
    }
    for (var i = 0; i < this.data.allData.unsigned.length; i++) {
      if (parseInt(this.data.allData.unsigned[i].date.replace(/-/g, "")) < time) {
        current_unsigned_pre.push(this.data.allData.unsigned[i]);
      }
      else {
        current_unsigned_pos.push(this.data.allData.unsigned[i]);
      }
    }

    //赋值
    this.setData({
      current_signed_pre: current_signed_pre,
      current_signed_pos: current_signed_pos,
      current_unsigned_pre: current_unsigned_pre,
      current_unsigned_pos: current_unsigned_pos
    });
  },
  
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      });
    }
  }
})