import { SpinnerType } from './../../../base/base.component';
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent extends BaseComponent  {
  constructor(spinner: NgxSpinnerService) {
    super(spinner);
  }
  ngOnInit():void{
    this.showSpinner(SpinnerType.BallAtom);
  }
}
