import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalCriarPostagemComponent } from './modal-criar-postagem/modal-criar-postagem.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  /*private zoom = 12
  private center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }*/

  public options: google.maps.MapOptions = {
    center: {lat: -25.4372, lng: -49.2700},
    zoom: 15,
    fullscreenControl: false
  };

  constructor(
    public matDialog: MatDialog
  ) {}

  abrirModalCriarPostagem() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.width = '30vw';
    dialogConfig.hasBackdrop = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = null;
    const modal = this.matDialog.open(ModalCriarPostagemComponent, dialogConfig);
  }

}
