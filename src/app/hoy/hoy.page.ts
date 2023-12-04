import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tareas } from '../interfaces/tareas.interface';
import { TareasService } from '../services/tareas.services';


@Component({
  selector: 'app-tareas',
  templateUrl: './hoy.page.html',
  styleUrls: ['./hoy.page.scss'],
})
export class HoyPage implements OnInit {
  formulario: FormGroup;
  tareas: Tareas[] = [];
  tareaSeleccionada: any;
  mostrarFormulario: boolean = false; // Variable para controlar la visualización del formulario


  constructor(private fb: FormBuilder, private tareasService: TareasService) {
    this.formulario = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: [''],
      importante: [false],
      fechaLimite: [this.getFechaActual(), Validators.required], // Establecer la fecha actual por defecto

      repetir: [false],
      recordarme: [false],
      tareaId: [''] // Asegúrate de tener este campo
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      this.tareas = await this.tareasService.getTareasDeHoy();
    } catch (error) {
      console.error('Error al obtener las tareas de hoy en el componente:', error);
      // Manejar el error según sea necesario
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
  
      try {
        // Agrega la tarea a la base de datos y obtén el ID generado
        const tareaConId = await this.tareasService.addTareas(formData);
  
        // Verificar si la tarea tiene un ID válido antes de agregarla a la lista
        if (tareaConId && tareaConId.id) {
          // Agregar tarea con ID válido a la lista
          this.tareas.push(tareaConId);
  
          // Obtener nuevamente las tareas de hoy después de agregar la tarea
          const tareasDeHoy = await this.tareasService.getTareasDeHoy();
  
          // Filtrar las tareas por la fecha actual
          this.tareas = tareasDeHoy.filter(tarea =>
            tarea.fechaLimite && this.esFechaActual(tarea.fechaLimite.toDate())
          );
        } else {
          console.error('La tarea no tiene un ID válido');
          // Manejo de error o lógica adicional si la tarea no tiene un ID válido
        }
      } catch (error) {
        console.error('Error al agregar la tarea:', error);
        // Manejo de error si ocurre un problema al agregar la tarea
      }
    }
  }
  
  // Función para verificar si una fecha es la fecha actual
  esFechaActual(fecha: Date): boolean {
    const hoy = new Date();
    return (
      fecha.getDate() === hoy.getDate() &&
      fecha.getMonth() === hoy.getMonth() &&
      fecha.getFullYear() === hoy.getFullYear()
    );
  }
   
  getFechaActual(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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
  this.formulario.patchValue({
    titulo: tarea.titulo,
    // Otros campos que quieras editar
    tareaId: tarea.id
  });
}
expandirTarea(tarea: Tareas) {
  this.tareaSeleccionada = this.tareaSeleccionada === tarea ? null : tarea;
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
  this.tareaSeleccionada = tarea; // Set the selected task
  if (this.formulario.valid && this.tareaSeleccionada) {
    const formData = { ...this.formulario.value };
    console.log('Formulario:', formData); // Print form data
    console.log('Tarea seleccionada:', this.tareaSeleccionada); // Print selected task

    const cambios: Partial<Tareas> = {
      titulo: formData.titulo,
      descripcion: formData.descripcion,
      importante: formData.importante,
      fechaLimite: formData.fechaLimite,
      repetir: formData.repetir,
      recordarme: formData.recordarme
      // Add other fields you want to update
    };

    try {
      if (this.tareaSeleccionada) {
        await this.tareasService.actualizarTarea(this.tareaSeleccionada.id, cambios);
        console.log('Tarea actualizada correctamente en la base de datos');

        // Update the task locally in the 'tareas' array
        this.tareas = this.tareas.map(t => {
          if (t.id === this.tareaSeleccionada.id) {
            return { ...t, ...cambios };
          }
          return t;
        });

        // Reset the form and selected task after editing
        this.formulario.reset();
        this.tareaSeleccionada = null;
      } else {
        console.log('No hay tarea seleccionada');
      }
    } catch (error) {
      console.error('Error al actualizar la tarea en la base de datos:', error);
      // Error handling if there is a problem updating the task
    }
  } else {
    console.log('Formulario no válido o tarea seleccionada no encontrada');
    console.log('Formulario válido:', this.formulario.valid);
  }
}

}

