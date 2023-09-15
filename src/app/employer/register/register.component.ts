import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpServiceService } from '../emp-service.service';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  file: any = null;
  latitude: any;
  longtitude: any;
  selectImg1: any = null;
  submitted = false;
  id: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private empservice: EmpServiceService,
    private Aroute: ActivatedRoute
  ) {}

  RegisterForm: any = this.formBuilder.group({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', Validators.required),
    confirm_password: new FormControl('', Validators.required),
    mobileNumber: new FormControl('', Validators.required),
    contactName: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
    companyType: new FormControl(null, Validators.required),
    pincode: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    lat: new FormControl(''),
    long: new FormControl(''),
    registrationType: new FormControl(null, Validators.required),
    industryType: new FormControl(null, Validators.required),
    companyWebsite: new FormControl(''),
    postedBy: new FormControl(null, Validators.required),
    companyDescription: new FormControl('', Validators.required),
    companyAddress: new FormControl('', Validators.required),
  });

  imageSrc: string | ArrayBuffer | null = '';
  users: any = '';

  ngOnInit(): void {
    this.Aroute.queryParams.subscribe((e: any) => {
      this.id = e.id;
      if (this.id != null) {
        this.getUserDetails();
      }
    });
    navigator.geolocation.getCurrentPosition((position: any) => {
      this.latitude = position.coords.latitude;
      this.longtitude = position.coords.longitude;
      console.log(this.longtitude, 'this.longtitude');
      console.log(this.latitude, 'this.latitude');
    });
  }
  getimg: any = '';
  getUserDetails() {
    this.empservice.viewBasicDetailsEmployee().subscribe((a: any) => {
      console.log(a.user);
      this.users = a.user;
      this.getimg = this.users.logo;
      this.RegisterForm.patchValue({
        location: a.user.location,
        name: a.user.name,
        email: a.user.email,
        mobileNumber: a.user.mobileNumber,
        contactName: a.user.contactName,
        companyType: a.user.companyType,
        pincode: a.user.pincode,
        registrationType: a.user.registrationType,
        industryType: a.user.industryType,
        companyWebsite: a.user.companyWebsite,
        companyDescription: a.user.companyDescription,
        companyAddress: a.user.companyAddress,
        postedBy: a.user.postedBy,
        password: null,
        confirm_password: null,
        lat: null,
        long: null,
      });
    });
  }

  reg_submit() {
    if (this.id == null) {
      this.submitted = true;
      if (this.submitted && this.RegisterForm.valid) {
        const LogoForm = new FormData();
        LogoForm.append('logo', this.selectImg1);
        const UploadForm = new FormData();
        UploadForm.append('choosefile', this.file);
        this.empservice
          .employeeRegister(this.RegisterForm.value)
          .subscribe((e: any) => {
            console.log(e);
            // profile upload
            if (this.selectImg1 != null) {
              this.empservice
                .profileUpload(e.user._id, LogoForm)
                .subscribe((p: any) => {});
            }
            // File Upload
            if (this.file != null) {
              this.empservice
                .uploadFile(e.user._id, UploadForm)
                .subscribe((f: any) => {});
            }
          });
        this.router.navigateByUrl('/login');
        this.submitted = false;
      }
    } else {
      this.RegisterForm.removeControl('password');
      this.RegisterForm.removeControl('long');
      this.RegisterForm.removeControl('lat');
      this.RegisterForm.removeControl('confirm_password');
      const LogoForm = new FormData();
      LogoForm.append('logo', this.selectImg1);
      const UploadForm = new FormData();
      UploadForm.append('choosefile', this.file);
      this.submitted = true;
      if (this.submitted && this.RegisterForm.valid) {
        this.empservice
          .updateEmpUpdate(this.id, this.RegisterForm.value)
          .subscribe((e: any) => {
            // profile upload
            if (this.selectImg1 != null) {
              this.empservice
                .profileUpload(this.id, LogoForm)
                .subscribe((p: any) => {});
            }
            // File Upload
            if (this.file != null) {
              this.empservice
                .uploadFile(this.id, UploadForm)
                .subscribe((f: any) => {});
            }
          });
        this.router.navigateByUrl('/emp-account');
        this.submitted = false;
      }
    }
  }
  input = true;
  selectedImg1(event: any) {
    this.selectImg1 = event.target.files[0];
    const file: File = event.target.files[0];
    console.log(this.selectImg1);
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result;
        this.input = !this.input;
      };
    }
  }
  nameshow: any = false;
  nameupload: any = '';
  addresume(file: any) {
    this.file = null;
    const res = file.target.files[0] as File;
    console.log(res.name, 'emp name upload file');
    this.nameupload = res.name
    if (res != null) {
      if (
        res.type == 'application/pdf' ||
        res.type ==
          'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      ) {
        this.file = res;
      }
    }
  }
  options: any = {
    componentRestrictions: { country: 'IN' },
  };
  handleAddressChange(address: Address) {
    console.log(address);
    console.log(address.geometry.location.lat());
    console.log(address.geometry.location.lng());
    this.latitude = address.geometry.location.lat();
    this.latitude = String(this.latitude);
    this.longtitude = address.geometry.location.lng();
    this.longtitude = String(this.longtitude);

    this.RegisterForm.patchValue({
      lat: this.latitude,
      long: this.longtitude,
      location: address.formatted_address,
    });
  }
}
