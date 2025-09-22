import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DemoOneComponent } from './demo-one.component';
import { SimpleColumnChartModule } from 'src/app/common/amchart5/simple-column-chart/simple-column-chart.module';


@NgModule({
  declarations: [DemoOneComponent],
  imports: [
       CommonModule,
       FormsModule,
       ReactiveFormsModule,
       HttpClientModule,
       SimpleColumnChartModule
    
  ],
  exports:[DemoOneComponent],
  providers: [],
  bootstrap: [DemoOneComponent],
})
export class DemoOneModule {}