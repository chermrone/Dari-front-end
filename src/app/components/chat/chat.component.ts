import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TokenStorageService} from "../../auth/token-storage.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  // Holding the chat messages
  // The entered username
  username = '';
  // will hold a random theme for the chat component
  selectedTheme = '';
  // Detect when the user clicked on 'START'
  isReady = false;
  // List of themes and avatars to pass one randomly to the chat component
  themes = ['primary', 'warning', 'info', 'success'];

  // Select one random avatar and theme for every chat component
  constructor(private _router: Router,private tok:TokenStorageService) {
    this.selectedTheme = this.getTheme();
  }

  // Get random theme
  getTheme() {
    return this.themes[Math.floor(Math.random() * this.themes.length)];
  }

  // show the chat component
  chat() {
    this.isReady = true;
  }
  ngOnInit(): void {
    if(this.tok.getUsername()!='')
      this.username=this.tok.getUsername()
  }

}
