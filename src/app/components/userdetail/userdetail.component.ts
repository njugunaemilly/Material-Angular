import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrl: './userdetail.component.scss'
})
export class UserdetailComponent implements OnInit{

  inputData: any;
  custdata: any;
  customerId!: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private ref:MatDialogRef<UserdetailComponent>, private service: MasterService){}

  ngOnInit(): void {
    console.log('Log')
    this.inputData=this.data
    if (this.inputData.code>0){
      const customerId = this.inputData.id;
      this.service.GetCustomerByCode(customerId).subscribe(item=>{
        this.custdata=item
      })
    }
  }

  closePopup(){
    this.ref.close('Closing from detail')
  }
}
