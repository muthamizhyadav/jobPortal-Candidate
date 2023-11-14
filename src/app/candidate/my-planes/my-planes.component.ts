import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CanditateService } from '../canditate.service';

@Component({
  selector: 'app-my-planes',
  templateUrl: './my-planes.component.html',
  styleUrls: ['./my-planes.component.css'],
})
export class MyPlanesComponent implements OnInit {
  constructor(private route: Router, private api: CanditateService) {}

  ngOnInit(): void {
    this.getpurchasedPlanes();
  }

  planes() {
    this.route.navigateByUrl('/cand-planes');
  }

  data: any;
  getpurchasedPlanes() {
    this.api.getPurchasedPlanes().subscribe((e: any) => {
      this.data = e;
      this.route.navigateByUrl('/my-plan');
    });
  }
}
