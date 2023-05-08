import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  AbstractControl,
  FormControl,
  FormBuilder,
  Validators,
  FormArray,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Editor, Toolbar } from 'ngx-editor';
import { EmpServiceService } from '../emp-service.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-emp-jobpost',
  templateUrl: './emp-jobpost.component.html',
  styleUrls: ['./emp-jobpost.component.css'],
})
export class EmpJobpostComponent implements OnInit {
  // isDisplay = false;
  // checkedList: any = [];
  // jobpostForm: any = this.formBuilder.group({
  //   jobTittle: new FormControl('', Validators.required),
  //   jobDescription: new FormControl('', Validators.required),
  //   keySkill: new FormControl([], Validators.required),
  //   salaryRangeFrom: new FormControl(null),
  //   salaryRangeTo: new FormControl(null),
  //   experienceFrom: new FormControl(null, Validators.required),
  //   experienceTo: new FormControl(null, Validators.required),
  //   interviewType: new FormControl(null, Validators.required),
  //   candidateDescription: new FormControl('', Validators.required),
  //   salaryDescription: new FormControl(''),
  //   urltoApply: new FormControl(''),
  //   workplaceType: new FormControl(null, Validators.required),
  //   industry: new FormControl(null, Validators.required),
  //   preferedIndustry: this.formBuilder.array([], Validators.required),
  //   jobLocation: new FormControl([], Validators.required),
  //   location: new FormControl([]),
  //   employmentType: new FormControl(null, Validators.required),
  //   openings: new FormControl(''),
  //   department: new FormControl(null, Validators.required),
  //   roleCategory: new FormControl(null, Validators.required),
  //   role: new FormControl(null, Validators.required),
  //   interviewstartDate: new FormControl(null, Validators.required),
  //   interviewendDate: new FormControl(null, Validators.required),
  //   startTime: new FormControl(null, Validators.required),
  //   endTime: new FormControl(null, Validators.required),
  //   recruiterName: new FormControl(null, [
  //     Validators.required,
  //     Validators.maxLength(50),
  //     Validators.pattern('^[a-zA-Z ]*$'),
  //   ]),
  //   recruiterEmail: new FormControl(null, [
  //     Validators.required,
  //     Validators.email,
  //     Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
  //   ]),
  //   recruiterNumber: new FormControl(0, Validators.required),
  //   qualification: this.formBuilder.array([], Validators.required),
  //   course: this.formBuilder.array([], Validators.required),
  //   specialization: this.formBuilder.array([], Validators.required),
  //   searchbox: new FormControl(null, Validators.required),
  //   apply_method: new FormControl(null, Validators.required),
  //   recruiterList: new FormControl(null, Validators.required),
  //   recruiterList1: new FormControl(null, Validators.required),
  //   venue: new FormControl(null, Validators.required),
  //   loc: new FormControl(null),
  //   recruiterId: new FormControl('', Validators.required),
  // });
  // job_post() {
  //   console.log(this.jobpostForm);
  //   console.log(this.jobpostForm.valid);

  //   this.submitted = true;
  //   if (this.jobpostForm.valid) {
  //     console.log(this.jobpostForm.value);

  //     this.empservice
  //       .submitPostAJob(this.jobpostForm.value)
  //       .subscribe((res: any) => {
  //         console.log(res);
  //         // this.router.navigateByUrl('/emp-home');

  //         this.jobpostForm.reset();
  //       });
  //   }
  // }
  // keySkill: any;
  // latitude: any;
  // longtitude: any;
  // indus_data: any;
  // depart_data: any;
  // cat_data: any;
  // role_data: any;
  // is_new: boolean = false;
  // is_list: boolean = false;

  // dropdownSettings: IDropdownSettings = {
  //   singleSelection: false,
  //   idField: '_id',
  //   textField: 'Industry',
  //   itemsShowLimit: 3,
  //   limitSelection: 3,
  //   allowSearchFilter: true,
  //   enableCheckAll: false,
  // };
  // dropdownSettings1: IDropdownSettings = {
  //   singleSelection: false,
  //   idField: '_id',
  //   textField: 'qualification',
  //   itemsShowLimit: 3,
  //   limitSelection: 3,
  //   allowSearchFilter: true,
  //   enableCheckAll: false,
  // };
  // dropdownSettings2: IDropdownSettings = {
  //   singleSelection: false,
  //   idField: '_id',
  //   textField: 'Course',
  //   itemsShowLimit: 3,
  //   limitSelection: 3,
  //   allowSearchFilter: true,
  //   enableCheckAll: false,
  // };
  // dropdownSettings3: IDropdownSettings = {
  //   singleSelection: false,
  //   idField: '_id',
  //   textField: 'Specialization',
  //   itemsShowLimit: 3,
  //   limitSelection: 3,
  //   allowSearchFilter: true,
  //   enableCheckAll: false,
  // };
  // qua_data: any;
  // pushdata: any;
  // coursedata: any;
  // spcldata: any;
  // courseid: any;
  // coursename: any;
  // is_open: boolean = false;
  // quaid: any;
  // is_course: boolean = false;
  // quaname: any;
  // educationArray: any = [];
  // spclname: any;
  // pushdata1: any;
  // pushdatac: any;
  // pushdatacs: any;
  // list: any;
  // apply_method: any;
  // is_new1: boolean = false;
  // is_list1: boolean = false;
  // roledata: any;
  // quadata: any;
  // depdata: any;
  // inddata: any;
  // submitted: boolean = false;
  // now: any;
  // nowto: any;
  // predictions: any = [];
  // datatext: any;
  // val: any;
  // address: any;
  // postid: any;
  // constructor(
  //   private formBuilder: FormBuilder,
  //   private router: Router,
  //   private empservice: EmpServiceService,
  //   public params: ActivatedRoute
  // ) {}

