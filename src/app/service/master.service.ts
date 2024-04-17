import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Colorentity } from '../colorentity';
import { Observable } from 'rxjs';
import { Customer } from '../customer';
import { Country } from '../country';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private url= 'http://localhost:3000/customers/'
  private urlAssociates = 'http://localhost:3000/associate'
  private urlCountry = 'http://localhost:3000/country'
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

  SaveCustomer(data: any){
    console.log(data)
    return this.http.post(this.url, data);
  }

  GetCustomerByCode(code:any){
    return this.http.get(this.url + code);
  }

  GetAssociate(){
    return this.http.get(this.urlAssociates);
  }

  GetAssociateByCode(code:any){
    return this.http.get('http://localhost:3000/associate/'+code);
  }

  GetCountry():Observable<Country[]>{
    return this.http.get<Country[]>(this.urlCountry);
  }

  SaveAssociate(data: any, code:any){
    return this.http.put('http://localhost:3000/associate/'+ code, data);
  }
}
