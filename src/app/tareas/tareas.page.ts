import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tareas } from '../interfaces/tareas.interface';
import { TareasService } from '../services/tareas.services';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {
  formulario: FormGroup;
  tareas: Tareas[] = [];
  tareaSeleccionada: any;
  mostrarFormulario: boolean = false; // Variable para controlar la visualización del formulario
  estado: boolean = false; // Tu booleano


  constructor(private fb: FormBuilder, private tareasService: TareasService) {
    this.formulario = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: [''],
      fechaLimite: [''],
      horaLimite: [''],
      importante: [false],
      recordarme: [false],
      fechaRecordatorio: [''],
      horaRecordatorio: [''],
      repetir: [''],
      tareaId: [''] // Asegúrate de tener este campo
    });
  }

  
  ngOnInit(): void {
    this.getTodasLasTareas();
  }

   // Manejar el cambio de la casilla 'recordarme'
   toggleRecordarme(event: any) {
    const recordarme = event.target.checked;

    if (!recordarme) {
      // Si se desmarca 'recordarme', reseteamos los valores de fecha y hora del recordatorio
      this.formulario.patchValue({
        fechaRecordatorio: '',
        horaRecordatorio: ''
      });
    }
  }
  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    
    
  }

  
  toggleDetalle(tarea: any) {
    // Al hacer clic en el botón, se cambia el estado 'mostrarDetalle' de la tarea
    tarea.mostrarDetalle = !tarea.mostrarDetalle;

    // Si deseas que solo un detalle se muestre a la vez, puedes iterar por las tareas y cerrar las demás
    this.tareas.forEach(t => {
      if (t !== tarea) {
        t.mostrarDetalle = false;
      }
    
     
    });
  }
  async onSubmit() {
    if (this.formulario.valid) {
      const formData = { ...this.formulario.value };
  
      // Convierte la fecha ingresada a un objeto Date si es necesario
      if (formData.fechaLimite) {
        formData.fechaLimite = new Date(formData.fechaLimite);
      }
  
      // Agrega la tarea a la base de datos y obtén el ID generado
      const tareaConId = await this.tareasService.addTareas(formData);
  
      // Verificar si la tarea tiene un ID válido antes de agregarla a la lista
      if (tareaConId && tareaConId.id) {
        this.tareas.push(tareaConId); // Agregar tarea con ID válido a la lista
  
        // Restablecer los valores del formulario después de agregar la tarea
        this.formulario.reset();
      } else {
        console.error('La tarea no tiene un ID válido');
        // Manejo de error o lógica adicional si la tarea no tiene un ID válido
      }
    }
  }
  
  async onDeleteTarea(tareaId: string) {
    try {
      const tareaIndex = this.tareas.findIndex(tarea => tarea.id === tareaId);
  
      if (tareaIndex !== -1) {
        await this.tareasService.deleteTarea(tareaId); // Elimina la tarea de la base de datos
        this.tareas = this.tareas.filter(tarea => tarea.id !== tareaId); // Actualiza la lista local excluyendo la tarea eliminada
      } else {
        console.error('El ID de la tarea a eliminar no se encuentra en la lista actual de tareas');
        // Manejo de error o lógica adicional si el ID de la tarea no se encuentra en la lista de tareas
      }
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  }
  
  
  
  async getTodasLasTareas() {
    try {
      this.tareas = await this.tareasService.getAllTareas();
      this.tareas.forEach(tarea => {
        tarea.mostrarDetalle = false; // Inicializa el valor de mostrarDetalle para cada tarea
      });
      console.log(this.tareas);
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
    }
  }

  formatFecha(event: any) {
    const inputDate = event.target.value; // Obtiene la fecha ingresada por el usuario
    const [day, month, year] = inputDate.split('-'); // Divide la fecha en año, mes y día
    const formattedDate = `${year}-${month}-${day}`; // Reordena la fecha en formato yyyy-MM-dd
    this.formulario.patchValue({ fechaLimite: formattedDate }); // Actualiza el valor en el formulario
  }
  
  
  
  
  cargarDatosEnFormulario(tarea: Tareas) {
    this.tareaSeleccionada = tarea; // Almacena la tarea seleccionada para editar
    
    // Convierte la fecha de Timestamp a Date antes de asignarla al formulario
    const fechaLimite = tarea.fechaLimite as Timestamp;
    const fechaLimiteDate = fechaLimite.toDate();
    
    this.formulario.patchValue({
      titulo: tarea.titulo,
      // Otros campos que quieras editar
      tareaId: tarea.id,
      fechaLimite: fechaLimiteDate // Asigna la fecha convertida al formulario
    });
  }
  


cambiarImportante(event: Event) {
  const esImportante = (event.target as HTMLInputElement).checked;
  this.formulario.get('importante')?.setValue(esImportante);

  // Actualizar en la base de datos y la tarea seleccionada
  if (this.tareaSeleccionada) {
    this.tareaSeleccionada.importante = esImportante; // Actualiza el valor localmente

    // Actualiza el valor en la base de datos utilizando el servicio
    this.tareasService.actualizarTarea(this.tareaSeleccionada.id, { importante: esImportante })
      .then(() => console.log('Importante actualizado correctamente en la base de datos'))
      .catch(error => console.error('Error al actualizar importante en la base de datos:', error));
  }
}

formatFechaLimite(fechaLimite: any): string {
  if (fechaLimite && fechaLimite.toDate) {
    const date = fechaLimite.toDate() as Date;
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } else {
    return ''; // O cualquier otro valor predeterminado si la fecha no es válida
  }
}




cambiarRecordarme(event: Event) {
  const recordarme = (event.target as HTMLInputElement).checked;
  this.formulario.get('recordarme')?.setValue(recordarme);

  // Actualizar en la base de datos
  if (this.tareaSeleccionada) {
    this.tareaSeleccionada.recordarme = recordarme; // Actualiza el valor localmente

    // Actualiza el valor en la base de datos utilizando el servicio
    this.tareasService.actualizarTarea(this.tareaSeleccionada.id, { recordarme })
      .then(() => console.log('Campo "Recordarme" actualizado correctamente en la base de datos'))
      .catch(error => console.error('Error al actualizar el campo "Recordarme" en la base de datos:', error));
  }
}


async editarTarea(tarea: Tareas) {
  this.tareaSeleccionada = tarea;

  if (this.formulario.valid) {
    const formData = { ...this.formulario.value };

    // Comprobar si la fecha límite está vacía
    if (!formData.fechaLimite) {
      formData.fechaLimite = new Date();
    }

    const cambios: Partial<Tareas> = { ...formData };

    try {
      await this.tareasService.actualizarTarea(this.tareaSeleccionada.id, cambios);
      console.log('Tarea actualizada correctamente en la base de datos');

      // Actualizar la tarea localmente en el 'tareas' array
      this.tareas = this.tareas.map(t => {
        if (t.id === this.tareaSeleccionada.id) {
          return { ...t, ...cambios };
        }
        return t;
      });

      // Reset the form and selected task after editing
      this.formulario.reset();
      this.tareaSeleccionada = null;

      // Reload the page to reflect the changes
      window.location.reload();
    } catch (error) {
      console.error('Error al actualizar la tarea en la base de datos:', error);
    }
  }
}


async cambiarEstado(tareaId: string) {
  try {
    const tareaIndex = this.tareas.findIndex(tarea => tarea.id === tareaId);
    if (tareaIndex !== -1) {
      const tarea = this.tareas[tareaIndex];
      this.estado = !tarea.estado; // Cambia el valor del estado localmente

      await this.tareasService.actualizarEstadoTarea(tareaId, { estado: this.estado });
      console.log('Estado de la tarea actualizado en la base de datos');

      // Filtra la lista de tareas para quitar la tarea con el ID correspondiente si el estado es true
      if (this.estado) {
        this.tareas = this.tareas.filter(t => t.id !== tareaId);
      }
    }
  } catch (error) {
    console.error('Error al actualizar el estado de la tarea en la base de datos:', error);
  }
}
}
