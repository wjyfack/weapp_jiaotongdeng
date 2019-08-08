<template>
	<form report-submit="true" class="form" @submit="form_submit">

		<div class="detail">
			<div class="header">{{ area}}{{ street }}</div>
			<div class="info">
			<div v-for="item in list" :key="item.deviceId" class="info-item">
				<div class="info-item-cont">
					<div class="cont-header van-hairline--bottom">{{ item.statusName }}</div>
					<div class="cont-center">
						<div class="center-item">
							<div class="center-item-name">温度</div>
							<div class="center-item-status">{{ item.temperature }}℃</div>
						</div>
						<div class="center-item">
							<div class="center-item-name">电流</div>
							<div class="center-item-status">{{ item.electricity }}A</div>
						</div>
						<div class="center-item">
							<div class="center-item-name">漏电流</div>
							<div class="center-item-status">{{ item.leakElectricity }}A</div>
						</div>
					</div>
					<div class="cont-footer-item">
						发生时间：{{ item.createTime }}
					</div>
					<!-- <div class="cont-footer-item">
						复位时间：2019-05-27 20:22
					</div> -->
				</div>
			</div>
      <div v-if="list.length == 0" class="no-item">暂无数据</div>
		  </div>
		</div>
    <van-toast id="van-toast" />
  </form>
</template>

<script>
import Toast from 'vant-weapp/dist/toast/toast'
import { request } from '@/utils/request'
import { statusType } from '@/utils/config'

export default {
  config: {
    navigationBarTitleText: '详情',
    usingComponents: {
      'van-toast': 'vant-weapp/dist/toast/index'
    }
  },
  data() {
    return {
      id: '',
      pageFogNum: '1',
      pageFogSize: '10',
      list: [],
      area: '',
      street: ''
    }
  },
  mounted() {
    const { id, area, street } = this.$route.query
    // console.log(this.$route)
    this.id = id
    this.area = area
    this.street = street
    this.fecthData()
  },
  methods: {
    fecthData(pageNum = '1') {
      const data = {
        deviceId: this.id,
        pageNum,
        pageSize: this.pageFogSize
      }
      request('device/fault/page', data).then(data => {
        const { list } = data
        if (list.length === 0) {
          Toast('没有更多了')
          if (pageNum == 1) {
            this.list = []
          }
        } else {
          const listData = list.map(item => {
            item.statusName = this.toSort(item.status)
            return item
          })
          this.list = [...this.list, ...listData]
          Toast.clear()
        }
      })
    },
    form_submit (e) {
      console.log(e.mp.detail.formId)
    },
    toSort(name) {
      console.log(name)
      for(let i = 0; i < statusType.length; i++) {
        if (statusType[i].value === name) {
          console.log(statusType[i].label)
          return statusType[i].label
        }
      }
    }
  },
  onReachBottom () {
    console.info('ok')
    Toast.loading({
      mask: true,
      message: '加载中...'
    })
    this.pageFogNum++
    this.fecthData(`${this.pageFogNum}`)
  }
}
</script>

<style scoped>
	.form {
		position: relative;
	}
	button:after {
		border: none;
	}
	button {
    height: 100%;
		padding: 0;
		border-radius: 0;
	}
  .no-item {
    font-size: 18px;
    color: #ffffff;
    text-align: center;
    margin-top: 20px;
  }
  .detail {
  width: 100%;
  height: 100%;
  background: #201F2D;
  }
  .header {
		display: flex;
		justify-content: center;
		padding: 10px 0;
    color: #3399CC;
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
    font-size: 15px;
    color: #ffffff;
    padding: 8px;
    display: flex;
    justify-content: flex-start;
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
  .cont-footer-item {
    font-size: 15px;
    line-height: 20px;
    color:#00FFCC;
    display: flex;
    justify-content: flex-start;
    padding-left: 8px;
  }
</style>