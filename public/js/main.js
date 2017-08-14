/**
 * Created by Administrator on 2017/8/14.
 */

/**
 * 切换APP对象
 * */
new Vue({
	el: '#top_app',
	data: {
		apps: [{
			id: 1,
			name: '潮南'
		},{
			id: 2,
			name: '潮汕'
		},{
			id: 3,
			name: '潮阳'
		}],
		current: 0
	},
	methods: {

		//修改当前APP
		changeApp: function (command) {
			this.current = command
		}
	}
})


/**
* 左侧导航
* */
new Vue({
	el: '#left_nav',

})