  // ngOnInit(): void {
  //   const datePipe = formatDate(new Date(), 'yyyy-MM-dd', 'en-IN');
  //   const time = formatDate(new Date(), 'hh:mm', 'en-IN');
  //   this.now = datePipe;

  //   this.editor = new Editor();
  //   this.editorcan = new Editor();
  //   this.editorsal = new Editor();
  //   this.get_industry_list();
  //   this.get_depart();
  //   this.get_qualification();
  //   this.get();

  //   this.params.queryParams.subscribe((params: any) => {
  //     console.log(params['id']);
  //     this.postid = params['id'];
  //     this.get_jobpost_detail(this.postid);
  //   });
  // }
  // jobdetails: any;
  // get_jobpost_detail(postid: any) {
  //   this.empservice.get_job_detail(postid).subscribe((res: any) => {
  //     console.log(res);
  //     this.jobdetails=res;
  //     this.jobpostForm.patchValue({
  //       // jobTittle : this.jobdetails.jobTittle,
  //       contactNumber: this.jobdetails.contactNumber,
  //       jobDescription: this.jobdetails.jobDescription,
  //       keySkill: this.jobdetails.keySkill,
  //       salaryRangeFrom: this.jobdetails.salaryRangeFrom,
  //       salaryRangeTo: this.jobdetails.salaryRangeTo,
  //       experienceFrom: this.jobdetails.experienceFrom,
  //       experienceTo: this.jobdetails.experienceTo,
  //       interviewType: this.jobdetails.interviewType,
  //       candidateDescription: this.jobdetails.candidateDescription,
  //       salaryDescription: this.jobdetails.salaryDescription,
  //       urltoApply: this.jobdetails.urltoApply,
  //       workplaceType: this.jobdetails.workplaceType,
  //       industry: this.jobdetails.industry,
  //       preferedIndustry: this.jobdetails.preferedIndustry,
  //       jobLocation: this.jobdetails.jobLocation,
  //       employmentType: this.jobdetails.employmentType,
  //       openings: this.jobdetails.openings,
  //       department: this.jobdetails.department,
  //       roleCategory: this.jobdetails.roleCategory,
  //       role: this.jobdetails.role,
  //       interviewstartDate: this.jobdetails.interviewstartDate,
  //       interviewendDate: this.jobdetails.interviewendDate,
  //       startTime: this.jobdetails.startTime,
  //       endTime: this.jobdetails.endTime,
  //       recruiterName: this.jobdetails.recruiterName,
  //       recruiterEmail: this.jobdetails.recruiterEmail,
  //       recruiterNumber: this.jobdetails.recruiterNumber,
  //       qualification: this.jobdetails.qualification,
  //       course: this.jobdetails.course,
  //       specialization: this.jobdetails.specialization,
  //       searchbox: this.jobdetails.keySkill,
  //       // apply_method:this.jobdetails.apply_method,
  //       // recruiterList:new FormControl(null,Validators.required),
  //       // recruiterList1:new FormControl(null,Validators.required),
  //     });
  //   });
  // }
  // editordoc = '';
  // editor!: Editor;
  // editorcan!: Editor;
  // editorsal!: Editor;
  // toolbar: Toolbar = [
  //   ['bold', 'italic'],
  //   ['underline'],
  //   ['ordered_list', 'bullet_list'],
  //   ['link'],
  //   ['align_left', 'align_center', 'align_right', 'align_justify'],
  // ];

  // get doc(): AbstractControl {
  //   return this.jobpostForm.get('jobDescription')?.value;
  // }
  // get docs(): AbstractControl {
  //   return this.jobpostForm.get('candidateDescription')?.value;
  // }
  // get docsa(): AbstractControl {
  //   return this.jobpostForm.get('salaryDescription')?.value;
  // }
  // checkFrom() {
  //   const to = this.jobpostForm.get('interviewstartDate')?.value;
  //   console.log(to);
  //   const datePipe = formatDate(to, 'yyyy-MM-dd', 'en-IN');
  //   this.nowto = datePipe;
  // }
  // ngOnDestroy(): void {
  //   this.editor.destroy();
  // }

  // search_skills(data: any) {
  //   if (data.target.value) {
  //     this.isDisplay = true;
  //   } else {
  //     this.isDisplay = false;
  //   }
  //   this.getKeyskills(data.target.value);
  // }
  // getKeyskills(value: any) {
  //   this.empservice.getSkill(value).subscribe((res: any) => {
  //     this.keySkill = res;
  //   });
  // }
  // checkSkill(event: any, skill: any) {
  //   console.log('checkSkill', skill);
  //   let index: any = this.jobpostForm.get('keySkill')?.value;
  //   if (index.length != 0) {
  //     let value = index.splice([index.length - 1], 1);
  //     index.push(skill.Skill_Title);
  //     this.jobpostForm.get('keySkill')?.setValue(index);
  //     let search: any = index.toString() + ',';
  //     this.jobpostForm.get('searchbox')?.setValue(search);
  //     this.isDisplay = false;
  //     console.log(this.jobpostForm.get('searchbox')?.value);
  //   }
  // }
  // options: any = {
  //   componentRestrictions: { country: 'IN' },
  // };
  // handleAddressChange(address: Address) {
  //   console.log(address);
  //   console.log(address.geometry.location.lat());
  //   console.log(address.geometry.location.lng());
  //   this.latitude = address.geometry.location.lat();
  //   this.longtitude = address.geometry.location.lng();
  //   console.log(this.latitude, this.longtitude);
  //   this.address = address.formatted_address;
  //   // this.val = e.structured_formatting.main_text

