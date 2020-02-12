import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule }    from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatModule } from './chat/chat.module';
import { CustomTextService } from "./chat/custom-text.service";

@NgModule({
  declarations: [
	AppComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
	  AppRoutingModule,
	  ChatModule
  ],
  providers: [HttpClientModule, CustomTextService],
  bootstrap: [AppComponent]
})
export class AppModule { }
