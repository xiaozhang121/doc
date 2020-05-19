<template>
	<view class="home">
		<qb-footer :choose="0"></qb-footer>
	</view>
</template>

<script>
	import qbFooter from "@/components/qb-footer.vue"
	import config from '../../common/config/config.js'
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components: {
			qbFooter
		},
		data() {
			return {
				
			}
		},
		computed: {
		},
		onLoad(options) {
			uni.hideTabBar({});

			//开发模式设置用户信息
			if (process.env.NODE_ENV === 'development') {
				let user_temp = {
					id: 'dd301505-5a62-4b28-a655-e569fad5a4c8',
					nickname: '',
					icon: '',
					levelType: '',
					gender: ''
				};
				uni.setStorageSync('user', user_temp);
			}

			if (uni.getStorageSync('user')) { // 如果已有缓存则直接进首页
				uni.showLoading({
					title: '登录中...'
				})
				this.$store.commit('login', uni.getStorageSync('user'));
				setTimeout(() => {
					uni.hideLoading();
				}, 500)
			}
		},
		onShow() {
			
		},
		onReady() {
			
		},
		methods: {
			
		},
		onPullDownRefresh() {
			
		}
		
	}
</script>

<style lang="scss">
	.home {
		min-height: 100%;

		
	}
	
</style>
