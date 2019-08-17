import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ContactComponent } from './contact/contact.component';
import { AdminComponent } from './admin/admin.component';
import { FancyChatComponent } from './fancy-chat/fancy-chat.component';

const routes: Routes = [

    { path: 'contact', component: ContactComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'chat', component: FancyChatComponent },
    { path: '', component: LandingPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
