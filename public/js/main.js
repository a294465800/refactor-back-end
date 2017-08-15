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
		changeApp(command) {
			this.current = command
		}
	}
})


/**
* 左侧导航
* */

//所有模版
const templateAll = {
	userTemplate: `
<div>
	<el-breadcrumb separator="/">
	  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
	  <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
	</el-breadcrumb>
	<div class="search-input">
	  <el-input placeholder="请输入内容" v-model="input">
	    <el-select v-model="select" slot="prepend" placeholder="请选择">
	      <el-option label="ID" value="1"></el-option>
	      <el-option label="时间" value="2"></el-option>
	      <el-option label="订单" value="3"></el-option>
	    </el-select>
	    <el-button slot="append" icon="search" @click="search"></el-button>
	  </el-input>
	</div>
</div>
`,
}

const UserList = {
		template: templateAll.userTemplate,
		data(){
			return {
				title: '用户列表',
				input: '',
				select: ''
			}
		},
		methods: {
			search(){
				console.log(this.select, this.input)
			}
		}
	}

const routes = [
	{ path: '/user/list', component: UserList }
]
const router = new VueRouter({
	routes // （缩写）相当于 routes: routes
})

new Vue({
	el: '#index_content',
	data: {
		unique: true,
		isRouter: true,
		input: '',
		select: '秦选择'
	},
	methods: {
		loadUserList(){
			/*axios({
				// url: 'https://api.douban.com/v2/movie/subject/1764796',
				url: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.css',
				method: 'GET',
				/!*headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				responseType: 'json',
				withCredentials:false*!/
			}).then(function (res) {
				console.log(res)
			})*/

			$.ajax({
				type : "get", //jquey是不支持post方式跨域的
				async: false,
				url : "https://api.douban.com/v2/movie/in_theaters", //跨域请求的URL
				dataType : "jsonp",
				//传递给请求处理程序，用以获得jsonp回调函数名的参数名(默认为:callback)
				jsonp: "callback",
				//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
				jsonpCallback:"success_jsonpCallback",
				//成功获取跨域服务器上的json数据后,会动态执行这个callback函数
				success : function(json){
					console.log(json)
				}
			});

		},
		/*test(a){
			console.log(1, a)
		}*/
	},
	router
})