<template>
  <section>
    <el-tabs type="card" @tab-click="handleClick" active-name="1">
      <!--角色管理-->
      <el-tab-pane name="1">
        <span slot="label"><i class="el-icon-date"></i> 角色管理</span>
        <el-transfer v-model="targetKeys" :data="source" :titles="titles" @change="change"></el-transfer>
        <br/>
        <!--	<transferFrame :source="source" :listTitle="titles" :targetKeys="targetKeys" :search="true" searchPlaceholder="请输入搜索内容" @change="change2">
                    <div :style="{float: 'right', margin: '5px'}">
                    </div>
                </transferFrame><br />-->
        <el-button size='small' @click="addrole">添加角色</el-button>
        <el-button size='small' @click="deleterole">删除角色</el-button>
      </el-tab-pane>
      <!--权限管理-->
      <el-tab-pane label="权限管理" name="2">
        <el-transfer v-model="permissionvalue" :titles="titles1" :data="permissiondata" @change="chang1"></el-transfer>
        <br/>
        <el-button size='small' @click="addpermission">添加权限</el-button>
        <el-button size='small' @click="deletepermission">删除权限</el-button>
      </el-tab-pane>
      <!--管理员与角色-->
      <el-tab-pane label="权限-角色" name="3">

        <!--<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>-->
        <el-breadcrumb separator="/">
          <!--<el-breadcrumb-item><i class="el-icon-setting"></i> 自述</el-breadcrumb-item>-->
        </el-breadcrumb>
        <div class="ms-doc1">
          <h3>角色-权限 <i class="el-icon-remove-outline" style="float: right;margin-right: 0px;margin-top: 1px;"
                       @click="remoperforrole"></i> <i class="el-icon-circle-plus-outline"
                                                       style="float: right;margin-right: 20px;margin-top: 1px;"
                                                       @click="addperforrole"></i></h3>

          <article>
            <!--style="width: 20%;height: 100%;margin-left: 5px; float: left;border: groove #D8D8D8 1px; "-->
            <el-tree :data="data2" :props="defaultProps" accordion @node-expand="handleNodeClick"
                     @node-collapse="nodecollapse" @node-click="handleNodeLeafClick"></el-tree>
          </article>
        </div>
        <div class="ms-doc">
          <h3>README.md</h3>
          <article>
            <!--<h1>账号为admin的才能看到这个页面</h1>-->
            <!--<h1>账号为admin的才能看到这个页面</h1>-->
            <!--<h1>账号为admin的才能看到这个页面</h1>-->
            <!--<h1>账号为admin的才能看到这个页面</h1>-->
            <!--<h1>账号为admin的才能看到这个页面</h1>-->
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="userid" label="用户id" width="180"></el-table-column>
              <el-table-column prop="nick" label="昵称" width="180"></el-table-column>
              <el-table-column prop="roleper" label="角色权限"></el-table-column>
            </el-table>
            <!--<div style="float: left;background-color: #8c939d;width:800px;height: 1000px">-->
            <!--</div>-->
          </article>
        </div>
        <!--<router-view></router-view>-->
      </el-tab-pane>
      <!--角色与人员-->
      <!--<el-tab-pane label="角色-人员" name="4">历史日志</el-tab-pane>-->
    </el-tabs>
    <!--角色新增界面-->

    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="98px" :rules="addFormRules" ref="addForm">
        <el-form-item label="角色id" prop="id">
          <el-input v-model="addForm.id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否立即启用">
          <el-radio-group v-model="addForm.isUse">
            <el-radio class="radio" :label="1">是</el-radio>
            <el-radio class="radio" :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="角色创建者">
          <el-input v-model="addForm.operator" placeholder="自动获取当前登陆者信息" :disabled="true"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input type="textarea" v-model="addForm.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false, addLoading=false">取消</el-button>
        <el-button type="primary" @click="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
    <!--权限新增界面-->
    <el-dialog title="新增" :visible.sync="addPermissionFormVisible" :close-on-click-modal="false">
      <el-form :model="addPermissionForm" label-width="98px" :rules="addPermissionFormRules" ref="addPermissionForm">
        <el-form-item label="权限id" prop="id">
          <el-input v-model="addPermissionForm.id" placeholder="例如p01" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="addPermissionForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否立即启用">
          <el-radio-group v-model="addPermissionForm.isUse">
            <el-radio class="radio" :label="1">是</el-radio>
            <el-radio class="radio" :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="权限创建者">
          <el-input v-model="addPermissionForm.operator" placeholder="自动获取当前登陆者信息" :disabled="true"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input type="textarea" v-model="addPermissionForm.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addPermissionFormVisible = false, addPermissionLoading=false">取消</el-button>
        <el-button type="primary" @click="addPermissionSubmit" :loading="addPermissionLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--角色删除页面-->
    <el-dialog title="删除" :visible.sync="delFormVisible" :close-on-click-modal="false">
      <el-form :model="delForm" label-width="98px" :rules="delFormRules" ref="delForm">
        <el-form-item label="角色id" prop="id">
          <el-input v-model="delForm.id" placeholder="例如r01" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="delFormVisible = false, delLoading=false">取消</el-button>
        <el-button type="primary" @click="delSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--权限页面-->
    <el-dialog title="删除" :visible.sync="delPermissionFormVisible" :close-on-click-modal="false">
      <el-form :model="delPermissionForm" label-width="98px" :rules="delPermissionFormRules" ref="delPermissionForm">
        <el-form-item label="权限id" prop="id">
          <el-input v-model="delPermissionForm.id" placeholder="例如p01" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="delPermissionFormVisible = false, delPermissionFormLoading=false">取消</el-button>
        <el-button type="primary" @click="delPermissionSubmit" :loading="delPermissionFormLoading">提交</el-button>
      </div>
    </el-dialog>
    <!--根据角色添加相应的权限-->
    <el-dialog title="新增" :visible.sync="addPerFormVisible" :close-on-click-modal="false">
      <el-form :model="addPerForm" label-width="180px" :rules="addPerFormRules" ref="addPerForm">
        <el-form-item label="当前角色id为">
          <el-tag type="danger">{{this.tmpRole}}</el-tag>
          <el-tag type="success">{{this.tmpId}}</el-tag>
        </el-form-item>
        <el-form-item label="选择权限" prop="name">
          <el-dropdown split-button @command="handleCommand">
            下拉菜单

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item, index) in dropdown" :command="item.id">
                {{item.name}}

              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>
        <el-form-item label="选项" prop="temp">
          <el-tag v-model="temp" type="success">{{temp}}</el-tag>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addPerFormVisible = false, addLoading=false">取消</el-button>
        <el-button type="primary" @click.native="addRolePerSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
    <!--删除一个权限-->
    <el-dialog
      title="提示"
      :visible.sync="deletePerForRole"
      width="30%"
      @close="closeDia">
      <el-form :model="addPerForm" label-width="80px" :rules="addPerFormRules" ref="addPerForm">
        <h1>如果没有选项请刷新角色分支</h1>
        <el-form-item label="选择权限 ">
          <el-radio-group v-model="radio2">
            <h1>
              <el-radio v-for="perradio in perRadios" :label="perradio.pid" @change="chickRadio">{{perradio.name}}

              </el-radio>
            </h1>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="deletePerForRole = false">取 消</el-button>
    <el-button type="primary" @click="deletePerForRoleSubmit">删 除</el-button>
  </span>
    </el-dialog>
  </section>

