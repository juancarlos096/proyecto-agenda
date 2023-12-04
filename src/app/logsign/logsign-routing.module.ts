import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogsignPage } from './logsign.page';

const routes: Routes = [
  {
    path: '',
    component: LogsignPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogsignPageRoutingModule {}
