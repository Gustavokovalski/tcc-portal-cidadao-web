import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'

@Component({
  selector: 'app-envio-email-recuperacao',
  templateUrl: './envio-email-recuperacao.component.html',
  styleUrls: ['./envio-email-recuperacao.component.scss']
})
export class EnvioEmailRecuperacaoComponent implements OnInit {
  constructor(
    private location: Location
  ) {

  }

  ngOnInit() {}

  login() {

  }

  goBack() {
    this.location.back();
  }


}
