import axios from "axios";
import Ls from "@/utility/localStorage";

// ---------------------------------------------
// Create an Axios instance
// ---------------------------------------------
// This 'client' is a pre-configured axios object.
// It automatically includes:
// - baseURL 
// - default headers for JSON requests
//
// Using axios.create() allows us to avoid repeating
// the same settings in every API call.


let client = axios.create({
// baseURL: "",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  json: true,
});

// ---------------------------------------------
// Base API Service Class
// ---------------------------------------------
// This class is meant to be extended by other
// service classes (e.g., formApi).
//
// It standardizes API calls: GET, POST, etc.
// Every inherited service can reuse execute() so that
// API structure remains consistent across the app.

class apiService {

  // path   - API endpoint (example: '/users')
  // option - extra configuration such as custom headers  
  constructor(path, option) {
    try {
      this.path = path;
      this.option = option;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  // ---------------------------------------------
  // GET Request
  // ---------------------------------------------
  // Calls this.execute() with HTTP method GET.
  async get() {
    return this.execute("GET", this.path, this.option);
  }

  // ---------------------------------------------
  // POST Request
  // ---------------------------------------------
  // Calls this.execute() with HTTP method POST.
  // 'data' is the request body for POST.
  async post(data) {
    return this.execute("POST", this.path, this.option, data);
  }

  // ---------------------------------------------
  // The Main Execute Method (Core)
  // ---------------------------------------------
  // This is the method that actually performs the
  // network request using the axios client.
  //
  // method - HTTP method ('GET', 'POST', etc.)
  // path   - URL endpoint (example: '/users/login')
  // option - custom axios options such as headers
  // data   - request body for POST/PUT methods
  async execute(method, path, option, data) {

    // let token = Ls.get("jwtToken");

    let token = 'JWTTokenString'; 
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    headers = option.headers ? { ...headers, ...option.headers } : headers;

    // ---------------------------------------------
    // Axios Request
    // ---------------------------------------------
    // Returns:
    // - response object on success
    // - error.response on failure (HTTP errors)
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


