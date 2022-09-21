<template>
	<view class="search-result-list-container">
		<empty-data v-if="isEmpty"></empty-data>
		<mescroll-body
			v-else
			ref="mescrollRef"
			@init="mescrollInit"
			@down="downCallback"
			@up="upCallback"
		>
			<!-- 循环渲染列表数据 -->
			<block
				v-for="(item, index) in resultList"
				:key="index"
			>
				<view
					class="search-result-item-box"
					@click="onItemClick(item)"
				>
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
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
	import {
		getSearchResult
	} from 'api/search.js'
	export default {
		name: 'SearchResultList',
		mixins: [MescrollMixin],
		props: {
			// 搜索关键字
			queryStr: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				resultList: [],
				page: 1,
				// 判断是不是首次加载
				isInit: false,
				mescroll: null,
				// 是否没数据
				isEmpty: false
			}
		},
		mounted() {
			this.mescroll = this.$refs.mescrollRef.mescroll
		},
		methods: {
			/**
			 * 首次加载
			 */
			async mescrollInit() {
				await this.loadSearchResult();
				this.isInit = true
				// 首次加载完成，关闭上拉加载更多的动画
				this.mescroll.endSuccess()
			},
			/**
			 * 下拉刷新
			 */
			async downCallback() {
				if (!this.isInit) return
				this.page = 1
				await this.loadSearchResult()
				this.mescroll.endSuccess()
			},
			/**
			 * 上拉加载
			 */
			async upCallback() {
				if (!this.isInit) return
				this.page++
				await this.loadSearchResult()
				console.log('触发')
				this.mescroll.endSuccess()
				console.log('结束')
			},
			async loadSearchResult() {
				const {
					data: res
				} = await getSearchResult({
					q: this.queryStr,
					p: this.page
				})

				res.list.forEach(item => {
					item.title && (item.title = item.title.replace(/<em>/g,
						"<em style='color: #f94d2a; margin: 0 2px;'>"))
					item.description && (item.description = item.description.replace(
						/<em>/g,
						"<em style='color:#f94d2a; margin:0 2px'>"
					))
				})
				if (this.page === 1) {
					this.resultList = res.list
				} else {
					this.resultList = [this.resultList, ...res.list]
				}

				if (this.resultList.length === 0) {
					this.isEmpty = true;
				}
			},
			/**
			 * 热搜列表item点击事件
			 */
			onItemClick(item) {
				uni.navigateTo({
					url: `/subpkg/pages/blog-detail/blog-detail?author=${item.author}&articleId=${item.id}`
				})
			}
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
