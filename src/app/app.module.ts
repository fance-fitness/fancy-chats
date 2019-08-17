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
import { TypeaheadModule } from 'ngx-type-ahead';
import { ModalModule } from 'angular-custom-modal';
import { AdminComponent } from './admin/admin.component';
import { FancyChatComponent } from './fancy-chat/fancy-chat.component';
import { ChatModule } from 'ng-ui-chat';
import { FancyChatBoxComponent } from './fancy-chat-box/fancy-chat-box.component';
import { FancyChatMessageComponent } from './fancy-chat-message/fancy-chat-message.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LandingPageComponent,
    EventCardComponent,
    NavbarComponent,
    ContactComponent,
    AdminComponent,
    FancyChatComponent,
    FancyChatBoxComponent,
    FancyChatMessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    TypeaheadModule,
    AngularFileUploaderModule,
    ChatModule,
    CarouselModule.forRoot(),
    ModalModule,
    BsDropdownModule.forRoot()
  ],
  providers: [],
  exports: [ChatModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
