export interface ApiResponse<T>{
  message?:string;
  data: T;
}

export interface Usuarios {
  identificacion: string;
  tipoIdentificacion: string;
  nombre: string;
  apellido: string;
  correo: string;
  edad:number;
  fechaNacimiento?: Date;
}
