import { apiUrls } from '@/api_urls'
import apiClient from '../index'

class ItemsCollection {
    static async getAllItems() {
        return await apiClient.get(apiUrls.items.getItems)
    }
}

export default ItemsCollection
