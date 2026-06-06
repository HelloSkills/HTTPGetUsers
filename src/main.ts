import { UserService } from './modules/user/userService'

const buttonLoadUsers = document.getElementById('buttonLoadUsers')
const userListByCity = document.getElementById('userListByCity')

if (buttonLoadUsers && userListByCity) {
  const clickHandler = async () => {
    buttonLoadUsers.innerText = '...'
    buttonLoadUsers.setAttribute('disabled', 'true')

    await new Promise((resolve) => {
      setTimeout(resolve, 1000)
    })

    await UserService.renderUserListByCity(userListByCity)

    buttonLoadUsers.innerText = 'Load users'
    buttonLoadUsers.removeAttribute('disabled')
  }

  buttonLoadUsers.addEventListener('click', clickHandler)
}
