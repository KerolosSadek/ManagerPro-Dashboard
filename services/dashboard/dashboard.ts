import { apiUrls } from '@/api_urls'
import apiClient from '../index'

class DashboardCollection {
    static async getAnalytics() {
        return await apiClient.get(apiUrls.dashboard.getAnalytics)
    }

    static async getRecentOrders() {
        return await apiClient.get(apiUrls.dashboard.getRecentOrders)
    }
}

export default DashboardCollection
