import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-filtrar-postagem',
  templateUrl: './modal-filtrar-postagem.component.html',
  styleUrls: ['./modal-filtrar-postagem.component.scss']
})

export class ModalFiltrarPostagemComponent implements OnInit {
  public bairros!: any[];
  public categorias!: any[];

  public form = new FormGroup({
    bairro: new FormControl(''),
    categoria: new FormControl('')
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<ModalFiltrarPostagemComponent>
  ) 
  {
    this.bairros = this.data.bairros;
    this.categorias = this.data.categorias;
  }

  ngOnInit(): void { }

  public async filtrar() {
    if (this.form.invalid) {
      this.toastr.warning('Formulário inválido!', 'Atenção');
      return;
    }

    this.dialogRef.close(
      {
        bairro: this.form.value.bairro, 
        categoriaId: this.form.value.categoria
      }
      );
  }
}
