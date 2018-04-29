import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { NgStyle } from '@angular/common';

import { ViewClientRoutingModule } from './view-client-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
import { ClarityModule } from '@clr/angular';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';
import { TestComponent } from './test/test.component';
import { ToasterModule } from 'angular2-toaster';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '../guards/auth.guard';
import { Test2Component } from './test2/test2.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { OwlModule } from 'ngx-owl-carousel';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    HttpModule,
    FormsModule,
    ViewClientRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    ClarityModule,
    OwlModule,
    ToasterModule.forRoot(),
    
  ],
  declarations: [HomepageComponent, RegisterComponent, LoginComponent, AboutComponent, TestComponent, DashboardComponent, ProfileComponent, Test2Component, EditProfileComponent],
  providers: [ValidateService, AuthService, AuthGuard]
})
export class ViewClientModule { }
