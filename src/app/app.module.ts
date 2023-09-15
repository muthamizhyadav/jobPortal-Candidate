import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanHomeComponent } from './can-home/can-home.component';
import { CandidateModule } from './candidate/candidate.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployerModule } from './employer/employer.module';
import { NgxEditorModule } from 'ngx-editor';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { RedirectComponent } from './redirect/redirect.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AgmCoreModule } from '@agm/core';
import { EditJobpostModule } from './employer/edit-jobpost/edit-jobpost.module';
import { CookieModule } from 'ngx-cookie';
import { LoaderComponent } from './loader/loader.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ExampleInterceptor } from './interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CanHomeComponent,
    HeaderComponent,
    FooterComponent,
    RedirectComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    EmployerModule,
    GooglePlaceModule,
    NgxEditorModule,
    HttpClientModule,
    NgxExtendedPdfViewerModule,
    NgMultiSelectDropDownModule.forRoot(),
    CookieModule.withOptions(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyARM6-Qr_hsR53GExv9Gmu9EtFTV5ZuDX4',
    }),
    EditJobpostModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ExampleInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
