import { Timestamp } from "@angular/fire/firestore";

export interface Tareas {
    titulo: string;
    descripcion: string;
    estado: string;
    importante: boolean;
    imagen: string;
    audio: string;
    fechaLimite: Timestamp;
    repetir: boolean;
    recordarme: boolean;
  }