<template>
	<!-- 最外层的view绑定了js中定义的宽、高以及背景颜色 -->
	<view
		v-if="showLoad"
		:style="{
			width: systemInfo.width + 'px',
			height: systemInfo.height + 'px',
			position: 'absolute',
			left: '0',
			top: '0',
			'z-index': '9',
			overflow: 'hidden'
		}"
		:animation="animationData"
	>
		<!-- 循环，遍历绘制矩形节点，宽高参照js获取到的节点宽高，以绝对定位的方式定位 -->
		<view
			v-for="(item, index) in skeletonRectLists"
			:key="item.width"
			:class="{ chiaroscuro: loading}"
			:style="{
				width: item.width + 'px',
				height: item.height + 'px',
				'background-color': bgcolor,
				position: 'absolute',
				left: item.left + 'px',
				top: item.top + 'px'
			}"
		>
			<h1 class="loadingtext" v-if="loading">
			  <span>L</span>
			  <span>o</span>
			  <span>a</span>
			  <span>d</span>
			  <span>i</span>
			  <span>n</span>
			  <span>g</span>
			</h1>
		</view>
		<!-- 循环，遍历绘制矩形节点，宽高参照js获取到的节点宽高，以绝对定位的方式定位 -->
		<view
			v-for="(item, key) in skeletonCircleLists"
			:key="item.width"
			:class="{ chiaroscuro: loading}"
			:style="{
				width: item.width + 'px',
				height: item.height + 'px',
				'background-color': bgcolor,
				'border-radius': item.width + 'px',
				position: 'absolute',
				left: item.left + 'px',
				top: item.top + 'px'
			}"
		>
			<div class='sk-circle-bounce' v-if="loading">
				<div class='sk-child sk-circle-1'></div>
				<div class='sk-child sk-circle-2'></div>
				<div class='sk-child sk-circle-3'></div>
				<div class='sk-child sk-circle-4'></div>
				<div class='sk-child sk-circle-5'></div>
				<div class='sk-child sk-circle-6'></div>
				<div class='sk-child sk-circle-7'></div>
				<div class='sk-child sk-circle-8'></div>
				<div class='sk-child sk-circle-9'></div>
				<div class='sk-child sk-circle-10'></div>
				<div class='sk-child sk-circle-11'></div>
				<div class='sk-child sk-circle-12'></div>
			  </div>
		</view>
	</view>
</template>
<script>
import './animation.scss';
var animation = uni.createAnimation({
	duration: 800,
	timingFunction: 'ease'
});
export default {
	props: {
		bgcolor: {
			type: String,
			default: '#E3E3E3'
		},
		show: {
			type: Boolean,
			default: false
		},
		// 渲染的根节点的类名
		selector: {
			type: String,
			default: 'skeleton'
		},
		// 加载动画
		loading: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			animationData: {},
			animation: {},
			showLoad: false,
			systemInfo: {},
			skeletonRectLists: [],
			skeletonCircleLists: []
		};
	},
	watch: {
		show() {
			if (!this.show) {
				this.animation.opacity(0).step({ duration: 500 });
				this.animationData = this.animation.export();
				setTimeout(() => {
					this.showLoad = false;
				}, 500);
			} else {
				this.showLoad = true;
				this.animation.opacity(1).step({ duration: 500 });
				this.animationData = this.animation.export();
			}
		}
	},
	methods: {
		rectHandle() {
			const that = this;
			uni.createSelectorQuery()
				.selectAll(`.${this.selector}-rect`)
				.boundingClientRect()
				.exec(res => {
					that.skeletonRectLists = res[0];
				});
		},
		radiusHandle() {
			const that = this;
			uni.createSelectorQuery()
				.selectAll(`.${this.selector}-radius`)
				.boundingClientRect()
				.exec(res => {
					that.skeletonCircleLists = res[0];
				});
		}
	},
	mounted() {
		this.animation = animation;
		this.showLoad = this.show;
		const systemInfo = uni.getSystemInfoSync();
		const that = this;
		that.systemInfo = {
			width: systemInfo.windowWidth,
			height: systemInfo.windowHeight
		};
		uni.createSelectorQuery()
			.selectAll(`.${that.selector}`)
			.boundingClientRect()
			.exec(res => {
				that.systemInfo.height = res[0][0].height + res[0][0].top;
			});

		//绘制矩形
		that.rectHandle();

		//绘制圆形
		that.radiusHandle();
	}
};
</script>
