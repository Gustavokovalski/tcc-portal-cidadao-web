import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBaseModel } from '../models/base.model';
import { IDashboardCategoriasModel } from '../models/dashboard-categoria.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService extends BaseService {
    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    public async obterDashboardCategorias(): Promise<IBaseModel<IDashboardCategoriasModel[]>> {
      return this.httpClient
        .get<IBaseModel<IDashboardCategoriasModel[]>>(`${this.apiBaseUrl}/dashboard/categorias`)
        .toPromise();
    }
    
    
}
