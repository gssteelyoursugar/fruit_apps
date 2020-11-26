<template>
	<view class="cate-container">
		<CateItem :list="list" :imgUrl="imgList[curIndex]"></CateItem>
	</view>
</template>

<script>
	//请求
	import {
		listing,
		listing2,
		publicing
	} from '../../api/api.js'
	//请求地址
	import {
		getselectSeasonal,
		getselectHot,
		getselectImport,
		getselectSuper,
		imgurl,
		getClient,
	} from '../../api/request.js'
	import CateItem from '../../components/category-item/category-item.vue'
	export default {
		data() {
			return {
				curId: '',
				curIndex: 0,
				list: [],
				requestUrl: {
					0: getselectSeasonal,
					1: getselectHot,
					2: getselectImport,
					3: getselectSuper
				},
				imgList: [
					'../../static/images/seasonal.png',
					'../../static/images/hot_fruit.png',
					'../../static/images/import.png',
					'../../static/images/super.png',
				]
			};
		},
		components: {
			CateItem
		},
		onLoad(opt) {
			console.log(opt)
			this.curId = opt.id
			this.curIndex = opt.index
			
			this.getData()
			uni.setNavigationBarTitle({
				title: opt.title
			})
		},
		methods: {
			getData() {
				listing2(this.requestUrl[this.curIndex])
					.then((res) => {
						this.list = res.data.data
						console.log(this.list)
					})
					.catch((err) => {
						console.log(err)
					})
			}
		}

	}
</script>

<style lang="less" scoped>

</style>
