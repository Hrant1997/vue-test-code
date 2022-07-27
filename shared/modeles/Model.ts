import { AbstractModelInterface } from "./AbstractModel";

export interface ModelClassConstructor<T extends AbstractModelInterface> {
    new (model: object): T;
}

export interface Model{

}
