import { Observable, firstValueFrom } from 'rxjs';
import { HttpClientService } from './http-client.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {

  constructor(private httpClientService: HttpClientService) { }

  async generateQRCode(productId: string) {
    // file'i blob olarak yakalamalıyız
    const observable: Observable<Blob> = this.httpClientService.get({
      controller: "products",
      action: "qrcode",
      responseType: 'blob'
    }, productId)

    return await firstValueFrom(observable);

  }
}
