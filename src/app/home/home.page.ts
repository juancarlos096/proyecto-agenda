import { Component } from '@angular/core';
import { UserService } from '../services/user.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  correoUsuario: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getEmail().then(email => {
      if (email !== null) {
        this.correoUsuario = email;
      } else {
        // Manejar el caso en el que email es null
        this.correoUsuario = "Correo no disponible"; // O cualquier otro valor por defecto
      }
    });
  }

  logout() {
    this.userService.logout()
      .then(() => {
        this.router.navigate(['/logsign']);
        
        // Cierre de sesión exitoso, puedes redirigir al usuario a otra página si lo deseas.
        // Ejemplo de redirección:
        // this.router.navigate(['/login']);
      })
      .catch(error => {
        // Manejo de errores en caso de que el cierre de sesión falle.
        console.error('Error al cerrar sesión: ', error);
      });
  }
}
