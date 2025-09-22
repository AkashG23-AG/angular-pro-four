import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { SimpleColumnChartModule } from 'src/app/common/amchart5/simple-column-chart/simple-column-chart.module';
import { HttpClientModule } from '@angular/common/http';
import { ProfileMvComponent } from './profile-mv.component';


@NgModule({
  declarations: [ProfileMvComponent],
  imports: [
       CommonModule,
       FormsModule,
       ReactiveFormsModule,
       HttpClientModule,
       SimpleColumnChartModule
    
    
  ],
  exports:[ProfileMvComponent],
  providers: [],
  bootstrap: [ProfileMvComponent],
})
export class ProfileMvModule {}