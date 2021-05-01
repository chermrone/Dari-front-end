import {Injectable} from "@angular/core";
import {Message} from "../models/Message";

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
@Injectable({
  providedIn: 'root'
})

export class WebsocketService {
  // Store the chat messages
  public messages = [];

  public stompClient;

  constructor() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    /**
     * Create a SockJS server with created back-end endpoint called /chat-websocket and added it over Stomp.
     */
    const serverUrl = 'http://localhost:8082/chat-websocket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    /**
     * Connect stomp client and subscribe asynchronously to the chat message-handling Controller endpoint and push any message body into the messages array
     */
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe('/topic/messages', message => {
        if (message.body) {
          let obj = JSON.parse(message.body);
          that.addMessage(obj.text, obj.username);console.log(obj.username)
        }
      });
    });
  }

  // Prepare and push the chat messages into the messages array
  addMessage(message: any, username: string) {
    this.messages.push({
      text: message,
      date: new Date(),
      name: username,
    });
  }

  // Send a chat message using stomp client
  sendMessage(msg: Message) {
    this.stompClient.send('/app/sendmsg', {}, JSON.stringify(msg));console.log(msg.username);
  }
}
