<template>
	<view class="blank">
		<view class="cover"></view>
		<view style="position: relative;z-index: 1;margin-top:100rpx;font-size: 40rpx;color:#333333;text-align: center;">前贝学堂</view>
		<view style="position: relative;z-index: 1;margin-top:10rpx;font-size: 40rpx;color:#333333;text-align: center;">分享美好生活</view>
		<!-- <view style="position: relative;z-index: 1;margin-top:10rpx;font-size: 40rpx;color:#333333;text-align: center;">让千万前辈学会智慧养老</view> -->
		<button class="btn_login" @tap="showPop">立即登录</button>
		<uni-popup ref="popup_login" type="center">
			<view class="popup_middle">
				<view class="header_star"></view>
				<view class="header_title">
					温馨提示
				</view>
				<view class="content">您还未登录，请先登录再进行操作</view>
				<view class="bottom_menu">
					<button class="btn_white" @tap="hiddenPop">暂不登录</button>
					<button class="btn_red"  open-type="getUserInfo" @getuserinfo="getUserInfo" @tap="login_H5">立即登录</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	// import mixin_share from "../common/config/share.js"
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				// is_first: 0,
				id: "",
				userInfo: null,
				pageTo: '',
				wxLogincode: '',
				parent_id: '',
				shareUserId: '',
				fromm:'',
				signInType: ''
			}
		},
		onLoad(options) {
			console.log('blank - onLoad')
			console.log(options)
			this.id = options.id;//这个id暂时指代的是课程的id
			this.parent_id = options.id || '';
			this.pageTo = options.to || '';
			this.shareUserId = options.shareUserId || '';
			this.fromm = options.fromm;
			this.signInType = options.signInType
			// #ifdef H5
			// 做会员页微信认证
			this.getUserCode();
			// #endif
			
			// #ifdef MP-WEIXIN
			// 微信认证
			if(this.shareUserId!=''){
				this.getShareUserId(this.shareUserId);
				//用户通过分享进入
				this.completeTask();
			}
			if(uni.getStorageSync('user')) { // 如果已有缓存则直接进首页
				uni.showLoading({
					title: '登录中...'
				})
				uni.setNavigationBarTitle({
					title: '页面跳转中…'
				})
				this.$store.commit('login', uni.getStorageSync('user'));
				setTimeout(() => {
					uni.hideLoading();
					uni.reLaunch({
						url:'home/home'
					})
				}, 500)
				
			} else {
				this.getWxSessionKey(parent_id);
			}
			// #endif
		},
		onShow() {},
		methods: {
			getWxSessionKey(parent_id) {
				wx.login({
					success: (res) => {
						let requestPak = this.util.createRequestPak();
						requestPak.requestBody = {
							encryptedData: "",
							iv: "",
							code: res.code,
							shareUserId: this.parent_id
						}
						this.util.request(this, '/customerApp/getWxSessionKey', requestPak, true)
							.then(resp => {
								if (resp.ok) {
									this.wxLogincode = res.code;
									
								}
							})
					},
				});
			},
			login_H5() {
				// #ifdef H5
				window.location.href = this.config.CreateQrCodeHead + encodeURIComponent(location.href) + this.config.CreateQrCodeEnd;
				// #endif
			},
			getUserInfo(e) {
				let that = this;
				if (e.detail.errMsg != 'getUserInfo:ok') { // 'getUserInfo:ok' 'getUserInfo:fail auth deny'
					this.util.message('取消授权');
					this.hiddenPop();
					return
				}
				let requestPak = this.util.createRequestPak();
				requestPak.requestBody = {
					encryptedData: e.detail.encryptedData,
					iv: e.detail.iv,
					code: this.wxLogincode,
					shareUserId: this.shareUserId
				}
				this.util.request(this, '/customerApp/weixinLogin', requestPak, true)
					.then(res => {
						if (res.ok) {
							this.$store.commit('login', res.data);
							uni.setStorageSync('user', res.data);
							if(this.fromm=='course'){
								uni.reLaunch({
									url:'home/course?course_id='+this.id
								})
							} else {
								uni.reLaunch({
									url:'home/home'
								})
							}
						}
					})
			},
			//判断是否带用户id进入
			getShareUserId(userid){
				let requestPak = this.util.createRequestPak();
				requestPak.requestBody = {
					shareMemberId:userid
				}
				this.util.request(this, 'course/user/shareMember', requestPak, true)
					.then(res => {
						if (res.ok) {
							this.util.message("用户分享后进入");
						} else {
							
						}
					})
			},
			/**
			 * 分享邀请任务
			 */
			completeTask(){
				let tempTask = uni.getStorageSync("task");
				if(!tempTask[this.$store.state.taskId.showAndNewIn]){
					this.util.taskRequest(this.$store.state.taskId.showAndNewIn);
				}else{
					console.log("任务已完成，不走接口");
				}
			},
			showPop() {
				this.$refs.popup_login.open()
			},
			hiddenPop() {
				this.$refs.popup_login.close()
			},
			getUserCode() {
				let url = location.href;
				let theRequest = {};
				if (url.indexOf("?") != -1) {
					let str = url.substr(url.indexOf("?") + 1, url.length);
					let strs = str.split("&");
					for (let i = 0; i < strs.length; i++) {
						theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
					}
				}
				this.code = theRequest['code'];
				if (!this.util.isNullOrWhiteSpace(this.code)) { // 此为二维码跳转或者用户分享跳转
					let requestPak = this.util.createRequestPak()
					requestPak.requestBody = {
						code: this.code,
						parent_id: this.parent_id || '',
						source_type: '0',
						login_type: this.signInType
					}
					this.util.request(this, '/customerApp/getWxUserInfo', requestPak, false)
						.then(res => {
							if (res.ok) {
								uni.setStorageSync('user', res.data);
								this.$store.commit('login', res.data);
								if(this.fromm == 'course'){
									uni.reLaunch({
										url:'home/course?course_id='+this.id
									})
								} else {
									uni.reLaunch({
										url:'home/home'
									})
								}
							}
						})
				} else {
					if(uni.getStorageSync('user')) {
						window.location.href = this.config.CreateQrCodeHead + encodeURIComponent(location.href) + this.config.CreateQrCodeEnd;
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.blank {
		min-height: 100%;
		.cover {
			background: url('https://www.laohaowaner.com/qbresource/qb_study/icon_cover.jpg') no-repeat;
			background-size: 100% 100%;
			width: 750rpx;
			height: 1206rpx;
			position: fixed;
			bottom: 0;
			left: 0;
		}
		.btn_login {
			width: 574rpx;
			height: 76rpx;
			line-height: 76rpx;
			background-color: $zl-button;
			border-radius: 38rpx;
			color: #FFFFFF;
			font-size: 32rpx;
			position: fixed;
			bottom: 123rpx;
			left: 0;
			right: 0;
			margin: 0 auto;
		}
		.popup_middle {
			width: 605rpx;
			height: 581rpx;
			border-radius: 32rpx;
			background-color: #fff;
			.header_star {
				position: absolute;
				top: -31rpx;
				width: 453rpx;
				height: 178rpx;
				background: url(../static/blank/title_star.png);
				background-size: 100% 100%;
				left: 75rpx;
			}
			.header_title {
				width: 605;
				height: 173rpx;
				line-height: 173rpx;
				text-align: center;
				font-size: 36rpx;
				background: url(../static/blank/title_back.png)no-repeat;
				background-size: 100% 100%;
				font-weight: bold;
				color: $zl-button;
			}
			.content {
				color: #333333;
				font-size: 32rpx;
				text-align: center;
				height: 45rpx;
				line-height: 45rpx;
				margin-top: 96rpx;
			}
			.bottom_menu {
				height: 90rpx;
				display: flex;
				margin-top: 120rpx;
				flex-direction: row;
				justify-content: center;
			}
			button {
				width: 237rpx;
				height: 88rpx;
				line-height: 88rpx;
				border-radius: 44rpx;
				font-size: 34rpx;
				font-weight: bold;
				margin: 0;
				padding: 0;
			}
			.btn_white {
				background-color: #fff;
				border: 2rpx solid rgba(255,93,79,1);
				color: #FF5D4F;
			}
			.btn_red {
				background-color: #FF5D4F;
				color: #FFFFFF;
				margin-left: 25rpx;
			}
		}
	}
</style>
