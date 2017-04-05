import { Injectable } from '@angular/core';
import { Message } from '../../models/message.model';
import { STOP_WORDS } from '../../constants/stopWords';

@Injectable()
export class SearchMessagesService {

  messages: Message[] = [];
  private filteredMessages: Message[] = [];
  displayedMessages: Message[] = [];

  searchTerm = '';
  showMoreMessages = false;

  constructor() { }

  reset = () => {
    this.messages = [];
    this.filteredMessages = [];
    this.displayedMessages = [];
    this.searchTerm = '';
    this.showMoreMessages = false;
  };

  updateSearch = () => {
    if (this.searchTerm.trim().length !== 0) {
      if (STOP_WORDS.indexOf(this.searchTerm.trim()) === -1) {
        this.filteredMessages = this.messages
          .filter(announcement => announcement.content.includes(this.searchTerm.trim()));
        if (this.filteredMessages.length > 10) {
          this.displayedMessages = this.filteredMessages.slice(this.filteredMessages.length - 10);
          this.showMoreMessages = true;
        } else {
          this.displayedMessages = this.filteredMessages;
          this.showMoreMessages = false;
        }
      }
    } else {
      this.filteredMessages = this.messages;
      this.displayedMessages = this.filteredMessages;
      this.showMoreMessages = false;
    }
  };

  loadMoreMessagesButtonClicked = () => {
    if (this.displayedMessages.length + 10 < this.filteredMessages.length) {
      this.displayedMessages = this.filteredMessages.slice(this.filteredMessages.length - this.displayedMessages.length - 10)
    } else {
      this.displayedMessages = this.filteredMessages;
      this.showMoreMessages = false;
    }
  };

}
