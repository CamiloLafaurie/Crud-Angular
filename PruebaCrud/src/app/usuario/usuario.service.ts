import { Injectable } from "@angular/core";
import { ApiResponse, Usuarios } from "./usuario.module";
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {
  apiUrl = "https://localhost:7153/api/Usuarios"

  private usuariosLista: Usuarios[] = [
    { identificacion: '1', tipoIdentificacion: 'C.C', nombre: 'Camilo', apellido: "Lafaurie", correo: 'camilo@gmail.com', edad: 19, fechaNacimiento: new Date('2004-10-14') },
    { identificacion: '2', tipoIdentificacion: 'C.C', nombre: 'Rodney', apellido: "Lafaurie", correo: 'Rodney@gmail.com', edad: 30, fechaNacimiento: new Date('1993-10-14') },
    { identificacion: '3', tipoIdentificacion: 'T.I', nombre: 'Chris', apellido: "Lafaurie", correo: 'Chris@gmail.com', edad: 4, fechaNacimiento: new Date('2021-10-14') },
    { identificacion: '4', tipoIdentificacion: 'T.I', nombre: 'Claire', apellido: "Lafaurie", correo: 'Claire@gmail.com', edad: 1, fechaNacimiento: new Date('2023-10-14') },
  ];

  constructor(private http: HttpClient) { }

  usuarioSubjet = new Subject<Usuarios>();

  getAllUsuario(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(`${this.apiUrl}`)
  }

  refreshUserSubject(){
    this.usuarioSubjet.next(null);
  }

  getUsuarios(identificacion: string): Observable<Usuarios> {
    debugger;
    return this.http.get<Usuarios>(`${this.apiUrl}/${identificacion}`)
  }

  crearUsuario(usuario: Usuarios): Observable<ApiResponse<Usuarios>> {
    var result = this.http.post<ApiResponse<Usuarios>>(`${this.apiUrl}`, usuario)
    return result;
  }

  updateUsuario(identificacion: string, usuario: Usuarios): Observable<ApiResponse<Usuarios[]>> {
    return this.http.put<ApiResponse<Usuarios[]>>(`${this.apiUrl}/${identificacion}`, usuario)
  }

  deleteUuario(identificacion: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${identificacion}`)
  }



  eliminarUsuario(identificacion: string): Observable<any> {
    let usrDeleted: Usuarios;
    return new Observable<any>((observer) => {
      const index = this.usuariosLista.findIndex(usuario => usuario.identificacion == identificacion);
      if (index !== -1) {
        usrDeleted = this.usuariosLista.splice(index, 1)[0];
        observer.next({ success: true });
      } else {
        observer.error({ success: false, message: 'Usuario no encontrado' });
      }
      this.usuarioSubjet.next(usrDeleted);
      observer.complete();
    });
  }
}




