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
    // this.Qualification.controls.forEach((res: any) => {
    // this.getAlldata();
    // if (!this.data) {
    //   this.addPhase();
    // }
    // })
    console.log(this.educationForm.get('educationArray').controls[0].status);
    this.candidate.getLanguages().subscribe((res: any) => {
      this.lang = res;
    });
  }
  q: any;
  /**
  qualifiacation(val: any, index: any, phase: any) {
    let allcontrols = [
      'drQualification',
      'drSpecialization',
      'drCourseType',
      'drCourse',
      'drCourseDurationFrom',
      'drCourseDurationTo',
      'drGradingSystem',
      'drMarks',
      'drUniversity',
      'pgQualification',
      'pgCourse',
      'pgSpecialization',
      'pgCourseType',
      'pgCourseDurationFrom',
      'pgCourseDurationTo',
      'pgGradingSystem',
      'pgMarks',
      'pgUniversity',
      'ugQualification',
      'ugSpecialization',
      'ugCourse',
      'ugCourseType',
      'ugCourseDurationFrom',
      'ugCourseDurationTo',
      'ugGradingSystem',
      'ugUniversity',
      'ugMarks',
      'hsBoard',
      'hsQualification',
      'hsPassedYear',
      'hsMedium',
      'hstotalmarks',
      'sslcQualification',
      'sslcBoard',
      'sslcPassedYear',
      'sslcMedium',
      'sslctotalmarks',
    ];
    let ss: any = {
      'Doctorate/phD': [
        'drQualification',
        'drSpecialization',
        'drCourseType',
        'drCourse',
        'drCourseDurationFrom',
        'drCourseDurationTo',
        'drGradingSystem',
        'drMarks',
        'drUniversity',
      ],
      'Masters/Post-Graduation': [
        'pgQualification',
        'pgCourse',
        'pgSpecialization',
        'pgCourseType',
        'pgCourseDurationFrom',
        'pgCourseDurationTo',
        'pgGradingSystem',
        'pgMarks',
        'pgUniversity',
      ],
      'Graduation/Diploma': [
        'ugCourse',
        'ugQualification',
        'ugSpecialization',
        'ugCourseType',
        'ugCourseDurationFrom',
        'ugCourseDurationTo',
        'ugGradingSystem',
        'ugMarks',
        'ugUniversity',
      ],
      HSC: [
        'hsBoard',
        'hsQualification',
        'hsPassedYear',
        'hsMedium',
        'hstotalmarks',
      ],
      SSLC: [
        'sslcQualification',
        'sslcBoard',
        'sslcPassedYear',
        'sslcMedium',
        'sslctotalmarks',
      ],
    };
    let value = val.target.value;
    console.log(val.target.value, 'target');
    allcontrols.forEach((a: any) => {
      <FormArray>phase.removeControl(a);
    });
    ss[value].forEach((a: any) => {
      <FormArray>phase.addControl(a, new FormControl('', Validators.required));
    });
    phase.get('Education')?.setValue(value);
    let q = this.qualification.find(
      (data: any) => data.qualification == val.target.value
    );
    console.log(phase.get('Education')?.setValue(value), 'ssss');
    // dr
    if (val.target.value == 'Doctorate/phD') {
      phase.get('drQualification')?.setValue(q._id);
      phase.get('drQualificationval')?.setValue(val.target.value);
      this.candidate.getdoctorate(q._id).subscribe((res: any) => {
        this.drCourse = res;
      });
    }
    // pg
    if (val.target.value == 'Masters/Post-Graduation') {
      phase.get('pgQualification')?.setValue(q._id);
      // phase.get('pgQualificationval')?.setValue(val.target.value);
      this.candidate.getPgcourses(q._id).subscribe((res: any) => {
        this.pgCourse = res;
      });
    }
    // ug
    if (val.target.value == 'Graduation/Diploma') {
      phase.get('ugQualification')?.setValue(q._id);
      phase.get('ugQualificationval')?.setValue(val.target.value);
      this.candidate.grtUgcou(q._id).subscribe((res: any) => {
        this.ugcourse = res;
      });
    }
    // hsc
    if (val.target.value == 'HSC') {
      phase.get('hsQualification')?.setValue(q._id);
      this.candidate.hsccourse(q._id).subscribe((res: any) => {
        this.hscCourse = res;
      });
    }
    // sslc
    if (val.target.value == 'SSLC') {
      phase.get('sslcQualification')?.setValue(q._id);
      this.candidate.sslcSpecial(q._id).subscribe((res: any) => {
        this.sslcspe = res;
      });
    }
  }
   */

  // qualifiacation(e: any, i: any, phase: any) {
  //   let inde = parseInt(e.target.value);
  //   let val = this.qualification[inde].qualification;
  //   let id = this.qualification[inde]._id;

  //   if (val == 'Doctorate/phD') {
  //     phase.get('drQualification')?.setValue(id);
  //     phase.get('drQualificationval')?.setValue(val);
  //     this.candidate.getdoctorate(id).subscribe((res: any) => {
  //       this.drCourse = res;
  //       this.course = res;
  //     });
  //   }

  //   if (val == 'Masters/Post-Graduation') {
  //     phase.get('pgQualification')?.setValue(id);
  //     phase.get('pgQualificationval')?.setValue(val);
  //     this.candidate.getPgcourses(id).subscribe((res: any) => {
  //       this.pgCourse = res;
  //       this.course = res;
  //     });
  //   }

  //   if (val == 'Graduation/Diploma') {
  //     phase.get('ugQualification')?.setValue(id);
  //     phase.get('ugQualificationval')?.setValue(val);
  //     this.candidate.grtUgcou(id).subscribe((res: any) => {
  //       this.ugcourse = res;
  //       this.course = res;
  //     });
  //   }

  //   if (val == 'HSC') {
  //     phase.get('hsQualification')?.setValue(id);
  //     this.candidate.hsccourse(id).subscribe((res: any) => {
  //       this.hscCourse = res;
  //       this.course = res;
  //     });
  //   }

  //   if (val == 'SSLC') {
  //     phase.get('sslcQualification')?.setValue(id);
  //     this.candidate.sslcSpecial(id).subscribe((res: any) => {
  //       this.sslcspe = res;
  //       this.course = res;
  //     });
  //   }
  // }

  // specialization(val: any, qali: any) {
  //   console.log(qali.value);
  //   if (qali.get('Education')?.value == 'Masters/Post-Graduation') {
  //     this.candidate
  //       .getPgSpecial(val.target.value._id)
  //       .subscribe((res: any) => {
  //         this.pgSpe = res;
  //         qali.get('pgCourse')?.setValue(val.target.value);
  //       });
  //   }
  //   if (qali.get('Education')?.value == 'Graduation/Diploma') {
  //     console.log('wokin');
  //     this.candidate.ugSepcial(val.target.value).subscribe((res: any) => {
  //       this.ugSpe = res;
  //       qali.get('ugCourse')?.setValue(val.target.value);
  //     });
  //   }

  //   if (qali.get('Education')?.value == 'Doctorate/phD') {
  //     this.candidate.getDrSped(val.target.value).subscribe((res: any) => {
  //       this.drsep = res;
  //       qali.get('drCourse')?.setValue(val.target.value);
  //     });
  //   }
  // }

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

  // hasPhaseValue1At(index: any) {
  //   console.log(
  //     (<FormGroup>this.Qualification.at(index)).get('drCourse') ? true : false,
  //     'dhsdhsdbh'
  //   );
  //   return (<FormGroup>this.Qualification.at(index)).get('drCourse')
  //     ? true
  //     : false;
  // }
  // get Qualification() {
  //   return this.educationForm.controls['educationArray'] as FormArray;
  // }

  // addPhase() {
  //   this.msgquery = null;
  //   let conrols = this.fb.group({
  //     Education: new FormControl('', [Validators.required]),
  //   });
  //   this.Qualification.push(conrols);
  // }

  // addQualification() {
  //   this.addPhase();
  // }

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
      };
    }
  }

  // this.router.navigate(['/can-proffesinal'], {
  //   queryParams: { id: this.userID },
  // });

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
      this.candDettails = e.user ? e.user[0].candidateDetails.eduDetails : [];
      console.log(this.candDettails, 'userDetails');
    });
  }

  // getAlldata() {
  //   this.candidate.viewDetails().subscribe((res: any) => {
  //     if (res.user.length != 0) {
  //       let value = res.user[0];
  //       this.data = res;
  //       if (value.drQualification == 'Doctorate/phD') {
  //         this.candidate
  //           .getdoctorate(value.candidateDetails.drQualification)
  //           .subscribe((res: any) => {
  //             this.drCourse = res;
  //           });
  //         this.candidate
  //           .getDrSped(value.candidateDetails.drCourse)
  //           .subscribe((res: any) => {
  //             this.drsep = res;
  //           });
  //         this.addAllcontrol = this.fb.group({
  //           Education: new FormControl(value.drQualification, [
  //             Validators.required,
  //           ]),
  //           drQualification: new FormControl(
  //             value.candidateDetails.drQualification,
  //             [Validators.required]
  //           ),
  //           drCourseDurationFrom: new FormControl(
  //             value.candidateDetails.drCourseDurationFrom,
  //             [Validators.required]
  //           ),
  //           drCourseDurationTo: new FormControl(
  //             value.candidateDetails.drCourseDurationTo,
  //             [Validators.required]
  //           ),
  //           drCourseType: new FormControl(value.candidateDetails.drCourseType, [
  //             Validators.required,
  //           ]),
  //           drGradingSystem: new FormControl(
  //             value.candidateDetails.drGradingSystem,
  //             [Validators.required]
  //           ),
  //           drMarks: new FormControl(value.candidateDetails.drMarks, [
  //             Validators.required,
  //           ]),
  //           drSpecialization: new FormControl(
  //             value.candidateDetails.drSpecialization,
  //             [Validators.required]
  //           ),
  //           drUniversity: new FormControl(value.candidateDetails.drUniversity, [
  //             Validators.required,
  //           ]),
  //           drCourse: new FormControl(value.candidateDetails.drCourse, [
  //             Validators.required,
  //           ]),
  //         });
  //       }
  //       if (value.pgQualification == 'Masters/Post-Graduation') {
  //         console.log('working');
  //         this.candidate
  //           .getPgcourses(value.candidateDetails.pgQualification)
  //           .subscribe((res: any) => {
  //             this.pgCourse = res;
  //           });
  //         this.candidate
  //           .getPgSpecial(value.candidateDetails.pgCourse)
  //           .subscribe((res: any) => {
  //             this.pgSpe = res;
  //           });

  //         this.addAllcontrol = this.fb.group({
  //           Education: new FormControl(value.pgQualification, [
  //             Validators.required,
  //           ]),
  //           pgQualification: new FormControl(
  //             value.candidateDetails.pgQualification,
  //             [Validators.required]
  //           ),
  //           pgCourseDurationFrom: new FormControl(
  //             value.candidateDetails.pgCourseDurationFrom,
  //             [Validators.required]
  //           ),
  //           pgCourseDurationTo: new FormControl(
  //             value.candidateDetails.pgCourseDurationTo,
  //             [Validators.required]
  //           ),
  //           pgCourseType: new FormControl(value.candidateDetails.pgCourseType, [
  //             Validators.required,
  //           ]),
  //           pgGradingSystem: new FormControl(
  //             value.candidateDetails.pgGradingSystem,
  //             [Validators.required]
  //           ),
  //           pgMarks: new FormControl(value.candidateDetails.pgMarks, [
  //             Validators.required,
  //           ]),
  //           pgSpecialization: new FormControl(
  //             value.candidateDetails.pgSpecialization,
  //             [Validators.required]
  //           ),
  //           pgUniversity: new FormControl(value.candidateDetails.pgUniversity, [
  //             Validators.required,
  //           ]),
  //           pgCourse: new FormControl(value.candidateDetails.pgCourse, [
  //             Validators.required,
  //           ]),
  //         });
  //       }
  //       if (value.ugQualification == 'Graduation/Diploma') {
  //         console.log('working');
  //         this.candidate
  //           .grtUgcou(value.candidateDetails.ugQualification)
  //           .subscribe((res: any) => {
  //             this.ugcourse = res;
  //           });
  //         this.candidate
  //           .ugSepcial(value.candidateDetails.ugCourse)
  //           .subscribe((res: any) => {
  //             this.ugSpe = res;
  //           });

  //         this.addAllcontrol = this.fb.group({
  //           Education: new FormControl(value.ugQualification, [
  //             Validators.required,
  //           ]),
  //           ugQualification: new FormControl(
  //             value.candidateDetails.ugQualification,
  //             [Validators.required]
  //           ),
  //           ugCourseDurationFrom: new FormControl(
  //             value.candidateDetails.ugCourseDurationFrom,
  //             [Validators.required]
  //           ),
  //           ugCourseDurationTo: new FormControl(
  //             value.candidateDetails.ugCourseDurationTo,
  //             [Validators.required]
  //           ),
  //           ugCourseType: new FormControl(value.candidateDetails.ugCourseType, [
  //             Validators.required,
  //           ]),
  //           ugGradingSystem: new FormControl(
  //             value.candidateDetails.ugGradingSystem,
  //             [Validators.required]
  //           ),
  //           ugMarks: new FormControl(value.candidateDetails.ugMarks, [
  //             Validators.required,
  //           ]),
  //           ugSpecialization: new FormControl(
  //             value.candidateDetails.ugSpecialization,
  //             [Validators.required]
  //           ),
  //           ugUniversity: new FormControl(value.candidateDetails.ugUniversity, [
  //             Validators.required,
  //           ]),
  //           ugCourse: new FormControl(value.candidateDetails.ugCourse, [
  //             Validators.required,
  //           ]),
  //         });
  //       }
  //       if (value.hsQualification == 'HSC') {
  //         console.log('working');
  //         this.candidate
  //           .hsccourse(value.candidateDetails.hsQualification)
  //           .subscribe((res: any) => {
  //             this.hscCourse = res;
  //           });
  //         this.addAllcontrol = this.fb.group({
  //           Education: new FormControl(value.hsQualification, [
  //             Validators.required,
  //           ]),
  //           hsQualification: new FormControl(
  //             value.candidateDetails.hsQualification,
  //             [Validators.required]
  //           ),
  //           hsBoard: new FormControl(value.candidateDetails.hsBoard, [
  //             Validators.required,
  //           ]),
  //           hsMedium: new FormControl(value.candidateDetails.hsMedium, [
  //             Validators.required,
  //           ]),
  //           hstotalmarks: new FormControl(value.candidateDetails.hstotalmarks, [
  //             Validators.required,
  //           ]),
  //           hsPassedYear: new FormControl(value.candidateDetails.hsPassedYear, [
  //             Validators.required,
  //           ]),
  //         });
  //       }
  //       if (value.sslcQualification == 'SSLC') {
  //         console.log('working');
  //         this.candidate
  //           .hsccourse(value.candidateDetails.sslcQualification)
  //           .subscribe((res: any) => {
  //             this.hscCourse = res;
  //           });
  //         this.addAllcontrol = this.fb.group({
  //           Education: new FormControl(value.sslcQualification, [
  //             Validators.required,
  //           ]),
  //           sslcQualification: new FormControl(
  //             value.candidateDetails.sslcQualification,
  //             [Validators.required]
  //           ),
  //           sslcBoard: new FormControl(value.candidateDetails.sslcBoard, [
  //             Validators.required,
  //           ]),
  //           sslcMedium: new FormControl(value.candidateDetails.sslcMedium, [
  //             Validators.required,
  //           ]),
  //           sslctotalmarks: new FormControl(
  //             value.candidateDetails.sslctotalmarks,
  //             [Validators.required]
  //           ),
  //           sslcPassedYear: new FormControl(
  //             value.candidateDetails.sslcPassedYear,
  //             [Validators.required]
  //           ),
  //         });
  //       }
  //     }
  //     console.log(res, 'working');
  //   });
  // }

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
}
