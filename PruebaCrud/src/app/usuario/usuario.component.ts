import { Usuarios } from './usuario.module';
import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UsuariosService } from './usuario.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { UsuariodetailComponent } from './usuariodetail/usuariodetail.component';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [TableModule, CommonModule, DynamicDialogModule, ButtonModule, FormsModule],
  providers: [DialogService, MessageService],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit, OnDestroy {
  usuariosData: Usuarios[] = [];
  usuarioDetailItem: Usuarios;
  cols!: Column[];
  visible: boolean = false;
  ref: DynamicDialogRef | undefined;



  private usuarioSubscription: Subscription;

  constructor(public usuariosServices: UsuariosService, public dialogService: DialogService, public messageService: MessageService) { }

  ngOnInit(): void {
    this.getAllUsuario();
    this.usuarioSubscription = this.usuariosServices.usuarioSubjet.subscribe(() => {
      debugger;
      this.getAllUsuario();
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

  getAllUsuario(){
    this.usuariosServices.getAllUsuario().subscribe({
      next:(response)=>{
        debugger;
        this.usuariosData = response;

      }
    })
  }



  borrarUsuario(identificacion: string) {
    this.usuariosServices.deleteUuario(identificacion).subscribe({
      next: (response) => {
        this.usuariosData = response;
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'El usuario ha sido eliminado correctamente' });
        console.log('Usuario eliminado con éxito:', response);
      },
      error: (error) => {
        console.error('Error al eliminar usuario:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error al eliminar el usuario' });
      }
    });
  }
  showUserDetail() {
    this.ref = this.dialogService.open(UsuariodetailComponent, {
      header: 'Registro de usuarios',
      modal: true,
      width: '700px',
      height: '700px',
      style: {
        'border-radius': '10px',
        'box-shadow': '0 4px 8px rgba(0, 0, 0, 0.1)',
        'background-color': '#f4f4f4'
      }

    });

    this.ref.onClose.subscribe((usr: Usuarios) => {
      if (usr) {
        this.messageService.add({ severity: 'info', summary: 'Nuevo Usuario Agregado', detail: usr.nombre + ' ' + usr.apellido });
      }
    });

  }
  detailUsuario(identificacion: string) {
    this.usuariosServices.getUsuarios(identificacion).subscribe({
      next: (response) => {
        debugger;
        this.ref = this.dialogService.open(UsuariodetailComponent, {
          header: 'Edicion de usuarios',
          data: response,
          width: '700px',
          height: '700px',
          style: {
            'border-radius': '10px',
            'box-shadow': '0 4px 8px rgba(0, 0, 0, 0.1)',
            'background-color': '#f4f4f4'
          }
        });
      }
    });
  }


  ngOnDestroy() {
    this.usuarioSubscription.unsubscribe();
  }

}
