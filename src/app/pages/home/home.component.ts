import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  myProfileImage: string = '';

  techStacks: {
    category: string;
    skills: { name: string; imgUrl: string }[];
  }[] = [];

  contactLinks: {
    category: string;
    links: { name: string; href: string; iconUrl: string; alt: string }[];
  }[] = [];

  private imageKitBase = 'https://ik.imagekit.io/SuvojitDev';

  // https://ik.imagekit.io/SuvojitDev/Images/mylogowebp.webp?updatedAt=1752349838072
  // https://ik.imagekit.io/SuvojitDev/Images/mylogoavif.avif?updatedAt=1752349838584

  constructor() {}

  ngOnInit() {
    // Profile Image
    // this.myProfileImage = `${this.imageKitBase}/Images/mylogoavif.avif?updatedAt=1752349838584`;
    this.myProfileImage = `${this.imageKitBase}/Images/mylogowebp.webp?updatedAt=1752349838072`;
    // console.log('this.myProfileImage:', this.myProfileImage);
    // Tech Stacks
    const skillData = [
      {
        category: 'Frontend',
        skills: [
          { name: 'HTML', file: 'html5' },
          { name: 'CSS', file: 'css3' },
          { name: 'JavaScript', file: 'javascript' },
          { name: 'Angular', file: 'angular' },
          { name: 'TypeScript', file: 'typescript' },
          { name: 'Bootstrap', file: 'bootstrap' },
          { name: 'Tailwind CSS', file: 'tailwindcss' },
          { name: 'SCSS', file: 'sass' },
          { name: 'RxJS', file: 'rxjs' }
        ]
      },
      {
        category: 'Backend',
        skills: [
          { name: 'Node.js', file: 'nodeJS' },
          { name: 'Express.js', file: 'expressJS' },
          { name: 'GraphQL', file: 'graphQL' }
        ]
      },
      {
        category: 'Database',
        skills: [
          { name: 'MongoDB', file: 'mongoDb' },
          { name: 'Supabase', file: 'supabase' }
        ]
      },
      {
        category: 'Tools & Platforms',
        skills: [
          { name: 'vscode', file: 'vscode' },
          { name: 'Git', file: 'git' },
          { name: 'Github', file: 'github' },
          { name: 'Github Action', file: 'github-actions' },
          { name: 'GitLab', file: 'gitlab' },
          { name: 'Postman', file: 'postman' },
          { name: 'Vercel', file: 'vercel' },
          { name: 'Netlify', file: 'netlify-light' }
        ]
      }
    ];

    this.techStacks = skillData.map(group => ({
      category: group.category,
      skills: group.skills.map(skill => ({
        name: skill.name,
        imgUrl: `${this.imageKitBase}/Skills/${skill.file}.svg?tr=w-48,h-48`
      }))
    }));

    const contactLinks = [
      {
        category: 'Get in Touch',
        links: [
          {
            name: 'Email Me',
            href: 'mailto:suvojit.modak109@gmail.com',
            iconFile: 'Mail-light',
            alt: 'Mail icon'
          },
          {
            name: 'LinkedIn',
            href: 'https://in.linkedin.com/in/suvojit-modak-928b69147',
            iconFile: 'linkedIn-light',
            alt: 'LinkedIn Page'
          },
          {
            name: 'Twitter',
            href: 'https://twitter.com/suvojit_modak',
            iconFile: 'x-light',
            alt: 'Twitter Page'
          },
          {
            name: 'Download Resume',
            href: 'https://ik.imagekit.io/SuvojitDev/Resume/Suvojit_Modak_Frontend_Developer_Resume_1yr_Experience.pdf?updatedAt=1752344686829',
            iconFile: 'down-light',
            alt: 'Resume Icon'
          }
        ]
      }
    ];

    this.contactLinks = contactLinks.map(group => ({
      category: group.category,
      links: group.links.map(link => ({
        name: link.name,
        href: link.href,
        alt: link.alt,
        iconUrl: `${this.imageKitBase}/Images/${link.iconFile}.svg?tr=w-24,h-24`
      }))
    }));
  }

  trackByCategory(index: number, item: any) {
    return item.category;
  }

  trackBySkillName(index: number, item: any) {
    return item.name;
  }

  ngOnDestroy() {
    console.log('HomeComponent destroyed');
  }
}