import {BrowserModule} from '@angular/platform-browser';
import {NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
// import { GridModule } from '@progress/kendo-angular-grid';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DashboardOneComponent } from './dashboard-one.component';

@NgModule({
  declarations: [DashboardOneComponent],
  imports: [CommonModule],  // Include CommonModule here
  exports: [DashboardOneComponent]
})
export class DashboardOneModule {}
