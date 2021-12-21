import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {
  ChartComponent,
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
} from 'ng-apexcharts';
import { interval, Subscription } from 'rxjs';
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
  subscription: Subscription;

  constructor(public matDialog: MatDialog, private service: DashboardService) {}

  ngOnInit(): void {
    this.iniciarPagina();

    const source = interval(5000);
    this.subscription = source.subscribe(() => this.atualizarGrafico());
  }

  private iniciarPagina() {
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

    this.service.obterDashboardCategorias().then((res) => {
      if (res.sucesso && res.dados && res.dados.length > 0) {
        this.chartOptions.labels = res.dados.map((x) => x.nomeCategoria);
        this.chartOptions.series = res.dados.map((x) => x.porcentagem);
      }
    });
  }

  private atualizarGrafico() {
    this.service.obterDashboardCategorias().then((res) => {
      if (res.sucesso && res.dados && res.dados.length > 0) {
        let options = {
          series: res.dados.map((x) => x.porcentagem),
          chart: {
            type: 'pie',
            height: 360,
          },
          labels: res.dados.map((x) => x.nomeCategoria),
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

        this.chart.updateOptions(options);
        this.chart.updateSeries(options.series);
      }
    });
  }
}
