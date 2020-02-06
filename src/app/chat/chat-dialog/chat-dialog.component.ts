import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild, HostListener } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ChatService, Message } from '../chat.service';
import { Observable } from 'rxjs';
import { interval, Subject } from 'rxjs';
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
	now: Date = new Date();
	isInActive = false;

	@ViewChild("scrollMe", { static: true })
	private myScrollContainer: ElementRef;
	router: any;

	userActivity:any;
	userInactive: Subject<any> = new Subject();
	  

 
	constructor(public chat: ChatService) {
		
			this.setTimeout();
			this.userInactive.subscribe(() =>
				this.autoTimeMessage('inactive')
			);
			
	}

	ngOnInit() {
		
		this.messages = this.chat.conversation
			.asObservable()
			.pipe(scan((acc, val) => acc.concat(val))
			
		);
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

				// if (EmailValidator.validate(this.formValue)) {
				// 	console.log("This is email");
				// }

				this.chat.converse(this.formValue);
				this.formValue = "";
				this.isChatError = false;
				this.isOpened = true;
				
				setTimeout(
					function () {
						this.isOpened = false;
						this.isLoading = false;
						document
							.querySelector("#target")
							.scrollIntoView({ behavior: "smooth", block: "center" });
					}.bind(this),
					1000
				);
				document
					.querySelector("#target")
					.scrollIntoView({ behavior: "smooth", block: "center" });
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
		} catch (err) { }
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
		
		// interval(100 * 60).subscribe(x => {
		// 	this.autoTimeMessage('inactive');
		// });

		// setTimeout(
		// 	function () {
		// 		this.autoTimeMessage('inactive');
		// 	}.bind(this),
		// 	1000
		// );
		
		this.showMainContent = false;
		interval(5000).subscribe(x => {
			this.showMainContent = true;
			// this.autoTimeMessage('inactive');
		});

	}

	setTimeout() {
		this.userActivity = setTimeout(() => {
			// this.isActive = true ? false : false ? true;

			this.userInactive.next(undefined);
			// console.log('logged out');
		}, 5000);
	  }

	@HostListener("window:mousemove") 
	@HostListener("window:keypress") 
		
	refreshUserState() {
		clearTimeout(this.userActivity);
		// this.isInActive = false;
		// console.log(this.isInActive)
		this.setTimeout();
	}

	autoTimeMessage(option_selection)
	{

		this.showMainContent = false;
		// interval(10).subscribe(x => {
			this.showMainContent = true;
			// this.autoTimeMessage('inactive');
			
			this.formValue = option_selection;
			
			this.sendMessage();
			console.log(this.isInActive);		
		// });
	}
}