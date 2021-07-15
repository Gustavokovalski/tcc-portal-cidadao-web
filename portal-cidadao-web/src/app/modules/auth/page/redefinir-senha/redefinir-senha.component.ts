import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.scss']
})
export class RedefinirSenhaComponent implements OnInit {
  constructor(
    private router: Router
  ) {

  }

  ngOnInit() {}

  enviarEmailConfirmacao() {
    // fazer logica aqui de enviar email de confirmacao
    
    this.router.navigate(['/email-enviado']);
  }


}
