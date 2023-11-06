import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HoyPage } from './hoy.page';

const routes: Routes = [
  {
    path: '',
    component: HoyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HoyPageRoutingModule {}
