import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalCriarPostagemComponent } from './modal-criar-postagem/modal-criar-postagem.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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
    public matDialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }

      this.markers.push({
        position: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        label: {
          color: 'red',
          text: ' ' + (this.markers.length + 1),
        },
        title: ' ' + (this.markers.length + 1),
        options: { animation: google.maps.Animation.DROP },
      });
    })

    this.markers.push({
      position: {
        lat: -25.443514,
        lng: -49.275537,
      },
      label: {
        color: 'red',
        text: ' ' + (this.markers.length + 1),
      },
      title: ' ' + (this.markers.length + 1),
      options: { animation: google.maps.Animation.DROP },
    });

    this.markers.push({
      position: {
        lat: -25.446550, 
        lng: -49.248012,
      },
      label: {
        color: 'red',
        text: ' ' + (this.markers.length + 1),
      },
      title: ' ' + (this.markers.length + 1),
      options: { animation: google.maps.Animation.DROP },
    });

    this.markers.push({
      position: {
        lat: -25.529905, 
        lng: -49.249702
      },
      label: {
        color: 'red',
        text: ' ' + (this.markers.length + 1),
      },
      title: ' ' + (this.markers.length + 1),
      options: { animation: google.maps.Animation.DROP },
    });

    this.markers.push({
      position: {
        lat: -25.391994, 
        lng: -49.272613
      },
      label: {
        color: 'red',
        text: ' ' + (this.markers.length + 1),
      },
      title: ' ' + (this.markers.length + 1),
      options: { animation: google.maps.Animation.DROP },
    });

    this.markers.push({
      position: {
        lat: -25.412127, 
        lng: -49.226749,
      },
      label: {
        color: 'red',
        text: ' ' + (this.markers.length + 1),
      },
      title: ' ' + (this.markers.length + 1),
      options: { animation: google.maps.Animation.DROP },
    });
  }

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
