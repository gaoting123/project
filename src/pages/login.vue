<template>
	<div>
		<van-nav-bar title="登录" left-arrow/>
		<div class="main">
			<van-cell-group>
				<van-field
					v-model="uname"
					clearable
					label="用户名"
					placeholder="请输入用户名"
				/>

				<van-field v-model="upwd" type="password" label="密码" placeholder="请输入密码"/>
			</van-cell-group>
            <van-button type="primary" size="large" @click="login">登录</van-button>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			uname: "",
            upwd: "",
            url: ""
		};
	},
	methods: {
        login() {
            this.$http.post("/api/memberlogin", {
                username: this.uname,
                password: this.upwd
            }).then(res => {
                console.log(res)

                localStorage.setItem("id", res.data.data._id)
                this.$router.push(localStorage.getItem('url'))
            })
        }
    },
    beforeRouteEnter (to, from, next) {
        
        console.log(from)
        localStorage.setItem('url', from.fullPath)
        next()
    }
};
</script>

<style scoped>
.main {
	width: 300px;
	margin: 50px auto;
}
</style>