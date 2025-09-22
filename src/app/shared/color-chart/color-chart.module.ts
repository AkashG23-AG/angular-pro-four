
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorChartComponent } from './color-chart.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ColorChartComponent],
  imports: [
    CommonModule,
    FormsModule,

 
  ],
  exports: [ColorChartComponent]
})
export class ColorChartModule { }
