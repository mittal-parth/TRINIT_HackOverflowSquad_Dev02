import axios from "../../utils/axios"

class bugs {
  static async list(key, id) {
    return axios.get("/buglist/" + id, {headers: {'Authorization': `Token ${key}`}})
  }

  static async create(key, data) {
    return axios.post("/bugs/", data, {headers: {'Authorization': `Token ${key}`}})
  }

  static async get(key, id){
    return axios.get(`/bug/${id}`)
  }

  static async delete(key, id){
    return axios.delete(`/bug/${id}`)
  }

  static async update(key, id, data){
    return axios.put(`/bug/${id}/`, data)
  }
}

export default bugs