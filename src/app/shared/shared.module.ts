import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ToasterModule } from 'angular2-toaster';
import { AuthService } from '../services/auth.service';
import { ValidateService } from '../services/validate.service';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    RouterModule,
    ToasterModule.forRoot(),
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
  providers: [AuthService, ValidateService]
})
export class SharedModule { }
