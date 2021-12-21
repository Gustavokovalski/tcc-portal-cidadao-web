import { HttpClient, HttpParams } from '@angular/common/http';
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

  public async obterDashboardCategorias(
    polling = false
  ): Promise<IBaseModel<IDashboardCategoriasModel[]>> {
    let params = new HttpParams();
    params = params.append('polling', polling);

    return this.httpClient
      .get<IBaseModel<IDashboardCategoriasModel[]>>(
        `${this.apiBaseUrl}/dashboard/categorias`,
        {
          params: params,
        }
      )
      .toPromise();
  }

  public async obterDashboardBairros(
    polling = false
  ): Promise<IBaseModel<IDashboardBairrosModel[]>> {
    let params = new HttpParams();
    params = params.append('polling', polling);

    return this.httpClient
      .get<IBaseModel<IDashboardBairrosModel[]>>(
        `${this.apiBaseUrl}/dashboard/bairros`,
        {
          params: params,
        }
      )
      .toPromise();
  }

  public async obterDashboardAtrasados(
    mesInicio: number,
    mesFim: number,
    polling = false
  ): Promise<IBaseModel<IDashboardAtrasadosModel>> {
    let params = new HttpParams();
    params = params.append('polling', polling);

    return this.httpClient
      .get<IBaseModel<IDashboardAtrasadosModel>>(
        `${this.apiBaseUrl}/dashboard/atrasados?mesInicio=${mesInicio}&mesFim=${mesFim}`,
        {
          params: params,
        }
      )
      .toPromise();
  }
  public async obterDashboardAbertos(
    mesInicio: number,
    mesFim: number,
    polling = false
  ): Promise<IBaseModel<IDashboardAbertosModel>> {
    let params = new HttpParams();
    params = params.append('polling', polling);

    return this.httpClient
      .get<IBaseModel<IDashboardAbertosModel>>(
        `${this.apiBaseUrl}/dashboard/abertos?mesInicio=${mesInicio}&mesFim=${mesFim}`,
        {
          params: params,
        }
      )
      .toPromise();
  }

  public async obterDashboardSeguranca(
    polling = false
  ): Promise<IBaseModel<IDashboardSegurancaModel>> {
    let params = new HttpParams();
    params = params.append('polling', polling);

    return this.httpClient
      .get<IBaseModel<IDashboardSegurancaModel>>(
        `${this.apiBaseUrl}/dashboard/seguranca`,
        {
          params: params,
        }
      )
      .toPromise();
  }
}
