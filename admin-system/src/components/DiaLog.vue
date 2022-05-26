<template>
  <el-dialog :title="title" :visible.sync="visible" width="500px" :before-close="beforeClose">
    <el-form ref="dialogForm" :model="value" :rules="rules" label-width="110px" style="width:400px">
      <template v-for="(item,index) in diaLogFormColumn">
        <el-form-item v-if="item.type === 'input'" v-bind="item">
          <el-input v-model.trim="value[item.prop]" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="item.type === 'date-picker'" v-bind="item">
          <el-date-picker :value-format="item.value_format" v-model.trim="value[item.prop]" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item v-if="item.type === 'select'" v-bind="item">
          <el-select v-model.trim="value[item.prop]" placeholder="支付类型" style="width:120px;">
            <el-option v-for="(item,index) in item.payType" :key="index" :label="item.name" :value="item.type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="item.type === 'textarea'"  v-bind="item">
          <el-input type="textarea" v-model.trim="value[item.prop]"></el-input>
        </el-form-item>
      </template>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleResetDialogForm">取 消</el-button>
      <el-button type="primary" @click="handleDialogFormSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'DiaLog',
  props : {
    // 这是子组件接受父组件v-model所传递的数据
    value : { // dialogForm
      type : Object,
      default : ()=>{}
    },
    // 设置弹窗标题
    title : {
      type : String,
      default : ""
    },
    // 设置弹窗显示与隐藏 true 显示 false
    visible : {
      type : Boolean,
      default : false
    },
    // 设置保存表单输入的内容
    // model : {
    //   type : Object,
    //   default : () => {}
    // },
    // 设置表单校验
    rules : {
      type : Object,
      default : () => {}
    },
    // 动态渲染form的数据
    diaLogFormColumn : {
      type : Array,
      default : () => []
    },
    handleCloseDialog : Function
  },
  methods : {
    handleDialogFormSubmit(){
      this.$emit("handleDialogFormSubmit")
    },
    handleResetDialogForm(){
      // 表单清空
      this.$refs["dialogForm"].resetFields()
      this.$emit("handleCloseDialog")
    },
    beforeClose(){
      this.$refs["dialogForm"].resetFields()
      this.handleCloseDialog()
    }
  }
};
</script>

<style scoped>

</style>
