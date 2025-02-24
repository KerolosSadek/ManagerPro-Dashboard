import { apiUrls } from '@/api_urls'
import apiClient from '../index'

class ItemsCollection {
    static async getAllTransactions() {
        return await apiClient.get(apiUrls.transactions.getTransactions)
    }
}

export default ItemsCollection
