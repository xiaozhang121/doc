<template>
	<view class="mine">
		
		<qb-footer :choose="2"></qb-footer>
	</view>
</template>

<script>
	import qbFooter from "@/components/qb-footer.vue"
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				
			}
		},
		components: {
			qbFooter
		},
		watch: {
			
		},
		computed: {...mapState(['avatar_url','user_name','level_type'])},
		onLoad(options) {
		},
		onShow() {
			this.initData();
		},
		onReady() {
		},
		methods: {
			initData(){
				
			}
		}
	}
</script>

<style lang="scss">
	.mine {
		min-height: 100%;
		
	}
</style>
