import Axios from 'axios'
import qs from 'qs'

// eslint-disable-next-line no-unused-vars
import Model from '../modeles/AbstractModel'
/**
 * @typedef {import('axios').AxiosRequestConfig} AxiosRequestConfig
 * @typedef {{ status: boolean, data?: Model | Model[], total?: Number, errors?: Error[] }} ApiResponse
 * @typedef {Model | Model[] | [ Model[], total?: Number]} ModyfiedResponce
*/
/**
 * @type {string}
 */
const baseURL = process.env.API_URL || 'http://localhost:8081/'

// TODO SINGLTON
class Api {
  constructor () {
    if (Api.exists) {
      return Api.instance
    }

    this.api = Axios.create({ baseURL, withCredentials: true })
    Api.exists = true
    Api.instance = this
  }

  /**
   * @param {ApiResponse} response
   * @param {boolean} showTotal
   * @param {Model} Model
   * @returns {Promise<ModyfiedResponce>} Promise
   */
  handleRequest (response, Model, showTotal) {
    return new Promise((resolve, reject) => {
      let modifiedResponce

      if (response.status) {
        if (Model) {
          modifiedResponce = Array.isArray(response.data)
            ? response.data.map(object => new Model(object))
            : new Model(response.data)
        } else {
          modifiedResponce = response.data
        }
        if (showTotal) {
          modifiedResponce = [modifiedResponce, response.total]
        }
        return resolve(modifiedResponce)
      } else {
        modifiedResponce = response.errors
      }
      return reject(modifiedResponce)
    })
  }

  /**
   * @param {AxiosRequestConfig} config
   * @param {Model} model instanceof AbstractModel
   */
  async callApi (config, model = null, showTotal = false) {
    const res = await this.api.request({
      ...config,
      paApiramsSerializer: params => qs.stringify(params)
    })
    return this.handleRequest(res, model)
  }
}

export default Api
