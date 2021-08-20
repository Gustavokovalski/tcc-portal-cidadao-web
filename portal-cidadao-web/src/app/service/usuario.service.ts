import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IBaseModel } from "../models/base.model";
import { IUsuarioModel } from "../models/usuario.model";

import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root',
  })
export class UsuarioService extends BaseService {
    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    public async inserir(data: IUsuarioModel): Promise<IBaseModel<IUsuarioModel>> {
      return this.httpClient
        .post<IBaseModel<IUsuarioModel>>(`${this.apiBaseUrl}/usuario`, data)
        .toPromise();
    }
}