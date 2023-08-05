import axios from "axios"

// instance of axios with custom configurations
const backendAjax = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // all requests will be made to this URL
  timeout: 40000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

backendAjax.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default backendAjax
