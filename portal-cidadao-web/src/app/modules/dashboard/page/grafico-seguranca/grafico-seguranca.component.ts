import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
} from 'ng-apexcharts';
import { interval, Subscription } from 'rxjs';
import { DashboardService } from 'src/app/service/dashboard.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
};

@Component({
  selector: 'app-grafico-seguranca',
  templateUrl: './grafico-seguranca.component.html',
  styleUrls: ['./grafico-seguranca.component.scss'],
})
export class GraficoSegurancaComponent implements OnInit {
  @ViewChild('chart') chart = new ChartComponent();
  public chartOptions = {} as ChartOptions;
  public chartLoaded = false;
  subscription: Subscription;

  constructor(public matDialog: MatDialog, private service: DashboardService) {}

  ngOnInit(): void {
    this.iniciarPagina();

    const source = interval(5000);
    this.subscription = source.subscribe(() => this.atualizarGrafico());
  }

  private iniciarPagina() {
    this.service.obterDashboardSeguranca().then((res) => {
      if (res.sucesso && res.dados && res.dados.dashboardSeguranca) {
        this.chartOptions = {
          series: [
            {
              name: 'Total de ocorrências',
              data: res.dados.dashboardSeguranca.map((x) => x.quantidade),
            },
          ],
          chart: {
            type: 'bar',
            height: 360,
          },
          plotOptions: {
            bar: {
              horizontal: true,
              barHeight: '15px',
            },
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            categories: res.dados.dashboardSeguranca.map((x) => x.horario),
          },
          yaxis: {
            labels: {
              formatter: function (val) {
                return val.toString();
              },
              style: {
                colors: 'black',
                fontWeight: 'bold',
                fontSize: '1.15em',
              },
            },
          },
        };
        this.chartLoaded = true;
      }
    });
  }

  private atualizarGrafico() {
    this.service.obterDashboardSeguranca(true).then((res) => {
      if (res.sucesso && res.dados && res.dados.dashboardSeguranca) {
        const options = {
          series: [
            {
              name: 'Total de ocorrências',
              data: res.dados.dashboardSeguranca.map((x) => x.quantidade),
            },
          ],
          chart: {
            type: 'bar',
            height: 360,
          },
          plotOptions: {
            bar: {
              horizontal: true,
              barHeight: '15px',
            },
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            categories: res.dados.dashboardSeguranca.map((x) => x.horario),
          },
          yaxis: {
            labels: {
              formatter: function (val) {
                return val.toString();
              },
              style: {
                colors: 'black',
                fontWeight: 'bold',
                fontSize: '1.15em',
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
