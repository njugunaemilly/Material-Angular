import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Colorentity } from '../colorentity';
import { Observable } from 'rxjs';
import { Customer } from '../customer';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private url= 'http://localhost:3000/customers'
  constructor(private http: HttpClient) { }

  
  GetColorList():Colorentity[]{
    return [
      {code: 'c1', name: 'Green'},
      {code:'c2', name: 'Red'},
      {code: 'c3', name: 'Yellow'},
      {code: 'c4', name: 'Pink'}
    ]
  }

  GetCustomer():Observable<Customer[]>{
    return this.http.get<Customer[]>(this.url);
  }
}
