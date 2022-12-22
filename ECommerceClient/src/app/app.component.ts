import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ECommerceClient';
  constructor(private toastrService: CustomToastrService) {
    toastrService.message("onurrrr", "dfeneme", { messageType: ToastrMessageType.Info, position: ToastrPosition.BottomCenter });
    toastrService.message("onurrrr", "dfeneme", { messageType: ToastrMessageType.Error, position: ToastrPosition.BottomRight });
    toastrService.message("onurrrr", "dfeneme", { messageType: ToastrMessageType.Success, position: ToastrPosition.TopCenter });
    toastrService.message("onurrrr", "dfeneme", { messageType: ToastrMessageType.Warning, position: ToastrPosition.BottomLeft });

  }
}