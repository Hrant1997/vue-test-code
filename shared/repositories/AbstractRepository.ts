import { AbstractModelInterface } from '../modeles/AbstractModel'
import { ModelClassConstructor } from '../modeles/Model'
import Api, { ApiInterface, ModyfiedResponse } from '../services/Api'

class AbstractRepository extends Api implements AbstractRepositoryInterface<ApiInterface>{
  
  protected route: string
  protected model: ModelClassConstructor<AbstractModelInterface>

  constructor (model: ModelClassConstructor<AbstractModelInterface>,  route: string) {
    super()

    this.route = route
    this.model = model
  }

  delete(idOrUrl: number | string) : Promise<ModyfiedResponse> {
    return this.callApi({
      method: 'delete',
      url: this.route + idOrUrl,
    }, this.model)
  }

  post (model: ModelClassConstructor<AbstractModelInterface>) : Promise<ModyfiedResponse> {
    return this.callApi({
      method: 'post',
      url: this.route,
      data: model
    }, this.model)
  }

  put (idOrUrl: number | string, updateDate: object) : Promise<ModyfiedResponse> {
    return this.callApi({
      method: 'put',
      url: this.route + idOrUrl,
      data: updateDate 
    }, this.model)
  }

  get (idOrUrl: number | string, params = {})  : Promise<ModyfiedResponse> {
    return this.callApi({
      method:'get',
      url: this.route + idOrUrl,
      params
    }, this.model)
  }

  getAll (params = {}) : Promise<ModyfiedResponse> {
      return this.callApi({
        method:'get',
        url: this.route,
        params
      }, this.model)
  }
}

export default AbstractRepository


export interface AbstractRepositoryInterface<T extends ApiInterface> {

  delete (idOrUrl: number | string) : Promise<ModyfiedResponse> 

  post (model: ModelClassConstructor<AbstractModelInterface>) : Promise<ModyfiedResponse> 

  put (idOrUrl: number | string, updateDate: object) : Promise<ModyfiedResponse> 

  get (idOrUrl: number | string, params: object)  : Promise<ModyfiedResponse> 

  getAll (params: object) : Promise<ModyfiedResponse>
}