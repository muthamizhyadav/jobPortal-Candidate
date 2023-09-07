import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CanditateService } from '../canditate.service';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-sendotpforgot',
  templateUrl: './sendotpforgot.component.html',
  styleUrls: ['./sendotpforgot.component.css'],
})
export class SendotpforgotComponent implements OnInit {
  otpForm = this.fb.group({
    mobilenumber: new FormControl(''),
    otp: new FormControl('', Validators.required),
  });
  issubmit = false;
  constructor(
    private router: Router,
    private candidateservice: CanditateService,
    private fb: FormBuilder,
    private activate: ActivatedRoute,
    private Cookie: CookieService
  ) {}

  remainingTime: number = 60;
  private intervalId: any;
  recentShow: any = false;

  ngOnInit(): void {
    this.activate.queryParams.subscribe((res: any) => {
      this.otpForm.patchValue({
        mobilenumber: res['mobile'],
      });
    });
    this.startTimer();
  }
  // newPAss'
  errmsg: any;
  verifyOtp() {
    this.issubmit = true;
    let otp: any = this.otpForm.get('otp')?.value;
    if (this.otpForm.get('otp')?.valid) {
      this.candidateservice.sendOTp(this.otpForm.value).subscribe(
        (res: any) => {
          this.issubmit = false;
          this.router.navigate(['/newPAss'], { queryParams: { id: res.id } });
        },
        (err: any) => {
          console.log(err.error);
          this.issubmit = true;
          this.errmsg = err.error.message;
        }
      );
    }
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime === 0) {
        this.clearTimer();
        // Timer expired, perform necessary actions

        this.recentShow = true;
      }
    }, 1000); // Update every second (1000 milliseconds)
  }

  clearTimer() {
    clearInterval(this.intervalId);
  }

  resendOTP() {
    let data = { mobilenumber: this.Cookie.get('mobilenumber') };
    console.log(data);
    this.candidateservice.sendmodile(data).subscribe((e: any) => {
      {
        this.recentShow = false;
        this.remainingTime = 60;
        this.startTimer();
        this.issubmit = false
        this.errmsg = ""
      }
    });
  }
}
