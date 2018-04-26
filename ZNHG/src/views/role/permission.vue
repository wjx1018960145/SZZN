<template>

	<section>

		<div style="margin-left: 168px;">
			<section>
				<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
					<el-form :inline="true" :model="filters">
						<el-form-item>
							<el-input v-model="filters.name" placeholder="姓名"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" v-on:click="getUsers">查询</el-button>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="addPermission">新增</el-button>
						</el-form-item>
					</el-form>
				</el-col>

			</section>
			<div>
				<el-tag v-for="tag in tags" :key="tag.name" :closable="true" :close-transition="false" :type="tag.type" @close="handleClose(tag)"> {{tag.name}} </el-tag><br/>
			</div>
		</div>
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="180px" :rules="addFormRules" ref="addForm">
				<el-form-item label="当前角色id为">
					<el-tag type="danger">{{this.$route.query.num}}</el-tag>
					<el-tag type="success">{{this.$route.name}}</el-tag>
				</el-form-item>
				<el-form-item label="选择权限" prop="name">
					<el-dropdown @command="handleCommand">
						<span class="el-dropdown-link">
    					下拉菜单<i class="el-icon-caret-bottom el-icon--right"></i></span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item v-for="(item, index) in dropdown" :command="item.id">
								{{item.name}}</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</el-form-item>
				<el-form-item label="选项" prop="temp">
					<el-tag v-model="temp" type="success">{{temp}}</el-tag>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false, addLoading=false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import NProgress from 'nprogress'
	import Request from '../../api/http.js';
	export default {
		data() {
			return {
				roleid: this.$route.query.num,
				headerUserName: '',
				addFormVisible: false,
				addLoading: false,
				tags: [],
				dropdown: [],
				temp: '    ',
				filters: {
					name: ''
				},
				addForm: {
					name: '',
					temp: 'test'

				},
				addFormRules: {
					name: [{
						required: true,
						message: '请选择权限',
						trigger: 'blur'
					}]
				},
			};
		},
		props: ['tagevalue'],
		created() {
			var _self = this
			eventBus.$on('eventBusName', function(val) {
				console.log(val)
				_self.requestData(val)
			})
		},
		beforeDestroy() {
			eventBus.$off('eventBusName');
		},
		methods: {
			getUsers() {

			},
			handleCommand(command) {
				this.temp = command
			},
			handleClose(tag) {
				var _self = this
				NProgress.start();
				var params = 'rid=' + this.$route.query.num + '&pid=' + tag.pid
				//alert(tag.pid)
				Request.requestdeletePermissionWithRoleid(params).then(function(response) {
					NProgress.done();
					var dic = response.data
					if(dic.code == "000000") {
						//已经启用的角色
						_self.$message(dic.msg);
						_self.tags.splice(_self.tags.indexOf(tag), 1);
						_self.requestData(_self.$route.query.num)
					} else {

						_self.$message(dic.msg);
					}
				}).catch(function(errors) {
					alert(errors)
					NProgress.done();
				})
			},
			addPermission() {
				this.addFormVisible = true
			},
			addSubmit() {
				var _self = this
				var params = 'rid=' + this.$route.query.num + '&pid=' + this.temp
				NProgress.start();
				this.addLoading = true
				Request.requestaddPermissionWithRoleid(params).then(function(response) {
					NProgress.done();
					_self.addLoading = false
					_self.addFormVisible = false
					var dic = response.data
					if(dic.code == "000000") {
						_self.$message(dic.msg);
						_self.requestData(_self.$route.query.num)
					} else {
						_self.$message(dic.msg);
						_self.requestData(_self.$route.query.num)
					}
				}).catch(function(errors) {
					NProgress.done();
					_self.addLoading = false
					_self.addFormVisible = false
					_self.$message(errors);

				})
			},
			requestData(id) {
				var _self = this
				var params = 'id=' + id
				NProgress.start();
				Request.requestgetPermissionWithRoleid(params).then(function(response) {
					NProgress.done();
					var dic = response.data
					if(dic.code == "000000") {
						//已经启用的角色
						let mockData = [];
						let mockDatas = [];
						for(var index in dic.body) {
							mockData.push({
								name: dic.body[index]['name'],
								type: 'gray',
								pid: dic.body[index]['pid']
							});
						}
						for(var index in dic.permissions) {
							mockDatas.push({
								name: dic.permissions[index]['name'],
								id: dic.permissions[index]['pid']
							})
						}
						_self.dropdown = mockDatas
						_self.tags = mockData
					} else {
						let mockData = [];
						for(var index in dic.permissions) {
							mockData.push({
								name: dic.permissions[index]['name'],
								id: dic.permissions[index]['pid']
							})
							_self.dropdown = mockData
							console.log(dic.permissions[index])
						}
						_self.$message(dic.msg);
						_self.dropdown = mockData
						_self.tags  = []
					}
				}).catch(function(errors) {
					alert(errors)

					NProgress.done();
				})
			}
		}

	}
</script>

<style>
	/*	<h1>权限详情{{ this.$route.query.num}}</h1>*/
</style>
