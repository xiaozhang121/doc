<template>
    <view>
		<!-- 表单上部 -->
        <view class="add_top">
			<view class="add_inp">
			   <text view class="title">头像</text>
			   <view class="uni-input">
					<view class="cir" @click="upload">
						<image :src="head" mode="" v-if="head!=''" class="head"></image>
						<image src="../../static/images/形状@2x.png" mode="" v-if="head==''" class="cinema" ></image>
					</view>
					<image src="../../static/images/Chevron备份%202@2x.png" mode="" class="point" @click="upload"></image>
			   </view>
			</view>
            <view class="add_inp">
			   <text view class="title">姓名<text>*</text></text>
                <input class="uni-input" focus placeholder="请输入" v-model="name"/>
            </view>
			<view class="add_inp">
			   <text view class="title">性别</text>
			    <view class="uni-input">
			       <label class="radio"><radio value="r1" checked="true" style="transform:scale(0.7);" :checked="sex===0" @click="radio(0)"/>男</label>
			       <label class="radio" style="margin-left: 80rpx;"><radio style="transform:scale(0.7);" :checked="sex===1" value="r2" @click="radio(1)"/>女</label>
			     </view>
			</view>
			<view class="add_inp">
			   <text view class="title">联系电话<text>*</text></text>
			    <input class="uni-input" focus placeholder="请输入" v-model="phone"/>
			</view>
			<view class="add_inp">
			   <text view class="title">身份证号</text>
			    <input class="uni-input" focus placeholder="请输入" v-model="card"/>
			</view>
			<view class="add_inp">
			   <text view class="title">邮箱</text>
			    <input class="uni-input" focus placeholder="请输入" v-model="mail"/>
			</view>
			<view class="area_inp">
			   <text view class="area_title">家庭住址</text>
			  <!--  <input class="uni-input" focus placeholder="请输入" v-model="address"/> -->
				<view class="area_father">
					<textarea value="" placeholder="请输入" class="area"/>
				</view>
				<view class="" style="clear: both;">
				</view>
			</view>
        </view>
		<!-- 表单中部 -->
		<view class="add_mid">
			  		<view class="bir">			  
			  			<view class="">		  
			  				<view class="title">	  
			  					出生日期
			  				</view>
			  				<view class="select_date">
			  					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
			  						<view class="date">{{date}} <image src="../../static/images/Chevron备份%202@2x.png" mode="" class="point"></image></view> 
			  					</picker>
			  				</view>
			  			</view>
			  		</view>
					<view class="tag">
						<view class="title">
							客户标签
							<image src="../../static/images/Chevron备份%202@2x.png" mode="" class="point"></image>
						</view>
						<view class="tag_sel">
							<view class="tag_one">
								白金会员
							</view>
							<view class="tag_two">
								潜力
							</view>
							<view class="tag_three">
								洽谈
							</view>
						</view>
					</view>
		</view>
		<!-- 表单底部 -->
		<view class="add_btm">
			<view class="title">
				备注
			</view>
			<view class="quil">
				 <textarea  maxlength=50 @input = "descInput" v-model="descirbe" placeholder="请输入您的内容~"/>
				 <view class="num">{{remnant}}/50</view>
			</view>
			<button type="primary" @click="save">保存</button>
		</view>
	</view>
</template>

<script>
	export default{
		components:{
		
		},
		data(){
			return {
				title: 'picker',
				index: 0,
				date: '', //生日
				remnant:0,
				head:'', //头像
				sex:0, //性别
				name:'', //名字
				phone:'', //电话
				card:'', //身份证
				mail:'', //邮箱
				address:'', //地址
				descirbe: ''//备注
				
			}
		},
		computed: {
		        startDate() {
		            return this.getDate('start');
		        },
		        endDate() {
		            return this.getDate('end');
		        }
		    },
			methods:{
				bindDateChange: function(e) {				
					this.date = e.target.value			
					},			
				getDate(type) {				
					const date = new Date();				
					let year = date.getFullYear();				
					let month = date.getMonth() + 1;				
					let day = date.getDate(); 			
						if (type === 'start') {				
							year = year - 60;			
					} else if (type === 'end') {			
						year = year + 2;				
					}
					month = month > 9 ? month : '0' + month;;				
					day = day > 9 ? day : '0' + day;				
					return `${year}-${month}-${day}`;			
					},
					//监听textarea字数
					 descInput(e){
						this.remnant = e.detail.value.length
					 },
					 //头像上传
					 upload(){
						 var that = this
						 uni.chooseImage({
						     count: 1, //默认9
						     sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						     sourceType: ['album'], //从相册选择
						     success: function (res) {
						         // console.log(JSON.stringify(res.tempFilePaths));
								that.head = res.tempFilePaths[0]
						     }
						 });
					 },
					 //性别选择单选
					 radio(e){
						 this.sex = e
					 },
					 //保存上传
					 save(){
						 // console.log(this.head,this.card,this.sex,this.phone,this.mail,this.address,this.descirbe)
						 // console.log(this.date)
					 }
			}
	}
