import Axios from 'axios'

const api = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})

export default api