  //   this.jobpostForm.patchValue({
  //     loc: '',
  //   });
  // }
  // get_industry_list() {
  //   this.empservice.get_industry().subscribe((res: any) => {
  //     console.log(res);
  //     this.indus_data = res;
  //   });
  // }
  // get_depart() {
  //   this.empservice.get_department().subscribe((res: any) => {
  //     console.log(res);
  //     this.depart_data = res;
  //   });
  // }
  // depart(data: any) {
  //   this.empservice.get_category(data.target.value).subscribe((res: any) => {
  //     console.log(res);
  //     this.cat_data = res;
  //   });
  // }
  // cat(data: any) {
  //   this.empservice.get_role(data.target.value).subscribe((res: any) => {
  //     console.log(res);
  //     this.role_data = res;
  //   });
  // }
  // pre(preview: any) {
  //   this.submitted = true;
  //   if (this.jobpostForm.valid) {
  //     preview.click();
  //     console.log(this.depart_data);
  //     if (this.jobpostForm.get('role')?.value) {
  //       let index = this.role_data.find(
  //         (r: any) => r._id == this.jobpostForm.get('role')?.value
  //       );
  //       this.roledata = index.Job_role;
  //       console.log(this.roledata);
  //     }
  //     // if(this.jobpostForm.get('qualification')?.value){
  //     //   let index = this.qua_data.find((r: any) => r._id == this.jobpostForm.get('qualification')?.value)
  //     //   this.quadata = index.qualification
  //     // }
  //     if (this.jobpostForm.get('department')?.value) {
  //       let index = this.depart_data.find(
  //         (r: any) => r._id == this.jobpostForm.get('department')?.value
  //       );
  //       console.log(this.jobpostForm.get('department')?.value);
  //       this.depdata = index.Department;
  //       console.log(index, this.depdata);
  //     }
  //     if (this.jobpostForm.get('preferedIndustry')?.value) {
  //       let index = this.indus_data.find(
  //         (r: any) => r._id == this.jobpostForm.get('preferedIndustry')?.value
  //       );
  //       this.inddata = index.Industry;
  //     }
  //   }
  // }
  // dispalye(data: any) {
  //   console.log('lusu');
  //   let value = data.target.value.split(',');
  //   console.log(value);
  //   if (data.target.value) {
  //     this.isDisplay = true;
  //   } else {
  //     this.isDisplay = false;
  //   }
  //   if (value.length != 0) {
  //     if (value[value.length - 1] != null && value[value.length - 1] != '') {
  //       this.getKeyskills(value[value.length - 1]);
  //     }
  //   }
  //   this.jobpostForm.get('keySkill')?.setValue(value);
  //   console.log(this.jobpostForm.get('keySkill')?.value);
  // }
  // recriterlist1(e: any) {
  //   console.log(e.target.value);
  //   if (e.target.value == 'list1') {
  //     this.is_list1 = true;
  //     this.is_new1 = false;
  //     this.jobpostForm.removeControl('recruiterName');
  //     this.jobpostForm.removeControl('recruiterEmail');
  //     this.jobpostForm.removeControl('recruiterNumber');
  //     this.jobpostForm.addControl('recruiterId');
  //   } else {
  //     this.jobpostForm.addControl('recruiterName');
  //     this.jobpostForm.addControl('recruiterEmail');
  //     this.jobpostForm.addControl('recruiterNumber');
  //     this.jobpostForm.removeControl('recruiterId');
  //     // this.jobpostForm.get('recruiterName')?.setValue('');
  //     // this.jobpostForm.get('recruiterEmail')?.setValue('');
  //     // this.jobpostForm.get('recruiterNumber')?.setValue('');
  //     this.is_new1 = true;
  //     this.is_list1 = false;
  //   }
  //   console.log(this.is_new, this.is_list);
  // }
  // recriterlist(e: any) {
  //   console.log(e.target.value);
  //   if (e.target.value == 'list') {
  //     this.jobpostForm.addControl('recruiterId');
  //     this.jobpostForm.removeControl('recruiterList1');
  //     this.jobpostForm.removeControl('recruiterName');
  //     this.jobpostForm.removeControl('recruiterEmail');
  //     this.jobpostForm.removeControl('recruiterNumber');

  //     //  this.is_list = true;
  //     //  this.is_new = false;
  //     //  this.jobpostForm.get('recruiterId')?.setErrors({ incorrect: true });
  //     //  this.jobpostForm.get('recruiterName')?.setErrors(null);
  //     //  this.jobpostForm.get('recruiterEmail')?.setErrors(null);
  //     //  this.jobpostForm.get('recruiterNumber')?.setErrors(null);
  //   } else {
  //     this.jobpostForm.removeControl('recruiterId');
  //     this.jobpostForm.addControl('recruiterList1');
  //     this.jobpostForm.addControl('recruiterName');
  //     this.jobpostForm.addControl('recruiterEmail');
  //     this.jobpostForm.addControl('recruiterNumber');

  //     //  this.jobpostForm.get('recruiterName')?.setValue('');
  //     //  this.jobpostForm.get('recruiterEmail')?.setValue('');
  //     //  this.jobpostForm.get('recruiterNumber')?.setValue('');
  //     //  this.is_new = true;
  //     //  this.is_list = false;
  //     //  this.jobpostForm.get('recruiterId')?.setErrors(null);
  //     //  this.jobpostForm.get('recruiterName')?.setErrors({ incorrect: true });
  //     //  this.jobpostForm.get('recruiterEmail')?.setErrors({ incorrect: true });
  //     //  this.jobpostForm.get('recruiterNumber')?.setErrors({ incorrect: true });
  //   }
  //   console.log(this.is_new, this.is_list);
  // }
  // pushCourse(e: any) {
  //   const data: FormArray = this.jobpostForm.get(
  //     'preferedIndustry'
  //   ) as FormArray;
  //   data.push(new FormControl(e._id));
  //   console.log(data);
  // }
  // get_qualification() {
  //   this.empservice.get_qualification().subscribe((res: any) => {
  //     console.log(res);
  //     this.qua_data = res;
  //   });
  // }

