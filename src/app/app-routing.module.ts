import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './admin/user/user.component';
import { CrudOperationComponent } from './shared/crud-operation/crud-operation.component';
import { DashboardOneComponent } from './shared/dashboard-one/dashboard-one.component';
import { DemoOneComponent } from './shared/demo-one/demo-one.component';
import { Amcharts5DemoComponent } from './shared/amcharts5-demo/amcharts5-demo.component';
import { MobileUiComponent } from './shared/mobile-ui/mobile-ui.component';
import { ProfileMvComponent } from './shared/profile-mv/profile-mv.component';
import { PdfLandingPageComponent } from './shared/pdf-landing-page/pdf-landing-page.component';
import { InvoicePdfDemoComponent } from './shared/invoice-pdf-demo/invoice-pdf-demo.component';


const routes: Routes = [
   {
    path: 'demoOne',
    component: DemoOneComponent,
    data: {
      title: 'demoOne'
    }
  },
  { path: 'demoOne', redirectTo: 'demoOne' },
  {
    path: 'user',
    component: UserComponent,
    data: {
      title: 'user'
    }
  },
  {
    path: 'CrudOperationComponent',
    component: CrudOperationComponent,
    data: {
      title: 'CrudOperationComponent'
    }
  },
  {
    path: 'DashboardOne',
    component: DashboardOneComponent,
    data: {
      title: 'DashboardOne'
    }
  },
  {
    path: 'amcharts5-demo',
    component: Amcharts5DemoComponent,
    data: {
      title: 'amcharts5-demo'
    }
  },
   {
    path: 'pdflandingpage',
    component: PdfLandingPageComponent,
    data: {
      title: 'pdflandingpage'
    }
  },
 
  {
    path: 'mobileui',
    component: MobileUiComponent,
    data: {
      title: 'mobileui'
    }
    
  },
  {
    path: 'profilemv',
    component: ProfileMvComponent,
    data: {
      title: 'profilemv'
    }
  },
    {
    path: 'invoicepdfdemo',
    component: InvoicePdfDemoComponent,
    data: {
      title: 'invoicepdfdemo'
    }
  },
  
  



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
