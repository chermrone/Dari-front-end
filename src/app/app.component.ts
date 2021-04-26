import {Component, Input, OnInit} from '@angular/core';
import {WebsocketService} from "./services/websocket.service";
import {WebSocketAPI} from "./services/webSocketAPI";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Template';
  webSocketAPI: WebSocketAPI;
  greeting: any;
  name: string;
 /* ngOnInit() {
  //  this.webSocketAPI = new WebSocketAPI(new AppComponent());
    //this.webSocketAPI._connect();

  }*/
  input;
  // tslint:disable-next-line:typedef
 /* sendMessage() {
    if (this.input) {console.log(this.input);

      this.messageService.sendMessage(this.input);
      this.input = '';
    }}*/



  /*



  connect(){
    this.webSocketAPI._connect();
  }

  disconnect(){
    this.webSocketAPI._disconnect();
  }

  sendMessage(){
    this.webSocketAPI._send(this.name);
  }

  handleMessage(message){
    this.greeting = message;
  }*/

  // Holding the chat messages
  // The entered username
  username = '';
  // will hold a random theme for the chat component
  selectedTheme = '';
  // will hold a random avatar for the chat component
  selectedAvatar = '';
  // Detect when the user clicked on 'START'
  isReady = false;
  // List of themes and avatars to pass one randomly to the chat component
  themes = ['primary', 'warning', 'info', 'success'];
  avatars = [
    'https://mir-s3-cdn-cf.behance.net/user/115/24e8af100183223.59cbd13b396ba.png',
    'https://github.com/Houssem-Selmi/booki/blob/master/Booki-Back-end/upload-dir/default.png?raw=true',
    'https://github.com/Houssem-Selmi/booki/blob/master/Booki-Back-end/upload-dir/hs3.png?raw=true',
    'https://github.com/Houssem-Selmi/booki/blob/master/Booki-Back-end/upload-dir/hs4.png?raw=true',
    'https://github.com/Houssem-Selmi/booki/blob/master/Booki-Back-end/upload-dir/hs5.png?raw=true',
    'https://github.com/Houssem-Selmi/booki/blob/master/Booki-Back-end/upload-dir/hs6.png?raw=true',
    'https://github.com/Houssem-Selmi/booki/blob/master/Booki-Back-end/upload-dir/hs7.png?raw=true'
  ];

  // Select one random avatar and theme for every chat component
  constructor(private _router: Router) {
    this.selectedTheme = this.getTheme();
    this.selectedAvatar = this.getAvatar();
  }

  // Get random theme
  getTheme() {
    return this.themes[Math.floor(Math.random() * this.themes.length)];
  }

  // Get random avatar
  getAvatar() {
    return this.avatars[Math.floor(Math.random() * this.avatars.length)];
  }

  // show the chat component
  chat() {
    this.isReady = true;
  }
}