  // DeSelect_putcourse(e: any) {
  //   console.log(e);
  //   let i: number = 0;
  //   this.pushdata.forEach((item: any) => {
  //     if (item == e._id) {
  //       this.pushdata.removeAt(i);
  //       return;
  //     }
  //     i++;
  //   });
  //   this.empservice
  //     .get_courses({ arr: this.pushdata.value })
  //     .subscribe((res: any) => {
  //       console.log(res);
  //     });
  // }
  // putspecial(e: any) {
  //   const data: FormArray = this.jobpostForm.get('course') as FormArray;
  //   console.log(e);
  //   data.push(new FormControl(e._id));
  //   this.spcldata = data;
  //   console.log(data);
  //   this.empservice
  //     .get_specialization({ arr: this.spcldata.value })
  //     .subscribe((res: any) => {
  //       this.spcldata = res;
  //       console.log(res);
  //     });
  // }
  // put(e: any) {}
  // selectqualificaion(e: any, event: any) {
  //   console.log(event.target.checked);
  //   if (event.target.checked) {
  //     const data: FormArray = this.jobpostForm.get(
  //       'qualification'
  //     ) as FormArray;
  //     data.push(new FormControl(e._id));
  //     this.pushdata = data;
  //     this.quaid = Array(e._id);
  //     this.quaname = e.qualification;
  //     console.log('fd', this.quaid, this.quaname);
  //     this.empservice.get_courses({ arr: this.quaid }).subscribe((res: any) => {
  //       this.coursedata = res[0].allCourses;
  //       this.is_course = true;
  //       console.log(this.coursedata);
  //     });
  //   } else {
  //     this.is_course = false;
  //     let i: number = 0;
  //     this.pushdata.forEach((item: any) => {
  //       if (item == e._id) {
  //         this.pushdata.removeAt(i);
  //         return;
  //       }
  //       i++;
  //     });
  //   }
  // }
  // selectcourse(e: any, event: any) {
  //   console.log(e);
  //   this.courseid = Array(e._id);
  //   this.coursename = e.Course;
  //   if (event.target.checked) {
  //     const data: FormArray = this.jobpostForm.get('course') as FormArray;
  //     data.push(new FormControl(e._id));
  //     this.pushdatac = data;
  //     this.empservice
  //       .get_specialization({ arr: this.courseid })
  //       .subscribe((res: any) => {
  //         this.spcldata = res;
  //         this.is_open = true;
  //         console.log(res);
  //       });
  //   } else {
  //     this.is_open = false;
  //     let i: number = 0;
  //     this.educationArray.forEach((item: any) => {
  //       if (item.coursename == this.coursename) {
  //         this.educationArray.splice(i);
  //         return;
  //       }
  //       i++;
  //     });

  //     this.pushdatac.forEach((item: any) => {
  //       if (item == e._id) {
  //         this.pushdatac.removeAt(i);
  //         return;
  //       }
  //       i++;
  //     });
  //   }
  //   console.log(this.educationArray);
  // }
  // selectspcl(e: any, event: any) {
  //   this.spclname = e.Specialization;

  //   if (event.target.checked) {
  //     this.educationArray.push({
  //       coursename: this.coursename,
  //       spclname: this.spclname,
  //     });
  //     const data: FormArray = this.jobpostForm.get(
  //       'specialization'
  //     ) as  ;
  //     data.push(new FormControl(e._id));
  //     this.pushdatacs = data;
  //   } else {
  //     const filteredPeople = this.educationArray.findIndex(
  //       (item: any) => item.spclname == this.spclname
  //     );
  //     console.log(filteredPeople);
  //     this.educationArray.splice(filteredPeople, 1);
  //     console.log(this.educationArray);

