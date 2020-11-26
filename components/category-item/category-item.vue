<template>
	<view class="category-wrapper">
		<view class="cate-bg">
			<image :src="imgUrl" class="tui-my-bg" mode="widthFix"></image>
		</view>
		<view class="cate-content-box">
			<view class="cate-content-item">
				<view class="cate-wrapper" v-for="(item,index) in list" :key="index">
					<view class="item-wrapper" @tap="gotoList(item.id)">
						<image :src="item.url" mode="aspectFill" class="item-img"></image>
						<view class="item-info">
							<text class="info-tag">{{item.lableName}}</text> <text class="info-text">{{item.name}}</text>
							<view class="info-price">
								<view class="">
									<view class="info-limit-price">
										<text class="text-color1">限量价</text>
										<text class="text-color2">￥</text>
										{{ApproveStatus === 1?item.platformClientPrice:'***'}}<text style="color: #FF5600;font-size: 24rpx;font-weight: 400;">元</text><text
										 class="text-color">/件</text>
									</view>
								</view>
								<image src="../../static/images/shop_cart.png" mode="aspectFill" class="shop-car"></image>
								<!-- <view>购物车</view> -->
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "category-item",
		props: {
			list: {
				type: Array,
				default: []
			},
			imgUrl: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				ApproveStatus: 1,
			};
		},
		methods: {
			gotoList(id){
				log(id)
				uni.navigateTo({
					url:'../../pagesIII/productDetail/productDetail?id=' + id
				})
			},
		}
	}
</script>

<style lang="less">
	page {
		background-color: #fff;
	}
	.category-wrapper {
		.cate-bg {
			position: relative;

			image {
				width: 100%;
				height: 334rpx !important;
				display: block;
			}
		}

		.cate-content-box {
			border-radius: 60rpx 60rpx 0 0;
			position: relative;
			background-color: #fff;
			margin-top: -60rpx;

			.cate-content-item {
				padding: 30rpx;
				overflow: hidden;

				.cate-wrapper {
					border-bottom: 1rpx solid #e5e5e5;

					&:last-child {
						border-bottom: none;
					}

					.item-wrapper {
						display: flex;
						padding: 32rpx 0;

						.item-img {
							width: 150rpx;
							height: 150rpx;
							display: block;
							margin-right: 10rpx;
							background: #eee;
							border-radius: 6rpx;
						}

						.item-info {
							flex: 5;

							.info-tag {
								/* 渐变色 */
								background-image: linear-gradient(to right, #00C94A, #00AC3F);
								margin-right: 10rpx;
								padding: 0 10rpx;
								border-radius: 15rpx 0 15rpx 0;
								color: #fff;
								font-size: 24rpx;
							}

							.info-text {
								font-size: 28rpx;
								color: #333;

							}

							.info-price {
								display: flex;
								justify-content: space-between;
								align-items: center;
								margin-top: 30rpx;


								.info-limit-price {
									color: #FF5600;
									font-size: 28rpx;
									font-weight: bold;

									.text-color1 {
										color: #555;
										font-size: 24rpx;
										font-weight: normal;
										margin-right: 6rpx;
									}

									.text-color2 {
										color: rgba(255, 86, 0, 1);
										font-size: 16rpx;
									}

									.text-color {
										color: #B6B6B6;
										font-size: 20rpx;
									}
								}

								.shop-car {
									width: 52rpx;
									height: 52rpx;
									display: block;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
