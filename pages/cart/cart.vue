<template>
	<view class="cart-container">
		<view class="cart-main">
			<u-checkbox-group @change="clickToCheckSingle">
				<view class="goods-container" v-for="(item, index) in lists" :key="item.id" v-if="item.list.length !== 0">
					<view class="goods-type-title">
						<image src="../../static/images/hamig@2x.png" mode=""></image>
						<text>{{item.goodsType}}</text>
					</view>
					<view class="goods-type-content">
						<u-swipe-action :show="itm.show" :index="idx" v-for="(itm, idx) in item.list" :key="itm.id" @click="clickToDel(index,idx)"
						 :options="options" style="width: 34rpx;margin-right: 20rpx;">
							<view class="swipe-goods-wrap">
								<u-checkbox v-model="itm.checked" shape="circle" active-color="#00BC45" :name="itm.id"></u-checkbox>
								<view class="swipe-goods-item">
									<view class="item-img">
										<image src="../../static/images/cart_goods.png" mode=""></image>
									</view>
									<view class="item-detail">
										<view class="detail-title">
											<text class="tag">亲手采购</text>
											八六王哈密瓜B级1.8~2.2公斤/个
										</view>
										<view class="detail-bottom">
											<view class="stuff-left">
												<view class="stuff-left-desc">5斤装</view>
												<index-price :isCenter="false" :real_price="itm.platformClientPrice"></index-price>
											</view>
											<view class="stuff-right">
												<!-- 原本index是用来识别是第几个下标的，但是这样做不能满足需求。 只能将id传过去，才能真正知道点击了哪个 -->
												<u-number-box v-model="itm.number" :min="minNum" :max="maxNum" :index="itm.id" @blur="valChange()" @minus="valChange()" @plus="valChange()"></u-number-box>
											</view>
										</view>
									</view>

								</view>
							</view>
						</u-swipe-action>
					</view>
				</view>
			</u-checkbox-group>
		</view>
		<view class="tab-bar">
			<view class="all-check">
				<u-checkbox shape="circle" active-color="#00BC45" @change="clickToCheckAll" v-model="allCheck"><text style="color: #333;">全选</text></u-checkbox>
			</view>
			<view class="right-count">
				<view class="all-count">
					<view class="pre-text">合计:</view>
					<view class="text">
						<text class="money-unit">¥</text>
						<text class="money-num">{{allPrice || 0}}</text>
						<text class="money-ch-unit" v-if="idsList.length !== 0">元</text>
					</view>
					<view class="suf-text" v-if="idsList.length !== 0">含运费</view>
				</view>
				<view class="buy-btn" v-if="idsList.length !== 0">结算</view>
				<view class="buy-btn no-goods-check" v-else>结算</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				allCheck: false, // 全选
				noChecked: true,
				lists: [{
						id: 1,
						images: 'https://cdn.uviewui.com/uview/common/logo.png',
						goodsType: '水果1',
						list: [
							{
								id: 'q2020811',
								number: 1,
								platformClientPrice: 10.5,
								checked: false,
								show: false,
								imgsrc: '../../static/images/putao1.png',
								shopName: '大葡萄'
							},
							{
								id: 'q2020812',
								number: 2,
								platformClientPrice: 20,
								checked: false,
								show: false,
								imgsrc: '../../static/images/niuyouguo1.png',
								shopName: '大哈密瓜'
							},
						],
					},
					{
						id: 2,
						images: 'https://cdn.uviewui.com/uview/common/logo.png',
						goodsType: '水果2',
						list: [{
							id: 'q2020815',
							number: 1,
							platformClientPrice: 25.8,
							checked: false,
							show: false,
							imgsrc: '../../static/images/putao1.png',
							shopName: '大葡萄'
						}],
					},
					{
						id: 3,
						images: 'https://cdn.uviewui.com/uview/common/logo.png',
						goodsType: '水果3',
						list: [{
							id: 'q2020816',
							number: 2,
							platformClientPrice: 35.8,
							checked: false,
							show: false,
							imgsrc: '../../static/images/niuyouguo1.png',
							shopName: '大哈密瓜'
						},
						{
							id: 'q2020817',
							number: 1,
							platformClientPrice: 0.02,
							checked: false,
							show: false,
							imgsrc: '../../static/images/niuyouguo1.png',
							shopName: '大哈密瓜'
						},
						{
							id: 'q2020818',
							number: 1,
							platformClientPrice: 2.43,
							checked: false,
							show: false,
							imgsrc: '../../static/images/niuyouguo1.png',
							shopName: '大哈密瓜'
						},]
					}
				],
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				minNum: 1,
				maxNum: 10,
				allPrice: 0, //总价
				idsList: [],
			};
		},
		methods: {
			// 单个勾选
			clickToCheckSingle(e) {
				let lists = this.lists
				let target = e
				// console.log(target);
				let selectedNum = 0
				lists.forEach(item=> {
					selectedNum += item.list.length
					item.list.forEach((itm,index)=> {
						let idxs = target.findIndex(im=>{
							return itm.id === im
						})
						if (idxs !== -1) {
							itm.checked = true
						} else {
							itm.checked = false
						}
					})
				})
				if (selectedNum === target.length){
					this.allCheck = true
				}else {
					this.allCheck = false
				}
				this.lists = lists
				this.idsList = target
				this.countMoney()
				// console.log(this.idsList,this.idsList.length)
			},
			// 全选
			clickToCheckAll() {
				this.allCheck = !this.allCheck
				let lists = this.lists
				let arr = []
				if (this.allCheck === false) {
					lists.forEach(item => {
						item.list.forEach(itm => {
							itm.checked = false
							this.$forceUpdate();
						})
					})
					this.idsList = []
					this.lists = lists
				} 
				if (this.allCheck === true) {	
					lists.forEach(item => {
						item.list.forEach(itm => {
							itm.checked = true
							arr.push(itm.id)
							this.$forceUpdate();
						})
					})
					let res = new Set(arr)
					this.lists = lists
					this.idsList = Array.from(arr)
				}
				this.$forceUpdate();
				this.countMoney()
			},
			//左滑 删除
			clickToDel(index, idx) {
				console.log(index,idx)
			},
			// 改变数量
			valChange(e) {
				let {
					value,
					index: f_id
				} = e
				let list = this.lists
				list.forEach((item, index) => {
					let f_index = item.list.forEach((itm, idx) => {
						if (itm.id === f_id) {
							console.log(index, idx, value)
							this.lists[index].list[idx].number = value
						}
					})
				})
				this.countMoney()
				// this.lists[e.custom].list[e.index].number = e.value;
				//计算价格
				// this.jieSuanPrice();
				//更新我的加购单
				// let data = {
				// 	id: this.orderObj[e.custom].list[e.index].id,
				// 	goodsId: this.orderObj[e.custom].list[e.index].goodsId,
				// 	number: this.orderObj[e.custom].list[e.index].number,
				// 	token: setdata
				// };
				// publicing(postUpOrder, data)
				// 	.then(res => {
				// 	})
				// 	.catch(err => {
				// 		log(err);
				// 	});
			},
			countMoney () {
				let allPrice = 0; //总价
				for (let index in this.lists) {
					let oneData = this.lists[index].list;
					for (let indexTwo in oneData) {
						let goodsData = oneData[indexTwo];
						//indexOf 此方法判断数组中是否存在某个值，如果存在返回数组元素的下标，否则返回-1
						if (this.idsList.indexOf(goodsData.id) != -1) {
							//判断选中的商品id数组中是否包含
							//获取单价
							//获取数量
							//两个相乘
							allPrice = allPrice + goodsData.number * goodsData.platformClientPrice;
						}
					}
				}
				let order = this.lists
				this.allPrice = allPrice.toFixed(2) * 1; //保留两位小数toFixed
			}
		}
	}
