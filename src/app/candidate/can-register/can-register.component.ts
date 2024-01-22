import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { CanditateService } from '../canditate.service';

@Component({
  selector: 'app-can-register',
  templateUrl: './can-register.component.html',
  styleUrls: ['./can-register.component.css'],
})
export class CanRegisterComponent implements OnInit {
  isSubmitted = false;
  Candidateform: any = this.fb.group({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', Validators.required),
    confirmpassword: new FormControl('', Validators.required),

    resume: new FormControl('', Validators.required),
    workStatus: new FormControl(null, Validators.required),
    mobileNumber: new FormControl('', Validators.required),
    lat: new FormControl('', Validators.required),
    long: new FormControl('', Validators.required),
    addressLoaction: new FormControl(''),
    location: new FormControl('', Validators.required),
  });
  candidateFile: any;
  constructor(
    private fb: FormBuilder,
    private canditateService: CanditateService,
    private router: Router
  ) {}

  ngOnInit() {}

  workExp: any = null;

  workchangeF(v: any) {
    if (v == 'Experience') {
      this.Candidateform.addControl('prevCompany', Validators.required),
        this.Candidateform.addControl('prevCompanyRole', Validators.required);
    }
  }

  workChange(e: any) {
    this.workExp = e.target.value;
    console.log('workChange', this.workExp);
    if (this.workExp == 'Experience') {
      console.log('Added');
      this.Candidateform.addControl(
        'prevCompany',
        new FormControl('', Validators.required)
      ),
        this.Candidateform.addControl(
          'prevCompanyRole',
          new FormControl('', Validators.required)
        );
    } else {
      this.Candidateform.removeControl('prevCompany');
      this.Candidateform.removeControl('prevCompanyRole');
    }
  }
  // File upload
  file_name: any = '';
  addresume(file: any) {
    this.file_name = '';
    this.candidateFile = null;
    const res = file.target.files[0] as File;
    if (res != null) {
      if (
        res.type == 'application/pdf' ||
        res.type ==
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        this.candidateFile = res;
        this.file_name = this.candidateFile.name;
        console.log(this.candidateFile.name, 'sdsdfsf');
      }
    }
  }

  // rgister api
  serError: any = null;
  pswMismatch: any = null;
  submit() {
    if (
      this.Candidateform.get('password').value !=
      this.Candidateform.get('confirmpassword').value
    ) {
      this.pswMismatch = 'Password mismatch';
      console.log(
        this.Candidateform.get('password').value !=
          this.Candidateform.get('confirmpassword').value
      );
    } else {
      this.pswMismatch = null;
    }

    this.isSubmitted = true;
    var jobForm = new FormData();
    jobForm.append('name', this.Candidateform.get('name')?.value);
    jobForm.append('email', this.Candidateform.get('email')?.value);
    jobForm.append('password', this.Candidateform.get('password')?.value);
    jobForm.append(
      'confirmpassword',
      this.Candidateform.get('confirmpassword')?.value
    );
    jobForm.append('workStatus', this.Candidateform.get('workStatus')?.value);
    jobForm.append(
      'mobileNumber',
      this.Candidateform.get('mobileNumber')?.value
    );
    jobForm.append('lat', this.Candidateform.get('lat')?.value);
    jobForm.append('long', this.Candidateform.get('long')?.value);
    jobForm.append('location', this.Candidateform.get('location')?.value);
    if (this.workExp == 'Experience') {
      jobForm.append(
        'prevCompany',
        this.Candidateform.get('prevCompany')?.value
      );
      jobForm.append(
        'prevCompanyRole',
        this.Candidateform.get('prevCompanyRole')?.value
      );
    }
    jobForm.append('resume', this.candidateFile);
    if (this.Candidateform.valid) {
      this.canditateService.submitcandicate(jobForm).subscribe(
        (res: any) => {
          this.router.navigate(['/checkmailCan']);
          this.workExp = null;
        },
        (error) => {
          this.serError = error.error.message;
        }
      );
      this.isSubmitted = false;
    }
  }
  options: any = {
    componentRestrictions: { country: 'IN' },
  };

  latitude: any;
  longtitude: any;
  handleAddressChange(address: Address) {
    console.log(address);
    console.log(address.geometry.location.lat());
    console.log(address.geometry.location.lng());
    this.latitude = address.geometry.location.lat();
    this.latitude = String(this.latitude);
    this.longtitude = address.geometry.location.lng();
    this.longtitude = String(this.longtitude);

    this.Candidateform.patchValue({
      lat: this.latitude,
      long: this.longtitude,
      location: address.formatted_address,
    });
  }
}
