import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FooterComponent } from './footer/footer.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { EventCardComponent } from './event-card/event-card.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactComponent } from './contact/contact.component';
import { ModalModule } from 'angular-custom-modal';
import { AdminComponent } from './admin/admin.component';
import { FancyChatBoxComponent } from './fancy-chat-box/fancy-chat-box.component';
import { TypingAreaComponent } from './typing-area/typing-area.component';
import { SpecificComponent } from './specific/specific.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LandingPageComponent,
    EventCardComponent,
    NavbarComponent,
    ContactComponent,
    AdminComponent,
    FancyChatBoxComponent,
    TypingAreaComponent,
    SpecificComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AngularFileUploaderModule,
    CarouselModule.forRoot(),
    ModalModule,
    BsDropdownModule.forRoot()
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
