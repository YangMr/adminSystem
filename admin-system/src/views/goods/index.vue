<template>
  <div class="container">
    <el-form ref="searchForm" :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item prop="name">
        <el-input v-model="searchForm.name" placeholder="商品名称" style="width : 200px;"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="searchForm.code" placeholder="商品编号" style="width : 200px;"></el-input>
      </el-form-item>
      <el-form-item prop="supplierName">
        <el-input @click.native="handleOpenDialog" readonly v-model="searchForm.supplierName" placeholder="供应商" style="width : 200px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button type="primary" >新增</el-button>
        <el-button @click="handleResetForm">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="goodsList" height="380" border style="width: 100%">
      <el-table-column type="index" label="序号 " width="60"></el-table-column>
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="code" label="商品编码"></el-table-column>
      <el-table-column prop="spec" label="商品规格"></el-table-column>
      <el-table-column prop="retailPrice" label="零售价"></el-table-column>
      <el-table-column prop="purchasePrice" label="进货价"></el-table-column>
      <el-table-column prop="storageNum" label="库存数量"></el-table-column>
      <el-table-column prop="supplierName" label="供应商"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" >编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <el-dialog title="选择供应商" :visible.sync="dialogSupplierVisible" width="500px">
      <supplier :isDialog="true" @handleChange="handleChange"></supplier>
    </el-dialog>
  </div>
</template>

<script>
import Goods from "../../api/goods"
import Supplier from "../supplier"
export default {
  name: 'index',
  data(){
    return {
      dialogSupplierVisible : false,
      page : 1,
      size : 4,
      total : 0,
      searchForm : {
        name : "",
        code : "",
        supplierName : ""
      },
      goodsList : []
    }
  },
  created(){
    this.loadGoodsList()
  },
  components : {
    Supplier
  },
  methods : {
    async loadGoodsList(){
      try {
        const {count , rows} = await Goods.getGoodsList(this.page, this.size, this.searchForm)
        this.total = count
        this.goodsList = rows
      }catch (e) {
        console.log(e)
      }
    },
    handleSizeChange(size){
      this.size = size
      this.loadGoodsList()
    },
    handleCurrentChange(page){
      this.page = page
      this.loadGoodsList()
    },
    handleOpenDialog(){
      this.dialogSupplierVisible = true
    },
    handleChange(row){
      console.log("goods=", row)
      this.searchForm.supplierName = row.name
      this.dialogSupplierVisible = false
    },
    handleSearch(){
      this.page = 1
      this.loadGoodsList()
    },
    handleResetForm(){
      this.$refs["searchForm"].resetFields()
    },
    handleDelete(row){
      console.log(row)
      this.$confirm('确认删除这条记录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const response = await Goods.deleteGoods(row.id)
          this.page = 1
          this.loadGoodsList()
          this.$message({type: 'success', message: '删除成功!'});
        }catch (e) {
          console.log(e)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
};
</script>

<style scoped>

</style>
