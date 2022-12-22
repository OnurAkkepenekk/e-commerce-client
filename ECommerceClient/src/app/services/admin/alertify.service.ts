import { Injectable } from '@angular/core';
declare var alertify: any;

@Injectable({
  providedIn: 'root'
})

export class AlertifyService {

  constructor() { }


  // message(message: string, messageType: MessageType, position: Position, delay: number = 3, dismissOther: boolean = false) {
  message(message: string, options: Partial<AlertifyOptions>) {
    alertify.set("notifier", "delay", options.delay);
    alertify.set("notifier", "position", options.position);
    const msj = alertify[options.messageType](message);
    if (options.dismissOther) {
      msj.dismissOthers();
    }
  }

  dismiss() {
    alertify.dismissAll();
  }
}

export class AlertifyOptions {
  messageType: MessageType = MessageType.Message;
  position: Position = Position.BottomLeft;
  delay: number = 3;
  dismissOther: boolean = false;
};

export enum MessageType {
  Error = "error",
  Success = "success",
  Message = "message",
  Notify = "notify",
  Warning = "warning"
}

export enum Position {
  TopCenter = "top-center",
  TopRight = "top-right",
  TopLeft = "top-left",
  BottomRight = "bottom-right",
  BottomCenter = "bottom-center",
  BottomLeft = "bottom-left"
}
