<template>
	<div class="login">
		<div class="header">{{ userInfo.loginName }}</div>
		<div class="container">
			<van-field
				placeholder="请输入旧密码"
				left-icon="envelop-o"
				type="password"
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
			<div class="btn_login" @click="loginTo">确认</div>
		</div>
		<van-toast id="van-toast" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { request } from '@/utils/request'
import Toast from 'vant-weapp/dist/toast/toast'
export default {
  config: {
    navigationBarTitleText: '修改密码',
    usingComponents: {
      'van-field': 'vant-weapp/dist/field/index'
    }
  },
  data () {
    return {
      login: {
        user: '',
        pwd: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
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
    	if (this.login.user == '') {
    		Toast('请输入旧密码')
    		return ''
    	}
    	if (this.login.pwd == '') {
    		Toast('请输入密码')
    		return ''
    	}
    	const data = {
    		id: this.userInfo.id,
        oldPwd: this.login.user,
        newPwd: this.login.pwd
      }
			request('manager/pwd/update', data).then(data => {
				Toast('操作成功')
				setTimeout(() => {this.$router.replace(`./login`)}, 2000)
			})
    }
  }
}
</script>
<style>
.btn_login {
	border-radius: 5px;
	width: 100%;
	font-size: 15px;
	color: #ffffff;
	height: 45px;
	line-height: 45px;
  background-color: rgba(0, 204, 204, 0.8);
	margin-top: 30px;
	text-align: center;
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