import { SpinnerType } from './../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrMessageType, ToastrPosition, CustomToastrService } from './../../services/ui/custom-toastr.service';
import { CompleteOrderDialogComponent, CompleteOrderState } from './../complete-order-dialog/complete-order-dialog.component';
import { DialogService } from './../../services/common/dialog.service';
import { SingleOrder } from './../../contracts/order/single_order';
import { OrderService } from './../../services/common/models/order.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialog } from './../base/base-dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.scss']
})
export class OrderDetailDialogComponent extends BaseDialog<OrderDetailDialogComponent> implements OnInit {
  /**
   *
   */
  constructor(
    dialogRef: MatDialogRef<OrderDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderDetailDialogState, private orderService: OrderService,
    private dialogService: DialogService, private spinner: NgxSpinnerService, private toastrService: CustomToastrService) {
    super(dialogRef)
  }

  singleOrder: SingleOrder;

  displayedColumns: string[] = ['name', 'price', 'quantity', 'totalPrice'];
  dataSource = [];
  clickedRows = new Set<any>();
  totalPrice: number;

  async ngOnInit(): Promise<void> {
    this.singleOrder = await this.orderService.getOrderById(this.data as unknown as string)
    this.dataSource = this.singleOrder.basketItems;

    this.totalPrice = this.singleOrder.basketItems.map((basketItem, index) => basketItem.price * basketItem.quantity).reduce((price, current) => price + current);
  }

  completeOrder() {
    this.dialogService.openDialog({
      componentType: CompleteOrderDialogComponent,
      data: CompleteOrderState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.BallAtom)
        alert(this.data)
        await this.orderService.completeOrder(this.data as unknown as string);
        this.spinner.hide(SpinnerType.BallAtom)
        this.toastrService.message("Sipariş başarıyla tamamlanmıştır! Müşteriye bilgi verilmiştir.", "Sipariş Tamamlandı!", {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight
        });
      }
    });
  }

}

export enum OrderDetailDialogState {
  Close, OrderComplete
}