import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
  isDark: boolean = true;
  moonIconUrl: string = '';
  sunIconUrl: string = '';
  scrollProgress: number = 0;
  isScrolling: boolean = false;
  private scrollTimeout: any;

  private imageKitBase = 'https://ik.imagekit.io/SuvojitDev';

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.darkNLightTheme();
  }

  darkNLightTheme() {
    this.moonIconUrl = `${this.imageKitBase}/Images/moon-dark.svg?updatedAt=1750510171511`;
    this.sunIconUrl = `${this.imageKitBase}/Images/sun-light.svg?updatedAt=1750510171422`;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      this.isDark = false;
    } else {
      this.isDark = true;
    }
    document.documentElement.classList.toggle('dark', this.isDark);
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    document.documentElement.classList.toggle('dark', this.isDark);
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight || 0;
    const clientHeight = document.documentElement.clientHeight || 0;

    const scrollableHeight = scrollHeight - clientHeight;
    if (scrollableHeight > 0) {
      const scrollPercent = (scrollTop / scrollableHeight) * 100;
      this.scrollProgress = Math.min(100, Math.max(0, Math.round(scrollPercent)));
    } else {
      this.scrollProgress = 0;
    }

    // 🟢 NEW: Scrolling state logic
    this.isScrolling = true;

    // Clear the previous timeout if the user keeps scrolling
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    // Set a timer to hide the effect 150ms after the user stops scrolling
    this.scrollTimeout = setTimeout(() => {
      this.isScrolling = false;
      this.cdr.markForCheck(); // Update UI when scrolling stops
    }, 150);

    this.cdr.markForCheck();
  }
}