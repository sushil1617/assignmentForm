import apiService from './apiService.js';

let URL = "";
// formApi class
// This class *extends* apiService, means:
// - It inherits all methods from apiService (get, post, execute)
// - It can add new API methods specific to "forms"
// - It avoids writing duplicate axios code everywhere    
class formApi extends apiService {
  constructor(path, option) {
    super(path, option);
  }

  // A wrapper function around the inherited POST method.
  //
  // this.post() comes from apiService:
  // - internally calls execute('POST', path, options, data)
  // - sends token and headers
  submitForm(data) {
    // this.path = `${URL}`;
    return super.post(data);
  }

  // this.get() comes from apiService:
  // -internally calls execute("GET", path, option)
  // -sends token and headers
  getTableData(id) {
    // this.path = `${URL}/${id}`;
    return super.get();
  }


}