  //     let i: number = 0;
  //     this.pushdatacs.forEach((item: any) => {
  //       if (item == e._id) {
  //         this.pushdatacs.removeAt(i);
  //         return;
  //       }
  //       i++;
  //     });
  //   }
  // }
  // rem(data: any) {
  //   console.log(data);
  //   const filteredPeople = this.educationArray.findIndex(
  //     (item: any) =>
  //       item.coursename == data.coursename && item.spclname == data.spclname
  //   );
  //   console.log(filteredPeople);
  //   this.educationArray.splice(filteredPeople, 1);
  //   console.log(this.educationArray);
  // }
  // isChecke(data: any) {
  //   if (this.educationArray.find((a: any) => a.spclname == data)) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  // get() {
  //   this.empservice.get_recruiter().subscribe((data) => {
  //     console.log(data);
  //     this.list = data;
  //   });
  // }
  // changerecruiter(data: any) {
  //   console.log(data.target.value);
  //   // this.empservice.getdetails_recruiter(data.target.value).subscribe((data:any) =>{
  //   //   this.jobpostForm.patchValue({
  //   //     // recruiterName:data.recruiterName,
  //   //     // recruiterEmail:data.email,
  //   //     // recruiterNumber:data.mobileNumber
  //   //     recruiterId:data.target.value
  //   //   })
  //   // })
  //   this.jobpostForm.patchValue({ recruiterId: data.target.value });
  // }
  // choose_apply(e: any) {
  //   this.apply_method = e.target.value;
  //   console.log(this.apply_method);
  //   if (this.apply_method == 'email') {
  //     // this.jobpostForm.get('recruiterEmail')?.setErrors({ incorrect: true });
  //     this.jobpostForm.removeControl('recruiterEmail');
  //     this.jobpostForm.removeControl('recruiterId');
  //     this.jobpostForm.removeControl('recruiterName');
  //     this.jobpostForm.removeControl('recruiterNumber');
  //     // this.jobpostForm.get('recruiterList1')?.setErrors(null);
  //     this.jobpostForm.removeControl('recruiterList1');
  //   }
  //   if (this.apply_method == 'telephone') {
  //     this.jobpostForm.addControl('recruiterEmail');
  //     this.jobpostForm.addControl('recruiterList1');
  //   }
  //   if (this.apply_method == 'treatjobs') {
  //     this.jobpostForm.removeControl('recruiterEmail');
  //     this.jobpostForm.removeControl('recruiterId');
  //     this.jobpostForm.removeControl('recruiterName');
  //     this.jobpostForm.removeControl('recruiterNumber');
  //     this.jobpostForm.removeControl('recruiterList1');
  //   }
  // }
  // MAX_LENGTH = 250;
  // somefunction(event: any) {
  //   console.log('dfgdf');
  //   if (event.editor.getLength() > this.MAX_LENGTH) {
  //     event.editor.deleteText(this.MAX_LENGTH, event.editor.getLength());
  //   }
  // }
  // isLoc = false;
  // get_area_location(e: any) {
  //   if (e.target.value) {
  //     var data = {
  //       input: e.target.value,
  //     };
  //     this.empservice.get_area_location(data).subscribe((data: any) => {
  //       console.log(data);
  //       this.predictions = data.predictions;
  //       this.isLoc = true;
  //     });
  //   } else {
  //     this.isLoc = false;
  //   }
  // }
  // datas: any = [];
  // choose(e: any, location: any) {
  //   if (location) {
  //     this.datas.push(location);
  //     this.isLoc = false;
  //   }
  //   this.jobpostForm.patchValue({
  //     loc: '',
  //   });
  //   this.jobpostForm.get('jobLocation')?.setValue(this.datas);
  //   console.log(this.jobpostForm.get('jobLocation')?.valid);
  // }
  // type: any;
  // checkerr_inter(e: any) {
  //   this.type = e.target.value;
  //   console.log(this.type);
  //   if (this.type == 'walk in') {
  //     // this.jobpostForm.get('interviewstartDate')?.setErrors({ incorrect: true });
  //     // this.jobpostForm.get('interviewendDate')?.setErrors({ incorrect: true });
  //     // this.jobpostForm.get('startTime')?.setErrors({ incorrect: true });
  //     // this.jobpostForm.get('endTime')?.setErrors({ incorrect: true });
  //     // this.jobpostForm.get('venue')?.setErrors({ incorrect: true });
  //     this.jobpostForm.addControl('interviewstartDate');
  //     this.jobpostForm.addControl('interviewendDate');

  //     this.jobpostForm.addControl('startTime');

  //     this.jobpostForm.addControl('endTime');

  //     this.jobpostForm.addControl('venue');
  //     this.jobpostForm.addControl('recruiterList');
  //     this.jobpostForm.removeControl('recruiterList1');

  //     // this.jobpostForm.get('recruiterList')?.setErrors({ incorrect: true });
  //     // this.jobpostForm.get('apply_method')?.setErrors(null);
  //     this.jobpostForm.removeControl('apply_method');
  //   } else if (this.type == 'online') {
  //     // this.jobpostForm.get('interviewstartDate')?.setErrors(null);
  //     this.jobpostForm.removeControl('interviewstartDate');
  //     this.jobpostForm.removeControl('interviewendDate');
  //     this.jobpostForm.addControl('apply_method');
  //     this.jobpostForm.removeControl('startTime');

  //     this.jobpostForm.removeControl('endTime');

  //     this.jobpostForm.removeControl('venue');
  //     this.jobpostForm.removeControl('recruiterList');

  //     // this.jobpostForm.get('interviewendDate')?.setErrors(null);
  //     // this.jobpostForm.get('startTime')?.setErrors(null);
  //     // this.jobpostForm.get('endTime')?.setErrors(null);
  //     // this.jobpostForm.get('venue')?.setErrors(null);
  //     // this.jobpostForm.get('recruiterList')?.setErrors(null);

  //     // this.jobpostForm.get('apply_method')?.setErrors({ incorrect: true });
  //     // console.log(this.jobpostForm.get('apply_method')?.valid,"sadsdsd")
  //   }
  // }
  // remove_location(data: any) {
  //   let array = this.jobpostForm.get('jobLocation')?.value;
  //   let i: number = 0;
  //   array.forEach((item: any) => {
  //     if (item == data) {
  //       array.splice(i, 1);
  //       return;
  //     }
  //     i++;
  //   });
  //   if (array.length == 0) {
  //     this.isLoc = false;
  //   }
  //   console.log(array.length);
  // }
  // get_maintext(data: any) {
  //   // console.log(data)
  //   let text = data.split(',');
  //   // console.log(text[0])
  //   return text[0];
  // }
  // onDeSelect(id: any) {
  //   const data = this.jobpostForm.get('preferedIndustry')?.value;
  //   let i: number = 0;
  //   data.forEach((item: any) => {
  //     if (item == id._id) {
  //       data.splice(i, 1);
  //       console.log(data, 'data------------>');
  //       return;
  //     }
  //     i++;
  //   });
  // }




  constructor(private fb: FormBuilder, private router: Router,
    private aroute: ActivatedRoute,
    private empservice: EmpServiceService,) { }
  id: any
  data: any
  ngOnInit(): void {
    this.get_industry_list();
    this.get();
    this.getEducation()
    this.get_depart()
    this.aroute.queryParams.subscribe((e: any) => {
      this.id = e['id']
    })
    this.getJobPostbyId()
    this.empreg()

  }

