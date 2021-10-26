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

    public async listarTodos(bairro: string): Promise<IBaseModel<IPostagemModel[]>> {
      return this.httpClient
        .get<IBaseModel<IPostagemModel[]>>(`${this.apiBaseUrl}/postagem?bairro=${bairro}`)
        .toPromise();
    }
    public async listarPorCategoria(categoria: string): Promise<IBaseModel<IPostagemModel[]>> {
      return this.httpClient
        .get<IBaseModel<IPostagemModel[]>>(`${this.apiBaseUrl}/postagem/categoria/${categoria}`)
        .toPromise();
    }

    public async buscarPostagem(id: number): Promise<IBaseModel<IPostagemModel>> {
      return this.httpClient
        .get<IBaseModel<IPostagemModel>>(`${this.apiBaseUrl}/postagem/${id}`)
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
