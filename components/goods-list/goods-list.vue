<template>
	<view class="goods-container">
		<view class="half">
			<Item :detail="evenlist"></Item>
		</view>
		<view class="half">
			<Item :detail="oddlist"></Item>
		</view>
	</view>
</template>

<script>
	import Item from '../goods-item/goods-item.vue'
	export default {
		props: {
			goodsList: {
				type: Array,
				default: []
			}
		},
		data() {
			return {

			};
		},
		components: {
			Item
		},
		computed: {
			evenlist() {
				let list = this.goodsList
				if (list.lenght !== 0) {
					let arr = list.filter((item, index) => {
						return (index + 1) % 2 !== 0
					})
					return arr
				} else {
					return []
				}
			},
			oddlist() {
				let list = this.goodsList
				if (list.lenght !== 0) {
					let arr = list.filter((item, index) => {
						return (index + 1) % 2 === 0
					})
					return arr
				} else {
					return []
				}
			}
		}
		
	}
</script>

<style lang="less">
	.goods-container {
		display: flex;
		margin: 0 20rpx;
		flex-wrap: wrap;
		justify-content: space-between;

		.half {

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
		}
	}
</style>
