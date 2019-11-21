<template>
	<div>
		<van-popup class="pop" @close="close" v-model="myshow" position="bottom" :style="{ height: '60%' }">
            <div class="imgs">
                <img :src="'http://localhost:3000' + detail.imgurl" alt="">
                <div>
                    <p></p>
                    <p></p>
                </div>
            </div>
            <div class="count">
                <span>购买数量</span>
                <div class="btns">
                    <button @click="reduce">-</button>
                    <span>{{count}}</span>
                    <button @click="add">+</button>
                </div>
            </div>
            <div class="color box">
                <h3>颜色</h3>
                <ul>
                    <li 
                    v-for="(item, index) in color" 
                    :key="index" 
                    :class="{'active': item == colorTitle}" 
                    @click="changeColor(item)"
                    >{{item}}</li>
                </ul>
            </div>
            <div class="size box">
                <h3>内存</h3>
                <ul>
                    <li 
                    v-for="(item, index) in size" 
                    :key="index"
                    :class="{'active': item == sizeTitle}" 
                    @click="changeSize(item)"
                    >{{item}}</li>

                </ul>
            </div>
            <van-goods-action>
				<van-goods-action-icon  :text="'￥'+ count * detail.price"/>
				<van-goods-action-button type="warning" text="加入购物车" @click="addCart"/>
				<van-goods-action-button type="danger" text="立即购买"/>
			</van-goods-action>
        </van-popup>
	</div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);
export default {
    data() {
        return {
            // show: false
            myshow: this.show,
            count: 1,
            color: ["红色", "黑色", "白色", "金色"],
            size: ["16G", "32G"],
            colorTitle: "",
            sizeTitle: "",
        }
    },
    methods: {
        close() {
            console.log('close')
            this.$emit('hide', false)
        },
        reduce() {
            if (this.count == 1) return;
            this.count--
        },
        add() {
            this.count++
        },
        addCart() {
            // 必须选中一个颜色和一个内存
            if (!this.colorTitle || !this.sizeTitle) {
                Toast.fail('必须选择产品规格');
                return;
            }
            // 如果用户没有登录，强制跳到登录页
            let userid = localStorage.getItem('id')
            if (!userid) {
                alert("请登录")
                this.$router.push('/login')
            }
            let goodsid = this.detail._id;
            let goodsnum = this.count
            this.$http.post('/api/cartadd', {
                userid: userid,
                goodsid: goodsid,
                goodsnum: goodsnum
            }).then(res => {
                console.log(res)
                if (res.data.status == 1) {
                    this.$router.push('/index/cart')
                }
            })
        },
        changeColor(color) {
            this.colorTitle = color
        },
        changeSize(size) {
            this.sizeTitle = size
        }
    },
    props: ["show", "detail"],
    watch: {
        show(newVal,oldVal) {
            console.log(newVal)
            console.log('show改变了')
            this.myshow = newVal
        }
    }
};
</script>

<style lang="less" scoped>
.pop {
    padding: 10px;
}
.imgs {
    display: flex;
    img {
        width: 100px;
        height: 100px;
        margin-right: 20px;
    }
}
.count {
    display: flex;
    justify-content: space-between;
    .btns {
        display: flex;
        span {
            width: 30px;
        }
    }
}
.box {
    ul {
        display: flex;
        flex-wrap: wrap;
        li {
            padding: 10px 20px;
            background-color: #ccc;
            margin-right: 20px;
            margin-bottom: 10px;
            &.active {
                border: 1px solid red;
            }
        }
    }
}
</style>