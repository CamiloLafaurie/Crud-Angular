import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuariodetailComponent } from './usuario/usuariodetail/usuariodetail.component';
import { UsuariosService } from './usuario/usuario.service';

import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';


import { provideRouter } from '@angular/router';
import { routes } from './app.routing.module';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    UsuarioComponent,
    UsuariodetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    TableModule,
    ButtonModule
  ],
  providers: [ UsuariosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
