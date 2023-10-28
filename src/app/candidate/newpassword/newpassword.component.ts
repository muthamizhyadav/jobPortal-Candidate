import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanditateService } from '../canditate.service';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css'],
})
export class NewpasswordComponent implements OnInit {
  forgotPassword: any = this.fb.group({
    password: new FormControl('', Validators.required),
    confirmpassword: new FormControl('', Validators.required),
  });
  mobile: any;
  constructor(
    private activate: ActivatedRoute,
    private fb: FormBuilder,
    private candidateService: CanditateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activate.queryParams.subscribe((params: Params) => {
      this.mobile = params['id'];
    });
  }
  submitted: any = false;
  conPwd: any = null;
  changepassword() {
    this.submitted = true;
    if (this.submitted && this.forgotPassword.valid) {
      if (
        this.forgotPassword.get('password').value ===
        this.forgotPassword.get('confirmpassword').value
      ) {
        this.candidateService
          .forgotPassword(this.mobile, this.forgotPassword.value)
          .subscribe((res: any) => {
            this.submitted = false;
            this.conPwd = null
            this.router.navigate(['/canlogin']);
          });
      } else {
        this.conPwd = 'Confirm Password Is Mismatch';
      }
    }
  }
}
