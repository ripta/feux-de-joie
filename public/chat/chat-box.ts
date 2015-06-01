/// <reference path="../../typings/tsd.d.ts" />

import {NgFor, Component, View} from "angular2/angular2"
import {MessageService} from "./message-service"

@Component({selector: "chat-box"})
@View({templateUrl: "components/chat-box.html", directives: [NgFor]})
export class ChatBoxComponent {
  messageService: MessageService
  nickname: string

  constructor() {
    this.messageService = new MessageService()
    this.nickname = "person" + Math.round(Math.random() * 100000)
    this.sendMessage("Hello!")
  }

  processMessageFrom = ($event, messageBox) => {
    this.sendMessageFrom(messageBox)
  }

  sendMessage = (message) => {
    this.messageService.add(this.nickname, message, new Date())
    // console.log(this.messages)
  }

  sendMessageFrom = (messageBox) => {
    this.sendMessage(messageBox.value)
    messageBox.value = ""
  }
}
