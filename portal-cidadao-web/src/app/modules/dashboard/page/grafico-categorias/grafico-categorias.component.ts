import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexPlotOptions,
  ApexNonAxisChartSeries,
  ApexResponsive} from "ng-apexcharts";

  export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    responsive: ApexResponsive[];
    labels: any;
  };

@Component({
  selector: 'app-grafico-categorias',
  templateUrl: './grafico-categorias.component.html',
  styleUrls: ['./grafico-categorias.component.scss']
})
export class GraficoCategoriasComponent {
  @ViewChild("chart") chart = new ChartComponent();
  public chartOptions = {} as ChartOptions;

  constructor(
    public matDialog: MatDialog,
  ) {
    this.chartOptions = {
        series: [70, 25, 5],
        chart: {
          width: 360,
          type: "pie"
        },
        labels: ["Reclamação", "Sugestão", "Elogio"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };
  }
}
