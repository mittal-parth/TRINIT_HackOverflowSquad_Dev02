import axios from "../../utils/axios"

class user {
  static async info(key) {
    return axios.get("/auth/user/", {headers:{'Authorization': `Token ${key}`}})
  }

  static async userInfo(id){
    return axios.get("/auth/userprofile/" + id)
  }
}

export default user