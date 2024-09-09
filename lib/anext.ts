import Axios, { AxiosInstance } from 'axios'

const anext: AxiosInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_FRONTEND_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  }
})

export default anext