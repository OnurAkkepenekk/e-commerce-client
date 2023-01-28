import { SpinnerType } from './../../base/base.component';
import { ProductService } from './../../services/common/models/product.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './../../services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy, Inject, ElementRef, ViewChild } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';
declare var $: any;

@Component({
  selector: 'app-qrcode-reading-dialog',
  templateUrl: './qrcode-reading-dialog.component.html',
  styleUrls: ['./qrcode-reading-dialog.component.scss']
})
export class QrcodeReadingDialogComponent extends BaseDialog<QrcodeReadingDialogComponent> implements OnInit, OnDestroy {

  constructor(
    dialogRef: MatDialogRef<QrcodeReadingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private spinner: NgxSpinnerService,
    private toastrService: CustomToastrService,
    private productService: ProductService) {
    super(dialogRef)
  }
  abc: boolean = false;
  conunter: number = 0;

  @ViewChild("scanner", { static: true }) scanner: NgxScannerQrcodeComponent;
  @ViewChild("txtStock", { static: true }) txtStock: ElementRef;


  ngOnInit(): void {
    this.scanner.start();
  }
  ngOnDestroy(): void {
    this.scanner.stop();
  }

  onEvent(e) {
    const data: any = e[0].value;
    this.abc = false;
    if (data != null && this.conunter == 0) {
      this.abc = true;
      this.conunter++;
    }
    if (data != null && data != "" && this.abc && this.conunter== 1) {
      this.spinner.show(SpinnerType.BallAtom)
      const jsonData = JSON.parse(data);
      const stockValue = (this.txtStock.nativeElement as HTMLInputElement).value;

      this.productService.updateStockQrCodeToProduct(jsonData.Id, parseInt(stockValue), () => {
        $("#btnClose").click();
        this.toastrService.message(`${jsonData.Name} ürünün stok bilgisi '${stockValue}' olarak güncellenmiştir.`, "Stok Başarıyla Güncellendi", {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight
        });
        this.spinner.hide(SpinnerType.BallAtom)
      });
    }
  }

}
