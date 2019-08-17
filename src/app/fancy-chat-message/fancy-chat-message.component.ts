import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-fancy-chat-message',
  templateUrl: './fancy-chat-message.component.html',
  styleUrls: ['./fancy-chat-message.component.css', '../shared-styles.css']
})
export class FancyChatMessageComponent implements OnInit {

  @Input() text: string;
  @Input() date: any;
  @Input() owner: boolean;
  @Input() colorBackRight: string;
  @Input() colorFontRight: string;
  @Input() colorBackLeft: string;
  @Input() colorFontLeft: string;


  constructor() { }

  ngOnInit() {
  }

}
