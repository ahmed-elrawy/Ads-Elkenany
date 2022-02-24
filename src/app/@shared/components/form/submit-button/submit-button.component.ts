import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss']
})
export class SubmitButtonComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() loading!: boolean;
  @Input() title!: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
