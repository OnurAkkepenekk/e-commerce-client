import { HubUrls } from './../../../constants/hub-urls';
import { ReceiveFunctions } from './../../../constants/receive-functions';
import { SignalRService } from './../../../services/common/signalr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component } from '@angular/core';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent {
  constructor(private alertify: AlertifyService, spinner: NgxSpinnerService, private signalRService: SignalRService) {
    super(spinner);
   // signalRService.start(HubUrls.ProductHub);
   // signalRService.start(HubUrls.OrderHub)
  }

  ngOnInit(): void {
    // this.alertify.message("merhabaaa", MessageType.Success, Position.TopLeft, 10)
    this.signalRService.on(HubUrls.ProductHub,ReceiveFunctions.ProductAddedMessageReceiveFunction, message => {
      this.alertify.message(message, {
        messageType: MessageType.Notify,
        position: Position.TopRight
      })
    });
    this.signalRService.on(HubUrls.OrderHub,ReceiveFunctions.OrderAddedMessageReceiveFunction, message => {
      this.alertify.message(message, {
        messageType: MessageType.Notify,
        position: Position.TopCenter
      })
    });
  }

  m() {

    // this.alertify.message("merhabaaa", {
    //   messageType: MessageType.Error,
    //   dismissOther: false,
    //   delay: 5,
    //   position: Position.TopRight
    // })
  }
  d() {
    this.alertify.dismiss();
  }
}
