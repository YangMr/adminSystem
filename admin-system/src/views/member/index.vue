<template>
  <div class="container">
    <QueryForm ref="queryForm" :model="searchForm" :queryFormColumn="queryFormColumn" @handleAction="handleFormAction"></QueryForm>
    <BaseTable  @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" :page="page" :size="size" :total="total" :tableData="memberList" :column="tableColumn" @handleAction="handleTableAction"></BaseTable>
  </div>
</template>

<script>
import Member from '../../api/member'
import format from "../../utils/format"
import payType from "../../enmu/payType"
import BaseTable from "../../components/BaseTable"
import QueryForm from "../../components/QueryForm"
export default {
  name: 'index',
  data() {
    return {
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
      ]
    };
  },
  created() {
    this.loadMemberList();
  },
  components : {BaseTable,QueryForm},
  methods: {
    async loadMemberList() {
      const {count, rows} = await Member.getMemberList(this.page, this.size, this.searchForm);
      this.memberList = rows
      this.total = count
    },
    handleSizeChange(size){
      this.size = size
      this.loadMemberList()
    },
    handleCurrentChange(page){
      this.page = page
      this.loadMemberList()
    },
    handleSearch(){
      this.page = 1
      this.loadMemberList()
    },
    handleReset(){
      this.$refs["queryForm"].handleReset()
      // this.$refs["queryForm"].$refs['queryForm'].resetFields()
      // this.$refs["searchForm"].resetFields()
      this.loadMemberList()
    },
    handleFormAction(action){
      console.log("===>",action)
      if(action === 'query') return this.handleSearch()
      if(action === 'add') return this.handleOpenDialog()
      if(action === 'reset') return this.handleReset()
    },
    handleTableAction({action,row}){
      if(action === 'delete') return this.handleDelete(row.id)
      if(action === 'edit') return this.handleOpenDialog()
      // action === 'delete' ? this.handleDelete(row.id) : this.handleOpenDialog()
    },
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
    handleOpenDialog(){
      alert("编辑")
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
