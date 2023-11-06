import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HoyPageRoutingModule } from './hoy-routing.module';

import { HoyPage } from './hoy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HoyPageRoutingModule
  ],
  declarations: [HoyPage]
})
export class HoyPageModule {}