</script>

<style lang="less" scoped>
	//表单上部
	.add_top {
		.area_inp {
			background-color: rgb(240, 242, 245);
			.area_title{
				width: 30%;
				float: left;
				padding: 30rpx 0 0 30rpx;
				box-sizing: border-box;
				background-color: rgb(240, 242, 245);
				height: 80rpx;
			}
			.area_father{
				width: 70%;
				background-color: rgb(240, 242, 245);
				height: 80rpx;
				float: right;
				padding-top: 30rpx;
				.area{
					width: 70%;
					float: left;
					background-color: rgb(240, 242, 245);
					height: 100%;
					padding-right: 30rpx;
					box-sizing: border-box;
					position: relative;
				}
			}
		}
		.add_inp {
			overflow: hidden;
			background-color: rgb(240, 242, 245);
			.title {
				width: 30%;
				float: left;
				line-height: 130rpx;
				padding-left: 30rpx;
				box-sizing: border-box;
				background-color: rgb(240, 242, 245);
				height: 130rpx;
				text{
					color: red;
				}
			}
			.uni-input {
				width: 70%;
				float: left;
				line-height: 130rpx;
				background-color: rgb(240, 242, 245);
				height: 130rpx;
				padding-right: 30rpx;
				box-sizing: border-box;
				position: relative;
				.cir {
					width: 100rpx;
					height: 100rpx;
					// border: 1px solid #333;
					border-radius: 50%;
					position: absolute;
					left: 0;
					top: 50%;
					overflow: hidden;
					transform: translate(0,-50%);
					position: relative;
					.cinema{
						width: 25pt;
						height: 19pt;
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%,-50%);
					}
					.head {
						width: 100%;
						height: 100%;
					}
				}
			.point{
				width: 8pt;
				height: 13pt;
				position: absolute;
				top: 50%;
				right: 30rpx;
				transform: translate(0,-50%);
			}
			}
		}
	}
	//表单中部
	.add_mid {
		margin-top: 20rpx;
		
		.bir{
			overflow: hidden;
			background-color: rgb(240, 242, 245);
			position: relative;
			.title{
				width: 30%;
				float: left;
				height: 130rpx;
				padding-left: 30rpx;
				box-sizing: border-box;
				line-height: 130rpx;
				position: relative;
			}
			.date{
				width: 70%;
				float: left;
				height: 130rpx;
				line-height: 130rpx;
				.point{
					width: 8pt;
					height: 13pt;
					position: absolute;
					top: 50%;
					right: 30rpx;
					transform: translate(0,-50%);
				}
			}
		}
		.tag{
			background-color: rgb(240, 242, 245);
			.title{
				padding: 30rpx 0 30rpx 30rpx;
				position: relative;
				.point{
					width: 8pt;
					height: 13pt;
					position: absolute;
					top: 50%;
					right: 30rpx;
					transform: translate(0,-50%);
				}
			}
			.tag_sel{
				width: 100%;
				box-sizing: border-box;
				padding: 0 30rpx 30rpx 30rpx;
				display: flex;
				justify-content: space-between;
				view {
					padding:  18rpx 0;
					width: 218rpx;
					height: 30rpx;
					border-radius: 40rpx;
					background-color: red;
					color: white;
					text-align: center;
					line-height: 30rpx;
				}
				.tag_one {
					background-color: #C59A76;
				}
				.tag_two {
					background-color: #F9A94C;
				}
				.tag_three {
					background-color: #EB7054;
				}
			}
		}
	}
	// 表单底部
	.add_btm {
		margin-top: 20rpx;
		padding: 0 30rpx 30rpx 30rpx;
		background-color: rgb(240, 242, 245);
		.title{
			padding: 30rpx 0;
		}
		.quil{
			height: 210rpx;
			background-color: white;
			box-sizing: border-box;
			padding: 30rpx;
			position: relative;
			border-radius: 10rpx;
			textarea{
				height: 100%;
				width: 100%;
			}
			.num {
				position: absolute;
				right: 3%;
				bottom: 5%;
				font-size: 28rpx;
			}
		}
		button {
			width: 90%;
			margin: 0 auto;
			height: 80rpx;
			line-height: 80rpx;
			border-radius: 40rpx;
			background-color: #C59A76;
			margin-top: 60rpx;
		}
	}
</style>
