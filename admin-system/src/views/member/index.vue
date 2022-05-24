<template>
  <div class="container">
    <el-form ref="searchForm" :inline="true" :model="searchForm">
      <el-form-item prop="cardNum">
        <el-input v-model.trim="searchForm.cardNum" placeholder="会员卡号"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model.trim="searchForm.name" placeholder="会员姓名"></el-input>
      </el-form-item>
      <el-form-item prop="payType">
        <el-select v-model.trim="searchForm.payType" placeholder="支付类型" style="width:110px;">
          <el-option v-for="(item,index) in payType" :key="item.type" :label="item.name" :value="item.type"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="birthday">
        <el-date-picker value-format="yyyy-MM-dd" v-model.trim="searchForm.birthday" type="date" placeholder="出生日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button type="primary" >新增</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="memberList" border height="380" style="width: 100%">
      <template v-for="(item,index) in column">
        <el-table-column v-if="item.type && item.type !== 'action'" v-bind="item"></el-table-column>
        <el-table-column v-else-if="!item.type" v-bind="item" ></el-table-column>
        <el-table-column v-else-if="item.type === 'action'" v-bind="item">
          <template slot-scope="scope">
            <template v-for="(item,index) in item.buttons">
              <el-button v-bind="item" @click="handleAction(item.action,scope.row)">{{item.text}}</el-button>
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import Member from '../../api/member';
import format from "../../utils/format"
import payType from "../../enmu/payType"
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
      column : [
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
      ]
    };
  },
  created() {
    this.loadMemberList();
  },
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
      this.$refs["searchForm"].resetFields()
      this.loadMemberList()
    },
    handleAction(action,row){
      action === 'delete' ? this.handleDelete(row.id) : this.handleOpenDialog()
    },
    handleDelete(id){
      alert(id)
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
