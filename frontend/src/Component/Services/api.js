import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.withCredentials = true
// const auth = new AuthService()

class APIService {
  constructor() {
    this.async_get = this.async_make_request.bind(this, 'get')
    this.async_post = this.async_make_request.bind(this, 'post')
    this.async_delete = this.async_make_request.bind(this, 'delete')
    this.async_put = this.async_make_request.bind(this, 'put')
    this.get = this.make_request.bind(this, 'get')
    this.post = this.make_request.bind(this, 'post')
    this.delete = this.make_request.bind(this, 'delete')
    this.put = this.make_request.bind(this, 'put')
  }

  make_request(method, endpoint, data = {}) {
    let headers = {}
    // if (auth.isLoggedIn()) {
    //   headers = { Authorization: 'JWT ' + auth.getToken() }
    // }

    let params = {}
    if (method.toLowerCase() === 'get') {
      params = data
      data = {}
    }

    axios({
      method: method,
      url: '/api/v1/' + endpoint + '/',
      data: data,
      headers: headers,
      params: params
    })
      .then(response => {
        return Promise.resolve(response)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  }

  async async_make_request(method, endpoint, data = {}) {
    let headers = {}
    // if (auth.isLoggedIn()) {
    //   headers = { Authorization: 'JWT ' + auth.getToken() }
    // }

    let params = {}
    if (method.toLowerCase() === 'get') {
      params = data
      data = {}
    }

    const response = await axios({
      method: method,
      url: '/api/v1/' + endpoint + '/',
      data: data,
      headers: headers,
      params: params
    })
    return response.data
  }
}

export default new APIService()