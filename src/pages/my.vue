<template>
	<form report-submit="true" class="form" @submit="form_submit">
    <div class="my">
      <div class="header van-hairline--bottom">
        <div class="header-name">{{ userInfo.loginName }}</div>
        <div class="header-cont">
          <div class="header-cont-ii">普通用户</div>
          <div class="header-cont-text">今日登录<span class="header-cont-color">1</span> 次</div>
        </div>
      </div>
      <div class="group">
        <a href="./reply_pwd" class="group-cell van-hairline--bottom">
          <div class="group-cell-name">帐号管理</div>
          <van-icon name="arrow" color="#00CCCC"/>
        </a>
        <a href="./jianyi" class="group-cell">
          <div class="group-cell-name">反馈建议</div>
          <van-icon name="arrow" color="#00CCCC"/>
        </a>
      </div>
      <div class="group-btn" @click="logout">退出登录</div>
    </div>
    <button form-type="submit" class="formid">
      <van-tabbar :active="active" active-color="#06ACB0" @change="onChange">
        <van-tabbar-item icon="home-o" class="tab-color">设备</van-tabbar-item>
        <van-tabbar-item icon="manager-o" class="tab-color">我的</van-tabbar-item>
      </van-tabbar>
    </button>
  </form>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    config: {
      navigationBarTitleText: '我的',
      usingComponents: {
        'van-icon': 'vant-weapp/dist/icon/index',
        'van-tabbar': 'vant-weapp/dist/tabbar/index',
        'van-tabbar-item': 'vant-weapp/dist/tabbar-item/index'
      }
    },
    data () {
      return {
        active: 1
      }
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    methods: {
      form_submit (e) {
        console.log(e.mp.detail.formId)
      },
      onChange (e) {
        const { detail } = e.mp
        if (detail === 0) {
          this.$router.replace('./guanli')
        } else {
          this.$router.replace('./my')
        }
      },
      logout () {
        this.$store.commit('set_userInfo', {})
        this.$store.commit('set_token', '')
        this.$router.replace('./login')
        wx.closeSocket()
      }
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
		padding: 0;
		border-radius: 0;
	}
  .my {
    width:100%;
    height: 100%;
    background: #201F2D;
    z-index: 999;
  }
  .tab-color {
    background: #2E303F;
  }
  .header {
    padding: 15px;
  }
  .header-name {
    display: flex;
    font-size: 35px;
    font-weight: bold;
    color: #00CCCC;
  }
  .header-cont {
    display: flex;
  }
  .header-cont-ii {
    padding: 0 5px;
    border-radius:  15px;
    background: rgba(102, 204, 153, 1);
    color: #1E2734;
    font-size: 15px;
    margin-right: 5px;
  }
  .header-cont-text {
    font-size: 15px;
    color: #00CCCC;
  }
  .header-cont-color {
    font-size: 15px;
    color: #ffffff;
  }
  .group {}
  .group-cell {
    height: 51px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #282C37;
    padding: 0 15px;
  }
  .group-cell-name {
    color: #00CCCC;
    font-size: 15px;
  }
  .group-btn {
    margin-top: 51px;
    height: 51px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #282C37;
    font-size: 15px;
    color:rgba(0, 204, 204, 0.498039215686275);
  }
</style>