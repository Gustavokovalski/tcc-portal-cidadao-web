import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.scss']
})
export class EsqueciSenhaComponent implements OnInit {
  constructor(
    private router: Router
  ) {

  }

  ngOnInit() {}

  enviarEmailRecuperacao() {
    // fazer logica aqui de enviar email de recuperação
    
    this.router.navigate(['/email-enviado-recuperacao']);
  }


}
