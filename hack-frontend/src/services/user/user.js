import axios from "../../utils/axios"

class user {
  static async info(key) {
    return axios.get("/auth/user/", {headers:{'Authorization': `Token ${key}`}})
  }
}

export default user