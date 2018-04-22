import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewClientModule } from './view-client/view-client.module';
import { NotfoundComponent } from './notfound/notfound.component';
import { Test2Component } from './view-client/test2/test2.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'test2', component: Test2Component},
  { path: '**', component: NotfoundComponent },
  
  
];

@NgModule({
  imports: [
    ViewClientModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
