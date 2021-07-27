import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPostagemModel } from 'src/app/models/postagem.model';
import { PostagemService } from 'src/app/service/postagem.service';

@Component({
  selector: 'app-modal-criar-postagem',
  templateUrl: './modal-criar-postagem.component.html',
  styleUrls: ['./modal-criar-postagem.component.scss']
})
export class ModalCriarPostagemComponent {
  public enderecoAtual = '';
  public objEnderecoAtual: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private postagemService: PostagemService
    ) {
    this.setarEnderecoAtual(data);
  }

  public onChangeLocalPostagem(event: any): void {
    this.enderecoAtual = event.formatted_address;
    this.objEnderecoAtual = event;
  }

  public inserir(): void {
    let model = {
      subcategoria: { codigo: 1, nome: 'Reclamacao', descricao: 'Reclamacao'},
      categoriaId: 1,
      titulo: 'teste',
      descricao: 'teste teste',
      imagemUrl: 'string',
      latitude: this.objEnderecoAtual.geometry.location.lat(),
      longitude: this.objEnderecoAtual.geometry.location.lng(),
      bairro: 'teste',
      resolvido: false
    } as IPostagemModel;

    this.postagemService.inserir(model)
      .then((res) => {
        console.log(res);
      })
  }

  private setarEnderecoAtual(data: any): void {
    let geocoder = new google.maps.Geocoder();
    let latlng = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
    let request = {
      location: latlng
    };

    geocoder.geocode(request, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          this.enderecoAtual = results[0].formatted_address;
          this.objEnderecoAtual = results[0];
        } else {
          alert("No address available");
        }
      }
    });
  }
}
