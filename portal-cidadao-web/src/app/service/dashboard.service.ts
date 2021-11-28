import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBaseModel } from '../models/base.model';
import { IDashboardBairrosModel } from '../models/dashboard-bairros.model';
import { IDashboardCategoriasModel } from '../models/dashboard-categoria.model';
import { BaseService } from './base.service';
import { IDashboardAtrasadosModel } from '../models/dashboard-atrasados.model';
import { IDashboardAbertosModel } from '../models/dashboard-abertos.model';
import { IDashboardSegurancaModel } from '../models/dashboard-seguranca.model';

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

    public async obterDashboardBairros(): Promise<IBaseModel<IDashboardBairrosModel[]>> {
      return this.httpClient
        .get<IBaseModel<IDashboardBairrosModel[]>>(`${this.apiBaseUrl}/dashboard/bairros`)
        .toPromise();
    }
        public async obterDashboardAtrasados(mesInicio: number, mesFim: number): Promise<IBaseModel<IDashboardAtrasadosModel>> {
          return this.httpClient
            .get<IBaseModel<IDashboardAtrasadosModel>>(`${this.apiBaseUrl}/dashboard/atrasados?mesInicio=${mesInicio}&mesFim=${mesFim}`)
            .toPromise();
    }
    public async obterDashboardAbertos(mesInicio: number, mesFim: number): Promise<IBaseModel<IDashboardAbertosModel>> {
      return this.httpClient
        .get<IBaseModel<IDashboardAbertosModel>>(`${this.apiBaseUrl}/dashboard/abertos?mesInicio=${mesInicio}&mesFim=${mesFim}`)
        .toPromise();
    }

    public async obterDashboardSeguranca(): Promise<IBaseModel<IDashboardSegurancaModel>> {
      return this.httpClient
        .get<IBaseModel<IDashboardSegurancaModel>>(`${this.apiBaseUrl}/dashboard/seguranca`)
        .toPromise();
    }
    
}
