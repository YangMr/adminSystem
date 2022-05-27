<template>
  <el-form ref="queryForm" :inline="true" :model="model">
    <template v-for="(item,index) in queryFormColumn">
      <el-form-item v-if="item.type === 'input'" v-bind="item">
        <el-input v-model.trim="model[item.prop]" v-bind="item"></el-input>
      </el-form-item>
      <el-form-item v-if="item.type === 'select'" v-bind="item">
        <el-select v-model.trim="model[item.prop]" v-bind="item" :style="item.style">
          <el-option v-for="(item,index) in item.payType" :key="item.type" :label="item.name" :value="item.type"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="item.type === 'date-picker'" v-bind="item">
        <el-date-picker value-format="item.value_format" v-bind="item" v-model.trim="model[item.prop]" type="date"></el-date-picker>
      </el-form-item>
      <el-form-item v-if="item.type === 'action'">
        <template v-for="(item,index) in item.buttons">
          <el-button v-bind="item" @click="throttle(item.action)">{{item.text}}</el-button>
        </template>
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
import {throttle} from '../utils/utils'


export default {
  name: 'QueryForm',
  props : {
    model : {
      type : Object,
      default : () => {}
    },
    queryFormColumn : {
      type : Array,
      default : () => []
    }
  },
  methods : {
    throttle : _.throttle(function(action){
      this.handleAction(action)
    },1000,{
      leading:true, //指定调用在节流开始前
      trailing:false //指定调用在节流结束后,
    }),

    handleAction(action){
      this.$emit("handleAction",action)
    },
    handleReset(){
      this.$refs["queryForm"].resetFields()
    }
  }
};
</script>

<style scoped>

</style>





<!--    <el-form-item prop="cardNum">-->
<!--      <el-input v-model.trim="model.cardNum" placeholder="会员卡号"></el-input>-->
<!--    </el-form-item>-->
<!--    <el-form-item prop="name">-->
<!--      <el-input v-model.trim="model.name" placeholder="会员姓名"></el-input>-->
<!--    </el-form-item>-->
<!--    <el-form-item prop="payType">-->
<!--      <el-select v-model.trim="model.payType" placeholder="支付类型" style="width:110px;">-->
<!--        <el-option v-for="(item,index) in payType" :key="item.type" :label="item.name" :value="item.type"></el-option>-->
<!--      </el-select>-->
<!--    </el-form-item>-->
<!--    <el-form-item prop="birthday">-->
<!--      <el-date-picker value-format="yyyy-MM-dd" v-model.trim="model.birthday" type="date" placeholder="出生日期"></el-date-picker>-->
<!--    </el-form-item>-->
<!--    <el-form-item>-->
<!--      <el-button type="primary" @click="handleSearch">查询</el-button>-->
<!--      <el-button type="primary" >新增</el-button>-->
<!--      <el-button @click="handleReset">重置</el-button>-->
<!--    </el-form-item>-->

