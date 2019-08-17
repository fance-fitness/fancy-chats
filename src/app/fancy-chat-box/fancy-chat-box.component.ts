import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fancy-chat-box',
  templateUrl: './fancy-chat-box.component.html',
  styleUrls: ['./fancy-chat-box.component.css']
})
export class FancyChatBoxComponent implements OnInit {

  @Input() messages: any[];
  @Input() colorBackRight = '#007bff';
  @Input() colorFontRight = '#ffffff';
  @Input() colorBackLeft = '#f8f9fa';
  @Input() colorFontLeft = '#343a40';
  @Input() width = '300px';
  @Input() height = '550px';
  @Input() border = '1px solid black';

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
