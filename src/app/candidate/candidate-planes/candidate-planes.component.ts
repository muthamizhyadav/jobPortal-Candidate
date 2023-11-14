import { Component, OnInit } from '@angular/core';
import { CanditateService } from '../canditate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidate-planes',
  templateUrl: './candidate-planes.component.html',
  styleUrls: ['./candidate-planes.component.css'],
})
export class CandidatePlanesComponent implements OnInit {
  constructor(private api: CanditateService, private route: Router) {}

  ngOnInit(): void {
    this.getPlanes();
  }

  planes: any;
  getPlanes() {
    this.api.getPlanes().subscribe((e: any) => {
      console.log(e);
      this.planes = e;
    });
  }

  purchasePlan(id: any, amt: any) {
    const gstAmount = (amt * 18) / 100;
    const totalAmount = amt + gstAmount;
    let val = { planId: id, totalAmount: totalAmount, gst: gstAmount };
    console.log(val);
    this.api.purchasePlan(val).subscribe((e: any) => {
      console.log(e);
      this.route.navigateByUrl('/my-plan');
    });
  }
}
