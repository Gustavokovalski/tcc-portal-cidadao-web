import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
};

@Component({
  selector: 'app-grafico-incidentes-abertos',
  templateUrl: './grafico-incidentes-abertos.component.html',
  styleUrls: ['./grafico-incidentes-abertos.component.scss']
})
export class GraficoIncidentesAbertosComponent {
  @ViewChild("chart") chart = new ChartComponent();
  public chartOptions = {} as ChartOptions;

  constructor(
    public matDialog: MatDialog,
  ) {
      this.chartOptions = {
        series: [
          {
            name: "Incidentes Abertos",
            data: [10, 41, 35, 51, 49, 62]
          }
        ],
        chart: {
          height: 280,
          type: "line",
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight"
        },
        title: {
          text: "Incidentes abertos: 240",
          align: "center"
        },
        subtitle: {
          text: "Total de incidentes abertos na cidade",
          align: "center"
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: [
            "Fev",
            "Mar",
            "Abr",
            "Mai",
            "Jun",
            "Jul"
          ]
        }
      };
    }
}
