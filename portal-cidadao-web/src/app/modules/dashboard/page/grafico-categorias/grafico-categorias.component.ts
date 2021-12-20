import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {
  ChartComponent,
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
} from 'ng-apexcharts';
import { IDashboardCategoriasModel } from 'src/app/models/dashboard-categoria.model';
import { DashboardService } from 'src/app/service/dashboard.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-grafico-categorias',
  templateUrl: './grafico-categorias.component.html',
  styleUrls: ['./grafico-categorias.component.scss'],
})
export class GraficoCategoriasComponent implements OnInit {
  @ViewChild('chart') chart = new ChartComponent();
  public chartOptions = {} as ChartOptions;
  public model = {} as IDashboardCategoriasModel;

  constructor(public matDialog: MatDialog, private service: DashboardService) {
    this.chartOptions = {
      series: [100],
      chart: {
        type: 'pie',
        height: 360,
      },
      labels: [''],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }

  ngOnInit(): void {
    this.service.obterDashboardCategorias().then((res) => {
      if (res.sucesso && res.dados && res.dados.length > 0) {
        this.chartOptions.labels = res.dados.map((x) => x.nomeCategoria);
        this.chartOptions.series = res.dados.map((x) => x.porcentagem);
      }
    });
  }
}
