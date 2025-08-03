import { httpService } from '../../services/http.service.js'

const BASE_URL = 'auth/'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    getEmptyUser,
    save
}


async function login({ username, password }) {
    const user = await httpService.post(BASE_URL + 'login', { username, password })
    if (user) return _setLoggedinUser(user)
    else return Promise.reject('Invalid login')
}

async function signup({ username, password, fullname, imgUrl }) {
    const user = { username, password, fullname, imgUrl }
    if (!user.imgUrl) user.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const savedUser = await httpService.post(BASE_URL + 'signup', user)
    if (savedUser) return _setLoggedinUser(savedUser)
    else return Promise.reject('Invalid signup')
}

async function logout() {
    await httpService.post(BASE_URL + 'logout')
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
}

function getById(userId) {
    return httpService.get('user/' + userId)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
}

function getEmptyUser() {
    return {
        username: '', 
        password: '', 
        fullname: '',
        isAdmin: false,
    }
}

async function save(user) {
    const userId = user._id
    const savedUser = await httpService.put('user/' + userId, user)
    if (savedUser) return _setLoggedinUser(savedUser)
    return Promise.reject('Error with updating user info')
}
