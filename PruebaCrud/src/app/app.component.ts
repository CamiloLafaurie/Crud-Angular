import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UsuarioComponent } from './usuario/usuario.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SidebarComponent, UsuarioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pruebacrud';
}
