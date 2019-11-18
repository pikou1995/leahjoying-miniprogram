// pages/heartbeat/heartbeat.js
const ANIMATE_CLASSNAMES = require("../../utils/animateClassNames.js")
const randomIndex = require("../../utils/util.js").randomIndex

Page({
  data: {
    startTime: Date.parse("01 May 2019 19:00:00 GMT+0800"),
    timeHandler: null,
    animateIndex: -1,
    animateClass: '',
    year: "2019",
    time: ''
  },
  initYear() {
    let thisYear = new Date().getFullYear();
    this.setData({
      year: thisYear === 2019 ? "2019" : "2019 - " + thisYear
    })
  },
  calTime() {
    let delta = Date.now() - this.data.startTime;
    let days = Math.floor(delta / 1000 / 60 / 60 / 24);
    let hours = Math.floor((delta / 1000 / 60 / 60) % 24);
    let minutes = Math.floor((delta / 1000 / 60) % 60);
    let seconds = Math.floor((delta / 1000) % 60);
    this.setData({
      time: `${days}天${hours}时${minutes}分${seconds}秒`
    })
  },
  startTick() {
    this.setData({
      timeHandler: setInterval(() => {
        this.calTime()
      }, 1000)
    })
  },
  stopTick() {
    clearInterval(this.data.timeHandler);
  },
  nextAnimateIndex() {
    let i = randomIndex(ANIMATE_CLASSNAMES.length);
    return i === this.data.animateIndex ? this.nextAnimateIndex() : i
  },
  easterEgg() {
    const i = this.nextAnimateIndex()
    this.setData({
      animateIndex: i,
      animateClass: ANIMATE_CLASSNAMES[i]
    })
  },
  onLoad: function () {
    this.initYear()
    this.calTime()
    this.startTick()
  },
  onUnload: function () {
    this.stopTick()
  },
  onShareAppMessage: function () {
    return {
      title: "你有一份快递请查收",
      imageUrl: "../../utils/avatar.png"
    }
  },
  onGotUserInfo(e) {
    console.log(e)
  }
})
