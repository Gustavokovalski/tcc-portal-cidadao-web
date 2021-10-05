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

    public async inserir(data: ICurtidaModel): Promise<IBaseModel<ICurtidaModel>> {
        return this.httpClient
          .post<IBaseModel<ICurtidaModel>>(`${this.apiBaseUrl}/curtida`, data)
          .toPromise();
      }
    }