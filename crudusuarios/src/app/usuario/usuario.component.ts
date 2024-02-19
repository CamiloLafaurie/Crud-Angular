import { Usuarios } from './usuario.module';
import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './usuario.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { UsuariodetailComponent } from './usuariodetail/usuariodetail.component';
import { Subscription } from 'rxjs';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [TableModule, CommonModule, DynamicDialogModule, ButtonModule, FormsModule  ],
  providers:[DialogService],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit{
  usuariosData: Usuarios[] = [];
  cols!: Column[];
  visible: boolean = false;
  ref: DynamicDialogRef | undefined;

  private usuarioSubscription: Subscription;

  constructor(public usuariosServices: UsuariosService, public dialogService: DialogService){ }

ngOnInit(): void{
  this.usuariosData = this.usuariosServices.obtenerUsuarios();
  this.usuarioSubscription = this.usuariosServices.usuarioSubjet.subscribe(() =>{
    this.usuariosData = this.usuariosServices.obtenerUsuarios();
  });

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
    this.ref = this.dialogService.open(UsuariodetailComponent, {
      header: 'Registro de usuarios',
      width: '500px',
      height: '700px',
      style: {
        'border-radius': '10px',
        'box-shadow': '0 4px 8px rgba(0, 0, 0, 0.1)',
        'background-color': '#f4f4f4'
      }

    });
  }
}
