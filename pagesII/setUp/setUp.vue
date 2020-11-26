<template>
	<view>
		<!--header-->
		<!-- <view class="tui-header-box" :style="{paddingTop: statusHeight+ 'px',height: boxHeight+ 'px'}">
			<view class="tui-icon-box" @tap="back">
				<tui-icon name="arrowleft" :size="30" color="#333"></tui-icon>
			</view>
			<view class="tui-header">设置</view>
		</view> -->
		<!--header-->
		<view class="tui-paddingTop">
			<view class="tui-title">
				WIFI下自动播放视频
				<!-- <switch class="tui-switch" color="rgba(0, 197, 42, 1)" @change="switchChange( $event)"></switch> -->
			</view>
			<ss-switch selColor="#00C52A" v-model="switchValue" @change="switchInput"></ss-switch>
		</view>



		<view class="log-out" @tap="logout">退出登录</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				switchValue: false,
				statusHeight: 20,
				boxHeight: 44,
			}
		},
		onLoad() {
			const res = uni.getSystemInfoSync();
			let {
				statusBarHeight
			} = res
			// #ifndef H5 || APP-PLUS || MP-ALIPAY
			let info = uni.getMenuButtonBoundingClientRect()
			let {
				top,
				bottom
			} = info
			this.statusHeight = statusBarHeight
			let buttonHeight = (bottom - statusBarHeight) + (top - statusBarHeight)
			let navHeight = statusBarHeight + buttonHeight + top - statusBarHeight
			this.boxHeight = navHeight - statusBarHeight
			// #endif

		},
		methods: {
			switchInput(e) {},
			back: function() {
				uni.navigateBack();
			},
			switchChange(e) {},
			logout() {
				uni.removeStorageSync('userIN')
				uni.removeStorageSync('usermen')
				uni.removeStorageSync('StoreStatus')
				uni.removeStorageSync('userIN')
				uni.switchTab({
					url: '../../pages/my/my'
				})
				uni.showToast({
					title: "退出成功",
					icon: 'none'
				})
			}

		}
	}
</script>

<style>
	page {
		background-color: rgba(245, 245, 245, 1);
	}

	.tui-header-box {
		display: flex;
		align-items: center;
		background: #fff;
		font-size: 32rpx;
		color: #393939;
		padding: 0 30rpx;
	}

	.log-out {

		border: 1px solid #fff;
		width: 674rpx;
		margin: 424rpx auto;
		background: #fff;
		padding: 26rpx 0;
		border-radius: 6rpx;
		text-align: center;
		font-size: 36rpx;
		color: #707070;

	}

	.tui-paddingTop {
		margin-top: 10px;
		background: #fff;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 40rpx;
	}

	.tui-title {
		color: #333333;
		font-size: 32rpx;
	}

</style>
