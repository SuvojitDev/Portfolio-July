import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  currentYear: number;
  isScrolled: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef
  ) {
    this.currentYear = new Date().getFullYear();
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Show the button if the user has scrolled down more than 100px
    this.isScrolled = window.scrollY > 100;
    this.cdr.markForCheck();
  }
}
