import apiService from './apiService.js';

class formApi extends apiService {
  constructor(path, option) {
    super(path, option);
  }

submitForm(data) {
     return this.post(data);
}

getTableData() {
    return this.get();
  }


}