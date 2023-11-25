import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interface';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styles: ``,
})
export class CardComponent implements OnInit {
  @Input()
  gif!: Gif;

  ngOnInit(): void {
    if (!this.gif) throw new Error('Expected gif property is not defined');
  }
}
