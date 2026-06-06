import { UserAPI } from './userApi'
import { type User } from './User'

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

  static async renderUserListByCity(parentNode: HTMLElement) {
    const allUsersByCity = await this.getUsersByCity()

    parentNode.innerText = ''

    Object.entries(allUsersByCity).forEach(([cityName, userList]) => {
      const cityItemWithUsersNode = this.createCityItemWithUsersNode(cityName, userList)

      parentNode.append(cityItemWithUsersNode)
    })
  }

  private static createUserInfoNode(user: User) {
    const userInfoNode = document.createElement('div')
    const userMainInfoNode = document.createElement('span')

    userMainInfoNode.innerText = `[${user.id}:${user.username}]: ${user.name}, `

    userInfoNode.append(userMainInfoNode)
    userInfoNode.append(this.createUserAgeNode(user.age))

    if (!user.isActive) {
      userInfoNode.append(this.createUserStatusNode())
    }

    return userInfoNode
  }

  private static createUserAgeNode(age: number) {
    const userAgeNode = document.createElement('span')

    userAgeNode.innerText = `${age} age`

    if (age < 18) {
      userAgeNode.style.color = 'red'
    }

    return userAgeNode
  }

  private static createUserStatusNode() {
    const userStatusNode = document.createElement('span')

    userStatusNode.innerText = ' - Деактивирован'

    return userStatusNode
  }

  private static createUserMailNode(email: string) {
    const userMailNode = document.createElement('a')

    userMailNode.href = `mailto:${email}`
    userMailNode.innerText = email

    return userMailNode
  }

  private static createUserItemNode(user: User) {
    const userItemNode = document.createElement('li')

    userItemNode.append(this.createUserInfoNode(user))
    userItemNode.append(this.createUserMailNode(user.email))

    userItemNode.style.border = '1px dotted #3a3a3a'
    userItemNode.style.padding = '12px 20px'

    if (!user.isActive) {
      userItemNode.style.backgroundColor = '#4a4a4a'
    }

    return userItemNode
  }

  private static createCityNameNode(cityName: string) {
    const cityNameNode = document.createElement('div')

    cityNameNode.innerText = cityName

    return cityNameNode
  }

  private static createUserListNode(userList: User[]) {
    const userListNode = document.createElement('ul')

    userList.forEach((user) => {
      const userItemNode = this.createUserItemNode(user)

      userListNode.append(userItemNode)
    })

    return userListNode
  }

  private static createCityItemWithUsersNode(cityName: string, userList: User[]) {
    const cityItemWithUsersNode = document.createElement('li')

    cityItemWithUsersNode.append(this.createCityNameNode(cityName))
    cityItemWithUsersNode.append(this.createUserListNode(userList))

    return cityItemWithUsersNode
  }
}
