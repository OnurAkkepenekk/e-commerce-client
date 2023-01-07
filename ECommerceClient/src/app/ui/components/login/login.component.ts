import { UserAuthService } from './../../../services/common/models/user-auth.service';
import { AuthService } from './../../../services/common/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { UserService } from 'src/app/services/common/models/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FacebookLoginProvider,SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {
  constructor(private userAuthService: UserAuthService, spinner: NgxSpinnerService, private authService: AuthService,
    private activatedRoute: ActivatedRoute, private router: Router, private socialAuthService: SocialAuthService) {
    super(spinner)
    socialAuthService.authState.subscribe(async (user: SocialUser) => {
      console.log(user)
      this.showSpinner(SpinnerType.BallAtom);
      switch (user.provider) {
        case "GOOGLE":
          await userAuthService.googleLogin(user, () => {
            console.log("1")
            this.authService.identityCheck();
            this.hideSpinner(SpinnerType.BallAtom);
          })
          break;
        case "FACEBOOK":
          await userAuthService.facebookLogin(user, () => {
            this.authService.identityCheck();
            this.hideSpinner(SpinnerType.BallAtom);
          })
          break;
      }
      await userAuthService.googleLogin(user, () => {
        this.authService.identityCheck();
        this.hideSpinner(SpinnerType.BallAtom);
      })
    });
  }

  ngOnInit(): void {
  }

  async login(usernameOrEmail: string, password: string) {
    await this.userAuthService.login(usernameOrEmail, password, () => {
      this.authService.identityCheck();

      this.activatedRoute.queryParams.subscribe(params => {
        const returnUrl: string = params["returnUrl"];
        if (returnUrl)
          this.router.navigate([returnUrl]);
      });
      this.hideSpinner(SpinnerType.BallAtom);
    });
  }

  facebookLogin() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
