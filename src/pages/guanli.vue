<template>
	<form report-submit="true" class="form" @submit="form_submit">
    <div class="guanli">
      <div class="header">
        <picker :value="indexQu" :range="arrayQu" @change="bindPickerQu">
          <div class="town">
            <div class="town-name">区：</div>
            <div class="town-select van-hairline--surround">
              <span v-if="indexQu">{{ arrayQu[indexQu] }}</span><span v-else>请选择区</span>
              <van-icon name="arrow-down" />
            </div>
          </div>
        </picker>
        <!-- <picker :value="indexTown" :range="arrayTown" @change="bindPickerTown"> -->
          <div class="town">
            <div class="town-name">镇街：</div>
            <div class="town-select van-hairline--surround">
              <input v-model="street" type="text" placeholder="请输入镇街" @confirm="inputTown">
              <!-- <span v-if="indexTown">{{ arrayTown[indexTown] }}</span><span v-else>请选择镇街</span>
              <van-icon name="arrow-down" /> -->
            </div>
          </div>
        <!-- </picker> -->
      </div>
      <div class="guandong">
        <van-icon name="volume-o" class="guandong-icon" color="#5A83F0"/>
        <div class="guandong-cont">
					<swiper :indicator-dots="false"
						:autoplay="true" :interval="5000" :duration="1000" :vertical="true" class="swiper">
						<block
							 v-for="(item, index) in textList"
							 :key="index">
							<swiper-item>
								<span class="guandong-span" @click="onPopup">{{ item.onlineName }}  {{ item.time[0] }}月{{ item.time[1] }} 于{{ item.area }} {{ item.street }},ID为{{item.deviceId}}发生故障</span>
							</swiper-item>
						</block>
					</swiper>
					<!--<span class="guandong-span">在线 未在线 5月25号于白云区**街道，ID为**发生故</span>-->
        </div>
      </div>
      <div class="info">
        <div v-for="(item, index) in list" :key="index" class="info-item">
          <img v-if="item.statusName" :src="zhi" class="zhi" alt="" srcset="">
          <div class="info-item-cont">
            <div class="cont-header van-hairline--bottom" @click="toPush(item.deviceId,item.area,item.street)"><span>ID: {{ item.deviceId }}</span><span v-if="item.statusName">异常</span></div>
            <div class="cont-center" @click="toPush(item.deviceId,item.area,item.street)">
              <div class="center-item">
                <div class="center-item-name">温度</div>
                <div class="center-item-status">{{ item.temperature }}℃</div>
              </div>
              <div class="center-item">
                <div class="center-item-name">电压</div>
                <div class="center-item-status">{{ item.voltage }}V</div>
              </div>
              <div class="center-item">
                <div class="center-item-name">电流</div>
                <div class="center-item-status">{{ item.electricity }}A</div>
              </div>
            </div>
            <div class="cont-footer van-hairline--top">
              <div class="footer-item van-hairline--right">
                <div class="footer-item-name">漏电流</div>
								<div class="footer-item-color">{{ item.leakElectricity }}mA</div>
                <!-- <div class="yuan green"></div> -->
              </div>
              <div class="footer-item van-hairline--right">
                <div class="footer-item-name">跳闸次数</div>
                <div class="footer-item-color">{{ item.breakBrakeCount || 0 }}</div>
              </div>
              <div class="footer-item">
                <div class="footer-item-name">状态</div>
                <div class="footer-item-status"><span v-if="item.online == 1">在线</span><span v-else>未在线</span> </div>
              </div>
            </div>
            <div class="cont-footer van-hairline--top">
              <div class="footer-item van-hairline--right" @click="daoHang(item.latitude, item.longitude)">
                <div class="footer-item-name">导航</div>
                <img :src="dao" class="footer-item-img"/>
              </div>
              <div class="footer-item">
                <div class="footer-item-name">GPRS信号</div>
                <div class="footer-item-status">{{ item.signalStrength }}</div>
                <!-- <div v-if="item.signalStrength <= 15" class="yuan grey"></div>
                <div v-else-if="16<= item.signalStrength <= 24" class="yuan orage"></div>
                <div v-else-if="25<= item.signalStrength <= 31" class="yuan green"></div>
                <div v-else class="footer-item-status">未知</div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button form-type="submit" class="formid">
      <van-tabbar :active="active" active-color="#06ACB0" class="tab-color" @change="onChange">
        <van-tabbar-item icon="home-o" class="tab-color">设备</van-tabbar-item>
        <van-tabbar-item icon="manager-o" class="tab-color">我的</van-tabbar-item>
      </van-tabbar>
    </button>
		<van-popup :show="showPopup" custom-class="vanpopup" @close="onClose">
			<div class="popup">
				<div v-for="(item, index) in textList" :key="index" class="guandong-span">{{ item.onlineName }}  {{ item.time[0] }}月{{ item.time[1] }} 于{{ item.area }} {{ item.street }},ID为{{item.deviceId}}发生故障</div>
			</div>
		</van-popup>
		<van-toast id="van-toast" />
  </form>
