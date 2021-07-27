import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PostagemService } from 'src/app/service/postagem.service';
import { ModalCriarPostagemComponent } from './modal-criar-postagem/modal-criar-postagem.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public position = {};
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

  constructor(
    public matDialog: MatDialog,
    public postagemService: PostagemService
  ) {

  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.position = position;
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }

      this.novoMarcador(this.center.lat, this.center.lng);
    });

    this.iniciarPagina();

      // markers fake
      /*this.novoMarcador(
        -25.443514,
        -49.275537);

      this.novoMarcador(-25.446550, 
         -49.248012);

      this.novoMarcador(-25.529905, 
         -49.249702);

      this.novoMarcador(-25.391994, 
         -49.272613);

      this.novoMarcador(-25.412127, 
         -49.226749);*/

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
      this.iniciarPagina();
    })
  }

  private novoMarcador(lat: number, lng: number): void {
    this.markers.push({
      position: {
        lat: lat, 
        lng: lng,
      },
      label: {
        color: 'white',
        text: ' ',
      },
      title: ' ',
      options: { animation: google.maps.Animation.DROP },
    });
  }

  private iniciarPagina() {
    
    this.postagemService.listarTodos()
      .then((res) => {
        if (res.dados) {
          res.dados.forEach((postagem) => {
            this.novoMarcador(postagem.latitude, postagem.longitude);
          })
        }
      });
  }

}
