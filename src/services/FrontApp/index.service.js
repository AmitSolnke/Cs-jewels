import UserHTTPService from "../user-http.service"

const httpService = new UserHTTPService()
export const getLiveRateForCSP = async () => {
  return await httpService.get(`getliveRateForCSP`)
}

export const login = async (data) => {
  return await httpService.post(`login`, data)
}

export const verifyOtp = async (data) => {
  const result = await httpService.post(`verifyOTP`, data)
  httpService.saveToken(result.data.token)
}

export const getTestimonial = async () => {
  return await httpService.get(`testimonial`)
}

export const subscribeEmail = async (data) => {
  return await httpService.post(`subscription`, data)
}

export const getFaqs = async () => {
  return await httpService.get(`faqs`)
}

export const getStores = async () => {
  return await httpService.get(`stores`)
}

export const searchStores = async (data) => {
  return await httpService.post(`stores/search`, data)
}

export const getProducts = async (data) => {
  return await httpService.post(`products`, data)
}

export const getProductDetails = async (data) => {
  return await httpService.post(`products/details`, data)
}

export const addToWishlist = async (id) => {
  return await httpService.get(`wishlist/add/${id}`)
}

export const getWishlist = async () => {
  return await httpService.get(`wishlist`)
}

export const removeProductFromWishList = async (id) => {
  return await httpService.get(`wishlist/remove/${id}`)
}

export const addToCart = async (data) => {
  return await httpService.post(`cart/add`, data)
}

export const getCartItems = async () => {
  return await httpService.get(`cart`)
}

export const removeProductFromCat = async (id) => {
  return await httpService.get(`cart/remove/${id}`)
}

export const contactUs = async (data) => {
  return await httpService.post(`support/add`, data)
}

export const getMetals = async () => {
  return await httpService.post(`metalType`)
}

export const getProductCategory = async () => {
  return await httpService.post(`productCategory`)
}

export const getMetalItems = async (data) => {
  return await httpService.post(`items`, data)
}
