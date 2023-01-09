import { ToastrMessageType, ToastrPosition } from './../../services/ui/custom-toastr.service';
import { SpinnerType } from './../../base/base.component';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { CustomToastrService } from 'src/app/services/ui/custom-toastr.service';
import { _isAuthenticated } from 'src/app/services/common/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   *
   */
  constructor(private jwtHelper: JwtHelperService, private router: Router, private toastrService: CustomToastrService, 
    private spinner: NgxSpinnerService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.spinner.show(SpinnerType.BallAtom);
    if (!_isAuthenticated) {
      this.router.navigate(["login"], { queryParams: { returnUrl: state.url } });
      this.toastrService.message("Oturum açmanız gerekiyor!", "Yetkisiz Erişim!", {
        messageType: ToastrMessageType.Warning,
        position: ToastrPosition.TopRight
      })
    }

    this.spinner.hide(SpinnerType.BallAtom);
    return true;
  }

}
