
import { Injectable } from '@angular/core';

import { DocumentData, DocumentReference, Firestore, Timestamp, getDocs, updateDoc, doc, getDoc, setDoc, deleteDoc} from '@angular/fire/firestore';
import { addDoc, collection } from '@angular/fire/firestore'; // Import from @angular/fire/firestore instead of firebase/firestore
import { Tareas } from '../interfaces/tareas.interface';
import { BehaviorSubject } from 'rxjs';
import { AlertController } from '@ionic/angular';


@Injectable({
providedIn: 'root'
})
export class TareasService {
tareas: any;
getTarea(tareaId: any) {
  throw new Error('Method not implemented.');
}

constructor(private firestore: Firestore) {}


async addTareas(tareas: Tareas): Promise<Tareas> {
  try {
    const tareasRef = collection(this.firestore, 'tareas');
    const docRef = await addDoc(tareasRef, { ...tareas, estado: false }); // Incluye 'estado'
    const tareaId = docRef.id;
    return { ...tareas, id: tareaId };
  } catch (error) {
    console.error('Error al agregar la tarea:', error);
    throw error;
  }
}


async getTareasImportantes(): Promise<Tareas[]> {
  const tareasRef = collection(this.firestore, 'tareas');
  const tareasSnapshot = await getDocs(tareasRef);

  const tareasImportantes: Tareas[] = [];

  tareasSnapshot.forEach((doc) => {
    const tarea = doc.data() as Tareas;
    if (tarea.importante && !tarea.estado) {
      tareasImportantes.push(tarea);
    }
  });

  return tareasImportantes;
}


async getTareasDeHoy(): Promise<Tareas[]> {
  try {
    const tareasRef = collection(this.firestore, 'tareas');
    const tareasSnapshot = await getDocs(tareasRef);

    const tareasDeHoy: Tareas[] = [];
    const hoy = new Date(); // Obtener la fecha actual

    tareasSnapshot.forEach((doc) => {
      const tarea = doc.data() as Tareas;
      const fechaLimite = tarea.fechaLimite as Timestamp;

      if (fechaLimite) {
        const fechaLimiteDate = fechaLimite.toDate();
        
        // Compara si la fecha límite es igual al día actual
        if (
          fechaLimiteDate.getDate() === hoy.getDate() &&
          fechaLimiteDate.getMonth() === hoy.getMonth() &&
          fechaLimiteDate.getFullYear() === hoy.getFullYear()
        ) {
          tareasDeHoy.push({ ...tarea, id: doc.id });
        }
      }
    });

    return tareasDeHoy;
  } catch (error) {
    console.error('Error al obtener las tareas de hoy:', error);
    throw error;
  }
}

async actualizarEstadoTarea(tareaId: string, cambios: Partial<{ estado: boolean }>): Promise<void> {
  try {
    const tareaRef = doc(this.firestore, 'tareas', tareaId);
    await updateDoc(tareaRef, cambios);
  } catch (error) {
    console.error('Error al actualizar el estado de la tarea:', error);
    throw error;
  }
}


  
async deleteTarea(id: string): Promise<void> {
  try {
    const tareaRef = doc(this.firestore, 'tareas', id);
    await deleteDoc(tareaRef);
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    throw error;
  }
}

async getAllTareas(): Promise<Tareas[]> {
  try {
    const tareasRef = collection(this.firestore, 'tareas');
    const tareasSnapshot = await getDocs(tareasRef);
    return tareasSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as Tareas);
  } catch (error) {
    console.error('Error al obtener todas las tareas:', error);
    throw error;
  }
}

async actualizarTarea(tareaId: string, cambios: Partial<Tareas>): Promise<void> {
  try {
    const tareaRef = doc(this.firestore, 'tareas', tareaId);
    const fechaLimite = cambios.fechaLimite as Timestamp;
    if (fechaLimite) {
      cambios.fechaLimite = fechaLimite; // No cambia el formato de fechaLimite
    }
    await updateDoc(tareaRef, cambios);
  } catch (error) {
    console.error('Error al actualizar la tarea:', error);
    throw error;
  }
}


async createAlert(tarea: Tareas): Promise<void> {
  const fechaLimite = tarea.fechaLimite as Timestamp;
  const fechaLimiteDate = fechaLimite.toDate();

  if (fechaLimiteDate.getDate() === new Date().getDate() &&
    fechaLimiteDate.getMonth() === new Date().getMonth() &&
    fechaLimiteDate.getFullYear() === new Date().getFullYear()) {
    const alertController = new AlertController();
    const alert = await alertController.create({
      buttons: [{
        text: tarea.titulo,
        handler: () => {
          // Acción si se pulsa el botón
        }
      }],
    });

    await alert.present();}}
}