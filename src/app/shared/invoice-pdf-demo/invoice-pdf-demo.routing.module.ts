
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoicePdfDemoComponent } from './invoice-pdf-demo.component';

const routes: Routes = [
  {
    path: '',
    component: InvoicePdfDemoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicePdfDemoRoutingModule { }
