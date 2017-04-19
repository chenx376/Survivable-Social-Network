import { Component, OnInit, OnDestroy, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Subscription } from "rxjs";
import { UserService } from '../../services/user/user.service';
import { NoteService } from '../../services/note/note.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { Note } from '../../models/note.model';
import { STOP_WORDS } from '../../constants/stopWords';



@Component({
  selector: 'app-note',
  templateUrl: 'note.component.html',
  styleUrls: ['note.component.css']
})
export class NoteComponent implements OnInit, OnDestroy {

  noteContent = '';
  notes: Note[] = [];

  constructor(private router: Router,
              private dialogService: DialogService,
              private viewContainerRef: ViewContainerRef,
              private route: ActivatedRoute,
              private userService: UserService,
              private noteService: NoteService,
              private elementRef: ElementRef) { }

  ngOnInit() {
    this.noteService.getNotes()
      .subscribe(notes => {
        this.notes = notes;
      });
  }

  sendnote = () => {
    this.noteService.publishNote(this.noteContent)
      .subscribe(
        () => {
          this.noteContent = '';
          this.dialogService.openAlert(this.viewContainerRef, 'Success', 'Sucess').subscribe(() => {
            location.reload();
          });

        },
        err => this.dialogService.openAlert(this.viewContainerRef, 'Error', err.message)
      )

  };

  ngOnDestroy() {

    }

}


