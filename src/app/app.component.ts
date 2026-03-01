import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'Suvojit Modak - Portfolio';

  @ViewChild('customCursor', { static: false }) customCursor!: ElementRef;
  @ViewChild('customCursorDot', { static: false }) customCursorDot!: ElementRef; // Grab the dot
  private unlistenMouseMove!: () => void;
  private unlistenMouseLeave!: () => void;
  private unlistenMouseEnter!: () => void;

  constructor(
    private renderer: Renderer2,
    private ngZone: NgZone // Inject NgZone for performance
  ) { }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      let hasMoved = false;

      this.unlistenMouseMove = this.renderer.listen('document', 'mousemove', (e: MouseEvent) => {
        if (!this.customCursor || !this.customCursorDot) return;

        const cursorEl = this.customCursor.nativeElement;
        const dotEl = this.customCursorDot.nativeElement;

        // 1. Fade in both cursors on the very first mouse movement
        if (!hasMoved) {
          hasMoved = true;
          this.renderer.addClass(cursorEl, 'visible');
          this.renderer.addClass(dotEl, 'visible');
        }

        // 2. Always track the inner dot exactly to the mouse pointer
        const dotSize = 6;
        const dotX = e.clientX - (dotSize / 2);
        const dotY = e.clientY - (dotSize / 2);
        this.renderer.setStyle(dotEl, 'transform', `translate3d(${dotX}px, ${dotY}px, 0)`);

        // 3. Handle the outer cursor logic
        const target = e.target as HTMLElement;
        const isHoveringInteractive = target.closest('a, button, input, textarea, select');

        if (isHoveringInteractive) {
          // --- STICKY / STRETCHING MODE ---
          const rect = isHoveringInteractive.getBoundingClientRect();
          const padding = 10;

          this.renderer.setStyle(cursorEl, 'width', `${rect.width + padding}px`);
          this.renderer.setStyle(cursorEl, 'height', `${rect.height + padding}px`);

          const x = rect.left - (padding / 2);
          const y = rect.top - (padding / 2);
          this.renderer.setStyle(cursorEl, 'transform', `translate3d(${x}px, ${y}px, 0)`);

          this.renderer.addClass(cursorEl, 'sticky-mode');

          // Optional: Hide the dot while hovering the button
          this.renderer.addClass(dotEl, 'hidden-on-hover');
        } else {
          // --- NORMAL TRACKING MODE ---
          const size = 20;
          const x = e.clientX - (size / 2);
          const y = e.clientY - (size / 2);

          this.renderer.setStyle(cursorEl, 'width', `${size}px`);
          this.renderer.setStyle(cursorEl, 'height', `${size}px`);
          this.renderer.setStyle(cursorEl, 'transform', `translate3d(${x}px, ${y}px, 0)`);

          this.renderer.removeClass(cursorEl, 'sticky-mode');
          this.renderer.removeClass(dotEl, 'hidden-on-hover');
        }
      });

      // Hide cursors when mouse leaves the browser window
      this.unlistenMouseLeave = this.renderer.listen('document', 'mouseleave', () => {
        if (this.customCursor && this.customCursorDot) {
          hasMoved = false;
          this.renderer.removeClass(this.customCursor.nativeElement, 'visible');
          this.renderer.removeClass(this.customCursorDot.nativeElement, 'visible');
        }
      });

      // Show cursors when mouse re-enters the browser window
      this.unlistenMouseEnter = this.renderer.listen('document', 'mouseenter', () => {
        if (this.customCursor && this.customCursorDot && hasMoved) {
          this.renderer.addClass(this.customCursor.nativeElement, 'visible');
          this.renderer.addClass(this.customCursorDot.nativeElement, 'visible');
        }
      });
    });
  }

  ngOnDestroy() {
    // Clean up all listeners to prevent memory leaks
    if (this.unlistenMouseMove) this.unlistenMouseMove();
    if (this.unlistenMouseLeave) this.unlistenMouseLeave();
    if (this.unlistenMouseEnter) this.unlistenMouseEnter();
  }
}
