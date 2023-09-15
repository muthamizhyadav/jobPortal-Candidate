import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderServiceService {
  private count = 0;
  private spinner = new BehaviorSubject<string>('');
  constructor() { }
  getLoaderObject(): Observable<string> {
    return this.spinner.asObservable();
  }

  requestStart() {
    if (++this.count == 1) {
      this.spinner.next('start');
    }
  }

  requestEnd() {
    if (this.count == 0 || --this.count == 0) {
      this.spinner.next('stop');
    }
  }

  resetSpinner() {
    this.count = 0;
    this.spinner.next('stop');
  }
}
