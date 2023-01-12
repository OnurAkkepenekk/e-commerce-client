import { ComponentType, DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { Router } from '@angular/router';
import { AuthService } from './services/common/auth.service';
import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { DinamicLoadComponentDirective } from './directives/common/dinamic-load-component.directive';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ECommerceClient';
  @ViewChild(DinamicLoadComponentDirective, { static: true })
  dynamicLoadComponentDirective: DinamicLoadComponentDirective;
  constructor(private toastrService: CustomToastrService, public authService: AuthService, private router: Router,
    private dynamicLoadComponentService: DynamicLoadComponentService) {
    authService.identityCheck();
  }
  signOut() {
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""]);
    this.toastrService.message("Oturum kapatılmıştır!", "Oturum Kapatıldı", {
      messageType: ToastrMessageType.Warning,
      position: ToastrPosition.TopRight
    });
  }

  loadComponent() {
    console.log(this.dynamicLoadComponentDirective.viewContainerRef);
    this.dynamicLoadComponentService.loadComponent(ComponentType.BasketsComponent,
      this.dynamicLoadComponentDirective.viewContainerRef)

  }
}
$()