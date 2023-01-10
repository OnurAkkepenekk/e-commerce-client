import { HttpClientService } from './../http-client.service';
import { BaseUrl } from './../../../contracts/baseUrl';
import { Observable, firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private httpClientService: HttpClientService) { }

  async getBaseStorageUrl(): Promise<BaseUrl> {
    const getObservable: Observable<BaseUrl> = this.httpClientService.get<BaseUrl>({
      controller: "files",
      action: "GetBaseStorageUrl"
    });
    return await firstValueFrom(getObservable);
  }
}
