<template>
	<view class="zl-middle-popup">
		<uni-popup ref="popup" type="center">
			<view class="popup_content">
				<view class="content_top"></view>
				<view class="content_detail">
					<view style="height: 197rpx;line-height: 230rpx;color: #FFFFFF;font-size: 42rpx;font-weight: bold;text-align: center;">
						{{mm.vip ? '开通会员立即学习': (mm.name ? '支付课程立即学习' : '会员权益')}}
					</view>
					<view class="content_detail_top">
						<view class="content_detail_title">{{mm.title}}</view>
						<view class="content_detail_subtitle">{{mm.sub_title}}</view>
						<view class="content_detail_intro" v-if="mm.intro">{{mm.intro}}</view>
					</view>
					<view class="content_detail_middle" v-if="mm.name">
						<view class="content_detail_name">{{mm.name}}</view>
						<view class="content_detail_price">
							<view>价格</view>
							<view>¥ {{mm.price}}</view>
						</view>
					</view>
					<view class="content_detail_btn">
						<view v-if="mm.cancelText" style="display: flex; justify-content: space-between;">
							<button class="btn_white" @click="cancel">{{mm.cancelText}}</button>
							<button class="btn_red" @click="confirm">{{mm.confirmText}}</button>
						</view>
						<button class="btn_red" style="width: 574rpx;" v-else @click="confirm">{{mm.price}}元 立即开通</button>
					</view>
				</view>
				<view style="height: 57rpx;"></view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		components: {
			uniPopup
		},
		data() {
			return {}
		},
		props: {
			mm: {
				type: Object,
				default: function() {
					return {
						// vip: true,
						// title: '亲爱的同学',
						// sub_title: '本选集为会员专享课程，立刻开通会员去学习吧！',
						// name: '前贝会员', //判断标志
						// price: 9.9,
						// cancelText: '暂不学习', //判断标志
						// confirmText: '立即学习'
						
						// title: '亲爱的同学',
						// sub_title: '本选集为会员专享课程，立刻开通会员去学习吧！',
						// intro: '我叫风胡子，是一名心理学培训师，同时也是一名父亲', //判断标志
						// name: '', //判断标志
						// price: 19.9,
						// cancelText: '' //判断标志
					}
				}
			}
		},
		watch: {},
		computed: {},
		onLoad(options) {
			console.log(this.mm)
		},
		onReady() {

		},
		methods: {
			open() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
			cancel() {
				console.log('cancel');
				this.close();
			},
			confirm() {
				this.$emit('confirm')
			}
		}
	}
</script>

<style lang="scss">
	.zl-middle-popup {
		.popup_content {
			width: 670rpx;
			background-color: #FFFFFF;
			border-radius: 18rpx;
			.content_top {
				background: url('https://www.laohaowaner.com/qbresource/qb_study/home/icon_popup_top.png') no-repeat;
				background-size: 100% 100%;
				width: 670rpx;
				height: 397rpx;
				position: absolute;
			}
			.content_detail {
				width: 578rpx;
				position: relative;
				margin: 0 auto;
				.content_detail_top {
					background-color: #fff;
					border-radius: 18rpx;
					box-shadow: 0px 8rpx 10rpx 6rpx rgba(228,228,228,0.34);
					display: flex;
					flex-direction: column;
					.content_detail_title {
						height: 38rpx;
						color: #333333;
						font-size: 34rpx;
						text-indent: 52rpx;
						font-weight: bold;
						margin-top: 44rpx;
					}
					.content_detail_subtitle {
						width: 474rpx;
						line-height: 42rpx;
						font-size: 30rpx;
						color: #333333;
						margin: 20rpx auto 62rpx;
					}
					.content_detail_intro {
						width: 474rpx;
						line-height: 42rpx;
						font-size: 30rpx;
						color: #333333;
						margin: -20rpx auto 32rpx;
					}
				}
				.content_detail_middle {
					width: 474rpx;
					background-color: rgba(255,255,255,1);
					box-shadow: 0px 8rpx 10rpx 6rpx rgba(228,228,228,0.34);
					border-radius: 18rpx;
					padding: 0 52rpx;
					margin-top: 34rpx;
					.content_detail_name {
						line-height: 97rpx;
						margin-top: 16rpx;
						color: #333333;
						font-size: 32rpx;
						border-bottom: 1rpx solid #E6E6E6;
					}
					.content_detail_price {
						height: 95rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						color: #333333;
						font-size: 32rpx;
						view:last-child {
							color: #DF1B30;
							font-weight: bold;
							font-size: 38rpx;
							&:first-letter {
								font-size: 28rpx;
							}
						}
					}
				}
				.content_detail_btn {
					height: 76rpx;
					margin-top: 30rpx;
					button {
						width: 267rpx;
						height: 76rpx;
						line-height: 76rpx;
						border-radius: 38rpx;
						font-size: 32rpx;
						font-weight: bold;
						margin: 0;
						padding: 0;
					}
					.btn_white {
						background-color: #fff;
						border: 1rpx solid rgba(255,93,79,1);
						color: #FF5D4F;
					}
					.btn_red {
						background-color: #FF5D4F;
						color: #FFFFFF;
					}
				}
			}
		}
	}
</style>
