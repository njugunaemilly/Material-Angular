import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MasterService } from '../../service/master.service';
import { title } from 'process';
import { Country } from '../../country';
import { Observable, startWith, map } from 'rxjs';

@Component({
  selector: 'app-associates',
  templateUrl: './associates.component.html',
  styleUrl: './associates.component.scss',
})
export class AssociatesComponent implements OnInit {

  associateList:any;
  addressArray!: FormArray<any>
  countryList! : Country[];
  filterOptions!: Observable<Country[]>;
  editdata: any;

  constructor(private builder: FormBuilder, private service: MasterService) {}

  ngOnInit(): void {
    this.loadAssociate();
    this.loadCountry();
  }

  myForm = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    address: this.builder.array([]),
  });

  saveAssociate() {
    this.service.SaveAssociate(this.myForm.value,this.myForm.value.id).subscribe(r =>{
      alert('Saved');
    })
    // console.log(this.myForm.value)
  }

  loadAssociate() {
    this.service.GetAssociate().subscribe(item =>{
      this.associateList = item;
    })
  }

  loadCountry() {
    this.service.GetCountry().subscribe(item =>{
      this.countryList = item;
    })
  }

  autochange(index:any){
    this.addressArray = this.myForm.get("address") as FormArray;
    const addobj = this.addressArray.at(index) as FormGroup;
    const _control = addobj.get("country") as FormControl;
    this.filterOptions =_control.valueChanges.pipe(
      startWith(''), map(value => this._listfilter(_control.value || ''))
    )
  }

  private _listfilter(value:string):Country[]{
    const searchvalue = value.toLocaleLowerCase();
    return this.countryList.filter(option => option.name.toLocaleLowerCase().includes(searchvalue) ||
  option.code.toLocaleLowerCase().includes(searchvalue))
  }

  addAddress(){
    const associate = this.myForm.value.id;
    if(associate!=''){
      this.addressArray = this.myForm.get("address") as FormArray;
      this.addressArray.push(this.createAddRow())
    }else{
      alert('Please choose associate')
    }
   }

   createAddRow(){
    return this.builder.group({
      title: this.builder.control(''),
      country: this.builder.control(''),
      fulladdress: this.builder.control('')
      
    })
   }

   get getAddress(){
    return this.addressArray = this.myForm.get("address") as FormArray;
   }

   cuschange(code: any) {
    this.service.GetAssociateByCode(code).subscribe(res => {
      this.editdata = res;

      this.addressArray=this.myForm.get("address") as FormArray;
      while (this.addressArray.length !== 0) {
        this.addressArray.removeAt(0)
      }
      
      for (let i = 0; i < this.editdata.address.length; i++){
        this.addAddress();
      }
      this.myForm.setValue({ id: this.editdata.id, name: this.editdata.name, address: this.editdata.address });
    });
  }
}
