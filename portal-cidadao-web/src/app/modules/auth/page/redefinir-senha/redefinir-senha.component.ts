import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IRedefinicaoSenhaModel } from 'src/app/models/redefinicao-senha.model';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.scss']
})
export class RedefinirSenhaComponent implements OnInit {
  public model: IRedefinicaoSenhaModel = {} as IRedefinicaoSenhaModel;
  public returnUrl: string = '';

  public form = new FormGroup({
      senha: new FormControl('', Validators.required),
      confirmarSenha: new FormControl('', Validators.required),
    });
    
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private usuarioService: UsuarioService,
    private location: Location
  ) {

  }

  ngOnInit() {
  }

  redefinirSenha() {
    if (this.form.invalid) {
      this.toastr.warning('Formulário inválido!', 'Atenção');
      return;
    }

    if (this.form.value.senha !== this.form.value.confirmarSenha) {
      this.toastr.warning('As senhas não coincidem!', 'Atenção');
      return;
    }

    this.model.novaSenha = this.form.value.senha;
    this.model.token = this.route.snapshot.queryParams['t'];
    
    this.usuarioService.redefinirSenha(this.model)
    .then((res) => {
      this.toastr.success('Senha redefinida com sucesso!', 'Sucesso');
      this.router.navigate(["/"]);
    })
  }


}
