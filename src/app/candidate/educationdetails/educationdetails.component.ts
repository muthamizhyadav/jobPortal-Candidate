import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CanditateService } from '../canditate.service';

@Component({
  selector: 'app-educationdetails',
  templateUrl: './educationdetails.component.html',
  styleUrls: ['./educationdetails.component.css'],
})
export class EducationdetailsComponent implements OnInit {
  currentYear = new Date().getFullYear();
  yearsArray: number[] = Array.from(
    { length: this.currentYear - 1939 },
    (_, index) => 1940 + index
  ).reverse();

  schoolMediums = [
    'English',
    'Hindi',
    'Tamil',
    'Bengali',
    'Sanskrit',
    'Urdu',
    'Kannada',
    'Telugu',
    'Malayalam',
    'Marathi',
    'Gujarati',
    'Punjabi',
    'Oriya',
    'Other',
  ];

  qualification: any = [];
  educationForm: any = this.fb.group({
    educationArray: this.fb.array([], [Validators.required]),
  });
  drCourse: any = [];
  drsep: any = [];
  pgCourse: any = [];
  pgSpe: any = [];
  ugcourse: any = [];
  ugSpe: any = [];
  hscCourse: any = [];
  sslcspe: any = [];
  userID: any;
  private _fb: any;
  course: any;
  isSubmitted = false;
  lang: any;
  msgquery: any = null;
  constructor(
    private fb: FormBuilder,
    private candidate: CanditateService,
    private activate: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllDetails();
    this.activate.queryParams.subscribe((e: any) => {
      this.msgquery = e.msg;
    });
    this.candidate.getQualification().subscribe((res: any) => {
      this.qualification = res;
      console.log(this.qualification, 'Qualification');
    });
    this.activate.queryParams.subscribe((res: any) => {
      this.userID = res.id;
      console.log(this.userID, 'sdsdsd');
      if (this.userID == null) {
        // this.addPhase();
      }
    });
    console.log(this.educationForm.get('educationArray').controls[0].status);
    this.candidate.getLanguages().subscribe((res: any) => {
      this.lang = res;
    });
  }
  q: any;

  educationFormAll = new FormGroup({
    Qualification: new FormControl('', Validators.required),
    QualificationName: new FormControl(''),
    Course: new FormControl('', Validators.required),
    CourseName: new FormControl(''),
    Specialization: new FormControl('', Validators.required),
    SpecializationName: new FormControl(''),
    CourseType: new FormControl('', Validators.required),
    CourseDurationFrom: new FormControl('', Validators.required),
    CourseDurationTo: new FormControl('', Validators.required),
    GradingSystem: new FormControl('', Validators.required),
    University: new FormControl('', Validators.required),
    Marks: new FormControl('', Validators.required),
    Board: new FormControl('', Validators.required),
    PassedYear: new FormControl('', Validators.required),
    Medium: new FormControl('', Validators.required),
    totalmarks: new FormControl('', Validators.required),
    institutionName: new FormControl('', Validators.required),
  });

  Qlf: any = null;
  courses: any = [];
  spec: any = [];

  selectedQly: any = null;
  QualificationChange(i: any) {
    let val = this.qualification[i.target.value];
    this.Qlf = this.qualification[i.target.value].qualification;
    console.log(this.Qlf);
    let id = this.qualification[i.target.value]._id;
    this.candidate.getCoursesByQualification(id).subscribe((e: any) => {
      this.courses = e;
    });
    this.educationFormAll.get('Qualification')?.setValue(id);
    this.educationFormAll.get('QualificationName')?.setValue(this.Qlf);

    if (this.Qlf == 'SSLC' || this.Qlf == 'HSC') {
      this.educationFormAll.get('Course')?.setErrors(null);
      this.educationFormAll.get('Specialization')?.setErrors(null);
      this.educationFormAll.get('CourseType')?.setErrors(null);
      this.educationFormAll.get('CourseDurationFrom')?.setErrors(null);
      this.educationFormAll.get('CourseDurationTo')?.setErrors(null);
      this.educationFormAll.get('GradingSystem')?.setErrors(null);
      this.educationFormAll.get('University')?.setErrors(null);
      this.educationFormAll.get('Marks')?.setErrors(null);
      this.educationFormAll.get('institutionName')?.setErrors(null);
    } else {
      this.educationFormAll.get('totalmarks')?.setErrors(null);
      this.educationFormAll.get('Medium')?.setErrors(null);
      this.educationFormAll.get('PassedYear')?.setErrors(null);
      this.educationFormAll.get('Board')?.setErrors(null);
    }
  }

