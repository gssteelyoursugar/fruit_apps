<template>
	<view class="container" :style="{paddingTop: navHeight + 'px'}">
		<!-- 适配性header -->
		<view class="index-bg" :style="{opacity: bgOpacity}">
			<image src="../../static/images/index_bg.png" :style="{height: statusHeight <= 20 ?'318rpx' : '338rpx'}" mode="aspectFill"></image>
		</view>
		<view class="index-header-box" :style="{ height: navHeight + 'px', background: 'rgba(0,197,42,' + opacity + ')' }">
			<view class="index-header" :style="{ marginTop: statusHeight + 'px',height: boxHeight + 'px' }">
				<view class="index-left " @click="scanCode">
					<image src="../../static/images/sceen.png" mode="aspectFit" class="index-left-saoma"></image>
				</view>
				<view class="index-mid">
					<image src="../../static/images/logo.png" mode="aspectFit" class="index-logo"></image>
				</view>
				<view class="index-left"></view>
			</view>
		</view>
		<view class="weather-container" style="margin: 10rpx 0 20rpx;" :style="{opacity: canSee}">
			<view class="weather-tui-flex ">
				<view class="weather-tui-left ">
					<image src="../../static/images/dingwei@2x.png" mode="aspectFit" class="weather-dingwei"></image>
					<text class="weather-city" style="font-size: 24rpx;" v-if="address&& ApproveStatus === 1">配送至{{address}}</text>
					<text class="weather-city" v-if="ApproveStatus !== 1">配送至</text>
					<view class="weather-tui-class" v-if="ApproveStatus !== 1 && showAuthTips">
					</view>
					<view class="weather-tui-class2" v-if="ApproveStatus !== 1 && showAuthTips">
						请认证店铺信息
					</view>
				</view>
				<view class="weather-tui-right">
					<!-- v-if="ApproveStatus === 1" -->
					<!-- <image src="../../static/images/tianqi@2x.png" mode="aspectFit" class="weather-yun-icon"></image> -->
					<!-- <text class="iconfont icon-yun city"></text> -->
					<text>{{weatherObj.weather}}</text><text>{{weatherObj.temperature}}℃</text>
				</view>
			</view>
		</view>
		<!-- 轮播图 -->
		<qgSwiper :swiperList="swiperList"></qgSwiper>
		<!-- 配送标准 -->
		<standardList :standardList="standardList"></standardList>
		<!-- 金刚区 -->
		<category :kkarea="kkarea" :cateList="cateList"></category>
		<!-- 示告区 -->
		<msgSwiper :msgList="msgList"></msgSwiper>
		<!-- 营销专区 -->
		<marketArea :limit="limit" :presell="presell"></marketArea>

		<!-- 吸顶推荐 -->
		<view class="sticky-bar" :style="{top: navHeight + 'px'}">
			<view class="sticky-item" v-for="(item,index) of recom" :key="item.id" @click="clickItem(index)">
				<view class="item-title" :class="{'active-title': curIndex === index}">{{item.title}}</view>
				<view class="item-desc" :class="{'active-item': curIndex === index}">{{item.desc}}</view>
			</view>
		</view>
		<goodsList :goodsList="goodsList"></goodsList>

		<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />
	</view>
</template>

