import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat/chat.service';

@Component({
  selector: 'app-chatt',
  templateUrl: './chat.component.html',
  styleUrls: ['chat.component.css'],
  providers: [ChatService]
})

export class ChatComponent implements OnInit {

  private chatService: ChatService;

  message: string;

  constructor(chatService: ChatService) {
    this.chatService = chatService;
  }

  ngOnInit() {

  }

  sendMessageClicked = () => {
    this.chatService.broadcastMessage(this.message);
  };

}