  courseChange(i: any) {
    let val = this.courses[i.target.value].Course;
    let id = this.courses[i.target.value]._id;
    this.educationFormAll.get('Course')?.setValue(id);
    this.educationFormAll.get('CourseName')?.setValue(val);
    this.candidate.getSpecByQualification(id).subscribe((e: any) => {
      this.spec = e;
    });
  }

  SpecChange(i: any) {
    let val = this.spec[i.target.value].Specialization;
    let id = this.spec[i.target.value]._id;
    console.log(val);
    this.educationFormAll.get('Specialization')?.setValue(id);
    this.educationFormAll.get('SpecializationName')?.setValue(val);
  }

  dataToSubmit: any = {};
  qualify(type: any) {
    if (type == 'Masters/Post-Graduation') {
      this.dataToSubmit = {
        pgQualification: this.educationFormAll.get('Qualification')?.value,
        pgCourse: this.educationFormAll.get('Course')?.value,
        pgSpecialization: this.educationFormAll.get('Specialization')?.value,
        pgCourseType: this.educationFormAll.get('CourseType')?.value,
        pgCourseDurationFrom:
          this.educationFormAll.get('CourseDurationFrom')?.value,
        pgCourseDurationTo:
          this.educationFormAll.get('CourseDurationTo')?.value,
        pgGradingSystem: this.educationFormAll.get('GradingSystem')?.value,
        pgMarks: this.educationFormAll.get('Marks')?.value,
        pgUniversity: this.educationFormAll.get('University')?.value,
        Type: type,
        QualificationName:
          this.educationFormAll.get('QualificationName')?.value,
        SpecializationName:
          this.educationFormAll.get('SpecializationName')?.value,
        CourseName: this.educationFormAll.get('CourseName')?.value,
        institutionNamePg: this.educationFormAll.get('institutionName')?.value,
        sert: 4,
      };
    }

    if (type == 'Doctorate/phD') {
      this.dataToSubmit = {
        drQualification: this.educationFormAll.get('Qualification')?.value,
        drCourse: this.educationFormAll.get('Course')?.value,
        drSpecialization: this.educationFormAll.get('Specialization')?.value,
        drCourseType: this.educationFormAll.get('CourseType')?.value,
        drCourseDurationFrom:
          this.educationFormAll.get('CourseDurationFrom')?.value,
        drCourseDurationTo:
          this.educationFormAll.get('CourseDurationTo')?.value,
        drGradingSystem: this.educationFormAll.get('GradingSystem')?.value,
        drMarks: this.educationFormAll.get('Marks')?.value,
        drUniversity: this.educationFormAll.get('University')?.value,
        Type: type,
        QualificationName:
          this.educationFormAll.get('QualificationName')?.value,
        SpecializationName:
          this.educationFormAll.get('SpecializationName')?.value,
        CourseName: this.educationFormAll.get('CourseName')?.value,
        institutionNameDr: this.educationFormAll.get('institutionName')?.value,
        sert: 5,
      };
    }

    if (type == 'Graduation/Diploma') {
      this.dataToSubmit = {
        ugQualification: this.educationFormAll.get('Qualification')?.value,
        ugCourse: this.educationFormAll.get('Course')?.value,
        ugSpecialization: this.educationFormAll.get('Specialization')?.value,
        ugCourseType: this.educationFormAll.get('CourseType')?.value,
        ugCourseDurationFrom:
          this.educationFormAll.get('CourseDurationFrom')?.value,
        ugCourseDurationTo:
          this.educationFormAll.get('CourseDurationTo')?.value,
        ugGradingSystem: this.educationFormAll.get('GradingSystem')?.value,
        ugMarks: this.educationFormAll.get('Marks')?.value,
        ugUniversity: this.educationFormAll.get('University')?.value,
        Type: type,
        QualificationName:
          this.educationFormAll.get('QualificationName')?.value,
        SpecializationName:
          this.educationFormAll.get('SpecializationName')?.value,
        CourseName: this.educationFormAll.get('CourseName')?.value,
        institutionNameUg: this.educationFormAll.get('institutionName')?.value,
        sert: 3,
      };
    }

    if (type == 'HSC') {
      this.dataToSubmit = {
        hsQualification: this.educationFormAll.get('Qualification')?.value,
        hsBoard: this.educationFormAll.get('Board')?.value,
        hsPassedYear: this.educationFormAll.get('PassedYear')?.value,
        hsMedium: this.educationFormAll.get('Medium')?.value,
        hstotalmarks: this.educationFormAll.get('totalmarks')?.value,
        Type: type,
        sert: 2,
      };
    }

    if (type == 'SSLC') {
      this.dataToSubmit = {
        sslcQualification: this.educationFormAll.get('Qualification')?.value,
        sslcBoard: this.educationFormAll.get('Board')?.value,
        sslcPassedYear: this.educationFormAll.get('PassedYear')?.value,
        sslcMedium: this.educationFormAll.get('Medium')?.value,
        sslctotalmarks: this.educationFormAll.get('totalmarks')?.value,
        Type: type,
        sert: 1,
      };
    }
  }

