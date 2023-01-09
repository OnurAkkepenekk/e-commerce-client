import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private _connection: HubConnection;

  get connection(): HubConnection {
    return this._connection;
  }

  // Başlatılmış bir hub verecek
  start(hubUrl: string) {
    if (!this.connection || this._connection?.state == HubConnectionState.Disconnected) {
      const builder: HubConnectionBuilder = new HubConnectionBuilder();

      const hubConnection: HubConnection = builder.withUrl(hubUrl)
        .withAutomaticReconnect()
        .build();

      hubConnection.start()
        .then(() => console.log("Connected"))
        .catch(error => setTimeout(() => this.start(hubUrl), 2000));

      this._connection = hubConnection;
    }

    this._connection.onreconnected(connectionId => console.log("Reconnected"));
    this._connection.onreconnecting(error => console.log("Reconnecting"));
    this._connection.onclose(error => console.log("Close reconnection"));
  }

  // signalR üzerinden herhangi bir client'in başka client'lara mesaj gönderme işlemi için tetiklenen metot
  invoke(procedureName: string, message: any, successCallBack?: (value) => void, errorCallBack?: (error) => void) {
    this.connection.invoke(procedureName, message)
      .then(successCallBack)
      .catch(errorCallBack);
  }

  // serverdan gelecek mesajları anlık olarak yakalamamızı sağlayan metot
  on(procedureName: string, callBack: (...message: any) => void) {
    this.connection.on(procedureName, callBack);
  }
}
