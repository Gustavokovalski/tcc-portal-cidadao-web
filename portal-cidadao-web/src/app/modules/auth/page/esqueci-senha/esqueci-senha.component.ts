import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/service/usuario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.scss'],
})
export class EsqueciSenhaComponent implements OnInit {
  public form = new FormGroup({
    email: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  enviarEmailRecuperacao() {
    if (this.form.invalid) {
      this.toastr.warning('Formulário inválido!', 'Atenção');
      return;
    }

    // fazer logica aqui de enviar email de recuperação
    this.usuarioService
      .esqueciSenha(this.form.value.email)
      .then(() => {
        this.router.navigate(['/email-enviado-recuperacao']);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public getLogoPath() {
    return environment.baseAssetsPath + '/images/logo.png';
  }
}
