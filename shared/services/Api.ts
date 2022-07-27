import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import qs from 'qs'
import AbstractModel from '../modeles/AbstractModel'
import {Model, ModelClassConstructor} from '../modeles/Model'
import { process } from '../types/NodeType'

const baseURL: string = process.env.API_URL || 'http://localhost:8081/'

class Api implements ApiInterface{
    static exists: boolean
    static instance: Api
    api: AxiosInstance
    constructor() {
        if (Api.exists) {
            return Api.instance
        }

        this.api = Axios.create({ baseURL, withCredentials: true })
        Api.exists = true
        Api.instance = this
    }

    handleRequest(response: ApiResponse, Model: ModelClassConstructor<AbstractModel>, showTotal: boolean): Promise<ModyfiedResponse> {
        return new Promise((resolve, reject) => {
            let modifiedResponse: ModyfiedResponse | any

            if (response.status) {
                if (Model) {
                    modifiedResponse = Array.isArray(response.data)
                        ? response.data.map(object => new Model(object))
                        : new Model(response.data)
                } else {
                    modifiedResponse = response.data
                }
                if (showTotal) {
                    modifiedResponse = [modifiedResponse, response.total]
                }
                return resolve(modifiedResponse)
            } else {
                modifiedResponse = response.errors
            }
            return reject(modifiedResponse)
        })
    }

    async callApi(config: AxiosRequestConfig, model: ModelClassConstructor<AbstractModel> = null, showTotal = false) {
        let res = await this.api.request({
            ...config,
            paramsSerializer: (params: any) => qs.stringify(params)
        }) as unknown as ApiResponse

        return this.handleRequest(res, model, showTotal)
    }
}

export default Api


export type DefoultResponse = Model | Model[]
export type ResponseWithTotal = [ data: DefoultResponse , total?:number]
export type ModyfiedResponse = DefoultResponse | ResponseWithTotal

interface ApiResponse {
    status: boolean, 
    data?: DefoultResponse, 
    total?: number, 
    errors?: Error[]
}

export interface ApiInterface {
    api: AxiosInstance

    handleRequest(response: ApiResponse, Model: ModelClassConstructor<AbstractModel>, showTotal: boolean): Promise<ModyfiedResponse> 

    callApi(config: AxiosRequestConfig, model: ModelClassConstructor<AbstractModel> | null, showTotal: boolean): Promise<ModyfiedResponse>
}