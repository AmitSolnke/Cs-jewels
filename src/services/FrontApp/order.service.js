import UserHTTPService from "../user-http.service"

const httpService = new UserHTTPService()
export const placeOrder = async () => {
  return await httpService.post(`order`)
}