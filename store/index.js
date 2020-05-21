import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		login: false,
		user_id: '',
		avatar_url: '',
		user_name: '',
		city_select: '',
		level_type: '', //0 游客 1vip
		demo_getter: [],
		gender: 1, //性别
		taskId: {
			addQbStudy: '7fa10c72-ffe0-4eb4-950f-0f106fcd1f51',
			signInClazz: '051c9eae-a993-4a88-8eba-24a5e47836a2',
			onlineLogin: 'a932efd1-5369-4eea-94f8-a44cd30f6128',
			showAndNewIn: 'aaa72136-bce5-478a-83dc-1c6cfe4dc9b1',
			shareGoodtoGrounp: 'cffacca9-649b-4479-bd50-1845cc8f3170',
			shareClazztoGrounp: '83d0db30-6605-41d2-aea3-73f24e3033c6',
			watchThanFive: '2487c1f4-14c4-4390-a536-77236079f3b2',
		},
		cart_item: null, //下单缓存
		acla_time: 300, // 观看时长超过5min 5 * 60
		room_id: '', // 直播房间id
		
		tag:[], //添加标签模块的标签传递
		form:{} //添加客户模块的客户信息缓存
	},
	mutations: {
		login(state, provider) {
			state.login = true;
			state.user_id = provider.id;
			state.user_name = provider.nickname;
			state.avatar_url = provider.icon;
			state.level_type = provider.levelType;
			state.gender = provider.gender;
		},
		logout(state) {
			state.login = false;
			state.user_id = '';
			state.user_name = '';
			state.avatar_url = '';
		},
		setCitySelect(state, provider) {
			state.city_select = provider;
		},
		setCartItem(state, provider) {
			state.cart_item = provider;
		},
		becomeVip(state) {
			state.level_type = 1;
		},
		setRoomId(state, provider) {
			state.room_id = provider
		},
		// 添加标签模块的标签传递
		addtag(state,newval){
			state.tag = newval
		},
		// 添加客户模块的客户信息缓存
		savecustomer(state,newval){
			state.form = newval
		}
	},
	getters: { // store的计算属性,相当于页面中的computed
		demo: state => {
			return state.demo_getter.filter(item => item.done)
		}
	}
})
export default store;
