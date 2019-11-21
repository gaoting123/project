<template>
	<div>
		<div class="header">
			<van-cell-group>
				<van-field v-model="value" placeholder="请输入用户名"/>
			</van-cell-group>
		</div>
        <div class="main">
            <list></list>
        </div>
	</div>
</template>

<script>
import list from '../components/category/list'
export default {
    data() {
        return {
            value: ""
        }
    },
    components: {
        list
    }
};
</script>

<style lang="less" scoped>
.header {
    width: 100%;
    height: 44px;
    background-color: orange;
}
</style>