import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, NgForm } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { AnimationBuilder, AnimationPlayer, query, style, animate } from '@angular/animations';

interface Typeid {
  name: string;
  code: string;
}
@Component({
  selector: 'app-usuariodetail',
  standalone: true,
  imports: [CommonModule, InputTextModule, FormsModule,DropdownModule,DialogModule,CardModule],
  providers:[],
  templateUrl: './usuariodetail.component.html',
  styleUrl: './usuariodetail.component.css'
})
export class UsuariodetailComponent {
  nombreUsuario: string;
  identificacion: string;
  nombre: string;
  apellido: string;
  typesId: Typeid[] | undefined;
  selectedTypeId: Typeid | undefined;

  constructor() {this.nombreUsuario = "camilo";}

  guardarUsuarios(form: NgForm) {
  }

  ngOnInit() {
      this.typesId = [
          { name: 'Cedula de ciudadania', code: 'C.C' },
          { name: 'Tarjeta de identidad', code: 'T.I' },
      ];
  }


}


