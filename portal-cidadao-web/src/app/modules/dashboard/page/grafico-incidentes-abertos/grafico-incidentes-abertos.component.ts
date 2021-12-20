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

  constructor(public matDialog: MatDialog, private service: DashboardService) {}
  ngOnInit(): void {
    var dataBase = new Date();
    var meses = [];

    while (meses.length < 6) {
      meses.push({
        numero: dataBase.getMonth() + 1,
        nome: dataBase.toLocaleString('default', { month: 'long' }),
      });
      console.log(meses, 'meses');
      if (dataBase.getMonth() + 1 === 1) {
        dataBase.setMonth(12);
      } else {
        dataBase.setMonth(dataBase.getMonth() - 1);
      }
    }
    meses = meses.reverse();
    console.log(meses, 'meses after change');

    this.service
      .obterDashboardAbertos(meses[0].numero, meses[5].numero)
      .then((res) => {
        if (res.sucesso && res.dados && res.dados.itens.length > 0) {
          console.log('Aberto', res.dados);

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
}
