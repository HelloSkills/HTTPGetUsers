import {UserAPI} from './userApi'
import type {User} from './User'

export class UserService {
  static async getUsers() {
    return await UserAPI.getUsers()
  }

  static async getUsersByCity() {
    const users = await UserAPI.getUsers()

    const usersByCity: Record<string, User[]> = {}

    if (users) {
      users.forEach((user) => {
        if (usersByCity[user.city] === undefined) {
          usersByCity[user.city] = []
        }

        usersByCity[user.city].push(user)
      })
    }

    return usersByCity
  }
}
