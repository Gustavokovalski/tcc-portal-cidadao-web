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
  selector: 'app-grafico-incidentes-atraso',
  templateUrl: './grafico-incidentes-atraso.component.html',
  styleUrls: ['./grafico-incidentes-atraso.component.scss']
})
export class GraficoIncidentesAtrasoComponent {
  @ViewChild("chart") chart = new ChartComponent();
  public chartOptions = {} as ChartOptions;

  constructor(
    public matDialog: MatDialog,
  ) {
      this.chartOptions = {
        series: [
          {
            name: "Incidentes em atraso",
            data: [7, 5, 4, 20, 15, 8]
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
          text: "Incidentes em atraso: 68",
          align: "center"
        },
        subtitle: {
            text: "Incidentes com mais de 15 dias sem resolução",
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
