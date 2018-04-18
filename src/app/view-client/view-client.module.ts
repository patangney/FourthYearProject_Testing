import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { ViewClientRoutingModule } from './view-client-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
import { ClarityModule } from '@clr/angular';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { FormsModule } from '@angular/forms';
import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';
import { TestComponent } from './test/test.component';
import { ToasterModule } from 'angular2-toaster';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '../guards/auth.guard';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    HttpModule,
    FormsModule,
    ViewClientRoutingModule,
    SharedModule,
    ClarityModule,
    ToasterModule.forRoot(),
    
  ],
  declarations: [HomepageComponent, RegisterComponent, LoginComponent, AboutComponent, TestComponent, DashboardComponent, ProfileComponent],
  providers: [ValidateService, AuthService, AuthGuard]
})
export class ViewClientModule { }
