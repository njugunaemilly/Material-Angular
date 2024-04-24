import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  // constructor() { }
  private isLoadingData = new BehaviorSubject<boolean>(false);
  isLoadingCustomers = this.isLoadingData.asObservable();

  setLoadingState(isLoading: boolean):void{
    this.isLoadingData.next(isLoading);
  }
}
