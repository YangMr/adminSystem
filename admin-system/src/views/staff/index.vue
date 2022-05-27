<template>
  <div class="container">
    <QueryForm ref="queryForm" :model="searchForm" :queryFormColumn="queryFormColumn" @handleAction="handleQueryAction"></QueryForm>
    <BaseTable @handleAction="handleTableAction" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" :total="total" :page="page" :size="size" :tableData="staffList" :column="tableColumn"></BaseTable>
    <DiaLog @handleDialogFormSubmit="handleDialogFormSubmit" @handleCloseDialog="handleCloseDialog" :handleCloseDialog="handleCloseDialog" :diaLogFormColumn="diaLogFormColumn" v-model="diaLogForm" :title="diaLogTitle" :visible="diaLogFormVisible" :rules="rules"></DiaLog>
  </div>
</template>

<script>
import Staff from "../../api/staff"
import BaseTable from '../../components/BaseTable'
import QueryForm from '../../components/QueryForm'
import DiaLog from '../../components/DiaLog'
import format from "../../utils/format"
export default {
  name: 'index',
  data(){
    return {
      page : 1,
      size : 10,
      total : 0,
      diaLogTitle : "",
      diaLogFormVisible : false,
      rules : {
        username : [{required : true, message : '帐号不能为空', trigger : 'blur'}],
        name : [{required : true, message : '姓名不能为空', trigger : 'blur'}]
      },
      diaLogForm : {},
      searchForm : {
        username : "",
        name : ""
      },
      staffList : [],
      tableColumn : [
        {
          label : "序号",
          type : "index",
          width : "80"
        },
        {
          label : "账号",
          prop : "username"
        },
        {
          label : "姓名",
          prop : "name"
        },
        {
          label : "年龄",
          prop : "age"
        },
        {
          label : "电话",
          prop : "mobile"
        },
        {
          label : "薪酬",
          prop : "salary"
        },
        {
          label : "入职时间",
          prop : "entryDate",
          formatter : (row)=>{
            return format(row.entryDate)
          }
        },
        {
          label : "操作",
          type : "action",
          width : "150",
          buttons : [
            {
              text : "编辑",
              size : "mini",
              action : "edit"
            },
            {
              type : "danger",
              text : "删除",
              size : "mini",
              action : "delete"
            }
          ]
        }
      ],
      queryFormColumn : [
        {
          type : "input",
          placeholder : "账号",
          prop : "username"
        },
        {
          type : "input",
          placeholder : "姓名",
          prop : "name"
        },
        {
          type : "action",
          buttons : [
            {
              type : "primary",
              text : "查询",
              action : "query"
            },
            {
              type : "primary",
              text : "新增",
              action : "add"
            },
            {
              text : "重置",
              action : "reset"
            }
          ]
        }
      ],
      diaLogFormColumn : [
        {
          type : "input",
          prop : "username",
          label : '账号',
          placeholder : '账号'
        },
        {
          type : "input",
          prop : "name",
          label : '姓名',
          placeholder : '姓名'
        },
        {
          type : "input",
          prop : "age",
          label : '年龄',
          placeholder : '年龄'
        },
        {
          type : "input",
          prop : "mobile",
          label : '电话',
          placeholder : '电话'
        },
        {
          type : "input",
          prop : "salary",
          label : '薪酬',
          placeholder : '薪酬'
        },
        {
          type : 'date-picker',
          prop : 'entryDate',
          label : '入职时间',
          value_format : 'yyyy-MM-dd'
        }
      ]
    }
  },
  created() {
    this.loadStaffList()
  },
  methods : {
    async loadStaffList(){
      try {
        const {count,rows} = await Staff.getStaffList(this.page, this.size, this.searchForm)
        this.total = count
        this.staffList = rows
      }catch (e) {
        console.log(e)
      }
    },
    handleSizeChange(size){
      this.size = size
      this.loadStaffList()
    },
    handleCurrentChange(page){
      this.page = page
      this.loadStaffList()
    },
    handleTableAction({action,row}){
      if(action === 'edit') return this.handleOpenDialog('edit',row.id)
      if(action === 'delete') return this.handleDelete(row.id)
    },
    handleQueryAction(action){
      if(action === 'query') return this.handleSearch()
      if(action === 'add') return this.handleOpenDialog('add')
      if(action === 'reset') return this.handleQueryReset()
    },
    handleSearch(){
      this.page = 1
      this.loadStaffList()
    },
    handleQueryReset(){
      this.$refs["queryForm"].handleReset()
      this.handleSearch()
    },
    handleOpenDialog(type,id){
      this.diaLogTitle = type === 'add' ? '新增员工' : '编辑员工'
      if(id)  this.handleCircumference(id)
      this.diaLogFormVisible = true
    },
    handleDialogFormSubmit(){
      this.diaLogForm.id ? this.handleEdit() : this.handleAdd()
    },
    handleDelete(id){
      this.$confirm('确认删除这条记录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const response = await Staff.deleteStaff(id)
          this.page = 1
          this.loadStaffList()
          this.$message({ type: 'success', message: '删除成功!' });
        }catch (e) {
          console.log(e)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleCloseDialog(){
      this.diaLogFormVisible = false
    },
    async handleAdd(){
      try {
        const response = await Staff.addStaff(this.diaLogForm)
        this.loadStaffList()
        this.handleCloseDialog()
        this.$message.success("新增成功")
      }catch (e) {
        console.log(e)
        this.$message.error("新增失败")
      }
    },
    async handleEdit(){
      try {
        const response = await Staff.editStaff(this.diaLogForm.id, this.diaLogForm)
        this.loadStaffList()
        this.handleCloseDialog()
        this.$message.success("编辑成功")
      }catch (e) {
        console.log(e)
        this.$message.error("编辑失败")
      }
    },
    async handleCircumference(id){
      try {
        const response = await Staff.findStaff(id)
        this.diaLogForm = response
      }catch (e) {
        console.log(e)
      }
    }
  },
  components : {
    BaseTable,
    QueryForm,
    DiaLog
  }
};
</script>

<style scoped>

</style>
