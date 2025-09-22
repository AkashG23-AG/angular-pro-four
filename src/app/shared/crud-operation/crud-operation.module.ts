import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { CrudOperationComponent } from './crud-operation.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CrudOperationComponent],
  imports: [
       CommonModule,
       FormsModule,
       BrowserModule,
       ReactiveFormsModule,
       HttpClientModule,
    
  ],
  exports:[CrudOperationComponent],
  providers: [],
  bootstrap: [CrudOperationComponent],
})
export class CrudOperationModule {}