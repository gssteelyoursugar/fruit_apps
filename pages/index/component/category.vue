<template>
	<view class="category-container">
		<view class="kkarea-list">
			<view class="kkarea-item  " @tap="hrefKing(item.title,index,item.id)" v-for="(item,index) in kkarea" :key="index">
				<image :src="item.url" mode="widthFix" class="item-img"></image>
				<view class="item-text">{{item.title}}</view>
			</view>
		</view>
		<view class="cate-list">
			<view class="cate-item" @tap="gotoBreed(item.name,item.id)" v-for=" (item,index) in cateList" :key="index">
				<image :src="item.url" mode="widthFix" class="item-img"></image>
				<view class="item-text">{{item.name}}</view>
			</view>
			<view class="cate-item" @tap="gotoGun">
				<image src="../../../static/images/gengduo@3x.png" mode="widthFix" class="item-img"></image>
				<view class="item-text">查看更多</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			kkarea: {
				type: Array
			},
			cateList: {
				type: Array
			},
		},
		data() {
			return {}
		},
		methods: {
			detail() {
				console.log("跳转")
			},
			hrefKing(title,index,id) {
				// let url = "";
				// switch (index) {
				// 	case 0:
				// 		url = "../../pagesII/ImportedFruit/ImportedFruit" //进口水果 ../../pagesII/ImportedFruit/ImportedFruit
				// 		break;
				// 	case 1:
				// 		url = "../../pagesII/hotFruit/hotFruit" //热门品种 ../../pagesII/hotFruit/hotFruit
				// 		break;
				// 	case 2:
				// 		url = "../../pagesII/seasonal/seasonal" //应季专区 ../../pagesII/seasonal/seasonal
				// 		break;
				// 	case 3:
				// 		url = "../../pagesII/superValue/superValue" //超值专区 ../../pagesII/superValue/superValue
				// 		break; 
				// 	case 4:
				// 		url = "../../pagesII/Recently/Recently" //最近看过 ../../pagesII/Recently/Recently
				// 		break;
				// 	default:
				// 		break;
				// }

				if (index === 4) {
					uni.navigateTo({
						url: "../../pagesII/Recently/Recently"
					})
					return
				}
				uni.navigateTo({
					url: "../../pagesII/category/category?id="+id + "&index="+index + "&title=" + title //url
				})
			},
			gotoBreed(name, id) {
				console.log(123)
				uni.navigateTo({
					url: '../../../pagesII/productList/productList?name=' + name + '&id=' + id
				})
			},
			gotoGun() {
				uni.navigateTo({})
			}
		},
	}
</script>

<style lang="less" scoped>
	page {
		background: #f7f7f7;
	}

	.category-container {
		margin: 0 20rpx;
		background: #fff;
		box-shadow: 0 0 10rpx 0 #e5e5e5;
		padding: 40rpx 0 36rpx;
		border-radius: 16rpx;


		.kkarea-list,
		.cate-list {
			display: flex;

			.kkarea-item,
			.cate-item {
				width: 20%;
				text-align: center;
				margin-bottom: 26rpx;

				.item-img {
					width: 104rpx;
					height: 104rpx;
				}

				.item-text {
					font-size: 24rpx;
					color: #8A8A8A;
				}
			}
		}

		.cate-list {
			flex-wrap: wrap;
		}
	}
</style>
