<template>
	<view class="price-container">
		<view class="price-wrap">
			<text class="price-unit">¥</text>
			<text class="price-num">{{real_price}}</text>
			<text class="price-num-unit">/件</text>
			<text class="price-line-throught-num" v-if="line_price != '0'">¥{{line_price}}</text>  <!-- v-if="line_price || line_price != 0" -->
		</view>
		<view class="specification" v-if="specification!==''">一件约重20斤</view>
	</view>
</template>

<script>
	export default {
		name: 'index-price',
		props: {
			real_price: {
				type: [String, Number],
				default: 0
			},
			line_price: {
				type: [String, Number],
				default: 0
			},
			specification: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style lang="less" scoped>
	.price-container {

		.price-wrap {
			display: flex;
			font-family: Microsoft Yahei;
			align-items: baseline;
			justify-content: center;
			line-height: 24rpx;

			.price-unit {
				font-size: 20rpx;
				color: #FF6500;
				font-weight: 400;
			}

			.price-num {
				font-size: 36rpx;
				color: #FF6500;
				font-weight: 800;
				margin: 0 2rpx;
			}

			.price-num-unit {
				color: #B6B6B6;
				font-weight: 400;
				font-size: 20rpx;
			}

			.price-line-throught-num {
				color: #B6B6B6;
				font-weight: 400;
				font-size: 20rpx;
				text-decoration: line-through;
			}
		}

		.specification {
			font-size: 20rpx;
			color: #B6B6B6;
			text-align: center;
		}
	}
</style>
