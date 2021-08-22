import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ICategoriaModel } from 'src/app/models/categoria.model';
import { IEnumModel } from 'src/app/models/enum.model';
import { IPostagemModel } from 'src/app/models/postagem.model';
import { AuthService } from 'src/app/service/auth.service';
import { PostagemService } from 'src/app/service/postagem.service';

@Component({
  selector: 'app-modal-criar-postagem',
  templateUrl: './modal-criar-postagem.component.html',
  styleUrls: ['./modal-criar-postagem.component.scss']
})
export class ModalCriarPostagemComponent implements OnInit {
  public model : IPostagemModel = {} as IPostagemModel;
  public enderecoAtual = '';
  public objEnderecoAtual: any;
  public bairroAtual = '';
  public categorias!: ICategoriaModel[];
  public subcategorias!: IEnumModel[];

  public form = new FormGroup({
    titulo: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    descricao: new FormControl('', Validators.required),
    endereco: new FormControl('', Validators.required),
    categoriaId: new FormControl('', Validators.required),
    subcategoria: new FormControl('', Validators.required),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private postagemService: PostagemService,
    private toastr: ToastrService,
    private authService: AuthService,
    public dialog: MatDialog
  ) 
  {
    this.setarEnderecoAtual(data);
  }

  ngOnInit(): void {
    this.listarCategorias();
    this.listarSubcategorias();
  }

  public onChangeLocalPostagem(event: any): void {
    this.enderecoAtual = event.formatted_address;
    this.objEnderecoAtual = event;
    this.obterBairroAtual();
  }

  public async inserir() {
    
    if (this.form.invalid) {
      this.toastr.warning('Formulário inválido!', 'Atenção');
      return;
    }

    this.atualizarModel(this.form.value);
    this.model.latitude = this.objEnderecoAtual.geometry.location.lat();
    this.model.longitude = this.objEnderecoAtual.geometry.location.lng();
    this.model.resolvido = false;
    this.model.bairro = this.bairroAtual;
    this.model.usuarioId = this.authService.currentUserValue.id;

    try {
      const res = await this.postagemService.inserir(this.model);

      if (res.sucesso) {
        this.toastr.success('Registro salvo com sucesso!', 'Sucesso');
        this.dialog.closeAll();
      } else {
        this.toastr.warning(res.mensagem.descricao, 'Atenção');
      }
    } catch (err) {
      this.toastr.error(err, 'Atenção');
    }
  }

  public listarCategorias(): void {
    this.postagemService.listarCategorias()
    .then((res) => {
      this.categorias = res.dados;
    })
    .catch((err) => {
      this.toastr.error(err.mensagem.descricao, 'Atenção');
    })
  }

  public listarSubcategorias(): void {
    this.postagemService.listarSubcategorias()
    .then((res) => {
      this.subcategorias = res.dados;
    })
    .catch((err) => {
      this.toastr.error(err.mensagem.descricao, 'Atenção');
    })
  }

  private setarEnderecoAtual(data: any): void {
    let geocoder = new google.maps.Geocoder();
    let latlng = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
    let request = {
      location: latlng
    };

    geocoder.geocode(request, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          this.enderecoAtual = results[0].formatted_address;
          this.objEnderecoAtual = results[0];
          
          this.obterBairroAtual();
        } else {
          alert("No address available");
        }
      }
    });
  }

  private obterBairroAtual() : void {
    this.objEnderecoAtual.address_components.forEach((x: any) => {            
      if(x.types.includes('sublocality'))
         this.bairroAtual =  x.long_name;
    })
  }

  private atualizarModel(values: any) {
    Object.assign(this.model, values);
  }
}
