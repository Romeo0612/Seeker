import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private rowDataSubject = new Subject<any>();

  sendRowData(rowData: any) {
    this.rowDataSubject.next(rowData);
  }

  getRowData() {
    return this.rowDataSubject.asObservable();
  }
}