<script>
	import qgSwiper from './component/gq-swiper.vue'
	import standardList from './component/standard-list.vue'
	import category from './component/category.vue'
	import msgSwiper from './component/msg-swiper.vue'
	import marketArea from './component/market-area.vue'
	import goodsList from '../../components/goods-list/goods-list.vue'
	import {
		mapMutations
	} from 'vuex';
	import {
		listing,
		publicing,
		listing2
	} from '../../api/api.js'
	//请求地址
	import {
		getIndex,
		getClassify,
		url,
		postActivity,
		getNewsAll,
		getActivity,
		getClient
	} from '../../api/request.js'
	import amap from '../../common/amap-wx.js';
	export default {
		components: {
			qgSwiper,
			standardList,
			category,
			msgSwiper,
			marketArea,
			goodsList
		},
		data() {
			return {
				canSee: 1,
				opacity: 0.3, // 头部背景透明度
				bgOpacity: 1, // 头部背景图透明度
				statusHeight: 20, //状态栏高度
				boxHeight: 44, //导航栏内容高度
				navHeight: 64, //导航栏整体高度 （状态栏高度 + 导航栏内容高度）
				swiperList: [], // 轮播
				standardList: [], // 标准
				kkarea: [], // 金刚区
				cateList: [], // 水果分类
				msgList: [], // 示告区
				limit: [], //限量批
				presell: [], //预售
				goodsList: [], //推荐
				address: '', //用户地址
				ApproveStatus: 0, //用户验证状态
				showAuthTips: true, // 控制显示 验证提示
				weatherObj: {
					weather: "",
					temperature: ""
				},
				key: '0619951c6f113f019b42f0bdc2a0e580', //高德获取天气key
				recom: [{
						id: 1,
						title: "推荐好货",
						desc: "猜你喜欢"
					},
					{
						id: 2,
						title: "实时鲜果",
						desc: "今天辛苦了"
					},
					{
						id: 3,
						title: "场地直供",
						desc: "一手货源"
					},

				],
				curIndex: 0,
				status: 'loadmore',
				iconType: 'flower',
				loadText: {
					loadmore: '上拉或点击加载更多',
					loading: '努力加载中',
					nomore: '实在没有了'
				}

			};
		},
		methods: {
			clickItem(idx) {
				this.curIndex = idx
				this.getRecomList()
			},
			//点击扫描
			scanCode() {
				uni.scanCode({
					scanType: ['barCode'],
					success: function(res) {
						uni.showModal({
							title: '提示',
							content: `条形码类型：${res.scanType}
									   条形码内容：${res.result}`,
							success: function(res) {
								if (res.confirm) {} else if (res.cancel) {}
							}
						});
					}
				});
			},
			// 获取用户验证信息
			getMerchants() {
				let setdata = uni.getStorageSync('usermen') //Token
				let data = {
					token: setdata
				}
				listing(getClient, data)
					.then((res) => {
						///登录成功后显示去认证店铺，如果已认证，显示已认证店铺
						this.ApproveStatus = res.data.data.approveStatus //获取电偶状态码，0未认证，1已认证，2拒绝
						let cityCode = res.data.data.address
						this.amapPlugin = new amap.AMapWX({
							key: this.key,
						});
						this.amapPlugin.getWeather({
							city: '440600', //cityCode
							success: (wres) => {
								this.weatherObj.temperature = wres.liveData.temperature
								this.weatherObj.weather = wres.liveData.weather
							}
						});
					})
					.catch((err) => {
						log(err)
					})

			},

			// 获取首页数据
			getIndexData() {
				let setdata = uni.getStorageSync('usermen')
				let data = {
					pageNo: '1',
					pageSize: '1000',
					token: setdata
				}
				listing(getIndex, data) //请求首页数据接口
					// listing(getIndex,data) //单发请求
					.then((res) => {
						this.swiperList = res.data.data.WxIndexViewpager
						this.standardList = res.data.data.WxPostersBottomAdve
						this.kkarea = res.data.data.WxTopNavigationBar
						this.cateList = res.data.data.HotVarieties
						this.msgList = res.data.data.WxPublicMsg
						this.limit = res.data.data.WxActivityList
						this.presell = res.data.data.NewGoods.goods
					})
					.catch((err) => {
						console.log(err)
					})
			},
			getRecomList() {
				let data = {
					pageNo: 1,
					pageSize: 10,
					indexClassify: this.curIndex + 1 || 1,
				}
				listing(getClassify, data)
					.then((res) => {
						console.log(res)
						this.goodsList = res.data.data.data
					})
					.catch((err) => {
						log(err)
					})
			},

		},
		onLoad() {
			this.getIndexData()
			this.getRecomList()
			setTimeout(()=>{
				this.status = 'nomore'
			})
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
			let navHeight = statusBarHeight + buttonHeight + top - statusBarHeight //状态栏+导航栏的高度（页面初始高度）
			this.boxHeight = navHeight - statusBarHeight //导航栏高度
			this.navHeight = navHeight
			// #endif	

			this.amapPlugin = new amap.AMapWX({
				key: this.key,
			});
			this.amapPlugin.getWeather({
				city: '440600', //cityCode
				success: (wres) => {
					console.log(wres)
					this.weatherObj.temperature = wres.liveData.temperature
					this.weatherObj.weather = wres.liveData.weather
				}
			});
			setTimeout(() => {
				this.showAuthTips = false
			}, 5000)
		},
		onPageScroll(e) {
			if (this.statusHeight > 20) {
				if (e.scrollTop < 20) {
					this.canSee = 1 - (e.scrollTop / 10)
					this.opacity = 0.3 + (e.scrollTop / 50)
				}
				if (e.scrollTop < 70) {
					this.bgOpacity = 1 + (e.scrollTop / 100)
				}
				if (e.scrollTop >= 70) {
					this.opacity = 1
					this.canSee = 0
				}
				if (e.scrollTop > 70) {
					this.bgOpacity = 0
				}
			} else {
				if (e.scrollTop < 14) {
					this.canSee = 1 - (e.scrollTop / 10)
					this.opacity = 0.3 + (e.scrollTop / 50)
				}
				if (e.scrollTop < 40) {
					this.bgOpacity = 1 + (e.scrollTop / 100)
				}
				if (e.scrollTop >= 40) {
					this.opacity = 1
					this.canSee = 0
				}
				if (e.scrollTop > 40) {
					this.bgOpacity = 0
				}
			}
			if (e.scrollTop === 0) {
				this.opacity = 0
				this.canSee = 1
			}
		},

	}
