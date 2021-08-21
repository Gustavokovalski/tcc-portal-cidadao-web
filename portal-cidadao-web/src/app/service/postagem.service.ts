import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBaseModel } from '../models/base.model';
import { ICategoriaModel } from '../models/categoria.model';
import { IEnumModel } from '../models/enum.model';
import { IPostagemModel } from '../models/postagem.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class PostagemService extends BaseService {
    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    public async listarTodos(): Promise<IBaseModel<IPostagemModel[]>> {
      return this.httpClient
        .get<IBaseModel<IPostagemModel[]>>(`${this.apiBaseUrl}/postagem`)
        .toPromise();
    }

    public async inserir(postagemModel: IPostagemModel): Promise<IBaseModel<IPostagemModel>> {
      return this.httpClient
        .post<IBaseModel<IPostagemModel>>(`${this.apiBaseUrl}/postagem`, postagemModel)
        .toPromise();
    }

    public async listarCategorias(): Promise<IBaseModel<ICategoriaModel[]>> {
      return this.httpClient
        .get<IBaseModel<ICategoriaModel[]>>(`${this.apiBaseUrl}/postagem/categorias`)
        .toPromise();
    }

    public async listarSubcategorias(): Promise<IBaseModel<IEnumModel[]>> {
      return this.httpClient
        .get<IBaseModel<IEnumModel[]>>(`${this.apiBaseUrl}/postagem/subcategorias`)
        .toPromise();
    }
    
}
