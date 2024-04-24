import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../customer';
import { Country } from '../country';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  private url = 'http://localhost:3000/customers/';
  private urlAssociates = 'http://localhost:3000/associate';
  private urlCountry = 'http://localhost:3000/country';

  constructor(private http: HttpClient) {}

  GetCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.url);
  }

  SaveCustomer(data: any) {
    // console.log(data)
    return this.http.post(this.url, data);
  }

  GetCustomerByCode(code: any): Observable<any> {
    const url = `${this.url}${code}`;
    return this.http.get(url);
  }

  GetAssociate() {
    return this.http.get(this.urlAssociates);
  }

  GetAssociateByCode(id: any) {
    return this.http.get('http://localhost:3000/associate' + id);
  }

  GetCountry(): Observable<Country[]> {
    return this.http.get<Country[]>(this.urlCountry);
  }

  SaveAssociate(data: any, id: any) {
    return this.http.put('http://localhost:3000/associate' + id, data);
  }

  DeleteUser(code: number) {
    console.log('Can I delete this?');
    const deleteUrl = `${this.url}${code}`;

    return this.http.delete(deleteUrl);
  }
}
