import { Component, OnInit, ViewChild } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { Customer } from '../../customer';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

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


  constructor( private service: MasterService, private dialog: MatDialog){ 
    this.loadCustomer();
   }

loadCustomer(){
  this.service.GetCustomer().subscribe(res=>{
    console.log(res)
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
    this.openPopup(code, 'Edit Customer');
    console.log(code)
  }

  addCustomer(){
    this.openPopup(0, 'Add Customer')
  }

  openPopup(code:any, title:any){
    var _popup = this.dialog.open(PopupComponent,{
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
      console.log(item)
    })
  }
}
