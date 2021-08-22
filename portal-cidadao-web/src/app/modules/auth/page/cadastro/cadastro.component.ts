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
  public cpfValido = true;

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

    if(!this.validarCpf()){
      this.toastr.error('CPF inválido', 'Atenção');
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

  public validarCpf() : boolean  {
    const cpf = this.form.get('cpf')?.value;

    if (cpf.Length > 11) {
      this.cpfValido = false;
      return false;
    }

    let igual = true;
    for (let i = 1; i < 11 && igual; i++) {
      if (cpf[i] !== cpf[0]) {
        igual = false;
      }
    }

    if (igual || cpf === '12345678909') {
      this.cpfValido = false;
      return false; 
    }

    const numeros = new Array(11);

    for (let i = 0; i < 11; i++) {
      numeros[i] = parseInt(cpf[i], 10);
    }

    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += (10 - i) * numeros[i];
    }

    let resultado = soma % 11;

    if (resultado === 1 || resultado === 0) {
      if (numeros[9] !== 0) {
        this.cpfValido = false;
        return false;
      }
    }

    else if (numeros[9] !== 11 - resultado) {
      this.cpfValido = false;
      return false;
    }

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += (11 - i) * numeros[i];
    }
    resultado = soma % 11;

    if (resultado === 1 || resultado === 0) {
      if (numeros[10] !== 0) {
        this.cpfValido = false;
        return false;
      }
    }
    else if (numeros[10] !== 11 - resultado) {
      this.cpfValido = false;
      return false;
    }
    this.cpfValido = true;
    return true;
  }
}
