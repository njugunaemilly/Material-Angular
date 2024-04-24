import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MasterService } from '../../service/master.service';
import { Customer } from '../../customer';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrl: './userdetail.component.scss',
})
export class UserdetailComponent implements OnInit {
  inputData: any;
  custdata: any;
  customerId!: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<UserdetailComponent>,
    private service: MasterService
  ) {}

  ngOnInit(): void {
   
    const customerId = this.data.code;

    this.service.GetCustomerByCode(customerId).subscribe((item: any) => {
      console.log(Array.isArray(item));
      console.log(item);

      this.custdata = item;
    });
  }

  closePopup() {
    this.ref.close('Closing from detail');
  }
}
