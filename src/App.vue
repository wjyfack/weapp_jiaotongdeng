<script>
export default {
  globalConfig: {
    // usingComponents: {
    //   'van-tag': 'vant-weapp/dist/tag/index'
    // }
  },
  created () {
    // 调用API从本地缓存中获取数据
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // eslint-disable-next-line
    console.log('app created and cache logs by setStorageSync')
  }
}
</script>

<style>
.van-hairline,.van-hairline--bottom,.van-hairline--left,.van-hairline--right,.van-hairline--surround,.van-hairline--top,.van-hairline--top-bottom{position:relative}.van-hairline--bottom:after,.van-hairline--left:after,.van-hairline--right:after,.van-hairline--surround:after,.van-hairline--top-bottom:after,.van-hairline--top:after,.van-hairline:after{content:" ";position:absolute;pointer-events:none;box-sizing:border-box;-webkit-transform-origin:center;transform-origin:center;top:-50%;left:-50%;right:-50%;bottom:-50%;-webkit-transform:scale(.5);transform:scale(.5);border:0 solid #eee}.van-hairline--top:after{border-top-width:1px}.van-hairline--left:after{border-left-width:1px}.van-hairline--right:after{border-right-width:1px}.van-hairline--bottom:after{border-bottom-width:1px}.van-hairline--top-b.van-ellipsis{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.van-multi-ellipsis--l2{-webkit-line-clamp:2}.van-multi-ellipsis--l2,.van-multi-ellipsis--l3{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical}.van-multi-ellipsis--l3{-webkit-line-clamp:3}.van-clearfix:after{content:"";display:table;clear:both}.van-hairline,.van-hairline--bottom,.van-hairline--left,.van-hairline--right,.van-hairline--surround,.van-hairline--top,.van-hairline--top-bottom{position:relative}.van-hairline--bottom:after,.van-hairline--left:after,.van-hairline--right:after,.van-hairline--surround:after,.van-hairline--top-bottom:after,.van-hairline--top:after,.van-hairline:after{content:" ";position:absolute;pointer-events:none;box-sizing:border-box;-webkit-transform-origin:center;transform-origin:center;top:-50%;left:-50%;right:-50%;bottom:-50%;-webkit-transform:scale(.5);transform:scale(.5);border:0 solid #eee}.van-hairline--top:after{border-top-width:1px}.van-hairline--left:after{border-left-width:1px}.van-hairline--right:after{border-right-width:1px}.van-hairline--bottom:after{border-bottom-width:1px}.van-hairline--top-bottom:after{border-width:1px 0}.van-hairline--surround:after{border-width:1px}
page {
	height: 100%;
}
.btn {
  background-color: rgba(0, 204, 204, 0.8);
}
/* .container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
} */
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
