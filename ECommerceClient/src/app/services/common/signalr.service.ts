import { Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  /**
   *
   */
  constructor(@Inject("baseSignalRUrl") private baseSignalRUrl: string) {

  }
  private _connection: HubConnection;

  get connection(): HubConnection {
    return this._connection;
  }

  // Başlatılmış bir hub verecek
  start(hubUrl: string) {
    hubUrl = this.baseSignalRUrl + hubUrl;

    const builder: HubConnectionBuilder = new HubConnectionBuilder();

    const hubConnection: HubConnection = builder.withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

    hubConnection.start()
      .then(() => console.log("Connected"))
      .catch(error => setTimeout(() => this.start(hubUrl), 2000));

    hubConnection.onreconnected(connectionId => console.log("Reconnected"));
    hubConnection.onreconnecting(error => console.log("Reconnecting"));
    hubConnection.onclose(error => console.log("Close reconnection"));
    return hubConnection;
  }

  // signalR üzerinden herhangi bir client'in başka client'lara mesaj gönderme işlemi için tetiklenen metot
  invoke(hubUrl: string, procedureName: string, message: any, successCallBack?: (value) => void, errorCallBack?: (error) => void) {
    this.start(hubUrl).invoke(procedureName, message)
      .then(successCallBack)
      .catch(errorCallBack);
  }

  // serverdan gelecek mesajları anlık olarak yakalamamızı sağlayan metot
  on(hubUrl: string, procedureName: string, callBack: (...message: any) => void) {
    this.start(hubUrl).on(procedureName, callBack);
  }
}
