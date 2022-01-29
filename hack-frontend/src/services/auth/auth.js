import axios from "../../utils/axios"

class auth {
  static async login({email, password}) {
    return axios.post("/auth/login/", {email, password})
  }

  static async signup({email,username,password1, password2}) {
    return axios.post("/auth/register/", {email, password1, password2, username})
  }
}

export default auth