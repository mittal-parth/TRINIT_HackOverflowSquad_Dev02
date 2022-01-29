import axios from "../../utils/axios"

class bugs {
  static async list(key) {
    return axios.get("/bugs/", {headers:{'Authorization': `Token ${key}`}})
  }
}

export default bugs