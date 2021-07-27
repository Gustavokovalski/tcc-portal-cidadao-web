import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBaseModel } from '../models/base.model';
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

    public async inserir(postagemModel: IPostagemModel): Promise<IBaseModel<void>> {
      return this.httpClient
        .post<IBaseModel<void>>(`${this.apiBaseUrl}/postagem`, postagemModel)
        .toPromise();
    }
    
}
