import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CanditService } from 'src/app/candit.service';
import { CanditateService } from '../canditate.service';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-can-login',
  templateUrl: './can-login.component.html',
  styleUrls: ['./can-login.component.css'],
})
export class CanLoginComponent implements OnInit {
  isSubmmitted = false;
  login: any = this.fb.group({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', Validators.required),
  });
  id: any;
  constructor(
    private fb: FormBuilder,
    private con_Service: CanditateService,
    private router: Router,
    private CanditService: CanditService,
    private activate: ActivatedRoute
  ) {}
  ngOnInit() {
    this.LoginCheck()
    this.activate.queryParams.subscribe((res: any) => {
      this.id = res.id;
    });
  }

LoginCheck(){
  if(Cookie.get('candtokens'))
  this.router.navigateByUrl('/canJobs')
}


  // login api
  passwordStatus = false;
  serverErr: any = null;
  login_now() {
    this.isSubmmitted = true;
    if (this.login.valid) {
      this.con_Service.loginForm(this.login.value).subscribe(
        (res: any) => {
          this.setCookie(res.tokens.refresh.token);
          localStorage.setItem('name', res.user.name);
          this.CanditService.set_current_token(res.tokens.refresh.token);
          this.CanditService.get_usename(res.user.name);
          this.serverErr = null
          if (!this.id) {
            if (res.Boolean == false) {
              this.router.navigate(['/updateProfile']);
            } else {
              this.router.navigate(['/canJobs']);
            }
          } else {
            this.router.navigate(['mail-details'], {
              queryParams: { id: this.id },
            });
          }
        },
        (error) => {
         this.serverErr = error.error.message
        }
      );
    }
  }
  forgotRoute() {
    this.router.navigateByUrl('/forgotpassword');
  }
  setCookie(token: any) {
    let d: Date = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
    let expires: string = `expires=${d.toUTCString()}`;
    document.cookie = `candtokens=${token}; ${expires}`;
  }
}
