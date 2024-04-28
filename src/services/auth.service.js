import { jwtDecode } from "jwt-decode";
import * as tokenService from './token.service'

export const getTokenKey = () => {
  return 'accessToken'
}
export const isLoggedIn = () => {
  if (getUserId()) {
    return true
  } else return false
}

export const getLoginUserInfo = () => {
  let tokenKey = getTokenKey()

  try {
    // var decodedHeader = jwtDecode(tokenService.getToken(tokenKey))
    return tokenService.getToken(tokenKey)
  } catch (e) {
    // console.log(e)
    console.log('Invalid access token')
  }
}

export const getUserId = () => {
  const result = getLoginUserInfo()
  if (result) {
    return result.sub
  }
}

export const getUserFullName = () => {
  const result = getLoginUserInfo()
  if (result) {
    return result.fullName
  } else return ''
}

export const logout = () => {
  const result = getLoginUserInfo()
  if (result) {
    tokenService.removeToken(getTokenKey())
    window.location = "/";
  }
}
