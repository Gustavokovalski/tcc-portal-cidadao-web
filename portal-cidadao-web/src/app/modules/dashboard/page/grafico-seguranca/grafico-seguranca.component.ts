import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexPlotOptions} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    xaxis: ApexXAxis;
  };

@Component({
  selector: 'app-grafico-seguranca',
  templateUrl: './grafico-seguranca.component.html',
  styleUrls: ['./grafico-seguranca.component.scss']
})
export class GraficoSegurancaComponent {
  @ViewChild("chart") chart = new ChartComponent();
  public chartOptions = {} as ChartOptions;

  constructor(
    public matDialog: MatDialog,
  ) {
    this.chartOptions = {
        series: [
          {
            name: "basic",
            data: [540, 520, 448, 300, 290]
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
          categories: [
            "22:00-22:59",
            "23:00-23:59",
            "00:00-00:59",
            "21:00-21:59",
            "12:00-12:59"
          ]
        }
      };
  }
}