</template>

<script>
  import Toast from 'vant-weapp/dist/toast/toast'
  import dao from '@/assets/dao.png'
  import zhi from '@/assets/zhi.png'
  import { request } from '@/utils/request'
  import { ws } from '@/utils/config'
  import form from '@/mixins/form'
  export default {
    config: {
      navigationBarTitleText: '设备',
      usingComponents: {
        'van-icon': 'vant-weapp/dist/icon/index',
        'van-tabbar': 'vant-weapp/dist/tabbar/index',
        'van-tabbar-item': 'vant-weapp/dist/tabbar-item/index',
        'van-toast': 'vant-weapp/dist/toast/index',
        'van-popup': 'vant-weapp/dist/popup/index'
      }
    },
    mixins: [form],
    data () {
      return {
        lockReconnect: false,
        limit: 1,
        timer: null,
        dao,
        zhi,
        showPopup: false,
        pageNum: 1,
        active: 0,
        indexQu: 0,
        area: '',
        street: '',
        arrayQu: ['全区','天河', '越秀', '荔湾', '海珠', '白云一', '白云二'],
        arrayTown: ['全部街道','沙河街道', '五山街道', '车陂街道', '石牌街道', '天河南街道', '沙东街道', '龙洞街道', '兴华街道', '天园街道', '猎德街道', '元岗街道', '黄村街道'],
        indexTown: 0,
        textList: [],
        list: [
        ]
      }
    },
    methods: {
      inputTown(event) {
        console.log(event)
        console.log(this.street)
        this.initData()
      },
      daoHang (latitude, longitude) {
        console.log(latitude, latitude)
        if(!latitude || !latitude) {
          Toast('设备缺少经纬度')
          return ''
        }
        wx.openLocation({
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude)
        })
      },
      onPopup () {
        this.showPopup = true
      },
      onClose () {
        this.showPopup = false
      },
      onChange (e) {
        const { detail } = e.mp
        if (detail === 0) {
          this.$router.replace('./guanli')
        } else {
          this.$router.replace('./my')
        }
      },
      bindPickerQu (e) {
        console.log(e)
        const { value } = e.mp.detail
        this.indexQu = value
        this.initData()
      },
      bindPickerTown (e) {
        console.log(e)
        const { value } = e.mp.detail
        this.indexTown = value
        this.initData()
      },
      toPush (deviceId, area, street) {
        this.$router.push(`./guanli_detail?id=${deviceId}&area=${area}&street=${street}`)
      },
      linkSocket () {
        let that = this
        wx.connectSocket({
          url: `${ws}${this.$store.state.token}${new Date().getTime()}`,
          method: 'POST',
          success: () => {
            console.log('连接成功')
            that.initEventHandle()
          },
          fail: (e) => {
            console.log(e)
          }
        })
      },
      initEventHandle () {
        let that = this
        let heartCheck = {
          timeout: 10000,
          timeoutObj: null,
          serverTimeoutObj: null,
          reset: function () {
            clearInterval(this.timeoutObj)
            clearTimeout(this.serverTimeoutObj)
            return this
          },
          start: function () {
            this.timeoutObj = setInterval(() => {
            // console.log("发送ping")
              wx.sendSocketMessage({
                data: 'ping',
                success () {
                  console.log('发送ping成功')
                }
              })
              // this.serverTimeoutObj = setTimeout(() =>{
              // wx.closeSocket()
              // }, this.timeout)
            }, this.timeout)
          }
        }
        wx.onSocketMessage((res) => {
          //  收到消息
          console.log(res, 'message')
          if (res.data === 'pong') {
            heartCheck.reset().start()
          } else {
            // 处理数据
            const data = JSON.parse(res.data)
            // console.log(data, '123')
            this.list = this.list.map(item => {
              // item.deviceId = data.deviceId
              // item.voltage = data.voltage
              // item.electricity = data.electricity
              // item.leakElectricity = data.leakElectricity
              // item.temperature = data.temperature
              // item.status = data.status
              if(data.deviceId === item.deviceId) {
                item = data
              }
              return item
            })
          }
        })
        wx.onSocketOpen(() => {
          console.log('WebSocket连接打开')
          heartCheck.reset().start()
        })
        wx.onSocketError(function (res) {
          console.log('WebSocket连接打开失败')
          that.reconnect()
        })
        wx.onSocketClose(function (res) {
          console.log('WebSocket 已关闭！')
          that.reconnect()
        })
      },
      reconnect () {
        if (this.lockReconnect) return
        this.lockReconnect = true
        clearTimeout(this.timer)
        if (this.limit < 12) {
          this.timer = setTimeout(() => {
            this.linkSocket()
            this.lockReconnect = false
          }, 5000)
          this.limit += 1
        }
      },
      operateTemperature (temperature) {
        // const ling = 128
        if (temperature < 128) {
          return temperature
        } else {
          return 128 - temperature
        }
      },
      initData (pageNum = '1', pageSize = '10') {
        let area = ''
        let street = ''
        if (this.indexQu == 0) {
          area = ''
        } else {
          area = this.arrayQu[this.indexQu]
        }
        // if (this.indexTown == 0) {
        //   street = ''
        // } else {
        //   street = this.arrayTown[this.indexTown]
        // }
        street = this.street
        const data = {
          area,
          street,
          pageNum,
          pageSize
        }
        request('device/get/page', data).then(data => {
          const { list } = data
          if (list.length === 0) {
            Toast('没有更多了')
            if (pageNum == 1) {
              this.list = []
            }
          } else {
            const listData = this.changeData(list)
            this.list = this.changeToTop([...this.list, ...listData])
            Toast.clear()
          }
        })
      },
      changeData(list) {
        return list.map(item => {
          let statusName = ''
          if (item.electricity >= 10 || item.temperature > 55 || item.temperature < 0 || item.voltage > 250) {
            statusName = '异常'
          }
          item.statusName = statusName
          return item
        })
      },
      changeToTop(list) {
        let errorList = []
        let sucList = []
        errorList = list.filter(item => item.statusName)
        sucList = list.filter(item => !item.statusName)
        return [...errorList, ...sucList]
      },
      getFaultPage () {
        const data = {
          pageNum: '1',
          pageSize: '5'
        }
        request('device/fault/page', data).then(data => {
          let { list } = data
          console.log(list)
          list = list.map(item => {
            item.time = item.createTime.substring(5, 10).split('-')
            item.onlineName = item.online === null || item.online === '0' ? '不在线' : '在线'
            return item
          })
          this.textList = list
        })
      }
    },
    created () {
      // this.linkSocket()
    },
    onLoad () {
      this.initData()
      this.linkSocket()
      this.getFaultPage()
    },
    onReachBottom () {
      console.info('ok')
      Toast.loading({
        mask: true,
        message: '加载中...'
      })
      this.pageNum++
      this.initData(`${this.pageNum}`)
    }
  }
