import axios from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  timeout: 10000, // Increase timeout to 10 seconds
  retry: 3, // Add retry attempts
  retryDelay: 1000, // 1 second delay between retries
})

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token")
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Add response interceptor for retry logic
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config
    
    // If request failed and we haven't exceeded retry attempts
    if (error.code === 'ECONNABORTED' || error.response?.status >= 500) {
      config.__retryCount = config.__retryCount || 0
      
      if (config.__retryCount < (config.retry || 3)) {
        config.__retryCount++
        
        // Wait before retrying
        await new Promise(resolve => 
          setTimeout(resolve, config.retryDelay || 1000)
        )
        
        return api(config)
      }
    }
    
    return Promise.reject(error)
  }
)
export default api
