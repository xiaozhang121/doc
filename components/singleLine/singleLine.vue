<template>
	<view class="line_wrap">
		<!-- 正常渲染模块 -->
		<view v-for="item in lineInfoData" :key="item.name" @tap="gotoPage($event,item.addr)" class="single_line_wrap">
			<view class="single_line" :data-operation="item.operation" v-if="item.operation!=1">
				<view class="left_part" :data-operation="item.operation">
					<image :src="item.icon" mode="scaleToFill" class="icon" v-if="item.icon" :data-operation="item.operation"></image>
					<view class="left_words" v-if="item.name" :data-operation="item.operation">{{item.name}}</view>
				</view>
				<view class="right_part" :data-operation="item.operation">
					<view class="right_info" v-if="item.tip" :data-operation="item.operation">
						<text v-if="item.tip.indexOf('条未读')!=-1" style="color: #FF5500;">{{item.tip}}</text>
						<text v-if="item.tip.indexOf('条未读')==-1 && item.tip.indexOf('您已获得')==-1">{{item.tip}}</text>
						<text v-if="item.tip.indexOf('您已获得')!=-1">您已获得<text style="color: #FF5500">{{item.tip.substring(4,item.tip.indexOf("学分"))}}</text>学分</text>
					</view>
					<i class="arrow" v-if="item.arrow" :data-operation="item.operation"></i>
				</view>
			</view>
			
			<!-- picker模块 -->
			<view class="single_line" :data-operation="item.operation" v-if="item.operation==1">
				<view class="left_part" :data-operation="item.operation">
					<image :src="item.icon" mode="scaleToFill" class="icon" v-if="item.icon" :data-operation="item.operation"></image>
					<view class="left_words" v-if="item.name" :data-operation="item.operation">{{item.name}}</view>
				</view>
				<view class="right_part" :data-operation="item.operation">
                    <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
                        <view class="uni-input">{{date}}</view>
                    </picker>
					<i class="arrow" v-if="item.arrow" :data-operation="item.operation"></i>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// operation：0：正常跳转、1：日期picker弹窗、2：父页面弹窗、3：拨打电话
	import {mapState} from 'vuex';
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				date: currentDate,
				time: '12:01',
				user_info:{},
				lineInfoData:[]
			};
		},
		props: {
			lineInfo: {
				type: Array,
				default: () => {
					return [];
				}
			}
		},
		watch:{
			lineInfo:{
				immediate:true,
				handler:function(val){
					this.lineInfoData = val;
				}
			}
		},
		created() {
			this.initData();
		},
		updated() {
			this.lineInfoData = this.lineInfo;
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			initData(){
				this.user_info = uni.getStorageSync('user');
				const currentDate = this.getDate({
					format: true
				})
				this.date = this.user_info.birthday || currentDate;
			},
			gotoPage(e, addresss) {
				console.log("evnet:", e.target.dataset.operation);
				if (e.target.dataset.operation == '2') {
					this.$emit("triggerThis", {
						operation: e.target.dataset.operation
					});
				}else if(e.target.dataset.operation == '3'){
					uni.makePhoneCall({
					    phoneNumber: "18914748025"
					});
					return;
				}
				if (addresss == '') {
					console.log("组件singleLine无跳转");
					return;
				}
				uni.navigateTo({
					url: addresss
				})
			},
			bindDateChange: function(e) {
				console.log("组件中的日期值改变=",e.target.value);
				this.date = e.target.value
				this.user_info.birthday = e.target.value;
				uni.setStorageSync('user', this.user_info);
				this.updateUserInfo();
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 90;
				} else if (type === 'end') {
					year = year;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			/**
			 * 更新用户信息
			 */
			updateUserInfo() {
				let requestPak = this.util.createRequestPak()
				requestPak.requestBody = {...this.user_info}
				this.util.request(this, '/ums/saveMember', requestPak, true)
					.then(res => {
						if (res.ok) {
							this.util.message("更新成功");
						} else {
							this.util.message(res.message);
						}
					})
			},
		}
	}
</script>

<style lang="scss">
	.line_wrap {
		width: 100%;
		.single_line_wrap{
			
			border-bottom: 1px solid #EEEEEE;
		
		.single_line {
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 32rpx;
			color: #333;
			border-bottom: 1px solid #EEEEEE;

			.left_part {
				width: 300rpx;
				height: 100%;
				display: flex;
				justify-content: flex-start;
				align-items: center;

				.left_words {
					width: 250rpx;
					height: 100%;
					position: relative;
					box-sizing: border-box;
				}

				.icon {
					width: 40rpx;
					height: 45rpx;
					margin-right: 13rpx;
				}
			}

			.right_part {
				display: flex;
				justify-content: flex-end;
				align-items: center;

				.right_info {
					width: 300rpx;
					height: 100rpx;
					white-space: nowrap;
					text-align: right;
				}

				.arrow {
					width: 17rpx;
					height: 17rpx;
					margin-left: 15rpx;
					margin-right: 10rpx;
					border-top: 1px solid #CCCCCC;
					border-right: 1px solid #CCCCCC;
					transform: rotate(45deg);
				}
			}

			&:last-child {
				border-bottom: none;
			}
		}}
	}
</style>
