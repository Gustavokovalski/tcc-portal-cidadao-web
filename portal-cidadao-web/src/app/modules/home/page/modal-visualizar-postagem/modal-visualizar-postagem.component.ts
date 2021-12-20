import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ICategoriaModel } from 'src/app/models/categoria.model';
import { IEnumModel } from 'src/app/models/enum.model';
import { IPostagemModel } from 'src/app/models/postagem.model';
import { ICurtidaModel } from 'src/app/models/curtida.model';
import { IComentarioModel } from 'src/app/models/comentario.model';
import { CurtidaService } from 'src/app/service/curtida.service';
import { AuthService } from 'src/app/service/auth.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { Router } from '@angular/router';
import { ComentarioService } from 'src/app/service/comentario.service';

@Component({
  selector: 'app-modal-visualizar-postagem',
  templateUrl: './modal-visualizar-postagem.component.html',
  styleUrls: ['./modal-visualizar-postagem.component.scss'],
})
export class ModalVisualizarPostagemComponent implements OnInit, OnDestroy {
  public position = {};
  public center = { lat: -25.4372, lng: -49.27 };
  public options: google.maps.MapOptions = {};

  public model: IPostagemModel = {} as IPostagemModel;
  public curtidaModel: ICurtidaModel = {} as ICurtidaModel;
  public comentarioModel: IComentarioModel = {} as IComentarioModel;
  public enderecoAtual = '';
  public objEnderecoAtual: any;
  public bairroAtual = '';
  public categorias!: ICategoriaModel[];
  public subcategorias!: IEnumModel[];
  public midiaPostagem = '';
  public clickedDislike = false;
  public clickedLike = false;
  public clickedResolver = false;
  public curtida!: ICurtidaModel[];
  public fileControl = new FormControl(null);
  public comentarios: any = [];
  public visible = false;
  public admin = false;

