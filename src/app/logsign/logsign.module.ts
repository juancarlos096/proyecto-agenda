import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogsignPageRoutingModule } from './logsign-routing.module';

import { LogsignPage } from './logsign.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogsignPageRoutingModule
  ],
  declarations: [LogsignPage]
})
export class LogsignPageModule {}
