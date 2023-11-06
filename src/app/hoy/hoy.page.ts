import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Tareas } from '../interfaces/tareas.interface';
import { TareasService } from '../services/tareas.services';

@Component({
  selector: 'app-hoy',
  templateUrl: './hoy.page.html',
  styleUrls: ['./hoy.page.scss'],
})
export class HoyPage implements OnInit, AfterViewInit {
  tareasDeHoy: Tareas[] = []; // Inicializa la propiedad tareasDeHoy

  constructor(private tareasService: TareasService) {} // Inyecta el servicio

  ngOnInit() {
    this.getTareasDeHoy(); // Llama a la función para obtener las tareas de hoy
  }

  async getTareasDeHoy() {
    this.tareasDeHoy = await this.tareasService.getTareasDeHoy(); // Obtén las tareas de hoy
  }

  ngAfterViewInit() {
    console.log(this.tareasDeHoy); // Imprime las tareas de hoy
  }
}