</script>

<style lang="less" scoped>
	page {
		background: #f8f8f8;
	}

	.container {
		padding-bottom: 30rpx;

		.index-header-box {
			width: 100%;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 995;
			transition: all 400;
			transition: all .3s;

			.index-header {
				width: 100%;
				font-size: 18px;
				line-height: 18px;
				font-weight: 600;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0 30rpx;
				box-sizing: border-box;
			}

			.index-left {
				flex: 1;

				.index-left-saoma {
					width: 40rpx;
					height: 40rpx;
					display: block;
				}

			}

			.index-mid {
				flex: 2;

				.index-logo {
					width: 100%;
					height: 50rpx;
					display: block;
				}
			}
		}

		.weather-container {
			transition: all .3s;

			.weather-tui-flex {
				position: relative;
				/* top: 46px; */
				margin: 0 30rpx;
				display: flex;
				font-size: 28rpx;
				color: #fff;

				.weather-tui-left {
					flex: 3;
					display: flex;
					align-items: center;

					.weather-tui-class {
						position: absolute;
						width: 20rpx;
						height: 20rpx;
						left: 60rpx;
						top: 36rpx;
						transform: rotate(40deg);
						-o-transform: rotate(40deg);
						-webkit-transform: rotate(40deg);
						-moz-transform: rotate(40deg);
						background-color: rgba(0, 0, 0, 0.9);

					}

					.weather-tui-class2 {
						position: absolute;
						left: 30rpx;
						top: 44rpx;
						background-color: rgba(0, 0, 0, 0.9);
						font-size: 24rpx;
						color: #fff;
						border-radius: 24rpx;
						padding: 10rpx 20rpx;
						z-index: 999;
					}

					.weather-city {
						margin-right: 10rpx;
						margin-left: 10rpx;
						font-size: 32rpx;
					}

					.weather-dingwei {
						width: 30rpx;
						height: 40rpx;
						display: block;
						top: -6rpx;
					}

				}

				.weather-tui-right {
					display: flex;
					position: relative;
					flex: 1;
					text-align: right;
					justify-content: flex-end;

					text {
						font-size: 30rpx;
						margin: 0 4rpx;
						font-weight: 500;

					}
				}

			}

		}

		.index-bg {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			z-index: -1;
			transition: all .1s;

			image {
				width: 100%;
				height: 318rpx;
				z-index: -1;
			}
		}

		.sticky-bar {
			position: sticky;
			z-index: 999;
			display: flex;
			align-items: center;
			justify-content: space-around;
			margin: 20rpx 0;
			background: #fff;
			border: 1px solid #f5f5f5;
			// border-radius: 16rpx;
			padding: 20rpx;

			.sticky-item {
				flex: 1;
				text-align: center;

				.item-title {
					color: #000000;
					font-size: 36rpx;
					font-weight: bold;

				}

				.active-title {
					color: #00C52A;
				}

				.item-desc {
					font-size: 28rpx;
					padding: 4rpx 20rpx;
					width: 180rpx;
					margin: 0 auto;
					padding: 4rpx 0;
					border-radius: 40rpx;
					color: #B6B6B6;
					background: transparent;
				}

				.active-item {
					color: #fff;
					background: #00C52A;
				}
			}
		}

		.no-data {
			text-align: center;

		}
	}
</style>
