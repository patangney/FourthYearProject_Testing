import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewClientModule } from './view-client/view-client.module';
import { NotfoundComponent } from './notfound/notfound.component';
import { Test2Component } from './view-client/test2/test2.component';
import { ViewAdminModule } from './view-admin/view-admin.module';
import { HomepageComponent } from './view-client/homepage/homepage.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  
  { path: 'admin', loadChildren: 'app/view-admin/view-admin.module#ViewAdminModule' },     
  { path: '**', component: NotfoundComponent },
  
  
];

@NgModule({
  imports: [
    ViewClientModule,
    ViewAdminModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
