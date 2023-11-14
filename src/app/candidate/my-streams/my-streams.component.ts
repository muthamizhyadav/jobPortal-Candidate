import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CanditateService } from '../canditate.service';

@Component({
  selector: 'app-my-streams',
  templateUrl: './my-streams.component.html',
  styleUrls: ['./my-streams.component.css'],
})
export class MyStreamsComponent implements OnInit {
  constructor(private router: Router, private api: CanditateService) {}

  ngOnInit(): void {
    this.getStreams();
  }

  streams: any;
  getStreams() {
    this.api.getRequestStream().subscribe((e: any) => {
      this.streams = e;
      console.log(this.streams);
    });
  }

  RequestStreamRoute() {
    this.router.navigateByUrl('/request-stream');
  }
}
