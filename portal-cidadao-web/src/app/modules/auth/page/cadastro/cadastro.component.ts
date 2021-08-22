import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IBaseModel } from 'src/app/models/base.model';
import { IEnumModel } from 'src/app/models/enum.model';
import { IUsuarioModel } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  public model: IUsuarioModel = {} as IUsuarioModel;
  public senhasNaoConferem = false;
  public perfilSelecionado = 1;
  public listaPerfis!: IEnumModel[];
 
  public form = new FormGroup({
    nome: new FormControl('', Validators.required),
    cpf: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    email: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required),
    // confirmarSenha: new FormControl('', Validators.required),
    perfilId: new FormControl(2, Validators.required)
  });

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {}

  async onSubmit(){
    if (this.form.invalid) {
      this.toastr.warning('Formulário inválido!', 'Atenção');
      return;
    }

    this.atualizarModel(this.form.value);

    try {
      let res: IBaseModel<IUsuarioModel>  = {} as IBaseModel<IUsuarioModel>;

      res = await this.usuarioService.inserir(this.model);

      if (res.sucesso) {
        this.toastr.success('Registro salvo com sucesso! Realize o login', 'Sucesso');
        this.router.navigate(['/login']);
      } else {
        this.toastr.warning(res.mensagem.descricao, 'Atenção');
      }
    } catch (err) {
      this.toastr.error(err, 'Atenção');
    }
  }

  enviarEmailConfirmacao() {
    // fazer logica aqui de enviar email de confirmacao
    this.router.navigate(['/email-enviado']);
  }

  private atualizarModel(values: any) {
    Object.assign(this.model, values);
  }

}
