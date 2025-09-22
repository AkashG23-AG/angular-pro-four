
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicePdfDemoComponent } from './invoice-pdf-demo.component';
import { InvoicePdfDemoRoutingModule } from './invoice-pdf-demo.routing.module';

@NgModule({
  declarations: [InvoicePdfDemoComponent],
  imports: [
    CommonModule,
    InvoicePdfDemoRoutingModule
  ],
  exports: [InvoicePdfDemoComponent]
})
export class InvoicePdfDemoModule { }
