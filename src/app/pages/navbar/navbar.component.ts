import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

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

  private imageKitBase = 'https://ik.imagekit.io/SuvojitDev';

  ngOnInit(): void {
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
}