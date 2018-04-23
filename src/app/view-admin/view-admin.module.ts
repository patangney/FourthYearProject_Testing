import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ViewAdminRoutingModule } from './view-admin-routing.module';

import { ClarityModule } from '@clr/angular';
import { ToasterModule } from 'angular2-toaster';


import { AdminComponent } from './admin/admin.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientCreateComponent } from './client-create/client-create.component';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { SharedModule } from '../shared/shared.module';





@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ViewAdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    ClarityModule,
    ToasterModule.forRoot(),

  ],
  declarations: [AdminComponent, ClientDetailsComponent, ClientCreateComponent, ClientEditComponent]
})
export class ViewAdminModule { }
