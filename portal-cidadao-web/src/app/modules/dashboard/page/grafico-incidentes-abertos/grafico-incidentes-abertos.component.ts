import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostagemService } from 'src/app/service/postagem.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


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
  private fevereiro: number;
  private março: number;
  private abril: number;
  private maio: number;
  private junho: number;
  private julho: number;
  private soma: number;
  constructor(
    public matDialog: MatDialog,
    private postagemService: PostagemService,   
    private toastr: ToastrService
  ) 
   
  
  {
      this.chartOptions = {
        series: [
          {
            name: "Incidentes Abertos",
            data: [this.fevereiro, this.março, this.abril, this.maio, this.junho, this.julho]
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
          text: "Incidentes abertos: " + this.soma,
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
    
    public carregarChart(): void{
      this.postagemService
      .PostagensAbertasPorMes('2')
      .then((res) => {
        console.log("1", res.dados.length);
        this.fevereiro = res.dados.length;
      })
      .catch((err) => {
        this.toastr.error(err.mensagem.descricao, 'Atenção');
      });
      this.postagemService
      .PostagensAbertasPorMes('3')
      .then((res) => {
        console.log("2", res.dados.length);
        this.março = res.dados.length;
      })
      .catch((err) => {
        this.toastr.error(err.mensagem.descricao, 'Atenção');
      });
      this.postagemService
      .PostagensAbertasPorMes('4')
      .then((res) => {
        console.log("3", res.dados.length);
        this.abril = res.dados.length;
      })
      .catch((err) => {
        this.toastr.error(err.mensagem.descricao, 'Atenção');
      });
      this.postagemService
      .PostagensAbertasPorMes('5')
      .then((res) => {
        console.log("4", res.dados.length);
        this.maio = res.dados.length;
      })
      .catch((err) => {
        this.toastr.error(err.mensagem.descricao, 'Atenção');
      });
      this.postagemService
      .PostagensAbertasPorMes('6')
      .then((res) => {
        console.log("5", res.dados.length);
        this.junho = res.dados.length;
      })
      .catch((err) => {
        this.toastr.error(err.mensagem.descricao, 'Atenção');
      });
      this.postagemService
      .PostagensAbertasPorMes('7')
      .then((res) => {
        console.log("6", res.dados.length);
        this.julho = res.dados.length;
      })
      .catch((err) => {
        this.toastr.error(err.mensagem.descricao, 'Atenção');
      });
    }
    
}
