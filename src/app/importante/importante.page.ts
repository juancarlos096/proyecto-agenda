import { Component, OnInit } from '@angular/core';
import { Tareas } from '../interfaces/tareas.interface';
import { TareasService } from '../services/tareas.services';

@Component({
  selector: 'app-importante',
  templateUrl: './importante.page.html',
  styleUrls: ['./importante.page.scss'],
})
export class ImportantePage implements OnInit {
  tareasImportantes: Tareas[] = []; // Inicializa la propiedad tareasImportantes

  constructor(private tareasService: TareasService) {} // Inyecta el servicio

  ngOnInit() {
    this.getTareasImportantes(); // Llama a la función para obtener las tareas importantes
  }

  async getTareasImportantes() {
    this.tareasImportantes = await this.tareasService.getTareasImportantes(); // Obtén las tareas importantes
  }
}