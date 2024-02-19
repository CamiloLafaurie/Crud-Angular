import { Usuarios } from "./usuario.module";
import { Subject } from "rxjs";

export class UsuariosService{
  private usuariosLista: Usuarios[] =[
    { identificacion: '1', tipoIdentificacion:'C.C', nombre:'Camilo' , apellido:"Lafaurie", correo:'camilo@gmail.com', edad:'19', fechaNacimiento:new Date('2004-10-14')},
    { identificacion: '2', tipoIdentificacion:'C.C', nombre:'Rodney' , apellido:"Lafaurie", correo:'Rodney@gmail.com', edad:'30', fechaNacimiento:new Date('1993-10-14')},
    { identificacion: '3', tipoIdentificacion:'T.I', nombre:'Chris' , apellido:"Lafaurie", correo:'Chris@gmail.com', edad:'4', fechaNacimiento:new Date('2021-10-14')},
    { identificacion: '4', tipoIdentificacion:'T.I', nombre:'Claire' , apellido:"Lafaurie", correo:'Claire@gmail.com', edad:'1', fechaNacimiento:new Date('2023-10-14')},
  ];


usuarioSubjet = new Subject<Usuarios>();
obtenerUsuarios(){
  return this.usuariosLista.slice();
}

  guardarUsuarios(usuario: Usuarios){
    this.usuariosLista.push(usuario);
    this.usuarioSubjet.next(usuario);

  }
}


