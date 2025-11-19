import axios from "axios";

let client = axios.create({
  baseURL: process.env.VUE_APP_SPRING_APP_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  json: true,
});

class apiService {
  constructor(path, option) {
    try {
      this.path = path;
      this.option = option;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async get() {
    return this.execute("GET", this.path, this.option);
  }

  async post(data) {
    return this.execute("POST", this.path, this.option, data);
  }

  async execute(method, path, option, data) {
    // let token = localStorage.getItem("access_token");
    let token = 'JWTTokenString'; 
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    headers = option.headers ? { ...headers, ...option.headers } : headers;

    //REQUEST TO CALL
    return client({
      method,
      url: path,
      data,
      headers: headers,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  }

}


