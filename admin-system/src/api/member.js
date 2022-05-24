/**
 * @author YangLing
 * @date 2022/5/24 1:51 PM
 */
import request from "../utils/request"

/**
 * 获取会员列表接口 分页接口  查询接口
 * @param currentPage
 * @param pageSize
 * @param data {{birthday: string, cardNum: string, payType: string, name: string}}
 * @returns {AxiosPromise}
 */
const getMemberList = (currentPage,pageSize,data = {})=>{
  return request({url : `/v2/member/list/search/${currentPage}/${pageSize}`, method : "POST", data})
}

/**
 * 删除会员接口
 * @param id
 * @returns {AxiosPromise}
 */
const deleteMember = (id)=>{
  return request({url : `/v2/member/${id}` , method : "DELETE"})
}

export default {
  getMemberList,
  deleteMember
}
