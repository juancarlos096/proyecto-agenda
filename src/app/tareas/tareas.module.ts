import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TareasPageRoutingModule } from './tareas-routing.module';

import { TareasPage } from './tareas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    IonicModule,
    TareasPageRoutingModule
  ],
  declarations: [TareasPage],
  providers: [
   // LocalNotification // Agrega LocalNotifications en los providers del módulo
  ]
})


export class TareasPageModule {}
