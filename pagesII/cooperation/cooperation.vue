<template>
	<view>
		<view class="cooperation-container">
			<view class="content">
				<image class="logo" src="../../static/images/selection2.png"></image>
				<view class="text-area">
					<text class="title">开放</text>
					<text class="title">融合</text>
					<text class="title">发展</text>
					<text class="title">共享</text>
					<text class="title">共赢</text>
				</view>
			</view>
			<view class="text-area-box">
				<view class="text-area2">
					<image src="../../static/images/email.png" mode="" class="email"></image>
					<text class="title-em">圈果邮箱</text>
					<text class="title">zgqgpt@163.com</text>
				</view>
				<view class="text-area2" @click="goTel">
					<image src="../../static/images/phone.png" mode="" class="phone"></image>
					<text class="title-em">果叔电话</text>
					<text class="title">0771-5633659</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			goTel() {
				uni.makePhoneCall({
					// 手机号
					phoneNumber: '0771-5633659',
					// 成功回调
					success: (res) => {},
					// 失败回调
					fail: (res) => {}

				});
			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		background-color: #fff;
	}


	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.logo {
			height: 340rpx;
			width: 340rpx;
			margin-top: 100rpx;
			margin-left: auto;
			margin-right: auto;
			margin-bottom: 12rpx;
		}

		.text-area {
			display: flex;
			justify-content: start;
			
			.title {
				margin-right: 10rpx;
				font-size: 32rpx;
				color: #393939;
				font-weight: 400;
			}
		}
	}

	.text-area-box {
		margin-left: 110rpx;
		margin-top: 128rpx;

		.text-area2 {
			display: flex;
			justify-content: start;
			margin-top: 50rpx;

			.email {
				height: 48rpx;
				width: 48rpx;

			}

			.phone {
				height: 48rpx;
				width: 34rpx;
				margin: 0 7rpx;


			}

			.title-em {
				font-size: 32rpx;
				font-weight: bold;
				color: #393939;
				margin: 0 36rpx;
			}

			.title {
				margin-right: 10rpx;
				font-size: 32rpx;
				color: #393939;
				font-weight: 400;
			}
		}
	}
</style>
