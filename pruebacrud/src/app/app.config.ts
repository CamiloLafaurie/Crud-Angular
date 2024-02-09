import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { UsuariosService } from './usuario/usuario.service';
import { SharedModule } from './shared.module';

export const appConfig: ApplicationConfig = {

  providers: [provideRouter(routes), UsuariosService],
};
