import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IPostagemModel } from 'src/app/models/postagem.model';

@Component({
  selector: 'app-modal-filtrar-postagem',
  templateUrl: './modal-filtrar-postagem.component.html',
  styleUrls: ['./modal-filtrar-postagem.component.scss']
})

export class ModalFiltrarPostagemComponent implements OnInit {
  public bairros!: any[];

  public form = new FormGroup({
    bairro: new FormControl('', Validators.required),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<ModalFiltrarPostagemComponent>
  ) 
  {
    this.bairros = this.data;
  }

  ngOnInit(): void { }

  public async filtrar() {
    debugger
    if (this.form.invalid) {
      this.toastr.warning('Formulário inválido!', 'Atenção');
      return;
    }
    this.dialogRef.close(this.form.value.bairro);
  }
}