  submit() {
    console.log(this.educationFormAll.value);
    this.isSubmitted = true;
    if (this.isSubmitted && this.educationFormAll.valid) {
      this.qualify(this.educationFormAll.get('QualificationName')?.value);
      this.candidate.eduction(this.dataToSubmit).subscribe((res: any) => {
        this.educationFormAll.reset();
        this.dataToSubmit = {};
        this.isSubmitted = false;
        this.popupCLose();
        this.getAllDetails();
      });
    }
  }

  next() {
    this.router.navigate(['/can-proffesinal'], {
      queryParams: { id: this.userID },
    });
  }

  addAllcontrol: any = [];
  data: any = [];

  candDettails: any = [];
  getAllDetails() {
    this.candidate.viewDetails().subscribe((e: any) => {
      this.candDettails = e.user ? e.user[0].eduDetails : [];
      this.candDettails.sort((a:any,b:any)=>a.sert - b.sert)
      console.log(this.candDettails, 'userDetails');
    });
  }

  dropdown_disable(val: any) {
    if (
      this.qualification.find(
        (res: any) => res.qualification == val.get('Education')?.value
      )
    ) {
      console.log('working');
      return false;
    } else {
      console.log('working');
      return false;
    }
  }

  popup: any = false;
  popupCLose() {
    this.popup = false;
    this.educationFormAll.reset();
  }
  popupOpen() {
    this.popup = true;
  }
  popupCLose2() {
    this.popup1 = false;
  }

  popup1: any = false;
  qlfName = null;

  check(i: any) {
    console.log(i.target.value, 'adsf');
    let ind = i.target.value;
    console.log(i.target.value, 'check');
    // console.log("ELSE")
    let gg = Number(i.target.value);
    // console.log(i.target.value,"check",gg)
    this.Qlf = this.qualification[gg].qualification;
    console.log(this.Qlf, 'QLF');
    let id = this.qualification[gg]._id;
    this.educationFormAll.reset();

    this.educationFormAll.get('QualificationName')?.setValue(String(gg));
    this.educationFormAll.get('Qualification')?.setValue(id);
    this.candidate.getCoursesByQualification(id).subscribe((e: any) => {
      this.courses = e;
    });
  }

