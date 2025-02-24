import axios, { AxiosInstance } from 'axios'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'vue-router'

const BASE_URL = 'https://manager-pro-dashboard.vercel.app'

const apiClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // Set timeout to 10 seconds
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, multipart/form-data',
    },
})


// Request Interceptor
apiClient.interceptors.request.use((config) => {
    const store = useAuthStore()
    const token = localStorage.getItem('token')
    const lang = localStorage.getItem('current-lang') || 'ar'

    if (store.isLoggedIn && token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    config.headers['Accept-Language'] = lang

    return config
})

// Response Interceptor
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const store = useAuthStore()
        const router = useRouter()

        if (error.response?.data) {
            console.error('Error Response:', error.response.data)
            const errorCode = parseInt(error.response.data.status)

            if (errorCode === 401 || errorCode === 4011) {
                localStorage.clear()
                store.isLoggedIn = false
                router.push('/auth/login')
            }
        } else {
            console.warn('Error response data is missing.')
        }

        return Promise.reject(error)
    }
)

export default apiClient
