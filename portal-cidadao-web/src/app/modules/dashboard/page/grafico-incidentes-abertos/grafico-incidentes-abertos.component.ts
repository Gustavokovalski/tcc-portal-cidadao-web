import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DashboardService } from 'src/app/service/dashboard.service';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexYAxis,
} from 'ng-apexcharts';
import { interval, Subscription } from 'rxjs';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
};

@Component({
  selector: 'app-grafico-incidentes-abertos',
  templateUrl: './grafico-incidentes-abertos.component.html',
  styleUrls: ['./grafico-incidentes-abertos.component.scss'],
})
export class GraficoIncidentesAbertosComponent {
  @ViewChild('chart') chart = new ChartComponent();
  public chartOptions = {} as ChartOptions;
  public chartLoaded = false;
  subscription: Subscription;
  public dataBase: Date;
  public meses = [];

  constructor(public matDialog: MatDialog, private service: DashboardService) {}
  ngOnInit(): void {
    this.iniciarPagina();

    const source = interval(5000);
    this.subscription = source.subscribe(() => this.atualizarGrafico());
  }

  private iniciarPagina() {
    this.dataBase = new Date();
    this.meses = [];

    while (this.meses.length < 6) {
      this.meses.push({
        numero: this.dataBase.getMonth() + 1,
        nome: this.dataBase.toLocaleString('default', { month: 'long' }),
      });
      if (this.dataBase.getMonth() + 1 === 1) {
        this.dataBase.setMonth(12);
      } else {
        this.dataBase.setMonth(this.dataBase.getMonth() - 1);
      }
    }
    this.meses = this.meses.reverse();

    this.service
      .obterDashboardAbertos(this.meses[0].numero, this.meses[5].numero)
      .then((res) => {
        if (res.sucesso && res.dados && res.dados.itens.length > 0) {
          this.chartOptions = {
            series: [
              {
                name: 'Incidentes em aberto',
                data: res.dados.itens.map((item) => item.qtdPostagens),
              },
            ],
            chart: {
              height: 360,
              type: 'line',
              zoom: {
                enabled: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: 'straight',
            },
            title: {
              text:
                'Incidentes em aberto: ' + res.dados.totalAbertos.toString(),
              align: 'center',
              style: {
                fontSize: '18px',
              },
            },
            subtitle: {
              text: 'Número de postagens em aberto, nos últimos 6 meses',
              align: 'center',
            },
            grid: {
              row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5,
              },
            },
            xaxis: {
              categories: res.dados.itens.map((x) => x.mes),
            },
            yaxis: {
              labels: {
                formatter: function (val) {
                  return Math.floor(val).toString();
                },
              },
            },
          };
          this.chartLoaded = true;
        }
      });
  }

  private atualizarGrafico() {
    this.service
      .obterDashboardAbertos(this.meses[0].numero, this.meses[5].numero)
      .then((res) => {
        if (res.sucesso && res.dados && res.dados.itens.length > 0) {
          const options = {
            series: [
              {
                name: 'Incidentes em aberto',
                data: res.dados.itens.map((item) => item.qtdPostagens),
              },
            ],
            chart: {
              height: 360,
              type: 'line',
              zoom: {
                enabled: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: 'straight',
            },
            title: {
              text:
                'Incidentes em aberto: ' + res.dados.totalAbertos.toString(),
              align: 'center',
              style: {
                fontSize: '18px',
              },
            },
            subtitle: {
              text: 'Número de postagens em aberto, nos últimos 6 meses',
              align: 'center',
            },
            grid: {
              row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5,
              },
            },
            xaxis: {
              categories: res.dados.itens.map((x) => x.mes),
            },
            yaxis: {
              labels: {
                formatter: function (val) {
                  return Math.floor(val).toString();
                },
              },
            },
          };
          this.chart.updateOptions(options);
          this.chart.updateSeries(options.series);
        }
      });
  }
}
