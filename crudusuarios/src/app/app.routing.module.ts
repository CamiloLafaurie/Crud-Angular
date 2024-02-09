import { Routes } from "@angular/router";
import { UsuarioComponent } from "./usuario/usuario.component";
import { UsuariodetailComponent } from "./usuario/usuariodetail/usuariodetail.component";

export const routes: Routes = [
  {
    path:'',
    component: UsuarioComponent
  },
  {
    path:'details',
    component: UsuariodetailComponent
  },
  {
    path:'users',
    component: UsuarioComponent
  },
];
