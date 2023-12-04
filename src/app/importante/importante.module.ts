import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImportantePageRoutingModule } from './importante-routing.module';

import { ImportantePage } from './importante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ImportantePageRoutingModule
  ],
  declarations: [ImportantePage]
})
export class ImportantePageModule {}
