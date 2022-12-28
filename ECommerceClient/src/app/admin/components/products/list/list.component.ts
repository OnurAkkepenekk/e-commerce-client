import { MessageType, Position } from './../../../../services/admin/alertify.service';
import { BaseComponent, SpinnerType } from './../../../../base/base.component';
import { ProductService } from './../../../../services/common/models/product.service';
import { List_Product } from './../../../../contracts/list_product';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/services/admin/alertify.service';
import { MatPaginator } from '@angular/material/paginator';

declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent {

  constructor(private productService: ProductService, spinner: NgxSpinnerService, private alertify: AlertifyService) {
    super(spinner)
  }
  displayedColumns: string[] = ['name', 'stock', 'price', "createdDate", "updatedDate","edit","delete",];

  dataSource: MatTableDataSource<List_Product> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getAllProducts() {
    this.showSpinner(SpinnerType.BallAtom);
    const allProducts: { totalCount: number, products: List_Product[] } = await this.productService.getAllProduct(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5,
      () => this.hideSpinner(SpinnerType.BallAtom), errorMessage => this.alertify.message(errorMessage, {
      dismissOther: true,
      messageType: MessageType.Error,
      position: Position.TopRight,
    }))
    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products);
    this.paginator.length = allProducts.totalCount;
    this.dataSource.paginator = this.paginator;
  }
  async pageChanged(){
    await this.getAllProducts();
  }

  async ngOnInt() {
    await this.getAllProducts();
  }

  delete(id){
    alert(id);
  }
}