</template>
<script>
  import {mapGetters} from 'vuex'
  import {getToken, setToken, removeToken} from '../../utils/auth'
  import {addPer} from '../../api/rolepermission'
  import Request from '../../api/http.js';
  import NProgress from 'nprogress'
  export default{
    data(){
      return {
        activeName2: 'first',
        editFormVisible: false, //编辑界面是否显示
        addFormVisible: false, //新增界面是否显示
        delFormVisible: false, //删除界面是否显示
        delPermissionFormVisible: false, //删除权限
        addPermissionFormVisible: false, //添加权限
        addLoading: false,
        addPermissionLoading: false,
        delLoading: false,
        delPermissionFormLoading: false,
        addPerFormVisible: false,
        deletePerForRole: false,
        loading2: false,
        dic: [],
        dic1: [],
        permissionvalue: [],
        permissiondata: [],
        dropdown: [],
        perRadios: [],
        uiarr: [],
        tagevalue: '',
        uiarr: [],
        temp: '',
        tmpRole: '',
        tmpRadio: '',
        tmpId: '',
        radio2: '',
        tmpIndex: '',
        data2: [],
        tableData: [],
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'rid',
          pid: 'pid',

        },
        addPerForm: {
          name: '',
          temp: 'test'

        },
        addFormRules: {
          name: [{
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
          }],
          id: [{
            required: true,
            message: '请输入id',
            trigger: 'blur'
          }],

        },
        addPermissionFormRules: {
          name: [{
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
          }],
          id: [{
            required: true,
            message: '请输入id',
            trigger: 'blur'
          }]

        },
        delFormRules: {
          id: [{
            required: true,
            message: '请输入id',
            trigger: 'blur'
          }]
        },
        addPerFormRules: {
          name: [{
            required: true,
            message: '请选择权限',
            trigger: 'blur'
          }]
        },
        delPermissionFormRules: {
          id: [{
            required: true,
            message: '请输入id',
            trigger: 'blur'
          }]
        },
        //新增界面数据
        addForm: {
          id: 'r01',
          name: '实习编辑',
          isUse: 0,
          operator: getToken(),
          description: ''
        },
        addPermissionForm: {
          id: '',
          name: '',
          isUse: 0,
          operator: getToken(),
          description: ''
        },
        delForm: {
          id: ''
        },
        delPermissionForm: {
          id: ''
        },
        //编辑界面数据
        editForm: {
          name: -1,
          operator: 'admin',
          description: ''
        },
        addPerForm: {},
        source: [],
        titles: ['未启用', '已启用'],
        titles1: ['未启用', '已启用'],
        targetKeys: []
      };
    },
    computed: {
      ...mapGetters([
        'SET_ROLELIST'
      ])

    },
    created() {
      this.getMockData("1")
    },
    methods: {
      closeDia(){
        this.radio2 = ''
        this.tmpRadio = ''
      },
      handleCommand(command) {
        this.temp = command
      },
      chickRadio(radio){
        this.tmpRadio = radio
      },
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      nodecollapse(){
        this.tmpRole = ''
        this.radio2 = ''
      },
      handleNodeClick(obj, node, nodes){
//        if (!node.isLeaf){
//          alert(12312)
//
//        }
        //alert(node)
        console.log(obj)
        if (!node.isLeaf) {
          for (var index in this.data2) {
            // alert(data)
            //this.data2[index].children.push({id:'21',name:'ces'})
            if (this.data2[index].id == obj.id) {
              //查询完毕后赋值
              var _self = this
              this.tmpRole = obj.name
              this.tmpId = obj.rid
              this.tmpIndex = index
              var params = 'id=' + obj.rid
              NProgress.start();
              Request.requestgetPermissionWithRoleid(params).then(function (response) {
                NProgress.done();
                var mockDatas = [];
                var perDatas = []
                var rouse = response.data
                if (rouse.code == "000000") {
                  _self.data2[_self.tmpIndex].children = []
                  // alert(tmpIndex)
                  console.log(_self.data2[_self.tmpIndex].children)
                  _self.data2[_self.tmpIndex].children = rouse.body
//                  for (var next in rouse.body) {
//                    _self.data2[tmpIndex].children.push(rouse.body[next])
//                  }
                  console.log(_self.data2[_self.tmpIndex].children)

                  for (var index in  rouse.body) {
                    perDatas.push({
                      name: rouse.body[index]['name'],
                      pid: rouse.body[index]['pid'],
                      rid: rouse.body[index]['rid']
                    })
                  }


                  for (var index in rouse.permissions) {
                    mockDatas.push({
                      name: rouse.permissions[index]['name'],
                      id: rouse.permissions[index]['pid']
                    })
                  }
                  _self.dropdown = mockDatas
                  _self.perRadios = perDatas
                  var params = "roleid=" + obj.rid
                  Request.requestaddRoleForU(params).then((res) => {
                    var dic = res.data
                    if (dic.code == "000000") {
                       _self.tableData = []
                      _self.tableData = dic.body
                    } else {
                      _self.tableData = []
                      _self.$message({
                        message: dic.msg,
                        type: 'error'
                      });
                    }

                  }).catch(() => {

                  })


                } else {
                  _self.$message({
                    message: rouse.msg,
                    type: 'warning'
                  });
                }
              }).catch(function (errors) {
                alert(errors)
                NProgress.done();
              })
            }
          }
        }


      },
      handleNodeLeafClick(obj, node, nodes){

      },
      handleClick(tab, event) {
        //NProgress.start()
        this.getMockData(tab.name)
        //console.log(tab.name, event);
      },
      getMockData(value){
        var _self = this
        if (value == "1") {
          this.$store.dispatch('GetAllRole').then(() => {
            _self.dic = this.$store.getters.roleList
            let mockData = []; //已经启用的角色
            let mockData1 = []; //未启用的角色
            for (var index in _self.dic) {
              mockData.push({
                key: index,
                label: 'id ' + _self.dic[index]['id'] + ' ' + _self.dic[index]['name'],
              });
              if (_self.dic[index]['isUse'] == "1") {
                mockData1.push(index)
              }
            }
            _self.targetKeys = mockData1
            _self.source = mockData
          }).catch((error) => {
            console.log(error)
          })
          console.log(value)
        } else if (value == "2") {

          this.$store.dispatch('GetAllPer').then(() => {
            _self.dic1 = this.$store.getters.permissionList
            //_self.getMockData()
            let mockData = []; //已经启用的角色
            let mockData1 = []; //未启用的角色
            for (var index in _self.dic1) {
              mockData.push({
                key: index,
                label: 'id: ' + _self.dic1[index]["id"] + " " + _self.dic1[index]["name"]
              });
              if (_self.dic1[index]['isUse'] == "1") {
                mockData1.push(index)
              }
            }
            _self.permissiondata = mockData
            _self.permissionvalue = mockData1
          }).catch((error) => {
            alert(error)
          })
          console.log(value)
        } else if (value == "3") {
          var params = "type=" + value
          Request.requestgetStartRole(params).then(function (response) {
            var result = response.data;

            /*_this.dialogVisibleR = false
             _this.logining = false*/
            NProgress.done();
            if (result.code == "000000") {
              ///	_self.$message(result.msg);
              //跳转到相应的页面
              //alert(dic)
              _self.data2 = result.body
              console.log(_self.data2)
              //(_self.source)
              console.log(result)


            } else {
              //alert(dic)
              _self.$message(result.msg);
            }
          }).catch(function (errors) {
            alert(errors)
            NProgress.done();
          })
          console.log(value)
        } else if (value == "4") {
          console.log(value)
        }
        this.tmpRole = ''
        this.tmpRadio = ''
        this.radio2 = ''
      },
      addrole() {
        this.addFormVisible = true
      },
      deleterole() {
        this.delFormVisible = true
      },

      addpermission() {
        this.addPermissionFormVisible = true
      },
      deletepermission() {
        this.delPermissionFormVisible = true
      },
      addPermissionSubmit(){
        var _self = this
        this.$refs.addPermissionForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {

              _self.$store.dispatch('AddPer', _self.addPermissionForm).then((res) => {
                _self.$refs['addPermissionForm'].resetFields();
                _self.addPermissionFormVisible = false;
                _self.addLoading = false;
                _self.addPermissionLoading = false
                _self.getMockData('2')
              }).catch(() => {
                _self.addLoading = false;
                _self.$refs['addPermissionForm'].resetFields();
                _self.addPermissionFormVisible = false;
                _self.addPermissionLoading = false
                _self.getMockData('2')
              })

            });
          }
        });
      },
      delPermissionSubmit(){
        var _self = this
        this.$refs.delPermissionForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认删除吗？', '提示', {}).then(() => {
              _self.delLoading = true;
              this.$store.dispatch('DelPer', _self.delPermissionForm).then(() => {
                _self.$refs['delPermissionForm'].resetFields();
                _self.delPermissionFormVisible = false;
                _self.getMockData('2')
              }).catch(() => {
                _self.$refs['delPermissionForm'].resetFields();
                _self.delPermissionFormVisible = false;
                _self.getMockData('2')
              })
            });
          }
        });
      },

      chang1(data, direction, keys){
        console.log(data);
        console.log("" + direction)
        var _self = this
        //alert(newTargetKeys)
        var list = []
        for (var index in data) {
          list.push(this.dic1[data[index]])
        }
        var keystokey = []
        for (var index in keys) {
          keystokey.push(this.dic1[keys[index]])
        }
        var params = 'keys=' + JSON.stringify(keystokey) + '&direction=' + direction + '&list=' + JSON.stringify(list) + '&dataSouces=' + JSON.stringify(this.dic1)
        Request.requestchangPermission(params).then(function (response) {
          NProgress.done();
          var result = response.data;
          if (result.code == "000000") {
          } else {
            _self.$message(result.msg);
          }
          _self.getMockData('2')
        }).catch(function (errors) {
          alert(errors)
        })
        list = [];
      },
      change(data, direction, keys) {
        console.log('@@@@' + data);
        console.log("%%%%" + direction)
        console.log("#####" + keys)
        var _self = this
        //alert(newTargetKeys)
        var list = []
        for (var index in data) {
          list.push(this.dic[data[index]])
        }
        var keystokey = []
        for (var index in keys) {
          keystokey.push(this.dic[keys[index]])
        }

        var params = 'keys=' + JSON.stringify(keystokey) + '&direction=' + direction + '&list=' + JSON.stringify(list) + '&dataSouces=' + JSON.stringify(this.dic)

        Request.requestchangRole(params).then(function (response) {
          NProgress.done();
          var result = response.data;
          if (result.code == "000000") {
            //_self.$message(result.msg);

          } else {
            _self.$message(result.msg);
          }
          _self.getMockData('1')
        }).catch(function (errors) {
          alert(errors)
        })
        list = [];

      },
      addSubmit(){
        var _self = this
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              _self.addLoading = true;
              _self.$store.dispatch('AddRole', _self.addForm).then((res) => {

                _self.$refs['addForm'].resetFields();
                _self.addFormVisible = false;
                _self.getMockData('1')
              }).catch(() => {
                _self.$refs['addForm'].resetFields();
                _self.addLoading = false;
                // NProgress.done();
                _self.addFormVisible = false;
                _self.getMockData('1')
              })
            });
          }
        });
      },
      delSubmit(){
        var _self = this
        this.$refs.delForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认删除吗？', '提示', {}).then(() => {
              _self.delLoading = true;
              this.$store.dispatch('DelRole', _self.delForm).then(() => {
                _self.$refs['delForm'].resetFields();
                _self.delFormVisible = false;
                _self.getMockData('1')
              }).catch(() => {
                _self.$refs['delForm'].resetFields();
                _self.delFormVisible = false;
              })
            });
          }
        });
      },
      addperforrole(){
        if (this.tmpRole) {
          this.addPerFormVisible = true;
        } else {
          this.$message.error('请先选定角色');
        }
      },
      addRolePerSubmit(){
        if (!this.temp) {
          this.$message.error('请选择权限');
        } else {
          var _self = this
          var params = 'rid=' + this.tmpId + '&pid=' + this.temp
          NProgress.start();
          this.addLoading = true
          Request.requestaddPermissionWithRoleid(params).then(function (response) {
            NProgress.done();
            _self.addLoading = false
            _self.addPerFormVisible = false
            var dic = response.data
            if (dic.code == "000000") {
              _self.$message(
                {
                  message: dic.msg,
                  type: 'success'
                }
              );
              for (var index in _self.dropdown) {
                if (_self.dropdown[index].id == _self.temp) {
                  _self.data2[_self.tmpIndex].children.push({pid: _self.temp, name: _self.dropdown[index].name})
                  console.log(_self.dropdown[index].id)
                }
              }


              // _self.requestData(_self.$route.query.num)
            } else {
              _self.$message(dic.msg);
              //_self.requestData(_self.$route.query.num)
            }
          }).catch(function (errors) {
            NProgress.done();
            _self.addLoading = false
            _self.addPerFormVisible = false
            _self.$message(errors);

          })
        }
      },

      remoperforrole(){
        if (this.tmpRole) {
          this.deletePerForRole = true;
        } else {
          this.$message.error('请先选定角色');
        }
      },
      deletePerForRoleSubmit(){
        if (!this.tmpRadio) {
          this.$message.error('请勾选要删除的权限');
        } else {
          var _self = this
          NProgress.start();
          var params = 'rid=' + this.tmpId + '&pid=' + this.tmpRadio
          //alert(tag.pid)
          // alert(params)
          Request.requestdeletePermissionWithRoleid(params).then(function (response) {
            NProgress.done();
            var dic = response.data
            _self.deletePerForRole = false;
            if (dic.code == "000000") {
              _self.$message(
                {
                  message: dic.msg,
                  type: 'success'
                }
              );
              _self.data2[_self.tmpIndex].children = []
              for (var index in _self.perRadios) {
                if (_self.tmpRadio != _self.perRadios[index].pid) {
                  _self.data2[_self.tmpIndex].children.push({pid: _self.temp, name: _self.dropdown[index].name})
                }
              }
            } else {
              _self.$message(dic.msg);
            }
          }).catch(function (errors) {
            alert(errors)
            NProgress.done();
          })

        }
      }

    }

  }
