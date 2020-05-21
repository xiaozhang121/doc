<template>
    <view class="box">
		<!-- 客户类型 -->
		<view class="box_one">
			<view class="box_title">
				<image src="../../static/images/huiyuan@2x.png" mode=""></image>客户类型
			</view>
			<view class="all_sel">
				<view class="sel" v-for="(item,index) in list" :key='index' @click="select(index)" :class="currentindex==index?'active':'none'">
					{{item}}
				</view>
			</view>
		</view>
		<!-- 客户级别 -->
		<view class="box_one">
			<view class="box_title">
				<image src="../../static/images/%20%20%20%20%20@2x.png" mode=""></image>客户级别
			</view>
			<view class="all_sel">
				<view class="sel" v-for="(item,index) in level_list" :key='index' @click="select_level(index)" :class="levelindex==index?'active_level':'none_level'">
					{{item}}
				</view>
			</view>
		</view>
		<!-- 客户状态 -->
		<view class="box_one">
			<view class="box_title">
				<image src="../../static/images/1@2x.png" mode=""></image>客户状态
			</view>
			<view class="all_sel">
				<view class="sel" v-for="(item,index) in state_list" :key='index' @click="select_state(index)" :class="stateindex==index?'active_state':'none_state'">
					{{item}}
				</view>
			</view>
		</view>
		<!-- 提交按钮 -->
		<button type="primary" class="btn" @click="send">提交</button>
	</view>
</template>

<script>
	export default{
		components:{
		
		},
		data(){
			return {
				currentindex: 100,//类型
				levelindex:100,//级别
				stateindex:100,//状态
				list:['体验客户','体验客户','体验客户','体验客户','体验客户','体验客户'],//客户类型标签列表
				level_list:['潜力','潜力','潜力','潜力','潜力','潜力'],//客户等级标签列表
				state_list:['潜在','潜在','潜在','潜在','潜在','潜在'],//客户状态标签列表
				send_arr:[]
			}
		},
		computed: {
		       
		    },
		methods:{
			select(index){
				this.currentindex=index							
				},
			select_level(index){
				this.levelindex = index
			},
			select_state(index){
				this.stateindex = index
			},
			//提交选项
			send(){
				this.send_arr = [this.currentindex,this.levelindex,this.stateindex]
				this.$store.commit('addtag',this.send_arr) //将所选标签存入vuex
				// uni.navigateTo({
				// 	url:'/pages/add/add'
				// })
				uni.navigateBack()
			}
			}
	}
</script>

<style lang="less" scoped>
	.box{
		background-color: rgb(240, 242, 245);
		min-height: 100%;
		padding: 30rpx;
		box-sizing: border-box;
		position: relative;
		.box_one {
			.box_title{
				margin-bottom: 30rpx;
				image {
					width: 36rpx;
					height: 36rpx;
					margin-right: 30rpx;
					vertical-align: middle;
				}
			}
			.all_sel {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				.sel{
					width: 31%;
					height: 64rpx;
					text-align: center;
					border-radius: 40rpx;
					line-height: 64rpx;
					margin-bottom: 30rpx;
					box-sizing: border-box;
				}
				.none {
					color: #C59A76;
					border: 2rpx solid #C59A76;
				}
				.active{
					color: white;
					background-color: #C59A76;	
				}
				.none_level {
					color: #F9A94C;
					border: 2rpx solid #F9A94C;
				}
				.active_level{
					color: white;
					background-color: #F9A94C;
				}
				.none_state{
					color: #EB7054;
					border: 2rpx solid #EB7054;
				}
				.active_state{
					color: white;
					background-color: #EB7054;
				}
			}
		}
		.btn {
			width: 85%;
			margin: 0 auto;
			height: 80rpx;
			line-height: 70rpx;
			color: white;
			background-color: #C59A76;
			border-radius: 42rpx;
			position: absolute;
			left: 50%;
			bottom: 120rpx;
			transform: translate(-50%,-50%);
		}
	}
</style>
