/**
 * @author YangLing
 * @date 2022/5/30 2:06 PM
 */
import request from "../utils/request"

/**
 * 获取商品列表分页查询接口
 * @param currentPage
 * @param pageSize
 * @param data
 * @returns {AxiosPromise}
 */
const getGoodsList = (currentPage,pageSize, data) =>{
  return request({url : `/goods/list/search/${currentPage}/${pageSize}`, method : "POST", data})
}

/**
 * 删除商品接口
 * @param id
 * @returns {AxiosPromise}
 */
const deleteGoods = (id) =>{
  return request({url : `/goods/${id}`, method : "DELETE"})
}

/**
 * 查询单个商品接口
 * @param id
 * @returns {AxiosPromise}
 */
const findGoods = (id) =>{
  return request({url : `/goods/${id}`, method : "GET"})
}

/**
 * 编辑商品接口
 * @param id
 * @param data
 * @returns {AxiosPromise}
 */
const editGoods = (id,data) =>{
  return request({url : `/goods/${id}`, method : 'PUT', data})
}

/**
 * 新增商品接口
 * @param data
 * @returns {AxiosPromise}
 */
const addGoods = (data) =>{
  return request({url : '/goods', method : "POST", data})
}

export default {
  getGoodsList,
  deleteGoods,
  findGoods,
  editGoods,
  addGoods
}
