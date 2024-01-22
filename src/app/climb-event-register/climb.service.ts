import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from '../environment.dev';

@Injectable({
  providedIn: 'root',
})
export class ClimbService {
  baseUrl = Env.baseAPi;

  constructor(private http: HttpClient) {}

  inser_form(data: any) {
    return this.http.post(this.baseUrl + '/v1/climbevent/intern', data);
  }
  get_date() {
    return this.http.get(this.baseUrl + '/v1/climbevent/slot/intern');
  }
  getSkill(value: any) {
  return this.http.get(
      this.baseUrl + `/v1/employerdetail/keySkillData/${value}`
    );
  }
}
