/**
 * @author YangLing
 * @date 2022/5/27 1:56 PM
 */
import request from "../utils/request"

/**
 * 获取员工列表
 * @param currentPage
 * @param pageSize
 * @param data
 * @returns {AxiosPromise}
 */
const getStaffList = (currentPage,pageSize,data) => {
  return request({url : `/v2/staff/list/search/${currentPage}/${pageSize}`,method : "POST", data})
}

/**
 * 删除员工接口
 * @param id
 * @returns {AxiosPromise}
 */
const deleteStaff = (id) => {
  return request({url : `/v2/staff/${id}`, method : 'DELETE', })
}

/**
 * 查询单个员工接口
 * @param id
 * @returns {AxiosPromise}
 */
const findStaff = (id) => {
  return request({url : `/v2/staff/${id}`, method : 'GET', })
}

/**
 * 新增员工接口
 * @param data
 * @returns {AxiosPromise}
 */
const addStaff = (data) => {
  return request({url : '/v2/staff', method : 'POST', data})
}

/**
 * 编辑员工接口
 * @param id
 * @param data
 * @returns {AxiosPromise}
 */
const editStaff = (id,data) => {
  return request({ url : `/v2/staff/${id}`, method : 'PUT', data})
}

export default {
  getStaffList,
  findStaff,
  deleteStaff,
  addStaff,
  editStaff
}
