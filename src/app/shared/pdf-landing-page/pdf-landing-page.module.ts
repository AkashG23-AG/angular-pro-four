
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfLandingPageComponent } from './pdf-landing-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PdfLandingPageComponent],
  imports: [CommonModule,FormsModule],
  exports: [PdfLandingPageComponent]
})
export class PdfLandingPageModule {}
