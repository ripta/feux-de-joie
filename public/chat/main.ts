/// <reference path="../../typings/tsd.d.ts" />

import {bootstrap, Component, View} from "angular2/angular2"

@Component({selector: "chat-box"})
@View({templateUrl: "components/chat-box.html"})
class ChatBoxComponent {
  constructor() { }

  enterMessage(evt, messageBox) {
    if (evt.which === 13) {
      // this.sendMessage(messageBox.value)
      messageBox.value = ""
    }
  }
}

bootstrap(ChatBoxComponent)
