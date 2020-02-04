import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';
import { ChatService } from './chat.service';
import { SafeHtmlPipePipe } from './chat-dialog/safe-html-pipe.pipe';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [ChatDialogComponent, SafeHtmlPipePipe],
  exports: [ChatDialogComponent],
  providers: [ChatService]
})
export class ChatModule {}
