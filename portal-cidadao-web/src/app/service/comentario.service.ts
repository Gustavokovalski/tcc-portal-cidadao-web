import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { IBaseModel } from '../models/base.model';
import { IComentarioModel } from '../models/comentario.model';

@Injectable({
    providedIn: 'root',
  })

  export class ComentarioService extends BaseService {
    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    public async inserir(comentarioModel: IComentarioModel): Promise<IBaseModel<IComentarioModel>> {
      return this.httpClient
        .post<IBaseModel<IComentarioModel>>(`${this.apiBaseUrl}/comentario`, comentarioModel)
        .toPromise();    
    }

    public async ListarTodos(postagemId: number): Promise<IBaseModel<IComentarioModel[]>> {
      return this.httpClient
        .get<IBaseModel<IComentarioModel[]>>(`${this.apiBaseUrl}/comentario/${postagemId}/`)
        .toPromise();
    }
  }