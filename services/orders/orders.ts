import { apiUrls } from '@/api_urls'
import apiClient from '../index'

class ItemsCollection {
    static async getAllOrders() {
        return await apiClient.get(apiUrls.orders.getOrders)
    }
}

export default ItemsCollection
