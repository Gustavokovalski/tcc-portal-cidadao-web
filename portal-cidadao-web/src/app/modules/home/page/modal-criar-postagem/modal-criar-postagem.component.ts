import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-criar-postagem',
  templateUrl: './modal-criar-postagem.component.html',
  styleUrls: ['./modal-criar-postagem.component.scss']
})
export class ModalCriarPostagemComponent {
  constructor(
  ) {}

  public placeChangedCallback(event: any) {
    console.log(event);
  }
}
