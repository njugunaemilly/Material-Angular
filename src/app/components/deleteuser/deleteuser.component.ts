import { Component, Inject,  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-deleteuser',
  templateUrl: './deleteuser.component.html',
  styleUrl: './deleteuser.component.scss'
})
export class DeleteuserComponent {

  constructor(public dialogRef: MatDialogRef<DeleteuserComponent>, @Inject( MAT_DIALOG_DATA) public data: any)
  { }

  noDelete(){
    this.dialogRef.close();
  }

  delteConfirmation(){
    this.dialogRef.close('delete')
  }
}
