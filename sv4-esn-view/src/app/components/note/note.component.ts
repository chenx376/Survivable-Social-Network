import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Subscription } from "rxjs";
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-note',
  templateUrl: 'note.component.html',
  styleUrls: ['note.component.css']
})
export class NoteComponent implements OnInit, OnDestroy {


  private publicChat = false;
  private targetUserId: string;

  @ViewChild('messageList') messageList: ElementRef;

  messageContent = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit() {

  }

  sendnote() {

  }

  ngOnDestroy() {

    }

}


