import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ChatService, Message } from '../chat.service';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/scan';
import { scan } from 'rxjs/operators';

import * as EmailValidator from 'email-validator';

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit, AfterViewChecked {
  messages: Observable<Message[]>;
  formValue: string;
  isChatError = false;

  @ViewChild('scrollMe', { static: true })
  private myScrollContainer: ElementRef;
  router: any;

  constructor(public chat: ChatService, private elementref: ElementRef) {}

  ngOnInit() {
	this.messages = this.chat.conversation
      .asObservable()
      .pipe(scan((acc, val) => acc.concat(val)));
  }

  sendMessage() {
    if (this.formValue === undefined) {
      this.isChatError = true;
      return;
    } else {
      if (
        this.formValue !== '' ||
        this.formValue.length !== 0 ||
        this.formValue == undefined
      ) {
        if (EmailValidator.validate(this.formValue)) {
          console.log('This is email');
        }
        this.chat.converse(this.formValue);
        this.formValue = '';
        this.isChatError = false;
        document
          .querySelector('#target')
          .scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        this.isChatError = true;
        return;
      }
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  getData(option_selection) {
    console.log(option_selection);
    this.formValue = option_selection;
    this.sendMessage();
  }

  getDFData(evt) {
    const option_selection = evt.target.getAttribute('value');
    console.log(option_selection);

    if (option_selection != null) {
      this.formValue = option_selection;
      this.sendMessage();
    }
  }
}