  getJobPostbyId() {
    if (this.id) {
     
      this.empservice.get_job_detail(this.id).subscribe((e: any) => {

        this.data = e
        this.selectedEducation = this.data.specialization
        this.recEmail=this.data.recruiterEmail
        console.log(this.selectedEducation)
        console.log(this.data)
        this.jobpostForm.patchValue({
          jobTittle: this.data.jobTittle,
          jobDescription: this.data.jobDescription,
          candidateDescription: this.data.candidateDescription,
          salaryDescription: this.data.salaryDescription,
          keySkill: this.data.keySkill,
          salaryRangeFrom: this.data.salaryRangeFrom,
          salaryRangeTo: this.data.salaryRangeTo,
          industry: this.data.industry,
          experienceFrom: this.data.experienceFrom,
          experienceTo: this.data.experienceTo,
          qualification: this.data.specialization,
          preferedIndustry: this.data.preferedIndustry,
          interviewType: this.data.interviewType,
          interviewstartDate: this.data.interviewstartDate,
          interviewendDate: this.data.interviewendDate,
          startTime: this.data.startTime,
          endTime: this.data.endTime,
          venue: this.data.venue,
          employmentType: this.data.employmentType,
          openings: this.data.openings,
          workplaceType: this.data.workplaceType,
          urltoApply: this.data.urltoApply,
          apply_method: this.data.apply_method,
          recruiterId: this.data.recruiterId,
          recruiterName: this.data.recruiterName,
          recruiterEmail: this.data.recruiterEmail,
          recruiterNumber: this.data.recruiterNumber,
          recruiterList: this.data.recruiterList,
          department: this.data.department,
          roleCategory: this.data.roleCategory,
          jobLocation: this.data.jobLocation,
          specialization:this.data.specialization
        })
        console.log(this.jobpostForm.value)
        this.recriList=true
        this.recruiterNumberr=this.data.recruiterNumber;
        this.recruiterNamee=this.data.recruiterName
      })
    }


  }

  jobpostForm: any = this.fb.group({
    jobTittle: new FormControl('', Validators.required),
    jobDescription: new FormControl('', Validators.required),
    candidateDescription: new FormControl('', Validators.required),
    salaryDescription: new FormControl('', Validators.required),
    keySkill: new FormControl([], Validators.required),
    salaryRangeFrom: new FormControl("", Validators.required),
    salaryRangeTo: new FormControl("",[ Validators.required]),
    industry: new FormControl("", Validators.required),
    experienceFrom: new FormControl("", Validators.required),
    experienceTo: new FormControl("", Validators.required),
    qualification: new FormControl([]),
    preferedIndustry: new FormControl([], Validators.required),
    interviewType: new FormControl("", Validators.required),
    interviewstartDate: new FormControl(""),
    interviewendDate: new FormControl(""),
    startTime: new FormControl(""),
    endTime: new FormControl(""),
    venue: new FormControl(""),
    employmentType: new FormControl("", Validators.required),
    openings: new FormControl('', Validators.required),
    workplaceType: new FormControl("", Validators.required),
    urltoApply: new FormControl('', Validators.required),
    apply_method: new FormControl(""),
    recruiterId: new FormControl(''),
    recruiterName: new FormControl(""),
    recruiterEmail: new FormControl(""),

    recruiterNumber: new FormControl(0),
    recruiterList: new FormControl(""),
    department: new FormControl("", Validators.required),
    roleCategory: new FormControl(null),
    specialization: new FormControl([], Validators.required),
    jobLocation: new FormControl([], Validators.required),
    // course: new FormControl([]),
    // jobLocations: new FormControl([]),

    // location: new FormControl([]),
    // department: new FormControl(null),
    // roleCategory: new FormControl(null),
    // role: new FormControl(null),





    // searchbox: new FormControl(null, Validators.required),
    // recruiterList1: new FormControl(null, Validators.required),
    // loc: new FormControl(null),
  });
  companyLogo: any
  RegcompanyName:any
  empreg() {
    this.empservice.getEmployerDetails().subscribe((res: any) => {
      console.log(res, "emp")
      const empRegisterdetails = res
      this.companyLogo = `https://livebroadcast.click/${res.user.logo}`
      console.log(this.companyLogo)
      this.RegcompanyName=res.user.name
    })
  }



  popup = false
  preview() {
    this.submitted=true
    if (this.jobpostForm.valid) {
      this.popup = true
    }

  }

  indus_data: any

  get_industry_list() {
    this.empservice.get_industry().subscribe((res: any) => {
      console.log(res);
      this.indus_data = res;
    });
  }


  preferrefIndustry: any = false
  showPrefferedOption() {
    this.preferrefIndustry = !this.preferrefIndustry
  }
  prefIndarr: any[] = []
  prefInd(items: any, e: any) {


    this.preferrefIndustry = false
    let index = this.prefIndarr.findIndex((a: any) => a == items);
    if (index == -1) {
      if (this.prefIndarr.length <= 2) {
        this.prefIndarr.push(items)
        this.jobpostForm.get('preferedIndustry').setValue(this.prefIndarr)
      }

    }
    else {
      this.prefIndarr.splice(index, 1)
      this.jobpostForm.get('preferedIndustry').setValue(this.prefIndarr)


    }

  }
  deletedPref(data: any) {
    console.log(data)
    let index = this.prefIndarr.findIndex((a: any) => a == data);
    this.prefIndarr.splice(index, 1)
    this.jobpostForm.get('preferedIndustry')?.value.splice(index, 1)


  }


  isChecked(item: any) {
    let index = this.prefIndarr.findIndex((a: any) => a == item);

    if (index == -1) {
      return false;
    }
    else {
      return true;
    }
  }

  predictions: any[] = []
  selectedLocation: any[] = []
  locationSearch: any

  get_area_location(e: any) {
    this.isLoc = true

    console.log(e)
    var data = {
      input: e.target.value
    }

    this.empservice.get_area_location(data).subscribe((data: any) => {
      console.log(data);
      this.predictions = data.predictions;
    });

  }

  isLoc = true
  selectLoc(data: any) {
    this.locationSearch = ''
    this.isLoc = false
    this.selectedLocation.push(data)

    this.jobpostForm.get('jobLocation').setValue(this.selectedLocation)
  }
  delLoc(data: any) {
    console.log(data)
    let index = this.selectedLocation.findIndex((a: any) => a == data);
    this.selectedLocation.splice(index, 1)
    this.jobpostForm.get('jobLocation').setValue(this.selectedLocation)

  }

