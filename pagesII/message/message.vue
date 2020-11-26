<template>
	<view class="msg-container">
		<view class="msg-item" v-for="item of msgList" :key="item.id" @click="clickToItem(item.id)">
			<!-- /static/images/selection1.png -->
			<image :src="item.url" class="item-img" mode="widthFix"></image>
			<view class="msg-detail">
				<view class="detail-title">{{item.title}}</view>
				<view class="detail-desc">{{item.describe}}</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		listing2
	} from '../../api/api.js'
	import {
		getMsg
	} from '../../api/request.js'
	export default {
		data() {
			return {
				msgList: []
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			getList() {
				listing2(getMsg).then(res => {
					this.msgList = res.data.data
				})
			},
			clickToItem(id) {
				uni.navigateTo({
					url: "../timeInfo/timeInfo?id=" + id
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.msg-container {
		margin-top: 20rpx;

		.msg-item {
			display: flex;
			width: 750rpx;
			height: 150rpx;
			align-items: center;
			background: #fff;
			padding: 0 20rpx;
			border-bottom: 1px solid #e5e5e5;
			&:last-child {
				border-bottom: none;
			}

			.item-img {
				width: 96rpx;
				height: 96rpx;
			}
			
			.msg-detail {
				margin-left: 28rpx;

				.detail-title {
					font-size: 32rpx;
					color: #333;
					font-weight: 400;
					width: 556rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;

				}
				.detail-desc{
					color: #666666;
					font-size: 28rpx;
					margin: 12rpx 0 0;
					font-weight: 400;

				}
			}
		}
	}
</style>
