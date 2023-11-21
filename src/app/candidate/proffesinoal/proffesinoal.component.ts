import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CanditateService } from '../canditate.service';

@Component({
  selector: 'app-proffesinoal',
  templateUrl: './proffesinoal.component.html',
  styleUrls: ['./proffesinoal.component.css'],
})
export class ProffesinoalComponent implements OnInit {
  constructor(private api: CanditateService) {}

  ngOnInit(): void {
    this.years();
    this.candidateDetails();
  }

  years() {
    for (let i = 1; i <= 50; i++) {
      this.yearsArray.push(i);
    }
  }

  yearsArray: number[] = [];

  monthsArray: number[] = [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  employment: any = null;
  employmentChange(e: any) {
    this.employment = e.target.value;
    console.log(this.employment);
  }
  professionalForms = new FormGroup({
    current_employment: new FormControl('', Validators.required),
    Employment_type: new FormControl('', Validators.required),
    ExperienceYear: new FormControl('', Validators.required),
    ExperienceMonth: new FormControl('', Validators.required),
    Company_Name: new FormControl('', Validators.required),
    Designation: new FormControl('', Validators.required),
    Current_Salary: new FormControl('', Validators.required),
    Skill_Used: new FormControl([], Validators.required),
    Notice_Period: new FormControl('', Validators.required),
  });

  submitted = false;
  submit() {
    this.submitted = true;
    if (this.employment == 'No') {
      this.professionalForms.get('Notice_Period')?.setErrors(null);
    }
    if (this.professionalForms.valid) {
      console.log(this.professionalForms.value);
    }
  }

  skilldata: any = [];
  getSkill(eve: any) {
    let keys = eve.target.value;
    this.api.getSkill(keys).subscribe((e: any) => {
      console.log(e);
      this.skilldata = e;
    });
  }

  isShow = false;
  prferedSkill: any = [];

  popup1: any = false;
  popupCLose2() {
    this.popup1 = false;
  }
  select_skils(item: any) {
    console.log(item);
    let arr: any = this.professionalForms.get('Skill_Used')?.value;
    arr?.push(item.Skill_Title);
    this.professionalForms.get('Skill_Used')?.setValue(arr);
    this.skils.reset();
    console.log(this.professionalForms.value);
    this.skilldata = [];
  }
  skils: any = new FormControl();
  alreadyEXP: any = false;
  showEntryField: any = false;
  profData: any = [];
  candidateDetails() {
    this.api.getCandidateById().subscribe((e: any) => {
      console.log(e);
      this.alreadyEXP = e.exper;
      this.profData = e.professionalDetails;
      if (e.professionalDetails.length > 0) {
        this.showEntryField = true;
      }
    });
  }

  addProf() {
    this.popup1 = true;
  }
}
