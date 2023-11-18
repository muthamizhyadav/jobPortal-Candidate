import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClimbService } from './climb.service';

@Component({
  selector: 'app-climb-event-register',
  templateUrl: './climb-event-register.component.html',
  styleUrls: ['./climb-event-register.component.css'],
})
export class ClimbEventRegisterComponent implements OnInit {
  constructor(private api: ClimbService) { }
  date: any;
  ngOnInit(): void {
    this.api.get_date().subscribe((res: any) => {
      console.log(res)
      this.date = res;
    })
  }

  clim_form: any = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    mail: new FormControl(null, [Validators.required, Validators.email]),
    gender: new FormControl(null, [Validators.required]),
    mobileNumber: new FormControl(null, [Validators.required, Validators.pattern('^[6-9]\\d{9}$')]),
    currentLocation: new FormControl(null, [Validators.required]),
    education: new FormControl(null, [Validators.required]),
    year_of_passedout: new FormControl(null, [Validators.required]),
    resumeName: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required]),
    slot: new FormControl(null, [Validators.required]),
    terms: new FormControl(null, [Validators.required]),
  })
  submitted: any = false;
  SUBMIT_FROM() {
    this.submitted = true;
    console.log(this.clim_form.value)
    if (this.clim_form.valid && this.clim_form.get('terms')?.value == true) {
      this.submitted = false;
      document.getElementById("open-popup")?.click();
    }
  }
  loader: any = false;
  errro_message: any;
  resume_files: any;
  resume_file(event: any) {
    let file = event.target.files;
    if (file != null) {
      if (file.length != 0) {
        let fileName = file[0].name;
        this.resume_files = file[0];
        console.log(fileName)
        this.clim_form.patchValue({
          resumeName: fileName
        })
      }
    }
    console.log(file)
  }
  remove_file() {
    this.clim_form.get('resumeName')?.setValue(null);
    this.resume_files = null;
  }
  slots: any;
  date_change(event: any) {
    this.slots = null;
    this.clim_form.get('slot').setValue(null)
    let find = event.target.value;
    let slot = this.date.findIndex((a: any) => a.date == find);
    console.log(slot)
    if (slot != -1) {
      this.slots = this.date[slot].time
    }
  }

  inser_now() {
    this.errro_message = null;
    this.submitted = true;
    if (this.clim_form.valid && this.clim_form.get('terms')?.value == true) {
      this.loader = true;
      this.submitted = false;
      let data = new FormData();
      let form: any = this.clim_form.value;
      for (var key of Object.keys(form)) {
        console.log(form[key], key)
        data.append(key, form[key]);
      }
      data.append('uploadResume', this.resume_files);
      this.api.inser_form(data).subscribe((res: any) => {
        this.loader = false;
        this.clim_form.reset();
        this.resume_files = null;
        this.submited_success = true;
      }, error => {
        this.errro_message = error.error.message;
        this.loader = false;
      })

    }
  }

  submited_success: any = false;
}
