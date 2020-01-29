import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ChatService, Message } from '../chat.service';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/scan';
import { scan } from 'rxjs/operators';

import * as EmailValidator from 'email-validator';

@Component({
  selector: "app-chat-dialog",
  templateUrl: "./chat-dialog.component.html",
  styleUrls: ["./chat-dialog.component.css"]
})
export class ChatDialogComponent implements OnInit, AfterViewChecked {
  messages: Observable<Message[]>;
  formValue: string;
  isChatError = false;
  isOpened = false;
  isLoading = false;
  showMainContent: Boolean = true;
  now: Date;

  @ViewChild("scrollMe", { static: true })
  private myScrollContainer: ElementRef;
  router: any;

  constructor(public chat: ChatService, private elementref: ElementRef) {
	  	// setInterval(() => {
		// 	this.now = new Date();
		// }, 1);
  }

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
      if (!this.formValue.trim().length) {
        this.isChatError = true;
        return;
      } else if (
        this.formValue !== "" ||
        this.formValue.length !== 0 ||
        this.formValue == undefined
      ) {
        this.isLoading = true;
        if (EmailValidator.validate(this.formValue)) {
          console.log("This is email");
        }
		this.chat.converse(this.formValue);
        this.formValue = "";
        this.isChatError = false;
        this.isOpened = true;

        setTimeout(
          function() {
            this.isOpened = false;
            this.isLoading = false;
            document
              .querySelector("#target")
              .scrollIntoView({ behavior: "smooth", block: "center" });
          }.bind(this),
          1000
        );
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
	  this.now = new Date;
    console.log(option_selection);
    this.showMainContent = true;
    this.formValue = option_selection;
    this.sendMessage();
  }

  getDFData(evt) {
    const option_selection = evt.target.getAttribute("value");
    console.log(option_selection);
    this.showMainContent = true;

    if (option_selection != null) {
      this.formValue = option_selection;
      this.sendMessage();
    }
  }
  getTextData(option_selection) {
    this.showMainContent = true;
    this.formValue = option_selection;
    this.sendMessage();
  }
  reset_data() {
    this.showMainContent = false;
  }
}
