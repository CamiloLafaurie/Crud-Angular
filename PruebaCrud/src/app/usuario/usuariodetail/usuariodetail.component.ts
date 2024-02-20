import { Usuarios } from './../usuario.module';
import { UsuariosService } from './../usuario.service';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { Component, Input, NgModule, OnChanges, OnDestroy, OnInit, SimpleChanges, Type, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Dropdown, DropdownModule } from 'primeng/dropdown';
import {provideClientHydration} from '@angular/platform-browser';

interface Typeid {
  name: string;
  code: string;
}
@Component({
  selector: 'app-usuariodetail',
  standalone: true,
  imports: [CommonModule, InputTextModule, FormsModule, ReactiveFormsModule, DialogModule, CardModule, CalendarModule, ButtonModule, DropdownModule],
  providers: [],
  templateUrl: './usuariodetail.component.html',
  styleUrl: './usuariodetail.component.css'
})
export class UsuariodetailComponent implements OnInit, OnDestroy {
  tiposIdentificacion = [
    { name: 'Cedula de ciudadania', code: 'C.C' },
    { name: 'Tarjeta de identidad', code: 'T.I' },
    { name: 'Pasaporte', code: 'P.P' },
  ];
  formGroup: FormGroup | undefined;
  usuarioForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private dialogService: DynamicDialogConfig,
    private ref: DynamicDialogRef) {

  }

  guardarUsuario() {
    if (this.usuarioForm.valid) {

      let newUsuario: Usuarios = {
        tipoIdentificacion: this.usuarioForm.value.tipoIdentificacion.code,
        identificacion: this.usuarioForm.value.identificacion,
        nombre: this.usuarioForm.value.nombre,
        apellido: this.usuarioForm.value.apellido,
        correo: this.usuarioForm.value.correo,
        edad: this.usuarioForm.value.edad,
        fechaNacimiento: new Date(this.usuarioForm.value.fechaNacimiento)
      };

      if (this.dialogService.data != null) {
        this.usuariosService.updateUsuario(this.dialogService.data.identificacion as string, newUsuario).subscribe({
          next: (response) =>{
            this.usuariosService.refreshUserSubject();
            this.ref.close
          },
          error: (error) => {
            console.log('Error al actualizar usuario:', error);
          }
        })
      } else {
        this.usuariosService.crearUsuario(newUsuario).subscribe({
          next: (response) => {
            this.usuariosService.refreshUserSubject();
            this.ref.close();
          },
          error: (error) => {
            console.log('Error al crear usuario:', error);
          }
        });
      }
    } else {
      this.usuarioForm.markAllAsTouched();
    }
  }

  detailUsuario() {

  }


  onClicked() {
    ///this.usuariosService.eliminarUsuario();
  }


  ngOnInit() {

    this.usuarioForm = this.fb.group({
      identificacion :new FormControl('',[Validators.required]),
      nombre :new FormControl('',[Validators.required]),
      apellido :new FormControl('',[Validators.required]),
      correo :new FormControl('',[Validators.required, Validators.email]),
      edad :new FormControl('',[Validators.required]),
      fechaNacimiento :new FormControl<Date | null>(null),
      tipoIdentificacion :new FormControl<Typeid[]| null>(null),
    });

    if (this.dialogService.data != null)
    {
      this.usuarioForm.patchValue({
        identificacion: this.dialogService.data.identificacion,
        nombre: this.dialogService.data.nombre,
        apellido: this.dialogService.data.apellido,
        correo: this.dialogService.data.correo,
        edad: this.dialogService.data.edad,
        fechaNacimiento: this.dialogService.data.fechaNacimiento

      });

    }


  }

  ngOnDestroy() {

  }


}


