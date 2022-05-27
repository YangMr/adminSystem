<template>
  <div class="container">
    <QueryForm ref="queryForm" :model="searchForm" :queryFormColumn="queryFormColumn" @handleAction="handleFormAction"></QueryForm>
    <BaseTable  @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" :page="page" :size="size" :total="total" :tableData="memberList" :column="tableColumn" @handleAction="handleTableAction"></BaseTable>
<!--    <DiaLog ref="dialogForm"  @handleDialogFormSubmit="handleDialogFormSubmit" :diaLogFormColumn="diaLogFormColumn" :title="dialogTitle" :visible="dialogFormVisible" :model="dialogForm" :rules="rules"></DiaLog>-->
    <DiaLog ref="dialogForm" @handleCloseDialog="handleResetDialogForm" :handleCloseDialog="handleResetDialogForm"  @handleDialogFormSubmit="handleDialogFormSubmit" :diaLogFormColumn="diaLogFormColumn" :title="dialogTitle" :visible="dialogFormVisible" v-model="dialogForm" :rules="rules"></DiaLog>
  </div>
</template>

<script>
import Member from '../../api/member'
import format from "../../utils/format"
import payType from "../../enmu/payType"
import BaseTable from "../../components/BaseTable"
import QueryForm from "../../components/QueryForm"
import DiaLog from "../../components/DiaLog"
export default {
  name: 'index',
  data() {
    const validateCardNum = (rule, value, callback)=>{
      const valueStatus = /\d/g.test(value)
      if(!valueStatus) return callback(new Error("会员卡号必须是数字"))
    }
    return {
      dialogFormVisible : false,
      dialogForm : {},
      dialogTitle : "",
      rules : {
        cardNum : [
          {required : true, message : "卡号不能为空", trigger : 'blur'},
          {validator : validateCardNum, trigger: 'blur'}
        ],
        name : [
          {required : true, message : "姓名不能为空", trigger : 'blur'}
        ]
      },
      page: 1,
      size: 2,
      total : 0,
      searchForm: {
        cardNum: '',
        name: '',
        payType: '',
        birthday: ''
      },
      payType,
      memberList: [],
      tableColumn : [
        {
          label : "序号",
          width : "60",
          type : "index"
        },
        {
          label : "会员卡号",
          prop : "cardNum"
        },
        {
          label : "会员姓名",
          prop : "name"
        },
        {
          label : "会员生日",
          prop : "birthday",
          formatter : (row, column, cellValue, index)=>{
            return format(cellValue)
          }
        },
        {
          label : "手机号码",
          prop : "phone",
          width : "110"
        },
        {
          label : "可用积分",
          prop : "integral"
        },
        {
          label : "开卡金额",
          prop : "money"
        },
        {
          label : "支付类型",
          prop : "payType",
          formatter : (row, column, type, index)=>{
            const obj = payType.find(item=>item.type === type)
            return obj ? obj.name : ""
          }
        },
        {
          label : "会员地址",
          prop : "address",
          width : 180
        },
        {
          label : "操作",
          width : 150,
          type : "action",
          buttons : [
            {
              size : "mini",
              text : "编辑",
              action : 'edit'
            },
            {
              size : "mini",
              type : "danger",
              text : "删除",
              action : "delete"
            }
          ]
        },
      ],
      queryFormColumn : [
        {
          type : "input",
          prop : "cardNum",
          placeholder : "会员卡号"
        },
        {
          type : "input",
          prop : "name",
          placeholder : "会员姓名"
        },
        {
          type : "select",
          prop : "payType",
          placeholder : "支付类型",
          style : "width:110px",
          payType
        },
        {
          type : "date-picker",
          prop : "birthday",
          placeholder : "出生日期",
          value_format : "yyyy-MM-dd"
        },
        {
          type : "action",
          buttons : [
            {
              type : "primary",
              action : "query",
              text : "查询"
            },
            {
              type : "primary",
              action : "add",
              text : "新增"
            },
            {
              action : "reset",
              text : "重置"
            }
          ]
        }
      ],
      diaLogFormColumn : [
        {
          type : "input",
          label : "会员卡号",
          prop : "cardNum"
        },
        {
          type : "input",
          label : "会员姓名",
          prop : "name"
        },
        {
          type : "date-picker",
          label : "会员生日",
          prop : "birthday",
          value_format : "yyyy-MM-dd"
        },
        {
          type : "input",
          label : "会员手机",
          prop : "phone"
        },
        {
          type : "input",
          label : "开卡金额",
          prop : "money"
        },
        {
          type : "input",
          label : "可用积分",
          prop : "integral"
        },
        {
          type : "select",
          label : "支付类型",
          prop : "payType",
          payType
        },
        {
          type : "textarea",
          label: "会员地址",
          prop : "address"
        }
      ]
    };
  },
  created() {
    this.loadMemberList();
  },
  components : {BaseTable,QueryForm,DiaLog},
  methods: {
    /**
     * 初始化会员列表
     * @returns {Promise<void>}
     */
    async loadMemberList() {
      const {count, rows} = await Member.getMemberList(this.page, this.size, this.searchForm);
      this.memberList = rows
      this.total = count
    },
    /**
     * 分页条数发生改变触发的方法
     * @param size
     */
    handleSizeChange(size){
      this.size = size
      this.loadMemberList()
    },
    /**
     * 分页页码发生变化触发的方法
     * @param page
     */
    handleCurrentChange(page){
      this.page = page
      this.loadMemberList()
    },
    /**
     * 会员查询方法
     */
    handleSearch(){
      this.page = 1
      this.loadMemberList()
    },
    /**
     * 会员查询表单重置方法
     */
    handleReset(){
      this.$refs["queryForm"].handleReset()
      this.loadMemberList()
    },
    /**
     * 会员查询 查询 新增 重置按钮 共同触发的方法
     * @param action
     */
    handleFormAction(action){
      if(action === 'query') return this.handleSearch()
      if(action === 'add') return this.handleOpenDialog("add")
      if(action === 'reset') return this.handleReset()
    },
    /**
     * 表格按钮 编辑 删除 共同触发的方法的
     * @param action
     * @param row
     */
    handleTableAction({action,row}){
      if(action === 'delete') return this.handleDelete(row.id)
      if(action === 'edit') return this.handleOpenDialog("edit",row.id)
    },
    /**
     * 点击删除按钮执行的方法
     * @param id
     */
    handleDelete(id){
      this.$confirm('确认删除这条记录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const response = await Member.deleteMember(id)
        this.$message({ type: 'success', message: '删除成功!' });
        this.page = 1
        this.loadMemberList()
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' });
      });
    },
    /**
     * 点击新增按钮 编辑按钮 打开弹窗的方法
     * @param type
     * @param id
     */
    handleOpenDialog(type,id){
      this.dialogTitle = type === 'add' ? '会员新增' : '会员编辑'
      if(type === 'edit') this.handleCircumference(id)
      this.dialogFormVisible = true
    },
    /**
     * 弹窗表单重置方法
     */
    handleResetDialogForm(){
      // 弹窗消失
      this.dialogFormVisible = false
    },
    /**
     * 点击弹窗确定按钮执行的方法
     */
    handleDialogFormSubmit(){
      if(this.dialogForm.id){
        this.handleSubmitEdit()
      }else{
        this.handleSubmitAdd()
      }
    },
    /**
     * 新增方法
     * @returns {Promise<void>}
     */
    async handleSubmitAdd(){
      try {
        const response = await Member.addMember(this.dialogForm)
        this.loadMemberList()
        this.handleResetDialogForm()
        this.$message.success("新增成功")
      }catch (e) {
        console.log(e)
        this.$message.error("新增失败")
      }
    },
    /**
     * 编辑方法
     * @returns {Promise<void>}
     */
    async handleSubmitEdit(){
      try {
        const response = await Member.editMember(this.dialogForm.id, this.dialogForm)
        this.loadMemberList()
        this.handleResetDialogForm()
        this.$message.success("编辑成功")
      }catch (e) {
        this.$message.error("编辑失败")
      }

    },
    /**
     * 编辑数据回显方法
     * @param id
     * @returns {Promise<void>}
     */
    async handleCircumference(id){
      try {
        const response = await Member.findMember(id)
        this.dialogForm = response
      }catch (e) {
        this.$message.error("查询失败")
      }
    }
  }
};
</script>

