import {Injectable} from '@angular/core';
import {Message} from '../models/Message';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {UserService} from "./user.service";
import {User} from "../models/user";
import {imguser} from "../models/imguser";
@Injectable({
  providedIn: 'root'
})

export class WebsocketService {
  // Store the chat messages
  public messages = [];

  public stompClient;

  constructor(private us: UserService) {
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
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe('/topic/messages', message => {
        if (message.body) {
          const obj = JSON.parse(message.body);
          that.addMessage(obj.text, obj.username, obj.avatar); console.log(obj.username);
        }
      });
    });
  }

user:User; private retrieveResonseuser: imguser[];
  retrievedImageuser: any[] = [];image:String;
  // Prepare and push the chat messages into the messages array
  addMessage(message: any, username: string, id: number) {
   this.us.getUserById(id).subscribe(data=>{
     this.user=data as User;
     this.retrieveResonseuser = this.user.imguser;console.log(this.retrieveResonseuser);
     for(let t of this.retrieveResonseuser)
     {this.retrievedImageuser.push('data:image/jpeg;base64,' + t.picByte);console.log(this.retrievedImageuser);
     this.image='data:image/jpeg;base64,' + t.picByte;}
     this.messages.push({
     text: message,
     avatar:this.image,
     date: new Date(),
     name: username
   });})

  }


  // Send a chat message using stomp client
  sendMessage(msg: Message) {
    this.stompClient.send('/app/sendmsg', {}, JSON.stringify(msg)); console.log(msg.username);
  }
}
