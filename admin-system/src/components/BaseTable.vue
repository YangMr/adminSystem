<template>
  <div class="container">
    <el-table :data="tableData" border height="380" style="width: 100%">
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

    <div class="pager" v-if="pager">
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

  </div>
</template>

<script>
export default {
  name: 'BaseTable',
  props : {
    tableData : {
      type : Array,
      default : ()=> []
    },
    column : {
      type : Array,
      default : ()=> []
    },
    page : {
      type :  Number,
      default : 1
    },
    size : {
      type :  Number,
      default : 2
    },
    total : {
      type :  Number,
      default : 0
    },
    pager : {
      type : Boolean,
      default : true
    }
  },
  methods : {
    handleAction(action, row){
      this.$emit("handleAction",{action,row})
    },
    handleSizeChange(size){
      this.$emit("handleSizeChange",size)
    },
    handleCurrentChange(page){
      this.$emit("handleCurrentChange",page)
    }
  }
};
</script>

<style scoped>

</style>
