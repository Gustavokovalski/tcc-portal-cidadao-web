import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ICategoriaModel } from 'src/app/models/categoria.model';
import { IEnumModel } from 'src/app/models/enum.model';
import { IPostagemModel } from 'src/app/models/postagem.model';
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
  public categorias!: ICategoriaModel[];
  public subcategorias!: IEnumModel[];

  public form = new FormGroup({
    descricao: new FormControl('', Validators.required),
    endereco: new FormControl('', Validators.required),
    categoriaId: new FormControl('', Validators.required),
    subcategoria: new FormControl('', Validators.required),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private postagemService: PostagemService,
    private toastr: ToastrService,
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

      try {
        const res = await this.postagemService.inserir(this.model);

        if (res.sucesso) {
          this.toastr.success('Registro salvo com sucesso!', 'Sucesso');
          this.dialog.closeAll();
        } else {
          // res.mensagens.forEach(mensagem => {
          //   this.toastr.warning(mensagem.descricao, 'Atenção');
          // });
        }
      } catch (err) {
        this.toastr.error(err, 'Atenção');
      }

  }

  public listarCategorias(): void {
    debugger
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
        } else {
          alert("No address available");
        }
      }
    });
  }

  private atualizarModel(values: any) {
    Object.assign(this.model, values);
  }
}
