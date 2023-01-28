import { OrderDetailDialogComponent } from './../../../../dialogs/order-detail-dialog/order-detail-dialog.component';
import { OrderService } from './../../../../services/common/models/order.service';
import { List_Order } from './../../../../contracts/order/list_order';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/services/common/dialog.service';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Component, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(private orderService: OrderService, spinner: NgxSpinnerService, private alertify: AlertifyService, private dialogService: DialogService) {
    super(spinner)
  }
  displayedColumns: string[] = ['orderCode', 'userName', 'totalPrice', "createdDate", "completed", "viewdetail", "delete",];

  dataSource: MatTableDataSource<List_Order> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getOrders() {
    this.showSpinner(SpinnerType.BallAtom);
    const allOrders: { totalOrderCount: number, orders: List_Order[] } = await this.orderService.getAllOrders
      (this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5,
        () => this.hideSpinner(SpinnerType.BallAtom), (errorMessage: any) => this.alertify.message(errorMessage.message, {
          dismissOther: true,
          messageType: MessageType.Error,
          position: Position.TopRight,
        }))
    console.log(allOrders);
    this.dataSource = new MatTableDataSource<List_Order>(allOrders.orders);
    this.paginator.length = allOrders.totalOrderCount;
    this.dataSource.paginator = this.paginator;
  }
  async pageChanged() {
    await this.getOrders();
  }

  async ngOnInit() {
    await this.getOrders();
  }

  delete(id) {
    alert(id);
  }
  showDetail(id: string) {
    console.log(id);
    this.dialogService.openDialog({
      componentType: OrderDetailDialogComponent,
      data: id,
      options: {
        width: "750px"
      }
    });
  }


}
