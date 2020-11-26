<template>
	<view class="qg-swiper-container">
		<swiper :indicator-dots="true" :autoplay="true" :interval="5000" :duration="150" class="qg-banner-swiper" :circular="true"
		 indicator-color="rgba(255, 255, 255, 0.8)" indicator-active-color="#ff7129">
			<swiper-item v-for="(item, index) in swiperList" :key="index" @tap.stop="detail(item.jumpUrl)">
				<image :src="item.url" class="qg-slide-image" mode="scaleToFill" />
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props: {
			swiperList: {
				type: Array
			}
		},
		data () {
			return {}			
		},
		methods: {
			detail() {
				console.log("跳转")
			}
		}
	}
</script>

<style lang="less" scoped>

	.qg-banner-swiper {
		width: 100%;
		height: 290rpx;
		border-radius: 12rpx;
		overflow: hidden;
		transform: translateY(0);
		/* box-shadow:10px -100px 10px #000 inset; */
		.qg-slide-image {
			width: 96%;
			height: 280rpx;
			display: block;
			margin: 0 2%;
			-webkit-box-shadow: 0.5px 0.5px 5px 3px #a0a0a0;
			box-shadow: 0rpx 0rpx 10rpx 2rpx #a0a0a0;
			-webkit-border-radius: 6px;
			border-radius: 12rpx;
			background: #eee;
		}
	
	}
	
	
	
</style>
