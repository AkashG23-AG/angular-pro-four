import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BryntumSchedulerModule } from '@bryntum/scheduler-angular';
import { UserComponent } from './admin/user/user.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './view/sidebar/sidebar.component';

import { CrudOperationComponent } from './shared/crud-operation/crud-operation.component';
import { NewformComponent } from './admin/newform/newform.component';
import { CrudOperationModule } from './shared/crud-operation/crud-operation.module';
import { DashboardOneComponent } from './shared/dashboard-one/dashboard-one.component';
import { Amcharts5DemoComponent } from './shared/amcharts5-demo/amcharts5-demo.component';
import { Amcharts5DemoModule } from './shared/amcharts5-demo/amcharts5-demo.module';
import { SimpleColumnChartComponent } from './common/amchart5/simple-column-chart/simple-column-chart.component';
import { DashboardOneModule } from './shared/dashboard-one/dashboard-one.module';
import { DemoOneComponent } from './shared/demo-one/demo-one.component';
import { DemoOneModule } from './shared/demo-one/demo-one.module';
import { MobileUiComponent } from './shared/mobile-ui/mobile-ui.component';
import { ProfileMvComponent } from './shared/profile-mv/profile-mv.component';
import { RouterModule } from '@angular/router';
import { ProfileMvModule } from './shared/profile-mv/profile-mv.module';
import { MobileUiModule } from './shared/mobile-ui/mobile-ui.module';
import { PdfLandingPageModule } from './shared/pdf-landing-page/pdf-landing-page.module';
import { InvoicePdfDemoModule } from './shared/invoice-pdf-demo/invoice-pdf-demo.moduel';




@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SidebarComponent,
   NewformComponent,

  ],
  
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CrudOperationModule,
    Amcharts5DemoModule,
    DashboardOneModule,
    ProfileMvModule,
    DemoOneModule,
    RouterModule,
    MobileUiModule,
    PdfLandingPageModule,
    InvoicePdfDemoModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