<style scoped>

</style>


<!--      <el-table-column label="会员卡号" prop="cardNum" ></el-table-column>-->
<!--      <el-table-column label="会员姓名" prop="name"></el-table-column>-->
<!--      <el-table-column label="会员生日" prop="birthday" >-->
<!--        <template slot-scope="scope">-->
<!--          {{scope.row.birthday|timeFormatFilter}}-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="手机号码" prop="phone" width="110"></el-table-column>-->
<!--      <el-table-column label="可用积分" prop="integral"></el-table-column>-->
<!--      <el-table-column label="开卡金额" prop="money" ></el-table-column>-->
<!--      <el-table-column label="支付类型" prop="payType" >-->
<!--        <template slot-scope="scope">-->
<!--          {{scope.row.payType|payTypeFilter}}-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="会员地址" prop="address" width="180"></el-table-column>-->
<!--      <el-table-column label="操作"  width="150">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button size="mini" >编辑</el-button>-->
<!--          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->


<!--      <template v-for="(item,index) in column">-->
<!--        <el-table-column v-if="item.type && item.type !== 'action'" :label="item.label" :type="item.type" :width="item.width"></el-table-column>-->
<!--        <el-table-column v-else-if="!item.type" :formatter="item.formatter" :label="item.label" :prop="item.prop" ></el-table-column>-->
<!--        <el-table-column v-else-if="item.type === 'action'" :label="item.label"  :width="item.width">-->
<!--          <template slot-scope="scope">-->
<!--            <template v-for="(item,index) in item.buttons">-->
<!--              <el-button :size="item.size" :type="item.type" @click="handleAction(item.action,scope.row)">{{item.text}}</el-button>-->
<!--            </template>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--      </template>-->








<!--        <el-form-item label="会员卡号" prop="cardNum">-->
<!--          <el-input v-model.trim="dialogForm.cardNum" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="会员姓名" prop="name">-->
<!--          <el-input v-model.trim="dialogForm.name" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="会员生日" prop="birthday">-->
<!--          <el-date-picker value-format="yyyy-MM-dd" v-model.trim="dialogForm.birthday" type="date" placeholder="选择日期"></el-date-picker>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="手机号码" prop="phone">-->
<!--          <el-input v-model.trim="dialogForm.phone" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="开卡金额" prop="money">-->
<!--          <el-input v-model.trim="dialogForm.money" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="可用积分" prop="integral">-->
<!--          <el-input v-model.trim="dialogForm.integral" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="支付类型" prop="payType">-->
<!--          <el-select v-model.trim="dialogForm.payType" placeholder="支付类型" style="width:120px;">-->
<!--            <el-option v-for="(item,index) in payType" :key="index" :label="item.name" :value="item.type"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="会员地址" prop="address">-->
<!--          <el-input type="textarea" v-model.trim="dialogForm.address"></el-input>-->
<!--        </el-form-item>-->
