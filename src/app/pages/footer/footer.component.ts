import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {
  currentYear: number;
  isScrolled: boolean = false;
  arrowUp: string = '';
  private imageKitBase = 'https://ik.imagekit.io/SuvojitDev';

  constructor(
    private cdr: ChangeDetectorRef
  ) {
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit() {
    this.arrowUp = `${this.imageKitBase}/Images/arrow-light.svg?updatedAt=1750509916654`;
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
