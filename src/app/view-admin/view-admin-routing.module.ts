import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientCreateComponent } from './client-create/client-create.component';
import { ClientEditComponent } from './client-edit/client-edit.component';

const adminRoutes: Routes = [
  
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'client-details/:id',
    component: ClientDetailsComponent,
    data: {title: 'Client Details'}
  },
  {
    path: 'client-create',
    component: ClientCreateComponent
  },
  {
    path: 'client-edit/:id',
    component: ClientEditComponent,
    data: {title: 'Edit Client'}
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class ViewAdminRoutingModule { }
