/**
 * @author YangLing
 * @date 2022/5/25 3:05 PM
 */
import request from "../utils/request"

/**
 * 获取供应商列表
 * @param currentPage
 * @param pageSize
 * @param data
 * @returns {AxiosPromise}
 */
const getSupplierList = (currentPage,pageSize,data = {})=>{
  return request({url : `/supplier/list/search/${currentPage}/${pageSize}`, method : "POST", data})
}

/**
 * 删除供应商
 * @param id
 * @returns {AxiosPromise}
 */
const deleteSupplier = (id)=>{
  return request({url : `/supplier/${id}` , method : "DELETE"})
}

/**
 * 查询单个供应商接口
 * @param id
 * @returns {AxiosPromise}
 */
const findSupplier = (id)=>{
  return request({url : `/supplier/${id}`, method : "GET"})
}

/**
 * 新增供应商接口
 * @param data
 * @returns {AxiosPromise}
 */
const addSupplier = (data)=>{
  return request({url : `/supplier`, method : "POST", data})
}

/**
 * 编辑供应商接口
 * @param id
 * @param data
 * @returns {AxiosPromise}
 */
const editSupplier = (id,data) => {
  return request({url : `/supplier/${id}`, method : "PUT", data})
}

export default {
  getSupplierList,
  deleteSupplier,
  findSupplier,
  addSupplier,
  editSupplier
}
