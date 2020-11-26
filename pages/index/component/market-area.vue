<template>
	<view class="market-area-container">
		<view class="sales-part">
			<view class="limit-area">
				<view class="fruit-title">
					<view class="title-content">限量批</view>
					<u-count-down :timestamp="86400" :show-border="true" font-size="28" separator-color="#FF6701" bg-color="#FF6701"
					 color="#fff" border-color="#FF6701"></u-count-down>
				</view>
				<view class="fruit-wrap">
					<view class="item-content" v-for="item of 2" :key="item">
						<view class="content-img">
							<image src="../../../static/images/fruit_preload.png" mode=""></image>
						</view>
						<view class="content-text">
							<index-price :real_price="12" :line_price="12" :specification="specification"></index-price>
						</view>
					</view>
				</view>
			</view>
			<view class="presale-area">
				<view class="fruit-title">
					<view class="title-content">新品上市</view>
					<view class="title-tag">抢鲜市场<u-icon name="arrow-right" color="#fff" size="24"></u-icon></view>
				</view>
				<view class="fruit-wrap">
					<view class="item-content" v-for="item of 2" :key="item">
						<view class="content-img">
							<image src="../../../static/images/fruit_preload.png" mode=""></image>
						</view>
						<view class="content-text">
							<index-price :real_price="12" :line_price="12" :specification="specification"></index-price>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="rank-part">
			<view class="rank-item" v-for="item of 4" :key="item">
				<view class="item-title">销量排行</view>
				<view class="item-desc">跟榜买 不愁卖</view>
				<view class="item-content">
					<image src="../../../static/images/fruit_preload.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			limit: {
				type: Array
			},
			presell: {
				type: Array
			},
		},
		data() {
			return {
				specification: "一件约5斤",
			}
		},
		methods: {}
	}
</script>

<style lang="less" scoped>
	page {
		background: #f8f8f8;
	}

	.market-area-container {
		background: #fff;
		margin: 0 20rpx;
		padding: 20rpx;
		border: 1px solid #f5f5f5;
		box-shadow: 0 0 10rpx #f5f5f5;
		border-radius: 16rpx;

		.sales-part {
			display: flex;
			padding-bottom: 24rpx;
			border-bottom: 1px solid #f5f5f5;

			.limit-area,.presale-area {
				width: 50%;

				.fruit-title {
					display: flex;
					font-size: 36rpx;
					color: #0E0E0E;
					padding-left: 10rpx;
					align-items: center;
					
					
					.title-content {
						margin-right: 20rpx;
						
					}
					.title-tag{ 
						display: flex;
						font-size: 24rpx;
						color: #fff;
						font-weight: 400;
						border-radius: 2rpx 20rpx 2rpx 20rpx;
						background: linear-gradient(to right, #FF6500,#FF7709);
						padding: 0 4rpx 0 10rpx;
						align-items: center;
						line-height: 20rpx;
						height: 40rpx;
					}
				}

				.fruit-wrap {
					display: flex;
					.item-content {
						margin: 0 6rpx;
						.content-img {
							image {
								width: 156rpx;
								height: 156rpx;

							}
						}

						.content-text {}
					}
				}
			}
			
			.presale-area {
				.fruit-title {
					justify-content: center;
				}

			}

		}
		
		.rank-part {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-top: 24rpx;

			.rank-item {
				text-align: center;
				.item-title {
					font-size: 32rpx;
					color: #000000;
					
				}
				.item-desc {
					font-size: 24rpx;
					color: #B6B6B6;
					
				}
				.item-content {
					image {
						width: 156rpx;
						height: 156rpx;
					}
				}
			}
		}
	}
</style>
