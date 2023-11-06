
import { Injectable } from '@angular/core';

import { Firestore, Timestamp, getDocs } from '@angular/fire/firestore';
import { addDoc, collection } from '@angular/fire/firestore'; // Import from @angular/fire/firestore instead of firebase/firestore
import { Tareas } from '../interfaces/tareas.interface';


@Injectable({
providedIn: 'root'
})
export class TareasService {

constructor(private firestore: Firestore) {}
addTareas(tareas: Tareas) {
    const tareasRef = collection(this.firestore, 'tareas');
    return addDoc(tareasRef, tareas);
  }

  async getAllTareas() {
    const tareasRef = collection(this.firestore, 'tareas');
    const tareasSnapshot = await getDocs(tareasRef);

    const tareas: Tareas[] = [];
    tareasSnapshot.forEach((doc) => {
        tareas.push(doc.data() as Tareas);
    });

    return tareas;
}




async getTareasImportantes() {
  const tareasRef = collection(this.firestore, 'tareas');
  const tareasSnapshot = await getDocs(tareasRef);

  const tareasImportantes: Tareas[] = [];

  tareasSnapshot.forEach((doc) => {
    const tarea = doc.data() as Tareas;
    if (tarea.importante) {
      tareasImportantes.push(tarea);
    }
  });

  return tareasImportantes;
}

async getTareasDeHoy() {
  const tareasRef = collection(this.firestore, 'tareas');
  const tareasSnapshot = await getDocs(tareasRef);

  const tareasDeHoy: Tareas[] = [];

  tareasSnapshot.forEach((doc) => {
    const tarea = doc.data() as Tareas;
    const fechaLimite = tarea.fechaLimite as Timestamp; // Asegúrate de que sea un Timestamp

    if (fechaLimite) {
      // Si fechaLimite no es nulo, realiza la conversión
      const hoy = new Date(); // Obtiene la fecha y hora local actual
      const fechaLimiteDate = fechaLimite.toDate(); // Convierte el Timestamp a un objeto Date

      // Compara las fechas
      if (
        fechaLimiteDate.getDate() === hoy.getDate() &&
        fechaLimiteDate.getMonth() === hoy.getMonth() &&
        fechaLimiteDate.getFullYear() === hoy.getFullYear()
      ) {
        tareasDeHoy.push(tarea);
      }
    }
  });

  return tareasDeHoy;
}

}