  delkeyskill(data: any) {
    let index = this.selectedkeyskills.findIndex((a: any) => a == data);
    this.selectedkeyskills.splice(index, 1)
    this.keySkillInp = ""
    this.jobpostForm.get('keySkill').setValue(this.selectedkeyskills)
  }

  keySkill: any = []

  getKeyskills(value: any) {
    const inp = value.target.value
    this.showKeyskills = true
    this.empservice.getSkill(inp).subscribe((res: any) => {
      this.keySkill = res;
    });
  }


  showKeyskills = true
  selectedkeyskills: any = []
  keySkillInp: any

  selectKeySkill(data: any) {
    this.showKeyskills = false
    this.selectedkeyskills.push(data)
    this.jobpostForm.get('keySkill').setValue(this.selectedkeyskills)

    this.keySkillInp=''
console.log(  this.jobpostForm.get('keySkill')?.value)

  }

  selectIntType(value: any) {
    console.log(value.target.value)
    if (value.target.value == 'walkin') {
      this.jobpostForm.controls['interviewstartDate'].setValidators(Validators.required)
      this.jobpostForm.controls['interviewstartDate'].updateValueAndValidity()
      this.jobpostForm.controls['interviewendDate'].setValidators(Validators.required)
      this.jobpostForm.controls['interviewendDate'].updateValueAndValidity()

      this.jobpostForm.controls['startTime'].setValidators(Validators.required)
      this.jobpostForm.controls['startTime'].updateValueAndValidity()

      this.jobpostForm.controls['endTime'].setValidators(Validators.required)
      this.jobpostForm.controls['endTime'].updateValueAndValidity()

      this.jobpostForm.controls['venue'].setValidators(Validators.required)
      this.jobpostForm.controls['venue'].updateValueAndValidity()

      // this.jobpostForm.controls['apply_method'].setValidators(null)
      // this.jobpostForm.controls['apply_method'].updateValueAndValidity()


    }
    else {
      this.jobpostForm.controls['interviewstartDate'].setValidators(null)
      this.jobpostForm.controls['interviewstartDate'].updateValueAndValidity()
      this.jobpostForm.controls['interviewendDate'].setValidators(null)
      this.jobpostForm.controls['interviewendDate'].updateValueAndValidity()

      this.jobpostForm.controls['startTime'].setValidators(null)
      this.jobpostForm.controls['startTime'].updateValueAndValidity()

      this.jobpostForm.controls['endTime'].setValidators(null)
      this.jobpostForm.controls['endTime'].updateValueAndValidity()

      this.jobpostForm.controls['venue'].setValidators(null)
      this.jobpostForm.controls['venue'].updateValueAndValidity()

      // this.jobpostForm.controls['apply_method'].setValidators(Validators.required)
      // this.jobpostForm.controls['apply_method'].updateValueAndValidity()
    }
  }

  getApplymethod(e: any) {
    console.log(e.target.value)
    if (e.target.value == 'telephonicApplicant') {
      this.jobpostForm.controls['recruiterList'].setValidators(Validators.required)
      this.jobpostForm.controls['recruiterList'].updateValueAndValidity()
    }
    else {
      this.jobpostForm.controls['recruiterList'].setValidators(null)
      this.jobpostForm.controls['recruiterList'].updateValueAndValidity()
    }
    if (e.target.value == 'email') {
      this.jobpostForm.controls['recruiterEmail'].setValidators([Validators.required,Validators.email])
      this.jobpostForm.controls['recruiterEmail'].updateValueAndValidity()
    }
    else {
      this.jobpostForm.controls['recruiterEmail'].setValidators(null)
      this.jobpostForm.controls['recruiterEmail'].updateValueAndValidity()
    }
  }
recName:any
recEmail:any
recNumber:any

recriList=false
  selectRecmethod(e: any) {
    console.log(e.target.value)
    if(e.target.value=="new" && this.id){
      this.recEmail=""
      this.jobpostForm.patchValue({recruiterEmail:this.recEmail})
    }
    if (e.target.value == 'list') {
      this.recriList=true
      this.jobpostForm.controls['recruiterId'].setValidators(Validators.required)
      this.jobpostForm.controls['recruiterId'].updateValueAndValidity()
      this.jobpostForm.addControl('recruiterId');

      this.jobpostForm.controls['recruiterName'].setValidators(null)
      this.jobpostForm.controls['recruiterName'].updateValueAndValidity()
      this.jobpostForm.controls['recruiterEmail'].setValidators(null)
      this.jobpostForm.controls['recruiterEmail'].updateValueAndValidity()
      this.jobpostForm.controls['recruiterNumber'].setValidators(null)
      this.jobpostForm.controls['recruiterNumber'].updateValueAndValidity()
    }
    if (e.target.value == 'new')  {
      this.recriList=false
      this.jobpostForm.controls['recruiterId'].setValidators(null)
      this.jobpostForm.removeControl('recruiterId');
      this.jobpostForm.controls['recruiterId'].updateValueAndValidity()

      this.jobpostForm.controls['recruiterName'].setValidators(Validators.required)
      this.jobpostForm.controls['recruiterName'].updateValueAndValidity()
      this.jobpostForm.patchValue({recruiterName:this.recName})
      this.jobpostForm.controls['recruiterEmail'].setValidators([Validators.required,Validators.email])
      this.jobpostForm.controls['recruiterEmail'].updateValueAndValidity()
      this.jobpostForm.patchValue({recruiterEmail:this.recEmail})

      this.jobpostForm.controls['recruiterNumber'].setValidators(Validators.required)
      this.jobpostForm.controls['recruiterNumber'].updateValueAndValidity()
      this.jobpostForm.patchValue({recruiterNumber:this.recNumber})

    }
  }

