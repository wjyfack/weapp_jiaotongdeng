<template>
	<div class="login">
		<div class="header">Axlab</div>
		<div class="container">
			<van-field
				placeholder="请输入帐号"
				left-icon="contact"
				class="field"
				@change="getUser"
			/>
			<van-field
				placeholder="请输入密码"
				left-icon="notes-o"
				class="field"
				type="password"
				@change="getPwd"
			/>
			<form report-submit="true" class="form" @submit="form_submit">
				<button form-type="submit" class="formid" @click="loginTo">
					<div class="btn_login" >登录</div>
				</button>
			</form>
		</div>
		<div class="footer">BETA</div>
    <van-toast id="van-toast" />
	</div>
</template>

<script>
import { request } from '@/utils/request'
import Toast from 'vant-weapp/dist/toast/toast'
import form from '@/mixins/form'
export default {
  config: {
    navigationBarTitleText: '登录',
    usingComponents: {
      'van-field': 'vant-weapp/dist/field/index',
      'van-toast': 'vant-weapp/dist/toast/index'
    }
  },
  mixins: [form],
  data () {
    return {
      login: {
        user: '',
        pwd: '',
        wxCode: ''
      }
    }
  },
  mounted () {
  	this.getUserInfo()
  },
  methods: {

    getPwd (e) {
      const { detail } = e.mp
      this.login.pwd = detail
    },
    getUser (e) {
      const { detail } = e.mp
      this.login.user = detail
    },
    loginTo () {
    // console.log(this.login, this.$router)

      const { user, pwd } = this.login
      if (!user) {
        Toast('请输入用户名')
        return ''
      }
      if (!pwd) {
        Toast('请输入密码')
        return ''
      }
      const data = {
        loginName: user,
        loginPwd: pwd,
        wxCode: this.wxCode
      }
      console.log(data)
      request('manager/login', data).then(info => {
        this.$store.commit('set_userInfo', info)
        this.$store.commit('set_token', info.id)
        console.log(this.$store.state)
        this.$router.replace(`./guanli`)
      })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: (res) => {
        	console.log(res)
        	this.wxCode = res.code
          // wx.getUserInfo({
          //   success: (res) => {
          //     this.userInfo = res.userInfo
          //   }
          // })
        }
      })
    }
  }
}
</script>
<style>
.form {
	margin-top: 30px;
}
.btn_login {
	border-radius: 5px;
	width: 100%;
	font-size: 15px;
	color: #ffffff;
	height: 45px;
	line-height: 45px;
  background-color: rgba(0, 204, 204, 0.8);
	text-align: center;
}
button:after {
	border: none;
}
button {
	padding: 0;
	border-radius: 0;
}
</style>
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
	.login {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: space-between;
		background: #201F2D;
		flex-direction: column;
	}
	.field {
		border-radius: 5px;
		margin-bottom: 15px;
	}
	.header {
		font-size: 48px;
		font-weight: 800;
		color: #06A9AC;
		padding-top: 30px;
		text-align: center;
	}
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100%;
		padding: 0 30px;
		box-sizing: border-box;
	}
	
	.footer {
		display: flex;
		font-size: 12px;
		font-weight: 650;
		justify-content: center;
		color:rgba(0, 204, 204, 0.2);
		padding-bottom: 15px;
	}
</style>