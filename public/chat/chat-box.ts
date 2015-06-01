/// <reference path="../../typings/tsd.d.ts" />

import {Component, View} from "angular2/angular2"

@Component({selector: "chat-box"})
@View({templateUrl: "components/chat-box.html"})
export class ChatBoxComponent {
  constructor() { }

  processMessageFrom($event, messageBox) {
    console.log(arguments)
    if ($event.which === 13) {
      this.sendMessageFrom(messageBox)
    }
  }

  sendMessage(message) {
    alert(message)
  }

  sendMessageFrom(messageBox) {
    this.sendMessage(messageBox.value)
    messageBox.value = ""
  }
}
