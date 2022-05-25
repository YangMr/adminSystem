<template>
  <div class="container">
    <QueryForm ref="queryForm" @handleAction="handleFormAction" :model="searchForm" :queryFormColumn="queryFormColumn"></QueryForm>
    <BaseTable @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" :page="page" :size="size" :total="total" :tableData="supplierList" :column="tableColumn" @handleAction="handleTableAction"></BaseTable>
  </div>
</template>

<script>
import BaseTable from "../../components/BaseTable"
import QueryForm from '../../components/QueryForm'
import Supplier from "../../api/supplier"
export default {
  name: 'index',
  data(){
    return {
      page : 1,
      size : 2,
      total : 0,
      supplierList : [],
      searchForm : {
        name : "",
        linkman : "",
        mobile : ""
      },
      tableColumn : [
        {
          type : "index",
          label : "序号"
        },
        {
          label : "供应商名称",
          prop : "name"
        },
        {
          label : "联系人",
          prop : "linkman"
        },
        {
          label : "联系电话",
          prop : "mobile"
        },
        {
          label : "备注",
          prop : "remark"
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
        }
      ],
      queryFormColumn : [
        {
          type : "input",
          prop : "name",
          placeholder : "供应商名称"
        },
        {
          type : "input",
          prop : "linkman",
          placeholder : "联系人"
        },
        {
          type : "input",
          prop : "mobile",
          placeholder : "联系电话"
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
    }
  },
  components : {BaseTable,QueryForm},
  created() {
    this.loadSupplierList()
  },
  methods : {
    async loadSupplierList(){
      const {count, rows} = await Supplier.getSupplierList(this.page, this.size, this.searchForm);
      this.supplierList = rows
      this.total = count
    },
    handleSearch(){
      this.page = 1
      this.loadSupplierList()
    },
    handleReset(){
      this.$refs["queryForm"].handleReset()
      // this.$refs["queryForm"].$refs['queryForm'].resetFields()
      // this.$refs["searchForm"].resetFields()
      this.loadSupplierList()
    },
    handleFormAction(action){
      if(action === 'query') return this.handleSearch()
      if(action === 'add') return this.handleOpenDialog()
      if(action === 'reset') return this.handleReset()
    },
    handleTableAction({action,row}){
      if(action === 'delete') return this.handleDelete(row.id)
      if(action === 'edit') return this.handleOpenDialog()
    },
    handleDelete(id){
      this.$confirm('确认删除这条记录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try{
          const response = await Supplier.deleteSupplier(id)
          this.$message({ type: 'success', message: '删除成功!' });
          this.page = 1
          this.loadSupplierList()
        }catch (e){
          this.$message({ type: 'error', message: '删除失败!' });
        }

      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' });
      });
    },
    handleOpenDialog(){
      alert("编辑")
    },
    handleSizeChange(size){
      this.size = size
      this.loadSupplierList()
    },
    handleCurrentChange(page){
      this.page = page
      this.loadSupplierList()
    },
  }
};
</script>

<style scoped>

</style>
