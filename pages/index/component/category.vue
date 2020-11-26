<template>
	<view class="category-container">
		<view class="kkarea-list">
			<view class="kkarea-item  " @tap="hrefKing(index)" v-for="(item,index) in kkarea" :key="index">
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
			return {
			}
		},
		methods: {
			detail() {
				console.log("跳转")
			},
			hrefKing(index) {
				let url = "";
				switch (index) {
					case 0:
						url = "../../pagesII/ImportedFruit/ImportedFruit" //进口水果
						break;
					case 1:
						url = "../../pagesII/hotFruit/hotFruit" //热门品种
						break;
					case 2:
						url = "../../pagesII/seasonal/seasonal" //应季专区
						break;
					case 3:
						url = "../../pagesII/superValue/superValue" //超值专区
						break;
					case 4:
						url = "../../pagesII/Recently/Recently" //最近看过
						break;

					default:
						break;
				}
				if (url) {
					uni.navigateTo({
						url: url
					})
				} else {
					uni.showToast({
						title: '正在内测中～',
						icon: 'none'
					})
				}
			},
			gotoBreed(name, id) {
				uni.navigateTo({
					url: '../../pagesII/productList/productList?name=' + name + '&id=' + id
				})
			},
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

			.kkarea-item, .cate-item {
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
