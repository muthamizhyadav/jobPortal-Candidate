import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CanditateService } from '../canditate.service';

@Component({
  selector: 'app-candidatechangepassword',
  templateUrl: './candidatechangepassword.component.html',
  styleUrls: ['./candidatechangepassword.component.css'],
})
export class CandidatechangepasswordComponent implements OnInit {
  changePassform: any = this.fb.group({
    oldpassword: new FormControl('', Validators.required),
    newpassword: new FormControl('', Validators.required),
    confirmpassword: new FormControl('', Validators.required),
  });
  constructor(
    private candidateService: CanditateService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {}

  submitted: any = false;
  serverErr: any = null;
  onSubmitted() {
    this.submitted = true;
    if (this.submitted && this.changePassform.valid) {
      this.candidateService.changePassword(this.changePassform.value).subscribe(
        (res: any) => {
          this.router.navigate(['/canJobs']);
          this.submitted = false;
        },
        (err: any) => {
          this.serverErr = err.error.message
        }
      );
    }
  }
}
