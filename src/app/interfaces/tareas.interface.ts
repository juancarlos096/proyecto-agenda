import { Timestamp } from "@angular/fire/firestore";

export interface Tareas {
  minutoRecordatorio: any;
  horaRecordatorio: any;
  
  mostrarDetalle: boolean;
   id:string;
    titulo: string;
    descripcion: string;
    importante: boolean;
    imagen: string;
    audio: string;
    fechaLimite: Timestamp;
    repetir: boolean;
    recordarme: boolean;
    estado: boolean;
}
