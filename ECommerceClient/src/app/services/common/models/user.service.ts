import { SocialUser } from '@abacritt/angularx-social-login';
import { TokenResponse } from './../../../contracts/token/tokenResponse';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './../../ui/custom-toastr.service';
import { Token } from './../../../contracts/token/token';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_User } from './../../../contracts/users/create_user';
import { User } from './../../../entities/user';
import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService, private toastrService: CustomToastrService) { }

  async create(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> = this.httpClientService.post<Create_User | User>({
      controller: "users",
    }, user);
    return await firstValueFrom(observable) as Create_User;
  }
}
