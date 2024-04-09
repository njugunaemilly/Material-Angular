import { Injectable } from '@angular/core';
import { Colorentity } from '../colorentity';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor() { }

  GetColorList():Colorentity[]{
    return [
      {code: 'c1', name: 'Green'},
      {code:'c2', name: 'Red'},
      {code: 'c3', name: 'Yellow'},
      {code: 'c4', name: 'Pink'}
    ]

  }
}
