import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { SimpleColumnChartModule } from 'src/app/common/amchart5/simple-column-chart/simple-column-chart.module';
import { MobileUiComponent } from './mobile-ui.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [MobileUiComponent],
  imports: [
       CommonModule,
       FormsModule,
       ReactiveFormsModule,
       HttpClientModule,
       SimpleColumnChartModule
    
    
  ],
  exports:[MobileUiComponent],
  providers: [],
  bootstrap: [MobileUiComponent],
})
export class MobileUiModule {}