import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  dataService: EventEmitter<any> = new EventEmitter();

  emitData(data: any) {
    this.dataService.emit(data);
  }
}