  public form = new FormGroup({
    comentario: new FormControl('', [
      Validators.required,
      Validators.maxLength(500),
      Validators.minLength(3),
    ]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private postagemService: PostagemService,
    private router: Router,
    private curtidaService: CurtidaService,
    public matDialog: MatDialog,
    private comentarioService: ComentarioService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public authService: AuthService
  ) {
    this.buscarPostagem();
  }

  ngOnDestroy(): void {
    this.comentarios = [];
    this.clickedDislike = false;
    this.clickedLike = false;
    this.clickedResolver = false;
  }

  ngOnInit(): void {
    this.listarCategorias();
    this.listarSubcategorias();
    this.buscarLike();
    this.listarComentarios();
    this.mostrarBotaoResolver();
    this.mostrarBotaoExcluirComentario();
  }

  public onChangeLocalPostagem(event: any): void {
    this.enderecoAtual = event.formatted_address;
    this.objEnderecoAtual = event;
    this.obterBairroAtual();
  }

  public buscarPostagem(): void {
    this.postagemService
      .buscarPostagem(this.data)
      .then((res) => {
        this.model = res.dados;
        this.setarEnderecoAtual(this.model.latitude, this.model.longitude);
        if (this.model.resolvido == true) {
          this.clickedResolver = true;
        } else if (this.model.resolvido == false) {
          this.clickedResolver = false;
        }
        this.buscarMidiaPostagem(res.dados.imagemUrl);
      })
      .catch((err) => {
        this.toastr.error(err.mensagem.descricao, 'Atenção');
      });
  }
  public listarComentarios(): void {
    this.comentarioService
      .ListarTodos(this.data)
      .then((res) => {
        this.comentarios = res.dados;
      })
      .catch((err) => {
        this.toastr.error(err.mensagem.descricao, 'Atenção');
      });
  }

  public like(): void {
    if (this.authService.currentUserValue?.perfil?.nome === 'Especial') return;

    this.curtidaModel.postagemId = this.model.id;
    this.curtidaModel.usuarioId = this.authService.currentUserValue.id;
    this.curtidaService
      .obterLike(this.authService.currentUserValue.id, this.data)
      .then((res) => {
        if (res.dados) {
          const curtida = res.dados;
          if (curtida != null && curtida.acao == false) {
            this.curtidaService.atualizarCurtida(curtida.id, true);
            this.clickedDislike = false;
            this.model.curtidas++;
            this.model.descurtidas--;
          } else if (curtida != null && curtida.acao == true) {
            this.curtidaService.removerCurtida(curtida.id);
            this.model.curtidas--;
          }
        } else {
          this.model.curtidas++;
          this.curtidaModel.acao = true;

          this.curtidaService.inserir(this.curtidaModel);
        }
      })
      .catch((err) => {
        console.log(err);
        this.toastr.error(err.mensagem.descricao, 'Atenção');
      });
  }
  public mostrarBotaoResolver(): void {
    if (this.authService.currentUserValue?.perfil?.nome === 'Especial') {
      this.visible = true;
    }
  }

  public mostrarBotaoExcluirComentario(): void {
    if (this.authService.currentUserValue?.perfil?.nome === 'Administrador') {
      this.admin = true;
    }
  }

  public resolver(): void {
    if (this.model.resolvido == true) {
      this.postagemService.resolverPostagem(this.model.id, false);
      this.clickedResolver = false;
    } else if (this.model.resolvido == false) {
      this.postagemService.resolverPostagem(this.model.id, true);
      this.clickedResolver = true;
    }
  }
  public setClickedLike() {
    if (this.authService.currentUserValue?.perfil?.nome === 'Especial') return;

    this.clickedLike = !this.clickedLike;
  }

  public setClickedDislike() {
    if (this.authService.currentUserValue?.perfil?.nome === 'Especial') return;

    this.clickedDislike = !this.clickedDislike;
  }

  public comentar(): void {
    if (this.form.invalid) {
      this.toastr.warning('Formulário inválido, o campo comentário é obrigatório!', 'Atenção');
      return;
    }

    this.comentarioModel.descricao = this.form.value['comentario'];
    let today = new Date().toISOString().slice(0, 19).replace('T', ' ');
    this.comentarioModel.dataCadastro = new Date(today);
    this.comentarioModel.usuarioId = this.authService.currentUserValue.id;
    this.comentarioModel.postagemId = this.model.id;
    this.comentarioService
      .inserir(this.comentarioModel)
      .then((res) => {
        if (res.sucesso) {
          this.toastr.success(res.mensagem.descricao);
          this.listarComentarios();
          this.form.get('comentario').setValue("");
        } else {
          this.toastr.error(res?.mensagem?.descricao);
        }
      })
      .catch((err) => console.log(err));
  }

  public dislike(): void {
    if (this.authService.currentUserValue?.perfil?.nome === 'Especial') return;

    this.curtidaModel.postagemId = this.model.id;
    this.curtidaModel.usuarioId = this.authService.currentUserValue.id;
    this.curtidaService
      .obterLike(this.authService.currentUserValue.id, this.data)
      .then((res) => {
        if (res.dados) {
          const curtida = res.dados;
          if (curtida != null && curtida.acao == false) {
            this.curtidaService.removerCurtida(curtida.id);
            this.model.descurtidas--;
          } else if (curtida != null && curtida.acao == true) {
            this.clickedLike = false;
            this.curtidaService.atualizarCurtida(curtida.id, false);
            this.model.descurtidas++;
            this.model.curtidas--;
          }
        } else {
          this.model.descurtidas++;
          this.curtidaModel.acao = false;
          this.curtidaService.inserir(this.curtidaModel);
        }
      })
      .catch((err) => {
        this.toastr.error(err.mensagem.descricao, 'Atenção');
      });
  }

  public buscarLike(): void {
    this.curtidaModel.usuarioId = this.authService?.currentUserValue?.id;
    this.curtidaModel.postagemId = this.model.id;
    this.curtidaService
      .obterLike(this.authService?.currentUserValue?.id, this.data)
      .then((res) => {
        if (res.dados) {
          const curtida = res.dados;
          if (curtida != null && curtida.acao == false) {
            this.clickedDislike = true;
          }

          if (curtida != null && curtida.acao == true) {
            this.clickedLike = true;
          }
        }
      })
      .catch((err) => {
        console.log(err);
        //this.toastr.error(err.mensagem.descricao, 'Atenção');
      });
  }
  public buscarMidiaPostagem(nomeArquivo: string): void {
    this.postagemService
      .buscarMidiaPostagem(nomeArquivo)
      .then((res) => (this.midiaPostagem = res.fileContents))
      .catch((err) => null);
  }

  public listarCategorias(): void {
    this.postagemService
      .listarCategorias()
      .then((res) => {
        this.categorias = res.dados;
      })
      .catch((err) => {
        this.toastr.error(err.mensagem.descricao, 'Atenção');
      });
  }
  public excluirPostagem(): void {
    this.postagemService.excluirPostagem(this.model.id, true);
    this.router.navigate(['/home']);
  }
  public excluirComentario(c): void {
    this.comentarioService.excluirComentario(c.id);
    this.data;
  }
  public listarSubcategorias(): void {
    this.postagemService
      .listarSubcategorias()
      .then((res) => {
        this.subcategorias = res.dados;
      })
      .catch((err) => {
        this.toastr.error(err.mensagem.descricao, 'Atenção');
      });
  }

  private setarEnderecoAtual(lat: any, lon: any): void {
    let geocoder = new google.maps.Geocoder();
    let latlng = new google.maps.LatLng(lat, lon);
    let request = {
      location: latlng,
    };

    geocoder.geocode(request, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          this.enderecoAtual = results[0].formatted_address;
          this.objEnderecoAtual = results[0];

          this.obterBairroAtual();
        } else {
          alert('No address available');
        }
      }
    });
  }

  private obterBairroAtual(): void {
    this.objEnderecoAtual.address_components.forEach((x: any) => {
      if (x.types.includes('sublocality')) this.bairroAtual = x.long_name;
    });
  }

  private atualizarModel(values: any) {
    Object.assign(this.comentarioModel.descricao, values);
  }

  public obterTempoPost(dataPostagem: any) {
    const diferencaMinutos =
      (new Date().getTime() - new Date(dataPostagem).getTime()) / 1000 / 60 +
      180; // tirar fuso

    if (diferencaMinutos > 59) {
      const diferencaEmHoras = diferencaMinutos / 60;
      if (diferencaEmHoras > 23) {
        const diferencaEmDias = diferencaEmHoras / 24;
        return Math.round(diferencaEmDias).toString() + 'd';
      } else {
        return Math.round(diferencaEmHoras).toString() + 'h';
      }
    } else {
      return Math.round(diferencaMinutos).toString() + 'm';
    }
  }
}
