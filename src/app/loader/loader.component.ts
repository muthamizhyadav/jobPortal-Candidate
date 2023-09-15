import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoaderServiceService } from '../loader-service.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit {
  showLoader: any = false;

  constructor(
    private loaderService: LoaderServiceService,
    private cdref: ChangeDetectorRef
  ) {}
  init() {
    this.loaderService.getLoaderObject().subscribe((e: any) => {
      this.showLoader = e === 'start';
      this.cdref.detectChanges();
      console.log(e);
    });
  }
  ngOnInit(): void {
    this.init();
  }
}