  QualificationChangeEdit(i: any) {
    // console.log(typeof i, typeof i == 'number');
    console.log(this.qualification, 'QLF');
    this.educationFormAll.reset();
    let id;
    if (typeof i === 'number') {
      console.log('IF');
      let val = i;
      this.Qlf = this.qualification[val].qualification;
      id = this.qualification[val]._id;
      this.educationFormAll.get('QualificationName')?.setValue(String(val));
    } else {
      console.log(i.target.value, 'check');
      // console.log("ELSE")
      let gg = Number(i.target.value);
      // console.log(i.target.value,"check",gg)
      // this.Qlf = this.qualification[gg].qualification;
      // id = this.qualification[gg]._id;
      this.educationFormAll.get('QualificationName')?.setValue(String(gg));
    }

    this.candidate.getCoursesByQualification(id).subscribe((e: any) => {
      this.courses = e;
    });

    this.educationFormAll.get('Qualification')?.setValue(id);
    this.qlfName = this.Qlf;

    if (this.Qlf == 'SSLC' || this.Qlf == 'HSC') {
      this.educationFormAll.get('Course')?.setErrors(null);
      this.educationFormAll.get('Specialization')?.setErrors(null);
      this.educationFormAll.get('CourseType')?.setErrors(null);
      this.educationFormAll.get('CourseDurationFrom')?.setErrors(null);
      this.educationFormAll.get('CourseDurationTo')?.setErrors(null);
      this.educationFormAll.get('GradingSystem')?.setErrors(null);
      this.educationFormAll.get('University')?.setErrors(null);
      this.educationFormAll.get('Marks')?.setErrors(null);
      this.educationFormAll.get('institutionName')?.setErrors(null);
    } else {
      this.educationFormAll.get('totalmarks')?.setErrors(null);
      this.educationFormAll.get('Medium')?.setErrors(null);
      this.educationFormAll.get('PassedYear')?.setErrors(null);
      this.educationFormAll.get('Board')?.setErrors(null);
    }
  }

  courseChangeEdit(i: any) {
    let ind = parseInt(i.target.value);
    let id = this.courses[ind]._id;
    let val = this.courses[ind].Course;
    console.log(val, 'Course change edit');
    this.educationFormAll.get('Course')?.setValue(id);
    this.educationFormAll.get('CourseName')?.setValue(i.target.value);
    this.candidate.getSpecByQualification(id).subscribe((e: any) => {
      this.spec = e;
    });
  }

  SpecChangeEdit(i: any) {
    let ind = parseInt(i.target.value);
    let id = this.spec[ind]._id;
    console.log(this.courses);
    let val = this.spec[ind].Specialization;
    console.log(val);
    this.educationFormAll.get('Specialization')?.setValue(id);
    this.educationFormAll.get('SpecializationName')?.setValue(i.target.value);
  }

