import { Menu } from './../../../contracts/application-configurations/menu';
import { Observable, firstValueFrom } from 'rxjs';
import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private httpClientService: HttpClientService) { }

  async getAuthorizeDefinitionEndpoints() {
    const observable: Observable<Menu[]> = this.httpClientService.get<Menu[]>({
      controller: "ApplicationServices"
    });

    return await firstValueFrom(observable);
  }
}
