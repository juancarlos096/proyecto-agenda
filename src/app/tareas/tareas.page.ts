import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TareasService } from '../services/tareas.services';
import { Firestore } from '@angular/fire/firestore';
import { Tareas } from '../interfaces/tareas.interface';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {

  formulario: FormGroup;
  tareas: Tareas[] = [];

  constructor(
    private tareasService: TareasService,
    private firestore: Firestore
  ) {
    this.formulario = new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      descripcion: new FormControl(),
      estado: new FormControl(),
      importante: new FormControl(),
      imagen: new FormControl(),
      audio: new FormControl(),
      fechaLimite: new FormControl(),
      repetir: new FormControl(),
      recordarme: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.getTareas();
  }

  async onSubmit() {
    if (this.formulario.valid) {
      const formData = this.formulario.value;
  
      // Convierte la fecha ingresada a un Timestamp antes de almacenarla en Firestore
      const fechaLimiteTimestamp = Timestamp.fromDate(new Date(formData.fechaLimite));
  
      // Asigna el Timestamp a tu objeto Tareas
      formData.fechaLimite = fechaLimiteTimestamp;
  
      console.log(formData);
      const response = await this.tareasService.addTareas(formData);
      console.log(response);
  
      this.tareas = await this.tareasService.getAllTareas();
    }
  }
  

  async getTareas() {
    const tareas = await this.tareasService.getAllTareas();
    console.log(tareas);
  }
}