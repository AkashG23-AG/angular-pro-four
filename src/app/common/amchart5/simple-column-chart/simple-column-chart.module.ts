import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleColumnChartComponent } from './simple-column-chart.component';

@NgModule({
    declarations: [SimpleColumnChartComponent],
    imports: [CommonModule],
    exports: [SimpleColumnChartComponent]
})
export class SimpleColumnChartModule { }
