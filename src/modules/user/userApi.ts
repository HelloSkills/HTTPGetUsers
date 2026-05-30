import { HTTPClient } from '../../httpClient/HTTPClient'
import type { User } from './User'

export class UserAPI {
  static async getUsers() {
    const response = await HTTPClient.get<User[]>('/users')

    if (response.data) {
      return response.data
    }

    return null
  }
}
