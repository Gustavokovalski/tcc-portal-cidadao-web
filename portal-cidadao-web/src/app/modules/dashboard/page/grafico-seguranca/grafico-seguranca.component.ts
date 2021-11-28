import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis} from "ng-apexcharts";
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
  styleUrls: ['./grafico-seguranca.component.scss']
})
export class GraficoSegurancaComponent implements OnInit {
  @ViewChild("chart") chart = new ChartComponent();
  public chartOptions = {} as ChartOptions;
  public chartLoaded = false;

  constructor(
    public matDialog: MatDialog,
    private service: DashboardService
  ) {

  }

  ngOnInit(): void {
    this.service.obterDashboardSeguranca()
    .then((res) => {
      if (res.sucesso && res.dados && res.dados.dashboardSeguranca) {
        this.chartOptions = {
          series: [
            {
              name: "Total de ocorrências",
              data: res.dados.dashboardSeguranca.map(x => x.quantidade)
            }
          ],
          chart: {
            type: "bar",
            height: 350
          },
          plotOptions: {
            bar: {
              horizontal: true
            }
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: res.dados.dashboardSeguranca.map(x => x.horario)
          },
          yaxis: {
            labels: {
              formatter: function(val) {
                return val.toString()
              }
            }
          }
        };
        this.chartLoaded = true;
      }
    })

  }
}
