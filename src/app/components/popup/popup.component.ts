import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  closemessage = 'Closed using directive';
  myForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private ref:MatDialogRef<PopupComponent>, private builder: FormBuilder, private service: MasterService, private snackbar: MatSnackBar){ }


  ngOnInit(): void {
    if (this.data) {
      this.inputdata = this.data;
      console.log(this.data.data)
      console.log(this.data.code);
      this.setPopUpData(this.inputdata.code);
    } else {
      console.log('No data provided');
    }
  
    this.myForm = this.builder.group({
      name: [''],
      email: [''],
      phone: [''],
      status: [true],
    });
  }
  


  setPopUpData(code: any) {
    this.service.GetCustomerByCode(code).subscribe({
      next: (item: any) =>{
      this.editData = item
      console.log(item)
      this.myForm.setValue({
        name: this.editData.name,
        email: this.editData.email,
        phone: this.editData.phone,
        status: this.editData.status
      })
   },error: ()=>{
    console.log('error msg')
   }
   });
  }

  closePopup(){
    this.ref.close('Closed using function');
  }


  saveUser() {
    const formData = { ...this.myForm.value, code: this.inputdata.code };
    this.service.SaveCustomer(formData).subscribe(res => {
      this.closePopup();
      console.log(formData);
      console.log(res);
      this.snackbar.open('User saved successfully', 'Close', {
        verticalPosition: 'top',
        horizontalPosition: 'end',
        duration: 5000
      });
    });
  }
  
}
