import UserHTTPService from "./user-http.service"

const httpService = new UserHTTPService()

export const myProfile = async (data = {}) => {
  return await httpService.post(`myProfile`, data)
}

export const updateProfile = async (data = {}) => {
  return await httpService.post(`updateProfile`, data)
}

export const addAddress = async (data = {}) => {
  return await httpService.post(`profile/address/add`, data)
}

export const getAllAddAddress = async () => {
  return await httpService.get(`profile/address`)
}

export const removeAddress = async (id) => {
  return await httpService.get(`profile/address/remove/${id}`)
}

export const updateAddress = async (id, data) => {
  return await httpService.post(`profile/address/edit/${id}`, data)
}

export const getAddressById = async (id) => {
  return await httpService.get(`profile/address/${id}`)
}

export const myOrders = async () => {
  return await httpService.get(`order/myOrders`)
}
