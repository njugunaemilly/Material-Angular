import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { error } from 'console';
import { MasterService } from '../../service/master.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent implements OnInit{
 
  inputdata:any;
  editData: any;
  closemessage = 'Closed using directive'

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private ref:MatDialogRef<PopupComponent>, private builder: FormBuilder, private service: MasterService, private snackbar: MatSnackBar){ }

  ngOnInit(): void {
    this.inputdata = this.data
    if(this.inputdata.code > 0){
      this.setPopUpData(this.inputdata.code)
    }
  }

  setPopUpData(code:any){
    this.service.GetCustomerByCode(code).subscribe(item =>{
      this.editData = item;
      this.myForm.setValue({name: this.editData.name, email: this.editData.email, phone: this.editData.phone, status: this.editData.status})
    })
  }

  myForm = this.builder.group({
    name: this.builder.control(''),
    email: this.builder.control(''),
    phone: this.builder.control(''),
    status: this.builder.control(true),
  })


  closePopup(){
    this.ref.close('Closed using function');
  }

  saveUser(){
    this.service.SaveCustomer(this.myForm.value).subscribe(res =>{
      this.closePopup();
      console.log(this.myForm.value)
      console.log(res)
      this.snackbar.open('User saved successfully', 'Close', {
        verticalPosition: 'top',
        horizontalPosition:'end',
        duration: 5000
      });
    // }
    })
  }

 
}
