<template>
  <div class="container">
    <QueryForm ref="queryForm" @handleAction="handleFormAction" :model="searchForm" :queryFormColumn="queryFormColumn"></QueryForm>
    <BaseTable @handleChange="handleChange" :pager="!isDialog" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" :page="page" :size="size" :total="total" :tableData="supplierList" :column="tableColumn" @handleAction="handleTableAction"></BaseTable>
    <DiaLog ref="diaLogForm" @handleCloseDialog="handleCloseDialog" v-model="diaLogForm"  @handleDialogFormSubmit="handleDialogFormSubmit" :handleCloseDialog="handleCloseDialog" :diaLogFormColumn="diaLogFormColumn" :title="diaLogTitle" :visible="diaLogFormVisible" :rules="rules"></DiaLog>
  </div>
</template>

<script>
import BaseTable from "../../components/BaseTable"
import QueryForm from '../../components/QueryForm'
import Supplier from "../../api/supplier"
import DiaLog from "../../components/DiaLog"
export default {
  name: 'index',
  props : {
    isDialog : Boolean
  },
  data(){
    return {
      diaLogTitle : "",
      diaLogFormVisible : false,
      rules : {
        name : [
          {required : true, message : "供应商不能为空", trigger : "blur"}
        ],
        linkman : [
          {required : true, message : "联系人不能为空", trigger : "blur"}
        ]
      },
      diaLogFormColumn : [
        {
          type : "input",
          label : "供应商名称",
          prop : "name"
        },
        {
          type : "input",
          label : "联系人",
          prop : "linkman"
        },
        {
          type : "input",
          label : "联系电话",
          prop : "mobile"
        },
        {
          type : "textarea",
          label : "备注",
          prop : "remark"
        }
      ],
      diaLogForm : {},
      page : 1,
      size : 10,
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
          label : "序号",
          width : "60"
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
  components : {BaseTable,QueryForm,DiaLog},
  created() {
    this.loadSupplierList()
    if(this.isDialog){
      this.tableColumn.splice(3)
      this.queryFormColumn = [
        {
          type : "input",
          prop : "name",
          placeholder : "供应商名称"
        },
        {
          type : "action",
          buttons : [
            {
              type : "primary",
              action : "query",
              text : "查询"
            }
          ]
        }
      ]
    }
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
      if(action === 'add') return this.handleOpenDialog("add")
      if(action === 'reset') return this.handleReset()
    },
    handleTableAction({action,row}){
      if(action === 'delete') return this.handleDelete(row.id)
      if(action === 'edit') return this.handleOpenDialog("edit",row.id)
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
    handleOpenDialog(type,id){
      this.diaLogTitle = type === 'add' ? '供应商新增' : '供应商编辑'
      if(type === 'edit') this.handleCircumference(id)
      this.diaLogFormVisible = true
    },
    handleSizeChange(size){
      this.size = size
      this.loadSupplierList()
    },
    handleCurrentChange(page){
      this.page = page
      this.loadSupplierList()
    },
    handleDialogFormSubmit(){
      if(this.diaLogForm.id){
        this.handleSubmitEdit()
      }else{
        this.handleSubmitAdd()
      }
    },
    async handleSubmitEdit(){
      try {
        const response = await Supplier.editSupplier(this.diaLogForm.id,this.diaLogForm)
        this.handleCloseDialog()
        this.$message.success("编辑成功")
        this.loadSupplierList()
      }catch (e) {
        console.log(e)
        this.$message.error("编辑失败")
      }
    },
    async handleSubmitAdd(){
      try {
        const response = await Supplier.addSupplier(this.diaLogForm)
        this.handleCloseDialog()
        this.$message.success("新增成功")
        this.loadSupplierList()
      }catch (e) {
        console.log(e)
        this.$message.error("新增失败")
      }
    },
    handleCloseDialog(){
      this.diaLogFormVisible = false
    },
    async handleCircumference(id){
      try {
        const response = await Supplier.findSupplier(id)
        this.diaLogForm = response
      }catch (e) {
        console.log(e)
        this.$message.error("查询失败")
      }
    },
    handleChange(row){
      this.$emit("handleChange",row)
    }
  }
};
</script>

<style scoped>

</style>
