import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PostagemService } from 'src/app/service/postagem.service';
import { ModalCriarPostagemComponent } from './modal-criar-postagem/modal-criar-postagem.component';
import { ModalFiltrarPostagemComponent } from './modal-filtrar-postagem/modal-filtrar-postagem.component';
import { ModalVisualizarPostagemComponent } from './modal-visualizar-postagem/modal-visualizar-postagem.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private maxDistance = 200;
  public position: object | undefined;
  public center = {lat: -25.4372, lng: -49.2700};
  public options: google.maps.MapOptions = {
    center: this.center,
    zoom: 13,
    fullscreenControl: false,
    styles: [
      {
        featureType: "poi",
        stylers: [
         { visibility: "off" }
        ]   
       }
   ]
  };
  public markers = [] as any;
  public comboBairros = [] as any;
  constructor(
    public matDialog: MatDialog,
    public postagemService: PostagemService
  ) {

  }

  ngOnInit(): void {
    this.preencheMarcadorPosicaoAtual();
    this.iniciarPagina('');
  }

  preencheMarcadorPosicaoAtual(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      if (position.coords.accuracy > this.maxDistance) {
        this.position = undefined;
        return;
      }
        
      this.position = position;
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
      this.novoMarcador(0, 0, this.center.lat, this.center.lng);
    });
  }

  abrirModalCriarPostagem() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.width = '30vw';
    dialogConfig.hasBackdrop = true;
    dialogConfig.disableClose = true;

    dialogConfig.data = this.position;
    const modal = this.matDialog.open(ModalCriarPostagemComponent, dialogConfig);
    modal.afterClosed().subscribe(() => {
      this.iniciarPagina('');
    })
  }

  private novoMarcador(id: number, subcategoriaId: number, lat: number, lng: number): void {
    this.markers.push({
      position: {
        lat: lat, 
        lng: lng,
      },
      label: {
        color: 'white',
      },
      title: '',
      icon: this.definirTipoMarcador(subcategoriaId),
      options: { store_id: id, cursor: 'pointer', animation: google.maps.Animation.DROP },
    });
  }

  private iniciarPagina(bairro: string) {
    this.markers.length = 0;
    this.preencheMarcadorPosicaoAtual()
    this.postagemService.listarTodos(bairro)
      .then((res) => {
        if (res.dados) {
          res.dados.forEach((postagem) => {
            this.novoMarcador(postagem.id, postagem.subcategoria.codigo, postagem.latitude, postagem.longitude);
          })
        }
      });
  }

  private preencheComboFiltroBairros(): void {
    this.comboBairros = [];
    this.postagemService.listarBairros()
      .then((res) => {
        if (res.dados) {
          res.dados.forEach((x) => {
            this.comboBairros.push(x)
          })
        }
      });
  }


  public abrirModalFiltro() {
    this.preencheComboFiltroBairros();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.width = '30vw';
    dialogConfig.hasBackdrop = true;
    dialogConfig.disableClose = true;

    dialogConfig.data = this.comboBairros;
    const modal = this.matDialog.open(ModalFiltrarPostagemComponent, dialogConfig);
    modal.afterClosed().subscribe((bairro) => {
      if(bairro){
        const res = bairro == 'todos' ? '' : bairro;
        this.iniciarPagina(res);
      }
    })
  }

  public abrirModalVisualizarPostagem(id: any) {
    if(id !== 0){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.id = 'modal-component';
      dialogConfig.width = '30vw';
      dialogConfig.hasBackdrop = true;
      dialogConfig.disableClose = true;
  
      dialogConfig.data = id;
      const modal = this.matDialog.open(ModalVisualizarPostagemComponent, dialogConfig);
      modal.afterClosed().subscribe(() => {
        this.iniciarPagina('');
      })
    }
  }
 
  private definirTipoMarcador(subcategoriaId: number): string {
    var result = '';

    switch(subcategoriaId) { 
      case 1: { 
        result = '../../../../assets/images/red-dot.png';
        break; 
      } 
      case 2: { 
        result = '../../../../assets/images/green-dot.png';
        break; 
      } 
      case 3: {
        result = '../../../../assets/images/blue-dot.png';
        break;
      }
      default: { 
        result = '../../../../assets/images/current-location.png';
        break; 
      } 
    } 
    return result;
  }
}
