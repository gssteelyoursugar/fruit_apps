<template>
	<view class="standard-container">
		<view class="standard-item" v-for="(item,index) in standardList" :key="index">
			<image :src="item.url" mode="aspectFit" class="iconImg icon-right"></image>
			<text>{{item.title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			standardList: {
				type: Array
			}
		},
		data () {
			return {}			
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
	
	.standard-container{
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
		.standard-item {
			display: flex;
			align-items: center;
			text {
				font-size: 24rpx;
				color: #00C52A;
			}
			.icon-right{
				width: 32rpx;
				height: 32rpx;
			}
		}
	}
	.bac {
		/* height: 290rpx; */
		margin: 0 14rpx;
		background-color: #f7f7f7;
		color: #00AC3F;
		position: relative;
	}

	.tui-tag {
		width: 100%;
		/* position: absolute; */
		/* bottom: 16rpx; */
		display: flex;
		justify-content: space-between;
	}

	.icon-right {
		margin-right: 10rpx;
		margin-top: 1rpx;
	}
</style>