  recruiterNamee: any
  recruiterNumberr: Number | undefined
  recruiterEmaill: any
  list: any
  get() {
    this.empservice.get_recruiter().subscribe((data) => {
      console.log(data, "recruiter");
      this.list = data;

    });
  }


  getRecruiter(e: any) {
    console.log(this.list)
    let rec = this.list.filter((a: any) => a._id == e.target.value);
    if (rec.length != 0) {
      this.jobpostForm.patchValue({ recruiterName: rec[0].recruiterName, recruiterEmail: rec[0].email, recruiterNumber: rec[0].mobileNumber })
      this.recruiterNamee = rec[0].recruiterName
      this.recruiterNumberr = rec[0].mobileNumber;
      this.recruiterEmaill = rec[0].email
    }

   
  }

















  submitted = false
  submit() {
    console.log(this.jobpostForm.value)
    console.log(this.jobpostForm.valid);
    console.log(this.jobpostForm)

    this.submitted = true


    if (this.jobpostForm.valid) {
      console.log(this.jobpostForm.value);


      this.empservice
        .submitPostAJob(this.jobpostForm.value)
        .subscribe((res: any) => {
          console.log(res);
          this.router.navigateByUrl('/emp-home');

          this.jobpostForm.reset();
        });
    }

  }


  educationList: any

  // education
  getEducation() {
    this.empservice.get_qualification().subscribe((res) => {
      console.log(res)
      this.educationList = res
    })
  }
  idd: any
  courseId: any
  arr: any = []
  course: any
  educhecked(e: any) {
    console.log(e._id)
    this.arr.push(e._id)
    this.idd = e._id
    console.log(this.arr)
    let data = {
      arr: this.arr
    }
    this.empservice.get_courses(data).subscribe((res: any) => {
      this.course = res.allCourses
      this.courseShow = !this.courseShow
    })
  }



  courseCheck(e: any) {

  }
  ischeckedd(item: any) {
    const data = item.target.value
    let index = this.arr.findIndex((a: any) => a == data._id);
    if (item.target.checked) {

      this.arr.push(item)
      this.courseShow = false
      console.log("checked")

    }

    else {
      this.arr.splice(index, 1)
      this.courseShow = true
      console.log("unchecked")

    }
  }

  specShow = false
  specChecked(item: any) {
    const data = item.target.value
    let index = this.arr.findIndex((a: any) => a == data._id);
    if (item.target.checked) {

      this.arr.push(item)
      this.specShow = true
      console.log("checked")

    }

    else {
      this.arr.splice(index, 1)
      this.specShow = false
      console.log("unchecked")

    }
  }


  educationShow = false
  specialization: any

  courseShow = false;
  getCourse(e: any) {
    this.arr = []
    this.arr.push(e._id)
    this.courseId = e._id
    let data = {
      arr: this.arr
    }
    this.empservice.get_specialization(data).subscribe((res: any) => {
      this.specialization = res
    })
  }

  selectedEducation: any = []
specs:any=[]
  selectEd(data: any) {
    console.log(data)
    this.educationShow = false
    if (this.id) {
      this.selectedEducation.push({ Specialization: data.Specialization })
    } else {
      this.selectedEducation.push(data.Specialization)
      this.specs.push(data._id)
    }

    console.log(this.selectedEducation)
    console.log(this.specs)
    this.jobpostForm.get('specialization').setValue(this.specs)
    console.log(this.jobpostForm.get('specialization')?.value)
    // this.specialization = null
    this.course = null

  }



  remEdu(data: any, i: any) {
    console.log(data, "dataaaaaa")
    this.selectedEducation.splice(i, 1)
  }

  // department
  depart_data: any
  get_depart() {
    this.empservice.get_department().subscribe((res: any) => {
      console.log(res, "dep");
      this.depart_data = res;
    });
  }

  role_data: any
  showRole = false

  selectDepart(e: any) {
    this.showRole = true
    console.log(e.target.value)
    this.jobpostForm.controls['roleCategory'].setValidators(Validators.required)
    this.jobpostForm.controls['roleCategory'].updateValueAndValidity()
    let Id = e.target.value
    console.log(e.target.options[e.target.selectedIndex].dataset.messageId, 2)
    // this.jobpostForm.patchValue({ department: e.target.options[e.target.selectedIndex].dataset.messageId })
    this.empservice.get_category(Id).subscribe((res: any) => {
      this.role_data = res
    });
  }

  selectRole(e: any) {
    console.log(e.target.value)
    this.jobpostForm.patchValue({ roleCategory: e.target.value })

  }


  salaryError=false
  salaryTO(e:any){
    this.jobpostForm.patchValue({salaryRangeTo:e.target.value})
    console.log(this.jobpostForm.get('salaryRangeTo')?.value)
  }

num:any=[1,2,3,4,5,6,7,8,9]
exp:any=[1,2,3,4,5,6,7,8,9]
  salaryToarr:any=[]
  exptooarr:any=[]
  salaryTOO:any=[]
  expTOO:any=[]
  salaryFROM(e:any){
    console.log(e.target.value)
    const val=Number(e.target.value)
    for(let i=val+1 ;i<10  ;  i++){
this.salaryToarr.push(i)
    }
this.salaryTOO=this.num.filter((number:any) => number > val);
console.log(this.salaryTOO);



  }

  experienceTOO(e:any){
    console.log(e.target.value)
    const val=Number(e.target.value)
    for(let i=val+1 ;i<10  ;  i++){
this.exptooarr.push(i)
    }
this.expTOO=this.num.filter((number:any) => number > val);
console.log(this.expTOO);
if(e.target.value==9){
  this.expTOO=[9]
}

  }


  getexpto(e:any){
    console.log(e.target.value)
    this.jobpostForm.patchValue({experienceTo:e.target.value})
  }

  walkinFromdate:any
  getfromdate(e:any){
console.log(e.target.value)
this.walkinFromdate=e.target.value
  }
}
