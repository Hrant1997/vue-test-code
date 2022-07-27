
export default class AbstractModel implements AbstractModelInterface{
  constructor (model: object) {
    Object.entries(model).forEach(([key, value]) => {
      this[key] = value
    })
  }
}


export interface AbstractModelInterface {

}