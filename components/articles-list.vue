<template>
	<view class="course_list_components_wrap">
		<view class="single_course" v-for="(v,i) in courses" :key="i" @click="gotoDetial(v)">
			<view class="left_img">
				<view class="left_img_index" v-if="showIndex">{{i + 1}}</view>
				<image :src="v.cover_path" class="inner_img" mode="aspectFill"></image>
			</view>
			<view class="right_info">
				<view class="course_name">{{v.title}}</view>
				<!-- <view class="course_intro">{{v.introduce}}</view> -->
				<view class="course_update">
					<view class="study_num">浏览{{v.read_count}}次</view>
				</view>
				<view class="course_to_study">
					<view class="to_study_btn">{{v.c_time}}</view>
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
			gotoDetial(item) {
				console.log(item)
				this.util.jumpTo('../home/articleDetail',{
					id: item.id
				})
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
				justify-content: flex-start;
				align-items: center;
				height: 54rpx;
				.to_study_btn{
					width:320rpx;
					height:54rpx;
					line-height:54rpx;
					color:#d4bab9;
					font-size: 20rpx;
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
