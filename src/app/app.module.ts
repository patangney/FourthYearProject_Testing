import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ClarityModule } from '@clr/angular';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ViewClientModule } from './view-client/view-client.module';
import { ViewAdminModule } from './view-admin/view-admin.module';
import { NotfoundComponent } from './notfound/notfound.component';






@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,    
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ClarityModule,
    SharedModule,
    ViewClientModule,
    ViewAdminModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
