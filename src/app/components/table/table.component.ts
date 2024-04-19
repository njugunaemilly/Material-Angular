import { Component, OnInit, ViewChild } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { Customer } from '../../customer';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { UserdetailComponent } from '../userdetail/userdetail.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  customerList!: Customer[];
  dataSource!: MatTableDataSource<Customer>;
  displayedColumns: string[] = ["code", "name", "email", "phone", "status", "action"];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;


  constructor( private service: MasterService, private dialog: MatDialog, private snackbar:MatSnackBar){ 
    this.loadCustomer();
   }

loadCustomer(){
  this.service.GetCustomer().subscribe(res=>{
    // console.log(res)
    this.customerList= res;
    this.dataSource = new MatTableDataSource<Customer>(this.customerList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  })
}

  Filterchange(data: Event){
    const value=(data.target as HTMLInputElement).value;
    this.dataSource.filter=value;
  }

  editCustomer(code:any){
    this.openPopup(code, 'Edit Customer', PopupComponent);
    // console.log(code)
  }

  detailCustomer(code:any){
    this.openPopup(code, 'Edit Customer', UserdetailComponent);
    console.log("Details opened")
  }

  addCustomer(){
    this.openPopup(0, 'Add Customer', PopupComponent)
  }


deleteUser(code: number) {  
   console.log("Deleting user with code:", code);
  this.service.DeleteUser(code).subscribe(() => { 
    this.snackbar.open('User deleted successfully', 'Close', {
      verticalPosition: 'top',
      horizontalPosition:'end',
      duration: 5000
    });
  });
}




  openPopup(code:any, title:any, component:any){
    var _popup = this.dialog.open(component,{
      width: '40%',
      height: '400px',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
        code:code
      }
    })
    _popup.afterClosed().subscribe(item=>{
      this.loadCustomer()
      // console.log(item)
    })
  }
}
