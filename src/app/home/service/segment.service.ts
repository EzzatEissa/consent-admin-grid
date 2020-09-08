import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../../core/service/base.service";
import {Observable} from "rxjs/Rx";
import {Segment} from "../model/segment";

@Injectable({
  providedIn: 'root'
})
export class SegmentService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }


  public getAllSegments(): Observable<Segment[]> {
    return this.get('segment/all', 'json');
  }
}
