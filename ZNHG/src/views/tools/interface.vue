<template>
  <div class="components-container" style='height:100vh'>

    <div class="editor-container">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="">
          <el-input v-model="formInline.user" placeholder="接口名称"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="serachOneIF">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="AddIF">新增</el-button>
        </el-form-item>
      </el-form>

      <el-table
        :data="tableData5"
        style="width: 70%; float: left" row-key="name" :expand-row-keys="expands" @row-click="showdetail">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="接口名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="所属项目">
                <span>{{props.row.project }}</span>
              </el-form-item>
              <el-form-item label="接口 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="接口级别">
                <span>{{ props.row.rank }}</span>
              </el-form-item>
              <el-form-item label="接口创建者">
                <span>{{ props.row.author }}</span>
              </el-form-item>
              <el-form-item label="时间">
                <span>{{ props.row.ctime }}</span>
              </el-form-item>
              <el-form-item label="接口描述">
                <span>{{ props.row.des }}</span>
              </el-form-item>
              <el-form-item label="接口路径">
                <span>{{ props.row.path }}</span>
              </el-form-item>
              <el-form-item label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleCopy(props.row.name)">拷贝接口
                  </el-button>
                </template>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="接口 ID"
          prop="id">
        </el-table-column>
        <el-table-column
          label="接口名称"
          prop="name">
        </el-table-column>
        <el-table-column
          label="接口描述"
          prop="desc">
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template scope="scope">
            <!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
            <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>

      <json-editor class="json-editor" ref="jsonEditor" v-model="value"></json-editor>
      <!--添加接口的弹出框-->
      <el-dialog
        title="添加接口"
        :visible.sync="dialogVisible"
        width="72%"
        :before-close="handleClose">
        <div class="createPost-container">
          <sticky :className="'sub-navbar'">
            <template v-if="fetchSuccess">
              <div style="display:inline-block;background-color: #219BF6;width: 100% ;height: 45px">
                <el-button v-loading="loading"
                           style="float: right;margin-left: 10px;margin-top: 2.5px;margin-right: 10px" type="success"
                           @click="publishs">发布




                </el-button>
                <el-button v-loading="loading" style="float: right;margin-top: 2.5px" type="warning" @click="temSave">
                  草稿



                </el-button>
              </div>

            </template>
            <template v-else>
              <el-tag>发送异常错误,刷新页面,或者联系程序员</el-tag>
            </template>
          </sticky>
          <div class="createPost-main-container">
            <el-form :inline="true" ref="Addform" :model="Addform" :rules="rules" label-width="140px">
              <el-form-item label="接口名称" prop="name">
                <el-input name="name" v-model="Addform.name" required :maxlength="100">
                  接口名称


                </el-input>
              </el-form-item>
              <el-form-item label="所属工程" prop="project">
                <el-input name="project" v-model="Addform.project" required :maxlength="100">
                  所属工程


                </el-input>
              </el-form-item>
              <el-form-item label="ID" prop="id">
                <el-input name="id" v-model="Addform.id" required :maxlength="100">
                  ID


                </el-input>
              </el-form-item>
              <el-form-item label="级别" prop="rank">
                <el-input name="rank" v-model="Addform.rank" required :maxlength="100">
                  级别


                </el-input>
              </el-form-item>
              <el-form-item label="创建者" prop="author">
                <el-input name="author" v-model="Addform.author" required :maxlength="100">
                  创建者


                </el-input>
              </el-form-item>

              <el-form-item label="接口描述">
                <el-input type="textarea" name="des" v-model="Addform.des" required :maxlength="100">
                  描述


                </el-input>
              </el-form-item>
              <hr>

            </el-form>
            <json-editor class="json-editormin" v-model="jsonDatas" v-on:changed="changs"></json-editor>
          </div>

        </div>
        <span slot="footer" class="dialog-footer">

         <el-button type=""></el-button>
  </span>
      </el-dialog>
      <!--生成接口页面-->
      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <p><span>{{this.$store.getters.path}}</span></p>
        <span>{{this.$store.getters.interfaceStr}}</span>
        <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
  </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import jsonEditor from '../../components/jsonEditor/index.vue'
  const jsonData = '[{"items":[{"market_type":"forexdata","symbol":"XAUUSD"},{"market_type":"forexdata","symbol":"UKOIL"},{"market_type":"forexdata","symbol":"CORN"}],"name":""},{"items":[{"market_type":"forexdata","symbol":"XAUUSD"},{"market_type":"forexdata","symbol":"XAGUSD"},{"market_type":"forexdata","symbol":"AUTD"},{"market_type":"forexdata","symbol":"AGTD"}],"name":"贵金属"},{"items":[{"market_type":"forexdata","symbol":"CORN"},{"market_type":"forexdata","symbol":"WHEAT"},{"market_type":"forexdata","symbol":"SOYBEAN"},{"market_type":"forexdata","symbol":"SUGAR"}],"name":"农产品"},{"items":[{"market_type":"forexdata","symbol":"UKOIL"},{"market_type":"forexdata","symbol":"USOIL"},{"market_type":"forexdata","symbol":"NGAS"}],"name":"能源化工"}]'
  //import {getAllInterface} from '../../api/interface'
  import Sticky from '../../components/Sticky/index.vue'
  import MDinput from '../../components/MDinput/index.vue'
  import {getToken, setToken, removeToken} from '../../utils/auth'

  export default {
    components: {Sticky, jsonEditor, MDinput},
    data(){
      const validateRequire = (rule, value, callback) => {
        if (value === '') {

          this.$message({
            message: rule.field + '为必传项',
            type: 'error'
          })
          callback(null)
        } else {
          callback()
        }
      }
      return {
        expands: [],
        value: [],
        tableData5: [],
        loading: false,
        dialogVisible: false,
        centerDialogVisible:false,
        fetchSuccess: true,
        jsonDatas: '',

        values: '',
        Addform: {
          id: '',
          name: '',
          project: '',
          rank: '',
          author: '',
          des: ''
        },
        formInline: {
          user: ''
        },
        rules: {
          name: [{required: true, message: '请输入接口名称', trigger: 'blur'},
            {pattern: /^[A-Za-z]+$/, message: '目前只支持字母'}],
          project: [{required: true, message: '目前只支持字母', trigger: 'blur'},
            {pattern: /^[A-Za-z]+$/, message: '目前只支持字母'}],
          rank: [{required: true, message: '请填入正整数', trigger: 'blur'},
            {pattern: /^[1-9]\d*|0$/, message: '请填入正整数'}],
          author: [{required: true, message: '目前只支持字母', trigger: 'blur'},
            {pattern: /^[A-Za-z]+$/, message: '目前只支持字母'}],
          id: [{required: true, message: '请填入正整数', trigger: 'blur'}, {
            pattern: /^[1-9]\d*|0$/,
            message: '请填入正整数'
          }]
        }
      }
    },
    created(){
      this.initData()
    },
    computed: {
      ...mapGetters([
        'SET_INTERFACELIST'
      ])
    },
    methods: {
      initData(){
        this.$store.dispatch('GetAllInterface', getToken()).then(() => {
          this.tableData5 = this.$store.getters.interfaceList
        }).catch(() => {

        })
      },
      AddIF(){
        this.dialogVisible = true;
        //this.$router.push({path:'interfaceForm'})
      },
      handleClose(){
        this.dialogVisible = false;
      },
      handleEdit(index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
        console.log(index, row);
      },

      handleDelete(index, rows) {
        var _self = this
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          let para = {id: rows.name};
          _self.$store.dispatch('DelInterFace', para).then(() => {
            _self.initData()
          }).catch((error) => {
            _self.initData()
          })
        }).catch(() => {

        });
        console.log(index, rows);
      },
      handleCopy(row){
      this.centerDialogVisible = true;
      console.log(row)
        let para = {name: row};
      this.$store.dispatch('CreateInterface',para).then(()=>{

      })

      },
      showdetail(row, event, column){
        Array.prototype.remove = function (val) {
          this.value = ""
          let index = this.indexOf(val);
          if (index > -1) {
            this.splice(index, 1);
          }
        }
        if (this.expands.indexOf(row.name) < 0) {
          this.expands = []
          this.expands.push(row.name);
          this.value = JSON.parse(row.interfaces)
        } else {
          this.value = []
          this.expands.remove(row.name);
        }
      },
      serachOneIF(){

      },
      changs(res){
        console.log(res)
        this.jsonDatas = res
      },
      publishs(){
        var _self = this
        this.$refs.Addform.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              //alert(JSON.stringify(_self.jsonDatas))
              _self.$store.dispatch('AddInterface', [_self.Addform, {'jsonValues': _self.jsonDatas}]).then(() => {
                this.dialogVisible = false;
                _self.initData()
              }).catch(() => {
              })
            })
          }
        })


      },
      temSave(){

      }

    },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .editor-container {
    position: relative;
    height: 100%;

  }

  .json-editor {
    width: 30%;
    height: 100%;
    float: right;

  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .demo-form-inline {
    margin-top: 20px;
    margin-left: 20px;
  }

  .json-editormin {
    width: 100%;
    height: 200px;
  }
</style>

