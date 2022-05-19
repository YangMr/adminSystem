/**
 * @author YangLing
 * @date 2022/5/19 4:08 PM
 */

// 这个service其实就是axios
import service from "../utils/request"

const login = (data)=>{
    return service({url : "/v2/admin/login", method : "POST", data})
}

export default {
  login
}