</script>
<style scoped>
  filter-tree {
    width: 30%;
    float: left;
  }

  .ms-doc {
    width: 79%;
    max-width: 980px;
    margin-left: 0px;
    float: left;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  }

  .ms-doc1 {
    width: 20%;
    max-width: 980px;
    margin-left: 5px;
    float: left;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  }

  .ms-doc h3 {
    padding: 9px 10px 10px;
    margin: 0;
    font-size: 14px;
    line-height: 17px;
    background-color: #f5f5f5;
    border: 1px solid #d8d8d8;
    border-bottom: 0;
    border-radius: 3px 3px 0 0;
  }

  .ms-doc1 h3 {
    padding: 9px 10px 10px;
    margin: 0;
    font-size: 14px;
    line-height: 17px;
    background-color: #f5f5f5;
    border: 1px solid #d8d8d8;
    border-bottom: 1px;
    /*margin-bottom: 1px;*/
    border-radius: 3px 3px 0 0;
  }

  .ms-doc article {
    padding: 45px;
    word-wrap: break-word;
    background-color: #fff;
    border: 1px solid #ddd;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  .ms-doc1 article {
    padding: 0px;
    word-wrap: break-word;
    background-color: #fff;
    border: 1px solid #ddd;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  .ms-doc article h1 {
    font-size: 32px;
    padding-bottom: 10px;
    margin-bottom: 15px;
    border-bottom: 1px solid #ddd;
  }

  .ms-doc article h2 {
    margin: 24px 0 16px;
    font-weight: 600;
    line-height: 1.25;
    padding-bottom: 7px;
    font-size: 24px;
    border-bottom: 1px solid #eee;
  }

  .ms-doc article p {
    margin-bottom: 15px;
    line-height: 1.5;
  }

  .ms-doc article .el-checkbox {
    margin-bottom: 5px;
  }
</style>
