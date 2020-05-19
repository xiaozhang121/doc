<template>
	<view class="course_list_components_wrap">
		<view class="single_course" v-for="(v,i) in courses" :key="i">
			<view class="left_img">
				<view class="left_img_index" v-if="showIndex">{{i + 1}}</view>
				<image :src="v.cover_path" class="inner_img" mode="aspectFill"></image>
			</view>
			<view class="right_info">
				<view class="course_name">{{v.name}}</view>
				<view class="course_intro">{{v.introduce}}</view>
				<view class="course_update">
					<view class="single_label">更新至{{v.class_hour}}期</view>
					<view class="study_num" v-if="v.course_type == '1'">{{v.study_cnt}}次学习</view>
				</view>
				<view class="course_to_study">
					<view class="to_study_btn" @click="gotolive(v)">去学习</view>
					<view class="to_study_btn" @click="gotoShare(i)">去分享</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			courses: {
				type: Array,
				default: function() {
					return []
				}
			},
			showIndex: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			gotolive(item) {
				this.$emit('gotolive', item)
			},
			gotoShare(i) {
				this.$emit('gotoShare', i)
			}
		}
	}
</script>

<style lang="scss">
.course_list_components_wrap{
	width:100%;
	margin-bottom: 50rpx;
	.single_course{
		width:100%;
		height:230rpx;
		background-color: #FFF;
		display: flex;
		margin-bottom:30rpx;
		.left_img{
			height: 230rpx;
			background-color: #F5F5F5;
			width: 40%;
			position: relative;
			.left_img_index {
				position: absolute;
				padding: 2rpx 12rpx;
				background-color: rgba(0,0,0,0.6);
				color: #FFFFFF;
				font-size: 28rpx;
				left: 0;
				top: 0;
				z-index: 1;
				border-radius: 6rpx 0px 6rpx 0px;
			}
			.inner_img{
				width:100%;
				height:100%;
			}
		}
		.right_info{
			font-size:32rpx;
			color:#333;
			padding-left:23rpx;
			box-sizing: border-box;
			width:60%;
			text-align: left;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.course_name{
				
				height:50rpx;
				line-height: 50rpx;
				overflow:hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.course_intro{
				width: 100%;
				height:39rpx;
				line-height: 39rpx;
				font-size: 28rpx;
				color:#696969;
				overflow:hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.course_update{
				margin:20rpx 0 25rpx 0;
				display: flex;
				.single_label{
					// width: 146rpx;
					padding: 0 15rpx;
					height:40rpx;
					line-height: 40rpx;
					text-align: center;
					font-size: 24rpx;
					background-color: #FCEEE9;
					color:#E8541E;
					border-radius:2rpx;
					margin-right: 11rpx;
				}
			}
			.course_to_study{
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 54rpx;
				.to_study_btn{
					width:140rpx;
					height:54rpx;
					line-height:54rpx;
					background-color: #FF5D4F;
					border-radius:38rpx;
					text-align: center;
					color:#FFE0DE;
					font-size: 30rpx;
					box-shadow:0px 3px 5px 1px rgba(255,224,222,1);
				}
				
			}
		}
	}
	.study_num{
		font-size: 28rpx;
		color:#8D8D8D;
	}
}
</style>
