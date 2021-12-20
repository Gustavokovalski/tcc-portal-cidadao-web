import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { ModalCriarPostagemComponent } from './modal-criar-postagem/modal-criar-postagem.component';
import { ModalFiltrarPostagemComponent } from './modal-filtrar-postagem/modal-filtrar-postagem.component';
import { ModalVisualizarPostagemComponent } from './modal-visualizar-postagem/modal-visualizar-postagem.component';
import { environment } from 'src/environments/environment';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('usuarioVisitanteModal') usuarioVisitanteModal: TemplateRef<any>;
  subscription: Subscription;
  public filtroAtualBairro = '';
  public filtroAtualCategoria = 0;
  public filtroAtualSubcategoria = 0;
  public filtroAtualConfiabilidade = '';

  private maxDistance = 200;
  public position: object | undefined;
  public center = { lat: -25.4372, lng: -49.27 };
  public options: google.maps.MapOptions = {
    center: this.center,
    zoom: 13,
    fullscreenControl: false,
    styles: [
      {
        featureType: 'poi',
        stylers: [{ visibility: 'off' }],
      },
    ],
  };
  public markers = [] as any;
  public comboBairros = [] as any;
  public comboCategorias = [] as any;
  public comboSubcategorias = [] as any;
  public comboConfiabilidades = [] as any;

  constructor(
    public matDialog: MatDialog,
    public postagemService: PostagemService,
    public authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.preencheMarcadorPosicaoAtual();
    this.iniciarPagina('');

    const source = interval(5000);
    this.subscription = source.subscribe((val) =>
      this.atualizarMapa(
        this.filtroAtualBairro,
        this.filtroAtualCategoria,
        this.filtroAtualSubcategoria,
        this.filtroAtualConfiabilidade
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  preencheMarcadorPosicaoAtual(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      if (position.coords.accuracy > this.maxDistance) {
        this.position = undefined;
        return;
      }

      this.position = position;
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.novoMarcador(0, 0, this.center.lat, this.center.lng, '');
    });
  }

  irParaLogin() {
    this.matDialog.closeAll();
    this.router.navigate(['/auth/login']);
  }

  abrirModalCriarPostagem() {
    if (!this.authService.currentUserValue) {
      this.matDialog.open(this.usuarioVisitanteModal);
      return;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.width = '40vw';
    dialogConfig.height = '75vh';
    dialogConfig.hasBackdrop = true;
    dialogConfig.disableClose = true;

    dialogConfig.data = this.position;
    const modal = this.matDialog.open(
      ModalCriarPostagemComponent,
      dialogConfig
    );
    modal.afterClosed().subscribe(() => {
      this.iniciarPagina('');
    });
  }

  private novoMarcador(
    id: number,
    subcategoriaId: number,
    lat: number,
    lng: number,
    confiabilidade: string
  ): void {
    const marker = {
      position: {
        lat: lat,
        lng: lng,
      },
      label: '',
      title: '',
      icon: this.definirTipoMarcador(subcategoriaId, confiabilidade),
      options: {
        store_id: id,
        cursor: 'pointer',
      },
    };
    this.markers.push(marker);
  }

  private iniciarPagina(
    bairro = '',
    categoriaId = 0,
    subcategoriaId = 0,
    confiabilidade = ''
  ) {
    this.markers.length = 0;
    this.preencheMarcadorPosicaoAtual();
    this.postagemService
      .listarTodos(bairro, categoriaId, subcategoriaId, 0, confiabilidade)
      .then((res) => {
        if (res.dados) {
          res.dados.forEach((postagem) => {
            this.novoMarcador(
              postagem.id,
              postagem.subcategoria.codigo,
              postagem.latitude,
              postagem.longitude,
              postagem.confiabilidade
            );
          });
        }
      });
  }

  private atualizarMapa(
    bairro = '',
    categoriaId = 0,
    subcategoriaId = 0,
    confiabilidade = ''
  ) {
    this.postagemService
      .listarTodos(bairro, categoriaId, subcategoriaId, 0, confiabilidade, true)
      .then((res) => {
        if (res.dados) {
          // posts q estão no mapa mas API não retornou, então foi excluido ou resolvido e deve ser removido do mapa
          let markersParaRemover = [];
          this.markers.forEach((marker) => {
            if (
              marker.options.store_id !== 0 &&
              !res.dados.find((x) => x.id === marker.options.store_id)
            )
              markersParaRemover.push(marker);
          });

          this.markers = this.markers.filter(
            (marker) =>
              !markersParaRemover.find(
                (x) => x.options.store_id === marker.options.store_id
              )
          );

          res.dados.forEach((postagem) => {
            const markerExistente =
              this.markers.filter((x) => x.options.store_id === postagem.id)
                .length > 0;

            // post já está no mapa e foi retornado pela API, não fazer nada
            if (markerExistente) return;

            // post foi retornado pela API mas não estava no mapa, adiciona novo marker
            this.novoMarcador(
              postagem.id,
              postagem.subcategoria.codigo,
              postagem.latitude,
              postagem.longitude,
              postagem.confiabilidade
            );
          });
        }
      });
  }

  private preencheComboFiltroBairros(): void {
    this.comboBairros = [];
    this.postagemService.listarBairros().then((res) => {
      if (res.dados) {
        res.dados.forEach((x) => {
          this.comboBairros.push(x);
        });
      }
    });
  }

  private preencheComboFiltroCategorias(): void {
    this.comboCategorias = [];
    this.postagemService.listarCategorias().then((res) => {
      if (res.dados) {
        res.dados.forEach((x) => {
          this.comboCategorias.push(x);
        });
      }
    });
  }

  private preencheComboFiltroSubcategorias(): void {
    this.comboSubcategorias = [];
    this.postagemService.listarSubcategorias().then((res) => {
      if (res.dados) {
        res.dados.forEach((x) => {
          this.comboSubcategorias.push(x);
        });
      }
    });
  }

  private preencheComboFiltroConfiabilidades(): void {
    this.comboConfiabilidades = [];
    this.postagemService.listarConfiabilildades().then((res) => {
      if (res.dados) {
        res.dados.forEach((x) => {
          this.comboConfiabilidades.push(x);
        });
      }
    });
  }

  public abrirModalFiltro() {
    this.preencheComboFiltroBairros();
    this.preencheComboFiltroConfiabilidades();
    this.preencheComboFiltroCategorias();
    this.preencheComboFiltroSubcategorias();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.width = '30vw';
    dialogConfig.hasBackdrop = true;
    dialogConfig.disableClose = true;

    const modal = this.matDialog.open(ModalFiltrarPostagemComponent, {
      data: {
        bairros: this.comboBairros,
        categorias: this.comboCategorias,
        subcategorias: this.comboSubcategorias,
        confiabilidades: this.comboConfiabilidades,
      },
    });
    modal.afterClosed().subscribe((result) => {
      const bairroParam = result.bairro === 'todos' ? '' : result.bairro;
      const categoriaIdParam = result.categoriaId;
      const subcategoriaIdParam = result.subcategoriaId;
      const confiabilidadeParam =
        result.confiabilidade === 'todas' ? '' : result.confiabilidade;

      this.filtroAtualBairro = bairroParam;
      this.filtroAtualCategoria = categoriaIdParam;
      this.filtroAtualSubcategoria = subcategoriaIdParam;
      this.filtroAtualConfiabilidade = confiabilidadeParam;

      this.iniciarPagina(
        bairroParam,
        categoriaIdParam,
        subcategoriaIdParam,
        confiabilidadeParam
      );
    });
  }

  public abrirModalVisualizarPostagem(id: any) {
    if (id !== 0) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.id = 'modal-component';
      dialogConfig.width = '40vw';
      dialogConfig.hasBackdrop = false;
      dialogConfig.disableClose = true;
      dialogConfig.panelClass = 'custom-dialog-container';

      dialogConfig.data = id;
      const modal = this.matDialog.open(
        ModalVisualizarPostagemComponent,
        dialogConfig
      );
      modal.afterClosed().subscribe(() => {
        this.iniciarPagina();
      });
    }
  }

  private obterIconePostVermelho(confiabilidade: string) {
    var result = '';
    switch (confiabilidade) {
      case 'Alta': {
        result = environment.baseAssetsPath + '/images/red-dot.g.png';
        break;
      }
      case 'Média': {
        result = environment.baseAssetsPath + '/images/red-dot.m.png';
        break;
      }
      default: {
        result = environment.baseAssetsPath + '/images/red-dot.p.png';
        break;
      }
    }
    return result;
  }

  private obterIconePostAmarelo(confiabilidade: string) {
    var result = '';
    switch (confiabilidade) {
      case 'Alta': {
        result = environment.baseAssetsPath + '/images/yellow-dot.g.png';
        break;
      }
      case 'Média': {
        result = environment.baseAssetsPath + '/images/yellow-dot.m.png';
        break;
      }
      default: {
        result = environment.baseAssetsPath + '/images/yellow-dot.p.png';
        break;
      }
    }
    return result;
  }

  private obterIconePostVerde(confiabilidade: string) {
    var result = '';
    switch (confiabilidade) {
      case 'Alta': {
        result = environment.baseAssetsPath + '/images/green-dot.g.png';
        break;
      }
      case 'Média': {
        result = environment.baseAssetsPath + '/images/green-dot.m.png';
        break;
      }
      default: {
        result = environment.baseAssetsPath + '/images/green-dot.p.png';
        break;
      }
    }
    return result;
  }

  private definirTipoMarcador(
    subcategoriaId: number,
    confiabilidade: string
  ): string {
    var result = '';
    switch (subcategoriaId) {
      case 1: {
        result = this.obterIconePostVermelho(confiabilidade);
        break;
      }
      case 2: {
        result = this.obterIconePostVerde(confiabilidade);
        break;
      }
      case 3: {
        result = this.obterIconePostAmarelo(confiabilidade);
        break;
      }
      default: {
        result = environment.baseAssetsPath + '/images/current-location.png';
        break;
      }
    }
    return result;
  }
}
