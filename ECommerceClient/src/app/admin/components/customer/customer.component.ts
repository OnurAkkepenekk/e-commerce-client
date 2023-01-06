import { SpinnerType } from './../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent extends BaseComponent {

  constructor(spinner: NgxSpinnerService) {
    super(spinner)
  }
  ngOnInit(): void {
  }
}
