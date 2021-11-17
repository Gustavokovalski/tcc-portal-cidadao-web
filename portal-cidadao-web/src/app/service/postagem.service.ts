import { HttpClient, HttpParams } from '@angular/common/http';
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
    public async listarTodos(bairro = '', categoriaId = 0, subcategoriaId = 0, mes = 0): Promise<IBaseModel<IPostagemModel[]>> {
      let params = new HttpParams();
      if (bairro && bairro != '')
        params = params.append('bairro', bairro);

      if (categoriaId && categoriaId > 0)
        params = params.append('categoriaId', categoriaId);

        if (mes && mes > 0)
        params = params.append('mes', mes);

      if (subcategoriaId && subcategoriaId > 0)
        params = params.append('subcategoriaId', subcategoriaId);
        console.log("x", params);

      return this.httpClient
        .get<IBaseModel<IPostagemModel[]>>(`${this.apiBaseUrl}/postagem`, {params: params})
        .toPromise();
    }

    public async buscarPostagem(id: number): Promise<IBaseModel<IPostagemModel>> {
      return this.httpClient
        .get<IBaseModel<IPostagemModel>>(`${this.apiBaseUrl}/postagem/${id}`)
        .toPromise();
    }

    public async PostagensAbertasPorMes(mes: string): Promise<IBaseModel<IPostagemModel[]>> {
      return this.httpClient
        .get<IBaseModel<IPostagemModel[]>>(`${this.apiBaseUrl}/postagem/mes/${mes}`)
        .toPromise();
    }
    public async resolverPostagem(id: number, resolvido: boolean): Promise<IBaseModel<IPostagemModel>> {
      return this.httpClient
        .put<IBaseModel<IPostagemModel>>(`${this.apiBaseUrl}/postagem/${id}/${resolvido}`, id)
        .toPromise();    
    }

    public async buscarMidiaPostagem(nomeArquivo: string): Promise<any> {
      return this.httpClient
        .get<any>(`${this.apiBaseUrl}/arquivo/${nomeArquivo}`)
        .toPromise();
    }

    public async inserir(postagemModel: IPostagemModel, arquivo: File): Promise<IBaseModel<IPostagemModel>> {
      const formData = new FormData();
      formData.append('file', arquivo);
      formData.append('model', JSON.stringify(postagemModel));

      return this.httpClient
        .post<IBaseModel<IPostagemModel>>(`${this.apiBaseUrl}/postagem`, formData)
        .toPromise();
    }

    public async listarCategorias(): Promise<IBaseModel<ICategoriaModel[]>> {
      return this.httpClient
        .get<IBaseModel<ICategoriaModel[]>>(`${this.apiBaseUrl}/postagem/categorias`)
        .toPromise();
    }
    
    public async excluirPostagem(id: number, excluir: boolean): Promise<IBaseModel<IPostagemModel>> {
      return this.httpClient
        .put<IBaseModel<IPostagemModel>>(`${this.apiBaseUrl}/postagem/${id}/${excluir}`, id)
        .toPromise();    
    }
    public async listarSubcategorias(): Promise<IBaseModel<IEnumModel[]>> {
      return this.httpClient
        .get<IBaseModel<IEnumModel[]>>(`${this.apiBaseUrl}/postagem/subcategorias`)
        .toPromise();
    }

    public async listarBairros(): Promise<IBaseModel<string[]>> {
      return this.httpClient
        .get<IBaseModel<string[]>>(`${this.apiBaseUrl}/postagem/bairros`)
        .toPromise();
    }
    
    
}
