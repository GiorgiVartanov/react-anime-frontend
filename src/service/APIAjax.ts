import axios from "axios"

// instance of axios with custom configurations
const apiAjax = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // all requests will be made to this URL
  timeout: 40000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

apiAjax.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default apiAjax