</script>
<style>
	.vanpopup {
		width: 80%;
	}
</style>
<style scoped>
  .orage {
    background: orange;
  }
  .green{
    background: green;
  }
  .grey {
    background: grey;
  }
	.popup {
		line-height: 30px;
		background: #201F2D;
		padding: 0 15px;
	}
	.swiper {
		height: 50px;
		flex: 1;
	}
	.form {
		position: relative;
	}
	button:after {
		border: none;
	}
	button {
		padding: 0;
		border-radius: 0;
	}
  .tab-color {
    background: #2E303F;
  }
  .guanli {
    width:100%;
    height: 100%;
    background: #201F2D;
    z-index: 999;
  }
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #2E303F;
    height: 50px;
		z-index: 999;
  }
  .town {
    display: flex;
    height: 50px;
    align-items: center;
    z-index: 999;
  }
  .town-name {
    color: #ffffff;
    font-size: 15px;
  }
  .town-select {
    color: #000;
    font-size: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* border: .5px solid rgb(169, 169, 169);  */
    width: 100px;
    padding: 0 5px;
  }
  .guandong {
    padding: 0 15px;
    padding-top: 60px;
    display: flex;
    align-items: center;
  }
  .guandong-icon {
    margin-right: 5px;
  }
  .guandong-cont {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    color: #00CCCC;
  }
  .guandong-span {
    color: #00CCCC;
    font-size: 15px;
  }
  .info {
    box-sizing: border-box;
    padding: 0 15px;
		padding-bottom: 50px;
		background: #201F2D;
  }
  .info-item {
    position: relative;
    padding-bottom: 15px;
    width: 100%;
  }
  .info-item-cont {
    border-radius: 5px;
    border: .5px solid rgb(169, 169, 169);
    background: #282C37;
  }
  .cont-header {
		display: flex;
		justify-content: space-between;
    font-size: 15px;
    color: #ffffff;
    padding: 8px;
  }
  .cont-center {
    display: flex;
    justify-content: space-around;
    padding: 8px;
  }
  .center-item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .center-item-name {
    color: #fff;
    font-size: 18px;
    font-weight: bold;
  }
  .center-item-status {
    color: #00FF33;
    font-size: 18px;
  }
  .cont-footer {
    display: flex;
    padding: 8px;
  }
  .footer-item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 8px;
  }
  .footer-item-name {
    color: #fff;
    font-size: 15px;
    font-weight: bold;
  }
  .footer-item-status {
    color: rgba(0, 204, 204, 0.498039215686275);
    font-size: 15px;
  }
  .footer-item-img {
    width: 16px;
    height: 16px;
  }
	.footer-item-color {
		color: #00FF33;
		font-size: 15px;
	}
  .yuan {
    width: 16px;
    height: 16px;
    border-radius: 50%;
  }
  .red {
    background: #DF211A;
  }
  .green {
    background: #00FF33;
  }
  .zhi {
    width: 15px;
    height: 15px;
    position: absolute;
    top: 8px;
    left: -15px;
  }
</style>