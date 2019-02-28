import axios from 'axios'
export default {
  getData: async function getData() {
    return await axios.get('/get/handledata')
  }
}
