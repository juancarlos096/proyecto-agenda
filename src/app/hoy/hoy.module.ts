import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HoyPageRoutingModule } from './hoy-routing.module';

import { HoyPage } from './hoy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HoyPageRoutingModule
  ],
  declarations: [HoyPage],
  
})
export class HoyPageModule {}
