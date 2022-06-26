const STORAGE_KEY = 'search-list'
export default {
	namespaced: true,
	state: () => {
		return {
			searchData: uni.getStorageSync('STORAGE_KEY') || []
		}
	},
	mutations: {
		/**
		 * 保存数据到storage
		 */
		saveToStorage (state) {
		  uni.setStorage({
				key: STORAGE_KEY,
				data: state.searchData
			})
		},
		/**
		 * 添加数据
		 */
		addSearchData (state, val) {
			if (!val) return
			const { searchData } = state
			const index = searchData.findIndex(item => item === val)
			if (index !== -1) {
				searchData.splice(index, 1)
			}
			searchData.unshift(val)
			// vuex中，通过this.commit函数调用mutation
			this.commit('search/saveToStorage')
		},
		/**
		 * 删除指定数据
		 */
		removeSearchData ({ searchData }, index) {
			searchData.splice(index, 1)
			this.commit('search/saveToStorage')
		},
		/**
		 * 删除所有搜索数据
		 */
		removeAllSearchData ({ searchData }) {
			searchData = []
			this.commit('search/saveToStorage')
		}
	}
}