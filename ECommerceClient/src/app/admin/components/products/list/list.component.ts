import { QrcodeDialogComponent } from './../../../../dialogs/qrcode-dialog/qrcode-dialog.component';
import { MessageType, Position } from './../../../../services/admin/alertify.service';
import { BaseComponent, SpinnerType } from './../../../../base/base.component';
import { ProductService } from './../../../../services/common/models/product.service';
import { List_Product } from './../../../../contracts/list_product';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/services/admin/alertify.service';
import { MatPaginator } from '@angular/material/paginator';
import { DialogService } from '../../../../services/common/dialog.service';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent {

  constructor(private productService: ProductService, spinner: NgxSpinnerService, private alertify: AlertifyService, private dialogService: DialogService) {
    super(spinner)
  }
  displayedColumns: string[] = ['name', 'stock', 'price', "createdDate", "updatedDate", "photos", "qrcode", "edit", "delete",];

  dataSource: MatTableDataSource<List_Product> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getAllProducts() {
    this.showSpinner(SpinnerType.BallAtom);
    const allProducts: { totalProductCount: number, products: List_Product[] } = await this.productService.getAllProduct(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(SpinnerType.BallAtom), errorMessage => this.alertify.message(errorMessage, {
      dismissOther: true,
      messageType: MessageType.Error,
      position: Position.TopRight,
    }))
    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products);
    this.paginator.length = allProducts.totalProductCount;
    this.dataSource.paginator = this.paginator;
  }
  async pageChanged() {
    await this.getAllProducts();
  }

  async ngOnInit() {
    await this.getAllProducts();
  }

  delete(id) {
    alert(id);
  }

  addProductImages(id: string) {
    this.dialogService.openDialog({
      componentType: SelectProductImageDialogComponent,
      data: id,
      options: {
        width: "1400px"
      }
    });
  }
  showQRCode(productId: string) {
    this.dialogService.openDialog({
      componentType: QrcodeDialogComponent,
      data: productId,
      afterClosed: () => { }
    })
  }

}
