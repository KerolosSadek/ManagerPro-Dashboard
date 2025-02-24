import { apiUrls } from '@/api_urls'
import apiClient from '../index'

class ItemsCollection {
    static async getAllReports() {
        return await apiClient.get(apiUrls.reports.getReports)
    }
}

export default ItemsCollection
