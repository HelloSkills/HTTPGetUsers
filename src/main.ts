import { UserService } from './modules/user/userService'

const allUsersByCity = await UserService.getUsersByCity()
console.log(allUsersByCity)

const allUsers = await UserService.getUsers()
console.log(allUsers)
