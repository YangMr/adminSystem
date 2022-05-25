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
  return request({url : `/v2/supplier/list/search/${currentPage}/${pageSize}`, method : "POST", data})
}

/**
 * 删除供应商
 * @param id
 * @returns {AxiosPromise}
 */
const deleteSupplier = (id)=>{
  return request({url : `/v2/supplier/${id}` , method : "DELETE"})
}

export default {
  getSupplierList,
  deleteSupplier
}
