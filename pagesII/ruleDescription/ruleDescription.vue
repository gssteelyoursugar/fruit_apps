<template>
	<view class="rule-container">
		<view class="rule-item" v-for="(item,index) of agreeList" :key="index">
			<u-cell-item :title="item.title" bg-color="#ffffff" @click="detail(item.id)" :border-bottom="index === 2 ? false : true"></u-cell-item>
		</view>
	</view>
</template>

<script>
	import {
		listing2,
	} from '../../api/api.js'
	import {
		getAgreeList
	} from '../../api/request.js'
	export default {
		data() {
			return {
				agreeList: []
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			getList() {
				listing2(getAgreeList).then(res => {
					let list = res.data.data
					let arr = []
					let ids = ["1319827321417515008", "1319827163120287744", "1304408017931272192"]
					list.forEach((item => {
						let idx = ids.indexOf(item.id)
						if (idx !== -1) {
							arr.push(item)
						}
					}))
					this.agreeList = arr
				})
			},

			detail(id) {
				uni.navigateTo({
					url: "../../pagesIII/serviceAgreement/serviceAgreement?id=" + id
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		background-color: rgba(245, 245, 245, 1);
	}
	.rule-container {
		margin-top: 20rpx;
		
	}
</style>
