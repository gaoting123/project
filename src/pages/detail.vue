<template>
	<div>
		<van-nav-bar title="标题" left-arrow @click-left="back"/>
		<div class="main">
			<div class="imgs">
				<img :src="'http://localhost:3000' + detail.imgurl" alt>
			</div>
			<div class="detail">
				<p>{{detail.title}}</p>
				<p>￥{{detail.price}}</p>
			</div>
			<div>
				<van-tabs v-model="activeName">
					<van-tab title="商品详情" name="a">内容 1</van-tab>
					<van-tab title="买家口碑" name="b">内容 2</van-tab>
				</van-tabs>
			</div>
		</div>
		<div class="footer">
			<van-goods-action>
				<van-goods-action-icon  text="￥1999"/>
				<van-goods-action-button type="warning" text="加入购物车" @click="showProps"/>
				<van-goods-action-button type="danger" text="立即购买"/>
			</van-goods-action>
		</div>
        <props :show="show" @hide="hide" :detail="detail"></props>
	</div>
</template>

<script>
import props from '../components/detail/props'
export default {
	data() {
		return {
            activeName: "a",
            detail: "",
            show: false
		};
    },
    components: {
        props
    },
    methods: {
        hide(bol) {
            this.show = bol
        },
        showProps() {
            this.show = true
        },
        back() {
            
            // this.$router.back()
            this.$router.go(-1)
        }
    },
    created() {
        console.log(this)
        // ?aaa=aaa&bbb=bbb
        let id = this.$route.query.id
        this.$http.get("/api/goodsinfo?id=" + id).then(res => {
            console.log(res)
            this.detail = res.data.data
        })
    }
};
</script>

<style scoped>
</style>