import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendMailRoutingModule } from './send-mail-routing.module';
import { SendMailComponent } from './send-mail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SendMailComponent],
  imports: [
    CommonModule,
    SendMailRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SendMailModule { }
