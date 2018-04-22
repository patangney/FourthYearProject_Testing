import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ClarityModule } from '@clr/angular';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ViewClientModule } from './view-client/view-client.module';
import { NotfoundComponent } from './notfound/notfound.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




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
    ViewClientModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
