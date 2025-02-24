import { apiUrls } from '@/api_urls'
import apiClient from '../index'

class ItemsCollection {
    static async getAllUsers() {
        return await apiClient.get(apiUrls.users.getUsers)
    }
}

export default ItemsCollection
