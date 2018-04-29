import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ToasterModule } from 'angular2-toaster';
import { AuthService } from '../services/auth.service';
import { ValidateService } from '../services/validate.service';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    RouterModule,
    ToasterModule.forRoot(),
  ],
  declarations: [NavbarComponent, FooterComponent],
  exports: [NavbarComponent, FooterComponent],
  providers: [AuthService, ValidateService]
})
export class SharedModule { }