  courseind: any;
  specind: any;
  backendindex: any;
  Edite(e: any, i: any) {
    this.backendindex = i;
    console.log(e, 'lll');

    if (e.Type != 'SSLC' && e.Type != 'HSC') {
      let ind = this.qualification.findIndex((a: any) => {
        return a.qualification === e.QualificationName;
      });
      console.log(this.qualification);
      this.QualificationChangeEdit(ind);
      let id = this.qualification[ind]._id;
      this.candidate.getCoursesByQualification(id).subscribe((res: any) => {
        this.courses = res;
        console.log(this.courses, 'QQQQ');
        this.courseind = this.courses.findIndex((c: any) => {
          return c.Course == e.CourseName;
        });
        let qid = this.courses[this.courseind];
        this.candidate
          .getSpecByQualification(qid._id)
          .subscribe((res2: any) => {
            this.spec = res2;
            this.popup1 = true;
            this.specind = this.spec.findIndex((spec: any) => {
              return spec.Specialization == e.SpecializationName;
            });
            if (e.Type == 'Doctorate/phD') {
              this.educationFormAll.patchValue({
                Qualification: e.drQualification,
                QualificationName: ind,
                Course: this.courseind,
                CourseName: this.courseind,
                Specialization: e.drSpecialization,
                SpecializationName: this.specind,
                CourseType: e.drCourseType,
                CourseDurationFrom: e.drCourseDurationFrom,
                CourseDurationTo: e.drCourseDurationTo,
                GradingSystem: e.drGradingSystem,
                University: e.drUniversity,
                Marks: e.drMarks,
                institutionName: e.institutionNameDr,
              });
            }

            if (e.Type == 'Masters/Post-Graduation') {
              this.educationFormAll.patchValue({
                Qualification: e.pgQualification,
                QualificationName: ind,
                Course: this.courseind,
                CourseName: this.courseind,
                Specialization: e.pgSpecialization,
                SpecializationName: this.specind,
                CourseType: e.pgCourseType,
                CourseDurationFrom: e.pgCourseDurationFrom,
                CourseDurationTo: e.pgCourseDurationTo,
                GradingSystem: e.pgGradingSystem,
                University: e.pgUniversity,
                Marks: e.pgMarks,
                institutionName: e.institutionNamePg,
              });
            }

            if (e.Type == 'Graduation/Diploma') {
              this.educationFormAll.patchValue({
                Qualification: e.ugQualification,
                QualificationName: ind,
                Course: this.courseind,
                CourseName: this.courseind,
                Specialization: e.ugSpecialization,
                SpecializationName: this.specind,
                CourseType: e.ugCourseType,
                CourseDurationFrom: e.ugCourseDurationFrom,
                CourseDurationTo: e.ugCourseDurationTo,
                GradingSystem: e.ugGradingSystem,
                University: e.ugUniversity,
                Marks: e.ugMarks,
                institutionName: e.institutionNameUg,
              });
            }
          });
      });
    } else {
      this.popup1 = true;
      if (e.Type == 'SSLC') {
        let ind = this.qualification.findIndex((a: any) => {
          return a._id === e.sslcQualification;
        });
        this.Qlf = 'SSLC';
        this.educationFormAll.patchValue({
          QualificationName: ind,
          Board: e.sslcBoard,
          PassedYear: e.sslcPassedYear,
          Medium: e.sslcMedium,
          totalmarks: e.sslctotalmarks,
        });
      }
      if (e.Type == 'HSC') {
        let ind = this.qualification.findIndex((a: any) => {
          return a._id === e.hsQualification;
        });
        this.Qlf = 'HSC';
        this.educationFormAll.patchValue({
          QualificationName: ind,
          Board: e.hsBoard,
          PassedYear: e.hsPassedYear,
          Medium: e.hsMedium,
          totalmarks: e.hstotalmarks,
        });
      }
    }
  }

