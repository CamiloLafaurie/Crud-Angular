import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { UsuariosService } from './usuario/usuario.service';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {

  providers: [provideRouter(routes), UsuariosService,
    provideClientHydration(),
    provideAnimationsAsync(),
    provideToastr(),
    provideAnimations(),
    importProvidersFrom(HttpClientModule)],
};
