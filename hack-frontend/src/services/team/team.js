import axios from "../../utils/axios"

class team {
  static async get() {
    return axios.get("/teams/")
  }

  static async getTeamById(id) {
    return axios.get("/team/" + id)
  }
}

export default team