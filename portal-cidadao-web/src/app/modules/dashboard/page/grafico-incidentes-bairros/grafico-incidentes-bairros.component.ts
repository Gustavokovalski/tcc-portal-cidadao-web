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
  ApexGrid,
  ApexPlotOptions,
  ApexLegend,
  ApexTooltip,
  ApexFill,
  ApexYAxis
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    fill: ApexFill;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    //legend: ApexLegend;
};

@Component({
  selector: 'app-grafico-incidentes-bairros',
  templateUrl: './grafico-incidentes-bairros.component.html',
  styleUrls: ['./grafico-incidentes-bairros.component.scss']
})
export class GraficoIncidentesBairrosComponent {
  @ViewChild("chart") chart = new ChartComponent();
  public chartOptions = {} as ChartOptions;

  constructor(
    public matDialog: MatDialog,
  ) {
    this.chartOptions = {
        series: [
          {
            name: "Água Verde",
            data: [44]
          },
          {
            name: "Fazendinha",
            data: [9]
          },
          {
            name: "Portão",
            data: [30]
          },
          {
            name: "Rebouças",
            data: [50]
          },
          {
            name: "Centro",
            data: [100]
          },
          {
            name: "Hauer",
            data: [20]
          },
          {
            name: "Batel",
            data: [12]
          },
          {
            name: "CIC",
            data: [60]
          },
          {
            name: "Mossunguê",
            data: [28]
          },
          {
            name: "Jd. das Américas",
            data: [7]
          },
          {
            name: "Cajuru",
            data: [35]
          },
        ],
        chart: {
          type: "bar",
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "75%"
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        xaxis: {
          categories: [
            "Agosto/2021",
          ]
        },
        yaxis: {
          title: {
            text: " postagens"
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function(val: any) {
              return  val + " postagens";
            }
          }
        }
      };
    }
}
