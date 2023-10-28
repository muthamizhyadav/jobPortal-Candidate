import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CanditateService } from '../canditate.service';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
})
export class ForgotpasswordComponent implements OnInit {
  sendOtpFom: any = this.fb.group({
    mobilenumber: new FormControl('', Validators.required),
  });
  isSubmitted = false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private candidate: CanditateService,
    private Cookie: CookieService
  ) {}

  ngOnInit(): void {}
  wrongMobile = false;
  sendOtp() {
    this.isSubmitted = true;
    if (this.sendOtpFom.valid) {
      this.candidate.sendmodile(this.sendOtpFom.value).subscribe(
        (res: any) => {
          this.router.navigate(['/sendOtp'], {
            queryParams: { mobile: this.sendOtpFom.get('mobilenumber')?.value },
          });
          this.Cookie.put(
            'mobilenumber',
            this.sendOtpFom.get('mobilenumber')?.value
          );
          this.isSubmitted = false;
        },
        (error) => {
          if (error.error.message == 'mobileNumber not found') {
            this.wrongMobile = true;
          }
        }
      );
    }
  }
}
