import {Component, Input, OnInit} from '@angular/core';
import {WebsocketService} from '../../services/websocket.service';
import {Message} from '../../models/Message';
import {imguser} from '../../models/imguser';
import {TokenStorageService} from '../../auth/token-storage.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-firstchat',
  templateUrl: './firstchat.component.html',
  styleUrls: ['./firstchat.component.scss']
})
export class FirstchatComponent implements OnInit {
  // Holding the chat messages
  messages: any[] = [];
  username = '';
  theme = '';
  private retrieveResonseuser: imguser[];
  retrievedImageuser: any[] = [];
  private img: string;
  @Input('username')
  set setUsername(value: string) {
    this.username = value;
  }

  @Input('theme')
  set setTheme(value: string) {
    this.theme = value;
  }
mtxt: any;  u: User;

  constructor(private us: UserService, public chatService: WebsocketService, private token: TokenStorageService) {}
  ngOnInit(): void {
    this.username = this.token.getUsername();
    console.log(this.username);
    this.us.getUserByUserName(this.username).subscribe(u1 => {
      this.u = u1;
      console.log(this.u);    this.retrieveResonseuser = this.u.imguser;  console.log(this.u);
      console.log(this.retrieveResonseuser);
      for (const t of this.retrieveResonseuser)
      {this.retrievedImageuser.push('data:image/jpeg;base64,' + t.picByte); console.log(this.retrievedImageuser);
       this.img = 'data:image/jpeg;base64,' + t.picByte;
      }
    });

  }

  // Prepare the chat message then call the chatService method 'sendMessage' to actually send the message
  sendMessage() {
    const obj: Message = {
      text: this.mtxt, avatar: this.u.idUser,
      username: this.username};
    this.chatService.sendMessage(obj);  this.mtxt = '';
  }

}