</script>

<style lang="less">
	.cart-container {
		padding: 20rpx;
		.cart-main {
			margin-bottom: 110rpx;
			width: 100%;

			.goods-container {
				background: #fff;
				margin-bottom: 20rpx;
				border-radius: 16rpx;
				overflow: hidden;
				padding: 0 24rpx;

				.goods-type-title {
					padding: 20rpx 0;
					display: flex;
					align-items: center;
					border-bottom: 1px solid #F5F5F5;

					image {
						width: 44rpx;
						height: 44rpx;
					}

					text {
						color: #393939;
						font-size: 28rpx;
						margin-left: 10rpx;
						font-weight: 500;

					}
				}

				.goods-type-content {

					.swipe-goods-wrap {
						display: flex;
						align-items: center;
						padding: 0 0 18rpx;
						border-bottom: 1px solid #f5f5f5;


						.swipe-goods-item {
							display: flex;

							.item-img {
								width: 170rpx;

								image {
									width: 170rpx;
									height: 170rpx;
								}
							}

							.item-detail {
								flex: 1;
								margin-left: 12rpx;

								.detail-title {
									word-break: break-all;

									.tag {
										border-radius: 16rpx 2rpx 16rpx 2rpx;
										background: linear-gradient(to right, #00BC45, #00C52A);
										color: #fff;
										font-size: 24rpx;
										font-weight: 400;
										padding: 0 8rpx;
										margin-right: 8rpx;

									}

									.content {
										margin-left: 10rpx;
										font-weight: 400;
										font-size: 28rpx;
										color: #333;
									}
								}

								.detail-bottom {
									display: flex;
									align-items: center;
									justify-content: space-between;

									.stuff-left {
										.stuff-left-desc {
											width: 100rpx;
											height: 36rpx;
											line-height: 36rpx;
											text-align: center;
											background: #F5F5F5;
											border-radius: 6rpx;
											color: #666666;
											font-size: 20rpx;
											margin: 14rpx 0;

										}
									}

									.stuff-right {}
								}

							}
						}
					}
				}
			}
		}

		.tab-bar {
			width: 750rpx;
			height: 104rpx;
			background: #fff;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			box-shadow: 0 0 10rpx 0 #e5e5e5;

			.all-check {
				padding-left: 40rpx;
			}

			.right-count {
				display: flex;
					align-items: center;
				.all-count {
					display: flex;
					align-items: baseline;
					.pre-text {
						color: #333333;
						font-weight: 400;
						font-size: 24rpx;
					}
					.text {
						color: #FF5600;
						.money-unit {
							font-size: 24rpx;
							font-weight: 400;
						}
						.money-num {
							font-size: 36rpx;
							font-weight: bold;
							margin: 0 4rpx;
							
						}
						.money-ch-unit {
							font-size: 22rpx;
							font-weight: 400;
						}
					}
					.suf-text {
						color: #888888;
						font-size: 22rpx;
						font-weight: 400;
						margin-right: 32rpx;
					}
					

				}

				.buy-btn {
					width: 240rpx;
					height: 80rpx;
					text-align: center;
					font-size: 32rpx;
					color: #fff;
					background: linear-gradient(to right, #00C52A, #00BC45);
					border-radius: 40rpx;
					line-height: 78rpx;
					margin-right: 24rpx;

				}
				.no-goods-check {
					background: #DDDDDD;
				}

			}
		}
	}
</style>
