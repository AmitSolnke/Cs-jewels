import BaseHttpService from './base-http.service'

export default class UserHTTPService extends BaseHttpService {
  constructor() {
    super()
    this._accessTokenKey = this.generateTokenKeyName()
  }

  generateTokenKeyName() {
    return 'accessToken'
  }

}
