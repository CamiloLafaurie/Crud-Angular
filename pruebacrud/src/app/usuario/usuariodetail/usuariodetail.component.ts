import { UsuariosService } from './../usuario.service';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';

interface Typeid {
  name: string;
  code: string;
}
@Component({
  selector: 'app-usuariodetail',
  standalone: true,
  imports: [CommonModule, InputTextModule, FormsModule,DropdownModule,DialogModule,CardModule, CalendarModule,ButtonModule],
  providers:[],
  templateUrl: './usuariodetail.component.html',
  styleUrl: './usuariodetail.component.css'
})
export class UsuariodetailComponent {
  nombreUsuario: string;
  identificacion: string;
  nombre: string;
  apellido: string;
  correo:string;
  edad:string;
  fechaNacimiento :string | undefined;
  tipoIdentificacion: Typeid[] | undefined;
  selectedTypeId: Typeid | undefined;
  formGroup: FormGroup | undefined;

  constructor(private usuariosService: UsuariosService) {this.nombreUsuario = "camilo";}

  guardarUsuarios(form: NgForm) {
    this.usuariosService.guardarUsuarios({
        tipoIdentificacion: this.selectedTypeId?.code,
        identificacion: form.value.identificacion,
        nombre: form.value.nombre,
        apellido: form.value.apellido,
        correo: form.value.correo,
        edad: form.value.edad,
        fechaNacimiento: new Date(this.fechaNacimiento)
    })
}


  ngOnInit() {
      this.tipoIdentificacion = [
          { name: 'Cedula de ciudadania', code: 'C.C' },
          { name: 'Tarjeta de identidad', code: 'T.I' },
          { name: 'Pasaporte', code: 'P.P' },
      ];
  }


}


