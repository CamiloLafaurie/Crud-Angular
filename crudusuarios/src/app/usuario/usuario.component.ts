import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Usuarios } from './usuario.module';
import { UsuariosService } from './usuario.service';
import { TableModule } from 'primeng/table';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit{
  usuariosData: Usuarios[] = [];
  cols!: Column[];
  visible: boolean = false;

  ref: DynamicDialogRef | undefined;

  constructor(private usuariosServices: UsuariosService, public dialogService: DialogService){ }

ngOnInit(): void{
  this.usuariosData = this.usuariosServices.obtenerUsuarios();
  this.cols = [
        { field: 'identificacion', header: 'identificacion' },
        { field: 'tipoIdentificacion', header: 'Tipo Id' },
        { field: 'nombre', header: 'Nombre' },
        { field: 'apellido', header: 'Apellido' },
        { field: 'correo', header: 'Correo' },
        { field: 'edad', header: 'Edad' },
        { field: 'fechaNacimiento', header: 'Fecha Nacimiento' }
    ];
  }

  showUserDetail() {
    //this.ref = this.dialogService.open(UsuariodetailComponent, { header: 'Select a Product'});
  }
}
