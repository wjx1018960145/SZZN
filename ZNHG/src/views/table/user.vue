<template>
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
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table :data='users' highlight-current-row style="width: 100%;">
        <!--<el-table-column type="selection" width="55">-->
        <!--</el-table-column>-->
        <el-table-column type="index" width="60">
        </el-table-column>
        <el-table-column prop="nick" label="昵称" width="120" sortable>
        </el-table-column>
        <el-table-column prop="userid" label="账号" width="180" sortable>
        </el-table-column>
        <el-table-column prop="position" label="职务" width="100" sortable>
        </el-table-column>
        <el-table-column prop="headImg" label="头像"  width="100">
        </el-table-column>
        <el-table-column prop="phone" label="联系方式" min-width="100">
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <!--编辑页面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible" >
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="昵称" prop="name">
          <el-input v-model="editForm.nick" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="editForm.userid" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="职务">
          <el-input   v-model="editForm.position"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input  v-model="editForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="新增"  :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="昵称" prop="nick">
          <el-input v-model="addForm.nick" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="userid">
          <el-input v-model="addForm.userid"  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userid">
          <el-input type="password"  v-model="addForm.psw"  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-checkbox-group  v-model="checkList">
            <el-checkbox v-for="check in checkRoust"  v-if="check.isUse==0" disabled >{{check.name}}</el-checkbox>
            <el-checkbox  v-else="check.isUse==1" :key="check.id" :label="check.id" @change="checkinlist">{{check.name}}</el-checkbox>
            <!--<el-checkbox label="复选框 B"></el-checkbox>-->
            <!--<el-checkbox label="复选框 C"></el-checkbox>-->
            <!--<el-checkbox label="禁用" disabled></el-checkbox>-->
            <!--<el-checkbox label="复选框 C"></el-checkbox>-->
            <!--<el-checkbox label="禁用" disabled></el-checkbox>-->
            <!--<el-checkbox label="复选框 C"></el-checkbox>-->
            <!--<el-checkbox label="禁用" disabled></el-checkbox>-->
            <!--<el-checkbox label="选中且禁用" disabled></el-checkbox>-->
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="职务">
          <el-input v-model="addForm.position" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="联系方式">
          <el-input v-model="addForm.phone" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>

import {getAllAcountInfo} from '../../api/accountcfg'
import {mapGetters} from 'vuex'
export default {
    data(){
        return {
          input10: '',
          listLoading: true,
          editLoading:false,
          editFormVisible:false,
          users: [],
          checkList:[],
          checkRoust:[],
          filters:{
              name:''
          },
          editForm:{
            nick:'',
            userid:'',
            position:'',
            phone:''
          },
          editFormRules: {
            nick: [
              { required: true, message: '请输入姓名', trigger: 'blur' }
            ],
            position: [
              { required: true, message: '请输入职务', trigger: 'blur' }
            ],
            phone: [
              { required: true, message: '请输入联系方式', trigger: 'blur' }
            ]
          },
          addFormVisible: false,//新增界面是否显示
          addLoading: false,
          addFormRules: {
            name: [
              { required: true, message: '请输入姓名', trigger: 'blur' }
            ]
          },
          //新增界面数据
          addForm: {
            nick: '',
            userid: '',
            psw:'',
            position: '',
            phone: '',

          }
        }
    },
  created() {
    this.fetchData()
  },
  computed:{
    ...mapGetters([
      'SET_USERLIST'
    ])

  },
  methods:{
    fetchData(){
      this.listLoading = true
      this.$store.dispatch('GetAllAccound').then(()=>{
        this.listLoading=false
        this.users  = this.$store.getters.userlist
      }).catch(()=>{
        this.listLoading
      })
    },
    handleEdit: function (index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    editSubmit(){
      var _self = this
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            //alert(JSON.stringify(_self.jsonDatas))
            _self.$store.dispatch('UpdateAccound', _self.editForm).then(() => {
              _self.$refs['editForm'].resetFields();
              _self.editFormVisible = false;
              _self.fetchData()
            }).catch(() => {
              _self.editFormVisible = false;
            })
          })
        }
      })
    },
    handleDel(index, row) {
      var _self = this
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            //alert(JSON.stringify(_self.jsonDatas))
            let para = { id: row.id };
            _self.$store.dispatch('DelAccound',para).then(() => {
             // this.dialogVisible = false;
              _self.fetchData()
            }).catch(() => {
            })
          })
    },
    getUsers(){
    },
    handleAdd(){
        var  _self = this
      this.$store.dispatch('GetAllRole').then(() => {
        _self.checkRoust = this.$store.getters.roleList

        this.addFormVisible = true;
      }).catch((error) => {
        console.log(error)
      })


    },
    addSubmit(){
      var _self = this
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            //alert(JSON.stringify(_self.jsonDatas))
            _self.$store.dispatch('AddAccound', [_self.addForm,{'roleArr':JSON.stringify( _self.checkList)}]).then(() => {
              _self.$refs['addForm'].resetFields();
              _self.addFormVisible = false;
              _self.fetchData()
            }).catch(() => {
              _self.addFormVisible = false;
            })
          })
        }
      })
    },
    checkinlist(){
    console.log(this.checkList)
    }
  },
  components:{

  },

}
</script>

<style>
.toolbar{
  margin-left: 10px;
  margin-top: 10px;
  margin-right: 200px;
}
</style>
