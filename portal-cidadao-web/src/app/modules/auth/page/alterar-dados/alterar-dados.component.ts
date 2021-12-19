import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'
import { AuthService } from 'src/app/service/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IUsuarioAlteracaoModel } from 'src/app/models/usuario-alteracao.model';
import { IBaseModel } from 'src/app/models/base.model';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-alterar-dados',
  templateUrl: './alterar-dados.component.html',
  styleUrls: ['./alterar-dados.component.scss']
})
export class AlterarDadosComponent implements OnInit {
  public cpf = '';
  public model: IUsuarioAlteracaoModel = {} as IUsuarioAlteracaoModel;
  public form = new FormGroup({
    nome: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private location: Location,
    public authService: AuthService,
    private toastr: ToastrService,
    private usuarioService: UsuarioService
  ) {
    console.log(this.authService.currentUserValue);
  }

  ngOnInit() {
    this.cpf = this.authService.currentUserValue.cpf
        .padStart(11, '0')                  // item 1
        .substr(0, 11)                      // item 2
        .replace(/[^0-9]/, '')              // item 3
        .replace(                           // item 4
            /(\d{3})(\d{3})(\d{3})(\d{2})/,
            '$1.$2.$3-$4'
        );;

      this.form.controls['nome'].setValue(this.authService.currentUserValue.nome);
      this.form.controls['email'].setValue(this.authService.currentUserValue.email);
  }

  async onSubmit(){
    if (this.form.invalid) {
      this.toastr.warning('Formulário inválido!', 'Atenção');
      return;
    }

    this.atualizarModel(this.form.value);
    const id = this.authService.currentUserValue.id;

    try {
      let res: IBaseModel<IUsuarioAlteracaoModel>  = {} as IBaseModel<IUsuarioAlteracaoModel>;
      res = await this.usuarioService.alterarDados(id, this.model);

      if (res.sucesso) {
        this.toastr.success('Registro salvo com sucesso!', 'Sucesso');
        this.authService.currentUserValue.email = res.dados.email;
        this.authService.currentUserValue.nome = res.dados.nome;
        this.router.navigate(['/login']);
      } else {
        this.toastr.warning(res.mensagem.descricao, 'Atenção');
      }
    } catch (err) {
      this.toastr.error(err, 'Atenção');
    }
  }

  goBack() {
    this.location.back();
  }
  
  redefinirSenha() {
    if (this.form.invalid) {
      this.toastr.warning('Formulário inválido!', 'Atenção');
      return;
    }

    this.usuarioService.esqueciSenha(this.form.value.email)
    .then(() => {
      this.router.navigate(['/email-enviado-recuperacao']);
    })
    .catch((err) => {
      console.log(err);
    })    
  }

  private atualizarModel(values: any) {
    Object.assign(this.model, values);
  }

}
