<template>
	<view class="search-result-list-container">
		<!-- 循环渲染列表数据 -->
		<block
			v-for="(item, index) in resultList"
			:key="index"
		>
			<view class="search-result-item-box">
				<!-- 内容区 - 样式 1 -->
				<search-result-item-theme-1
					v-if="!item.pic_list || item.pic_list.length === 0"
					:data="item"
				/>

				<!-- 内容区 - 样式 2 -->
				<search-result-item-theme-2
					v-else-if="item.pic_list.length === 1"
					:data="item"
				/>

				<!-- 内容区 - 样式 3 -->
				<search-result-item-theme-3
					v-else
					:data="item"
				/>

				<!-- / -->
			</view>
		</block>
	</view>
</template>

<script>
	import { getSearchResult } from 'api/search.js'
	export default {
		data() {
			return {
				resultList: [],
				page: 1
			}
		},
		created() {
			this.loadSearchResult();
		},
		methods: {
			async loadSearchResult() {
				const {
					data: res
				} = await getSearchResult({
					q: this.queryStr,
					p: this.page
				})
				this.resultList = res.list
			},
		}
	}
</script>

<style
	lang="scss"
	scoped
>
	.search-result-list-container {
		padding: $uni-spacing-col-lg $uni-spacing-row-lg;

		.search-result-item-box {
			margin-bottom: $uni-spacing-col-big;
		}
	}
</style>
