import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ICategoriaModel } from 'src/app/models/categoria.model';
import { IEnumModel } from 'src/app/models/enum.model';
import { IPostagemModel } from 'src/app/models/postagem.model';
import { PostagemService } from 'src/app/service/postagem.service';

@Component({
  selector: 'app-modal-visualizar-postagem',
  templateUrl: './modal-visualizar-postagem.component.html',
  styleUrls: ['./modal-visualizar-postagem.component.scss']
})
export class ModalVisualizarPostagemComponent implements OnInit {
  public position = {};
  public center = {lat: -25.4372, lng: -49.2700};
  public options: google.maps.MapOptions = { };

  public marker: any = {
    position: {  
      lat: this.center.lat, 
      lng: this.center.lng, 
    },
    label: {
      color: 'white',
      text: ' ',
    },
    title: ' ',
  };

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
    public dialog: MatDialog
  ) 
  {
    this.buscarPostagem();
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

  public buscarPostagem(): void {
    this.postagemService.buscarPostagem(this.data)
    .then((res) => {
      this.model = res.dados;
      this.setarEnderecoAtual(this.model.latitude, this.model.longitude);

      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: this.model.latitude,
          lng: this.model.longitude,
        }
      })

      this.options = {
        center: new google.maps.LatLng(this.model.latitude, this.model.longitude),
        draggable: false,
        zoom: 13,
        fullscreenControl: false,
        streetViewControl: false,
        panControl: false,
        mapTypeControl: false,
        zoomControl: false,
        styles: [
          {
            featureType: "poi",
            stylers: [
             { visibility: "off" }
            ]   
           }
       ],
       draggableCursor: "default"
      };

      this.marker = {
      position: {
        lat: this.model.latitude, 
        lng: this.model.longitude,
      },
      label: {
        color: 'white',
        text: ' ',
      },
      title: ' ',
      icon: this.definirTipoMarcador(this.model.subcategoria.codigo)
    }

    })
    .catch((err) => {
      this.toastr.error(err.mensagem.descricao, 'Atenção');
    })
  }

 public darLike(): void {
   
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

  private setarEnderecoAtual(lat: any, lon: any): void {
    let geocoder = new google.maps.Geocoder();
    let latlng = new google.maps.LatLng(lat, lon);
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

  private definirTipoMarcador(subcategoriaId: number): string {
    var result = '';

    switch(subcategoriaId) { 
      case 1: { 
        result = '../../../../../assets/images/red-dot.png';
        break; 
      } 
      case 2: { 
        result = '../../../../../assets/images/green-dot.png';
        break; 
      } 
      case 3: {
        result = '../../../../../assets/images/blue-dot.png';
        break;
      }
      default: { 
        result = '../../../../../assets/images/yellow-dot.png';
        break; 
      } 
    } 
    return result;
  }

  private atualizarModel(values: any) {
    Object.assign(this.model, values);
  }
}
