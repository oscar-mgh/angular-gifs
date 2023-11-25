import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styles: ``,
})
export class LazyImageComponent implements OnInit {
  @Input()
  url!: string;

  @Input()
  alt: string = '';

  isLoading: boolean = true;

  ngOnInit(): void {
    if (!this.url) throw new Error('URL property is required');
  }

  onLoad() {
    this.isLoading = false;
  }
}
