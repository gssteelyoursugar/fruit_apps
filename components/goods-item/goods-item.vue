<template>
	<view class="">
		<view class="goods-item" v-for="(item,index) of detail" :key="index">
			<view class="item-img">
				<image :src="item.url" mode=""></image> <!-- ../../static/images/goods_img.png -->
			</view>
			<view class="item-title">
				<text class="tag">{{item.lableName}}</text>
				<text class="name">{{item.name}}</text>
			</view>
			<view class="item-desc">{{item.describe}}</view>
			<view class="item-service">
				<text v-for="(itm,idx) of item.goodsType" :key="idx">{{itm.name}}</text>
			</view>
			<view class="item-price-stuff">
				<index-price :isCenter="false" :real_price="item.platformClinetPrice" :line_price="item.marketPrice"></index-price>
				<view class="praise-num">
					<image src="../../static/images/praise.png" mode=""></image>
					<text>{{item.praiseNumber |filterNum}}</text>
				</view>
			</view>
			<view class="item-specification">
				<view class="specification">{{item.specification}}</view>
				<view class="deal-price">
					<text>成交</text>{{item.total | filterNum}}<text>元</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			detail: {
				type: Array,
				default: []
			}
		},
		data() {
			return {

			};
		},

	}
</script>

<style lang="less" scoped>
	.goods-item {
		width: 344rpx;
		background: #fff;
		border: 1px solid #f5f5f5;
		box-shadow: 0 0 10rpx 0 #f5f5f5;
		border-radius: 16rpx;
		overflow: hidden;
		padding-bottom: 20rpx;
		margin-bottom: 20rpx;

		.item-img {
			image {
				width: 344rpx;
				height: 332rpx;
			}
		}

		.item-title {
			padding: 10rpx;

			.tag {
				border-radius: 16rpx 2rpx 16rpx 2rpx;
				background: linear-gradient(to right, #00BC45, #00C52A);
				color: #fff;
				font-size: 20rpx;
				font-weight: 400;
				padding: 0 8rpx;

			}

			.name {
				margin-left: 10rpx;
				font-weight: 400;
				font-size: 28rpx;
				color: #333;
			}
		}

		.item-desc {
			color: #7F7F7F;
			font-size: 20rpx;
			line-height: 30rpx;
			padding: 0 10rpx;
		}

		.item-service {
			display: flex;
			padding: 14rpx 10rpx;

			text {
				display: inline-block;
				height: 30rpx;
				line-height: 26rpx;
				font-size: 20rpx;
				color: #FF7709;
				margin-right: 6rpx;
				border: 1px solid #FF7709;
				border-radius: 40rpx;
				padding: 0 8rpx;
			}
		}

		.item-price-stuff {
			display: flex;
			padding: 0 10rpx;
			justify-content: space-between;
			align-items: baseline;
			margin: 10rpx 0;


			.praise-num {
				display: flex;
				align-items: center;

				image {
					width: 20rpx;
					height: 20rpx;
				}

				text {
					color: #B6B6B6;
					font-size: 20rpx;
					font-weight: 500;
					margin-left: 4rpx;
				}
			}
		}

		.item-specification {
			padding: 0 10rpx;
			display: flex;
			justify-content: space-between;
			align-items: baseline;

			.specification {
				color: #B6B6B6;
				font-size: 20rpx;
				font-weight: 400;
			}

			.deal-price {
				color: #FF7709;
				font-size: 20rpx;
				font-weight: 500;

				text {
					color: #B6B6B6;
				}
			}
		}
	}
</style>