  editSubmit() {
    this.isSubmitted = true;
    if (this.Qlf == 'SSLC' || this.Qlf == 'HSC') {
      this.educationFormAll.get('Course')?.setErrors(null);
      this.educationFormAll.get('Specialization')?.setErrors(null);
      this.educationFormAll.get('CourseType')?.setErrors(null);
      this.educationFormAll.get('CourseDurationFrom')?.setErrors(null);
      this.educationFormAll.get('CourseDurationTo')?.setErrors(null);
      this.educationFormAll.get('GradingSystem')?.setErrors(null);
      this.educationFormAll.get('University')?.setErrors(null);
      this.educationFormAll.get('Marks')?.setErrors(null);
      this.educationFormAll.get('institutionName')?.setErrors(null);
    } else {
      this.educationFormAll.get('totalmarks')?.setErrors(null);
      this.educationFormAll.get('Medium')?.setErrors(null);
      this.educationFormAll.get('PassedYear')?.setErrors(null);
      this.educationFormAll.get('Board')?.setErrors(null);
    }
    if (this.Qlf != 'SSLC' && this.Qlf != 'HSC') {
      let courind: any = this.educationFormAll.get('Course')?.value;
      let qlfId: any = this.educationFormAll.get('QualificationName')?.value;
      let specId: any = this.educationFormAll.get('SpecializationName')?.value;

      let course = courind;
      let ind = this.courses.findIndex((e: any) => {
        return e._id == course;
      });
      ind = ind == -1 ? courind : ind;
      console.log(course, 'dddd');
      let qualify = this.qualification[qlfId];
      let spec = this.spec[specId];

      if (this.Qlf == 'Masters/Post-Graduation') {
        this.dataToSubmit = {
          pgQualification: qualify._id,
          pgCourse: this.courses[ind]._id,
          pgSpecialization: spec._id,
          pgCourseType: this.educationFormAll.get('CourseType')?.value,
          pgCourseDurationFrom:
            this.educationFormAll.get('CourseDurationFrom')?.value,
          pgCourseDurationTo:
            this.educationFormAll.get('CourseDurationTo')?.value,
          pgGradingSystem: this.educationFormAll.get('GradingSystem')?.value,
          pgMarks: this.educationFormAll.get('Marks')?.value,
          pgUniversity: this.educationFormAll.get('University')?.value,
          Type: this.Qlf,
          QualificationName: this.Qlf,
          SpecializationName: spec.Specialization,
          CourseName: this.courses[ind].Course,
          indexDel: this.backendindex,
          sert: 4,
          institutionNamePg:
            this.educationFormAll.get('institutionName')?.value,
        };
      }

      if (this.Qlf == 'Graduation/Diploma') {
        this.dataToSubmit = {
          ugQualification: qualify._id,
          ugCourse: this.courses[ind]._id,
          ugSpecialization: spec._id,
          ugCourseType: this.educationFormAll.get('CourseType')?.value,
          ugCourseDurationFrom:
            this.educationFormAll.get('CourseDurationFrom')?.value,
          ugCourseDurationTo:
            this.educationFormAll.get('CourseDurationTo')?.value,
          ugGradingSystem: this.educationFormAll.get('GradingSystem')?.value,
          ugMarks: this.educationFormAll.get('Marks')?.value,
          ugUniversity: this.educationFormAll.get('University')?.value,
          Type: this.Qlf,
          QualificationName: this.Qlf,
          SpecializationName: spec.Specialization,
          CourseName: this.courses[ind].Course,
          indexDel: this.backendindex,
          sert: 3,
          institutionNameUg:
            this.educationFormAll.get('institutionName')?.value,
        };
        console.log(this.dataToSubmit, 'Under Graduate');
      }

      if (this.Qlf == 'Doctorate/phD') {
        this.dataToSubmit = {
          drQualification: qualify._id,
          drCourse: this.courses[ind]._id,
          drSpecialization: spec._id,
          drCourseType: this.educationFormAll.get('CourseType')?.value,
          drCourseDurationFrom:
            this.educationFormAll.get('CourseDurationFrom')?.value,
          drCourseDurationTo:
            this.educationFormAll.get('CourseDurationTo')?.value,
          drGradingSystem: this.educationFormAll.get('GradingSystem')?.value,
          drMarks: this.educationFormAll.get('Marks')?.value,
          drUniversity: this.educationFormAll.get('University')?.value,
          Type: this.Qlf,
          QualificationName: this.Qlf,
          SpecializationName: spec.Specialization,
          CourseName: this.courses[ind].Course,
          indexDel: this.backendindex,
          sert: 5,
          institutionNameDr:
            this.educationFormAll.get('institutionName')?.value,
        };
      }
    } else {
      if (this.Qlf == 'SSLC') {
        let qlfId: any = this.educationFormAll.get('QualificationName')?.value;
        let qualify = this.qualification[qlfId];
        this.dataToSubmit = {
          sslcQualification: qualify._id,
          sslcBoard: this.educationFormAll.get('Board')?.value,
          sslcPassedYear: this.educationFormAll.get('PassedYear')?.value,
          sslcMedium: this.educationFormAll.get('Medium')?.value,
          sslctotalmarks: this.educationFormAll.get('totalmarks')?.value,
          Type: this.Qlf,
          indexDel: this.backendindex,
          sert: 1,
        };
      }
      if (this.Qlf == 'HSC') {
        let qlfId: any = this.educationFormAll.get('QualificationName')?.value;
        let qualify = this.qualification[qlfId];
        this.dataToSubmit = {
          hsQualification: qualify._id,
          hsBoard: this.educationFormAll.get('Board')?.value,
          hsPassedYear: this.educationFormAll.get('PassedYear')?.value,
          hsMedium: this.educationFormAll.get('Medium')?.value,
          hstotalmarks: this.educationFormAll.get('totalmarks')?.value,
          Type: this.Qlf,
          indexDel: this.backendindex,
          sert: 2,
        };
      }
    }

    if (this.educationFormAll.valid) {
      console.log(this.dataToSubmit, this.backendindex);
      let data = { ...this.dataToSubmit, ...{ edit: true } };
      this.candidate.eduction(data).subscribe((res: any) => {
        this.dataToSubmit = {};
        this.isSubmitted = false;
        this.getAllDetails();
        this.popupCLose2();
      });
    }
  }
}
