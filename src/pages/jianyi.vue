<template>
	<div class="jianyi">
    <div class="name">有疑问或建议请发送邮件以下客服邮箱，感谢支持！</div>
		<van-field
				placeholder="请输入邮箱"
				left-icon="envelop-o"
				class="field"
        :value="email"
        disabled
				@change="getEmail"
			/>
    <div class="group-btn" @click="submit">确认</div>
	</div>
</template>

<script>
export default {
  config: {
    navigationBarTitleText: '意见反馈',
    usingComponents: {
      'van-field': 'vant-weapp/dist/field/index'
    }
  },
  data () {
    return {
      email: '773416615@qq.com'
    }
  },
  methods: {
    getEmail (e) {
      // const { detail } = e.mp
      // this.email = detail
      this.email = this.email
    },
		submit() {
			this.$router.back()
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
		height: 100%;
		padding: 0;
		border-radius: 0;
  }
  .name {
    text-align: center;
    font-size: 15px;
    line-height: 20px;
    color: rgba(0, 204, 204, .5);
    padding: 5px 0;
  }
  .jianyi {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: flex-start;
		background: #201F2D;
		flex-direction: column;
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