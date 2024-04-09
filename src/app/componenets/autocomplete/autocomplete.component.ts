import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { MasterService } from '../../service/master.service';
import { Colorentity } from '../../colorentity';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss'
})
export class AutocompleteComponent implements OnInit{

  colorsArray= ['Green', 'Red', 'Pink', 'Yellow', ]
  filterOptions!: Observable<string[]>

  formcontrol = new FormControl('');
  
  colorArrayList!: Colorentity[];
  filterOptionslist!: Observable<Colorentity[]>


  constructor(private service: MasterService){
    this.colorArrayList = this.service.GetColorList();
  }
  ngOnInit(): void {
    // this.filterOptions = this.formcontrol.valueChanges.pipe(
    //   startWith(''),map(value=>this._FILTER(value||''))
    // )

    this.filterOptionslist = this.formcontrol.valueChanges.pipe(
      startWith(''),map(value=>this._LISTFILTER(value||''))
    )
  }

  private _FILTER(value: string):string[]{
    const searchValue = value.toLocaleLowerCase();
    return this.colorsArray.filter(option=>option.toLocaleLowerCase().includes(searchValue))
  }

  private _LISTFILTER(value: string):Colorentity[]{
    const searchValue = value.toLocaleLowerCase();
    return this.colorArrayList.filter(option=>option.name.toLocaleLowerCase().includes(searchValue) || option.code.toLocaleLowerCase().includes(searchValue))
  }
}
