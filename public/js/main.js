/**
 * Created by Administrator on 2017/8/14.
 */

/**
 * 全局函数
 * */
let globalFunc = {

	//禁言、取消函数封装
	banFunc(that, ban){
		let data = {
			idGroups: [],
			indexGroups: []
		}
		for (let i = 0; i < that.multipleSelection.length; i++) {
			if (ban === that.multipleSelection[i].status) {
				data.indexGroups.push(i)
				data.idGroups.push(that.multipleSelection[i].id)
			}
		}
		return data
	},
}

let content


/**
 * 切换APP对象
 * */
new Vue({
	el: '#top_app',
	data: {
		apps: [{
			id: 1,
			name: '潮南'
		}, {
			id: 2,
			name: '潮汕'
		}, {
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
 * 所有模版
 * */

const templateAll = {
	/**
	* 用户列表模版
	* */
	userTemplate: `
<div>
	<div v-if="loading">
		<div class="text-center" style="font-size: 22px!important;">
			<i class="el-icon-loading"></i>
			<p>加载中···</p>
		</div>
	</div>
	<div v-if="error">
		<p>{{error}}</p>
	</div>
	
	<!--正式内容-->
	<div v-if="userList">
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
		<div class="user-list-wrap">
		  <div style="margin-bottom: 20px">
		    <el-button @click="userBanAll">禁言</el-button>
		    <el-button @click="userReleaseAll">取消禁言</el-button>
		  </div>
		  <el-table ref="multipleTable" :data="userList" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" stripe>
	        <el-table-column type="selection" width="55"></el-table-column>
	        <el-table-column prop="id" label="ID" min-width="200"></el-table-column>
	        <el-table-column prop="name" label="姓名" width="250px"></el-table-column>
		    <el-table-column prop="publish_times" label="发布次数" width="130"></el-table-column>
		    <el-table-column prop="comment_times" label="评论次数" width="130"></el-table-column>
		    <el-table-column label="状态" width="130">
			    <template scope="scope">{{ scope.row.status == 1? '正常':'禁言中' }}</template>
		    </el-table-column>
	        <el-table-column prop="operate" label="操作" width="130">
	            <template scope="scope">
	                <el-button type="text" size="small" @click="userBan(scope.$index, scope.row.id)">{{ scope.row.status == 1? '禁言':'取消' }}</el-button>
	                <el-button type="text" size="small" @click="goToUser(scope.row.id)">查看发布</el-button>
	            </template>
	        </el-table-column>
	      </el-table>
		</div>
	  <div class="index-page">
	    <el-pagination @current-change="currentPage" :current-page.sync="currentPages" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
	    </el-pagination>
	  </div>
	</div>
	<!--/正式内容-->
</div>
`,
}

/**
* 所有组件
* */

/**
* 用户列表组件
* */
const UserList = {
	template: templateAll.userTemplate,
	data(){
		return {
			title: '用户列表',
			input: '',
			select: '',
			userList: null,
			loading: true,
			error: null,
			multipleSelection: [],
			currentPages: 10
		}
	},
	created(){
		setTimeout(() => {
			this.loading = false
			this.userList = [{
				id: 'oP5UA0YvNDX7MdYZxmikqVSjFPDo',
				name: '王小虎',
				publish_times: 12,
				comment_times: 1,
				status: 1
			}, {
				id: 'oP5UA0YvNDX7MdYZxmikqVSjFPDo',
				name: '王小虎',
				publish_times: 12,
				comment_times: 1,
				status: 1
			}, {
				id: 'oP5UA0YvNDX7MdYZxmikqVSjFPDo',
				name: '王小虎',
				publish_times: 12,
				comment_times: 1,
				status: 2
			}, {
				id: 'oP5UA0YvNDX7MdYZxmikqVSjFPDo',
				name: '王小虎',
				publish_times: 12,
				comment_times: 1,
				status: 2
			}, {
				id: 'oP5UA0YvNDX7MdYZxmikqVSjFPDo',
				name: '王小虎',
				publish_times: 12,
				comment_times: 1,
				status: 1
			}, {
				id: 'oP5UA0YvNDX7MdYZxmikqVSjFPDo',
				name: '王小虎',
				publish_times: 12,
				comment_times: 1,
				status: 1
			}, {
				id: 'oP5UA0YvNDX7MdYZxmikqVSjFPDo',
				name: '王小虎',
				publish_times: 12,
				comment_times: 1,
				status: 1
			}]

		}, 1000)
	},
	methods: {
		search(){
			console.log(this.select, this.input)
		},

		//全体用户禁言
		userBanAll(){
			if (this.multipleSelection.length) {
				this.$confirm('确定禁言所选用户吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'info'
				}).then(() => {
					let dataObj = globalFunc.banFunc(this, 1)
					/**
					 * 留空请求
					 * */
					let indexs = dataObj.indexGroups
					for (let i = 0; i < indexs.length; i++) {
						this.multipleSelection[indexs[i]].status = 2
					}
					this.$message({
						type: 'success',
						message: '禁言成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消禁言'
					});
				})
			}
		},

		//全体用户禁言取消
		userReleaseAll(){
			if (this.multipleSelection.length) {
				this.$confirm('确定对所选用户解除禁言吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'info'
				}).then(() => {
					let dataObj = globalFunc.banFunc(this, 2)
					/**
					 * 留空请求
					 * */
					let indexs = dataObj.indexGroups
					for (let i = 0; i < indexs.length; i++) {
						this.multipleSelection[indexs[i]].status = 1
					}
					this.$message({
						type: 'success',
						message: '解除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消解除'
					});
				})
			}
		},

		//单用户禁言
		userBan(index, id){
			if (1 === this.userList[index].status) {
				this.$confirm('确定禁言该用户吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'info'
				}).then(() => {
					this.userList[index].status = 2
					this.$message({
						type: 'success',
						message: '禁言成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消禁言'
					});
				})
			} else if (2 === this.userList[index].status) {
				this.$confirm('确定对该用户解除禁言吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'info'
				}).then(() => {
					this.userList[index].status = 1
					this.$message({
						type: 'success',
						message: '解除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消解除'
					});
				})
			}
		},
		toggleSelection(rows) {
			if (rows) {
				rows.forEach(row => {
					this.$refs.multipleTable.toggleRowSelection(row);
				});
			} else {
				this.$refs.multipleTable.clearSelection();
			}
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
			console.log(val)
		},

		//页面跳转
		goToUser(id){
			this.$router.push({path: '/bar', query: {id: id}})
		},

		//当前页码
		currentPage(current){
			console.log(current)
		}
	}
}

const test = {
	template: '<div>hello</div>'
}

/**
* 路由编写
* */
const routes = [
	{path: '/user/list', component: UserList},
	{path: '/bar', component: test}
]
const router = new VueRouter({
	routes // （缩写）相当于 routes: routes
})


/**
* vue实例
* */
new Vue({
	el: '#index_content',
	data: {
		unique: true,
		isRouter: true,
		input: '',
		select: '请选择',
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
				type: "get", //jquey是不支持post方式跨域的
				async: false,
				url: "https://api.douban.com/v2/movie/in_theaters", //跨域请求的URL
				dataType: "jsonp",
				//传递给请求处理程序，用以获得jsonp回调函数名的参数名(默认为:callback)
				jsonp: "callback",
				//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
				jsonpCallback: "success_jsonpCallback",
				//成功获取跨域服务器上的json数据后,会动态执行这个callback函数
				success: function (json) {
					console.log(json)
				}
			});

		},
	},
	router
})