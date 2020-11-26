<template>
	<view class="index-news-container">
		<view class="news-box">
			<view class="news-icon">
				<image src="../../../static/images/news.png" mode=""></image>
			</view>
			<swiper vertical autoplay circular interval="3000" class="news-swiper-wrapper">
				<swiper-item v-for="(item,index) in msgList" :key="index" class="news-swiper-wrap-item">
					<view class="news-swiper-item" @tap="goTimeInfo(item.id,item.content,item.title,item.createDate)"> 
						<view class="item-title">{{item.title}}</view>
						<view class="item-link">查看<u-icon name="arrow-right" color="#B6B6B6" size="24"></u-icon></view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			msgList: {
				type: Array
			}
		},
		data() {
			return {}
		},
		methods: {
			goTimeInfo(id, content, title, createDate) {
				//拼接路径携带参数
				console.log("点击了，正式之后删除")
				return
				uni.navigateTo({
					url: '../../pagesII/timeInfo/timeInfo?id=' + id + '&content=' + content + '&createDate=' + createDate +
						'&title=' + title
				})
			},
		},
		created(){
		}
	}
</script>

<style lang="less" scoped>
	.index-news-container{ 
		padding: 20rpx;
		margin: 20rpx;
		background: #fff;
		box-shadow: 0 0 10rpx 0 #e5e5e5;
		border-radius: 16rpx;

		.news-box {
			position: relative;
			height: 54rpx;
			.news-icon {
				position: absolute;
				left: 0;
				top: ;
				image {
					width: 60rpx;
					height: 54rpx;
				}
			}
			.news-swiper-wrapper {
				position: absolute;
				height: 54rpx;
				left: 60rpx;
				flex: 1;
				right: 0;

				.news-swiper-wrap-item{
					.news-swiper-item {
						display: flex;
						height: 54rpx;
						align-items: center;
						justify-content: space-between;

						.item-title {
							margin: 0 20rpx;
							color: #0E0E0E;
							font-weight: 400;
							font-size: 28rpx;
							width: 480rpx;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;

						}
						.item-link {
							display: flex;
							align-items: center;
							color: #555555;
							font-size: 28rpx;
						}
					}
				}
			}
		}
		
	}
</style>
