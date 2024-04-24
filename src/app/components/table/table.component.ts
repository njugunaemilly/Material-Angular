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
import { DeleteuserComponent } from '../deleteuser/deleteuser.component';
import { LoadingService } from '../../service/loading.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  customerList!: Customer[];
  dataSource!: MatTableDataSource<Customer>;
  displayedColumns: string[] = ['name', 'email', 'phone', 'status', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isLoadingCustomers = this.loadingService.isLoadingCustomers;

  constructor(
    private service: MasterService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private loadingService: LoadingService
  ) {
    this.loadCustomer();
  }

  ngOnInit(): void {
    this.loadingService.setLoadingState(true);
    setTimeout(() => {
      this.loadingService.setLoadingState(false);
    }, 2000);
  }

  loadCustomer() {
    this.service.GetCustomer().subscribe((res) => {
      // console.log(res)
      this.customerList = res;
      this.dataSource = new MatTableDataSource<Customer>(this.customerList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  editCustomer(code: any) {
    console.log(code);
    this.service.GetCustomerByCode(code).subscribe({
      next: (customer: any) => {
        this.openPopup(code, 'Edit Customer', customer, PopupComponent);
      },
      error: () => console.log('Error msg table'),
    });
  }

  detailCustomer(data: any) {
    this.openPopup(data, 'Customer Details', data, UserdetailComponent);
  }

  addCustomer() {
    this.openPopup(0, 'Add Customer', 'data', PopupComponent);
  }

  deleteUser(code: number) {
    const dialogRef = this.dialog.open(DeleteuserComponent, {
      data: { code },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'delete') {
        this.service.DeleteUser(code).subscribe((res) => {
          console.log(res);
          this.snackbar.open('User deleted successfully', 'Close', {
            verticalPosition: 'top',
            horizontalPosition: 'end',
            duration: 5000,
          });
        });
      }
    });
  }

  openPopup(code: any, title: any, data: any, component: any) {
    var _popup = this.dialog.open(component, {
      width: '40%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
        code: code,
        data: data,
      },
    });
    _popup.afterClosed().subscribe((item) => {
      this.loadCustomer();
    });
  }
}
