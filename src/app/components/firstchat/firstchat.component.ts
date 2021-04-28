import {Component, Input, OnInit} from '@angular/core';
import {WebsocketService} from "../../services/websocket.service";
import {Message} from "../../models/Message";

@Component({
  selector: 'app-firstchat',
  templateUrl: './firstchat.component.html',
  styleUrls: ['./firstchat.component.scss']
})
export class FirstchatComponent implements OnInit {
  // Holding the chat messages
  messages: any[] = [];
  username: string = '';
  theme: string = '';

  @Input('username')
  set setUsername(value: string) {
    this.username = value;
  }

  @Input('theme')
  set setTheme(value: string) {
    this.theme = value;
  }
mtxt:any;
  constructor(public chatService: WebsocketService) {}
  ngOnInit(): void {}

  // Prepare the chat message then call the chatService method 'sendMessage' to actually send the message
  sendMessage() {
    let obj: Message = {
      text: this.mtxt,
      username: this.username};
    this.chatService.sendMessage(obj);  this.mtxt='';
  }

}
