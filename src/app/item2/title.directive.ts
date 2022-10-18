import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTitle]'
})
export class TitleDirective {

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.title('40px', 'pointer');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.title('', 'pointer');
  }

  private title(fontSize: string, cursor: string) {
    this.el.nativeElement.style.fontSize = fontSize;
    this.el.nativeElement.style.cursor = cursor;
  }
}
