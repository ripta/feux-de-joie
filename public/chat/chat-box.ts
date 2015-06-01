/// <reference path="../../typings/tsd.d.ts" />

import {Component, View} from "angular2/angular2"

@Component({selector: "chat-box"})
@View({templateUrl: "components/chat-box.html"})
export class ChatBoxComponent {
  constructor() { }

  processMessageFrom = ($event, messageBox) => {
    this.sendMessageFrom(messageBox)
  }

  sendMessage = (message) => {
    console.log(message)
  }

  sendMessageFrom = (messageBox) => {
    this.sendMessage(messageBox.value)
    messageBox.value = ""
  }
}
