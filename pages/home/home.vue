<template>
	<view class="home">
		<qb-footer :choose="0"></qb-footer>
	</view>
</template>

<script>
	import qbFooter from "@/components/qb-footer.vue"
	import config from '../../common/config/config.js'
	import {apiArticleList} from '../../api/api.js'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components: {
			qbFooter,
			uniPopup
		},
		created() {
			this.get(),
			this.log()
		},
		data()  {
		            return {
		               showpop:false
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
		  methods:{
		            yearChange:function(e){
		                console.log(e)
		                //获得对象的 detail的 value
		                //通过数组的下标改变显示在页面的值
		                this.yearsIndex = e.detail.value;
		            },
					async get(){
						var res = await apiArticleList();
						console.log(res)
					},
					log(){
						uni.authorize({
						    scope: 'scope.userInfo',
						    success(res) {
						        uni.getUserInfo()
						    }
						})
					},
					open(){
						this.$refs.popup.open()
					}
		        },
		onPullDownRefresh() {
			
		}
		
	}
</script>

<style lang="scss" scoped>
	.home {
		min-height: 100%;
		
	}
	
</style>
