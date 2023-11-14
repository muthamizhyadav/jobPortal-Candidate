import { Component, OnInit } from '@angular/core';
import { CanditateService } from '../canditate.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-streams',
  templateUrl: './request-streams.component.html',
  styleUrls: ['./request-streams.component.css'],
})
export class RequestStreamsComponent implements OnInit {
  constructor(
    private candidateService: CanditateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPlanes();
  }

  planes: any;

  getPlanes() {
    this.candidateService.getAllPurchasedPlanes().subscribe((e: any) => {
      this.planes = e;
      console.log(this.planes);
    });
  }

  streamRequest = new FormGroup({
    primarycommunication: new FormControl('', Validators.required),
    streamName: new FormControl('', Validators.required),
    planId: new FormControl('', Validators.required),
    Location: new FormControl('', Validators.required),
    secondarycommunication: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
    discription: new FormControl('', Validators.required),
  });

  dateCHange(e: any) {
    console.log(e.target.value);
    this.streamRequest.get('date')?.setValue(e.target.value);
  }

  timeChange(e: any) {
    console.log(e.target.value);
    this.streamRequest.get('time')?.setValue(e.target.value);
  }

  submitRequest() {
    console.log(this.streamRequest.value);
    if (this.streamRequest.valid) {
      this.candidateService
        .RequestStream(this.streamRequest.value)
        .subscribe((e: any) => {
          console.log(e);

          this.router.navigateByUrl('/my-stream');
        });
    }
  }
}
