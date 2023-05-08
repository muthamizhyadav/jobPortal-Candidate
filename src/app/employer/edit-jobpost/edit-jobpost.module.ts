import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditJobpostRoutingModule } from './edit-jobpost-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { EditJobpostComponent } from './edit-jobpost.component';
import { NgxEditorModule } from 'ngx-editor';



@NgModule({
    declarations: [EditJobpostComponent],
    imports: [
        CommonModule,
        EditJobpostRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        GooglePlaceModule,
        NgMultiSelectDropDownModule.forRoot(),
        NgxEditorModule,


    ]
})
export class EditJobpostModule { }
