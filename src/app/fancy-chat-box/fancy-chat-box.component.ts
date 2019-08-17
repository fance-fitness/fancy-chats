import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fancy-chat-box',
  templateUrl: './fancy-chat-box.component.html',
  styleUrls: ['./fancy-chat-box.component.css', '../shared-styles.css']
})
export class FancyChatBoxComponent implements OnInit {
  @Input() messages: any[];
  @Input() colorBackRight;
  @Input() colorFontRight;
  @Input() colorBackLeft;
  @Input() colorFontLeft;
  @Input() width;
  @Input() height;
  @Input() border;

  @Output() inputSent = new EventEmitter<string>();

  textInput = '';

  constructor() {}

  ngOnInit() {}

  sendTextInput() {
    if (this.textInput.length > 1) {
      this.inputSent.emit(this.textInput);
      this.textInput = '';
    }
  }

  onKey(event: any) {
    if (event.keyCode === 13) {
      this.sendTextInput();
    }
  }
}
