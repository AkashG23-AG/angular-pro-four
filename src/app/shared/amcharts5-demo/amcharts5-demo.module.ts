import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Amcharts5DemoComponent } from './amcharts5-demo.component';
import { SimpleColumnChartModule } from 'src/app/common/amchart5/simple-column-chart/simple-column-chart.module';
import { ColorChartModule } from '../color-chart/color-chart.module';
import { AmChartComponent } from 'src/app/common/amchart5/am-chart/am-chart.component';
import { DemoTwoComponent } from '../demo-two/demo-two.component';


@NgModule({
  declarations: [Amcharts5DemoComponent,AmChartComponent,DemoTwoComponent],
  imports: [
       CommonModule,
       FormsModule,
       ReactiveFormsModule,
       HttpClientModule,
       SimpleColumnChartModule,
       ColorChartModule
    
    
  ],
  exports:[Amcharts5DemoComponent],
  providers: [],
  bootstrap: [Amcharts5DemoComponent],
})
export class Amcharts5DemoModule {}