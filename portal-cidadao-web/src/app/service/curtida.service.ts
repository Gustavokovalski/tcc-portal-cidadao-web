import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { IBaseModel } from '../models/base.model';
import { ICurtidaModel } from '../models/curtida.model';


@Injectable({
    providedIn: 'root',
  })

  export class CurtidaService extends BaseService {
    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    public async obterLike(usuarioId: number, postagemId: number): Promise<IBaseModel<ICurtidaModel>> {
      return this.httpClient
        .get<IBaseModel<ICurtidaModel>>(`${this.apiBaseUrl}/curtida/${postagemId}/${usuarioId}`)
        .toPromise();
    }

    public async inserir(curtidaModel: ICurtidaModel): Promise<IBaseModel<ICurtidaModel>> {
      console.log(curtidaModel)
      return this.httpClient
        .post<IBaseModel<ICurtidaModel>>(`${this.apiBaseUrl}/curtida`, curtidaModel)
        .toPromise();    
    }

    public async atualizarCurtida(id: number, Acao: boolean): Promise<IBaseModel<ICurtidaModel>> {
      return this.httpClient
        .put<IBaseModel<ICurtidaModel>>(`${this.apiBaseUrl}/curtida/${id}/${Acao}`, id)
        .toPromise();    
    }

    public async removerCurtida(curtidaId:number): Promise<IBaseModel<ICurtidaModel>> {
      return this.httpClient
        .delete<IBaseModel<ICurtidaModel>>(`${this.apiBaseUrl}/curtida/${curtidaId}`)
        .toPromise();    
    }
  }