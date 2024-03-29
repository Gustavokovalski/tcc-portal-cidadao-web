import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IBaseModel } from "../models/base.model";
import { IRedefinicaoSenhaModel } from "../models/redefinicao-senha.model";
import { IUsuarioAlteracaoModel } from "../models/usuario-alteracao.model";
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

    public async obter(id: number): Promise<IBaseModel<IUsuarioModel>> {
      return this.httpClient
        .get<IBaseModel<IUsuarioModel>>(`${this.apiBaseUrl}/usuario/${id}`).toPromise();
    }
    public async alterarDados(id: number, data: IUsuarioAlteracaoModel): Promise<IBaseModel<IUsuarioAlteracaoModel>> {
      return this.httpClient
        .patch<IBaseModel<IUsuarioAlteracaoModel>>(`${this.apiBaseUrl}/usuario/${id}`, data).toPromise();
    }

    public async esqueciSenha(email: string): Promise<IBaseModel<IUsuarioAlteracaoModel>> {
      return this.httpClient
        .post<IBaseModel<IUsuarioAlteracaoModel>>(`${this.apiBaseUrl}/usuario/esqueci-senha/${email}`, {}).toPromise();
    }

    public async redefinirSenha(model: IRedefinicaoSenhaModel): Promise<IBaseModel<void>> {
      return this.httpClient
        .post<IBaseModel<void>>(`${this.apiBaseUrl}/usuario/redefinir-senha`, model).toPromise();
    }
}