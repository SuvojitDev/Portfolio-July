import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { allowedEmailValidator } from '../../shared/helpers/temp-email.validator';
import { GoogleFormService } from 'src/app/shared/services/google-form.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  myProfileImage: string = '';
  isDark: boolean = false;

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

  contactForm!: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private googleForm: GoogleFormService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.createContactForm();
    // Profile Image
    // this.myProfileImage = `${this.imageKitBase}/Images/mylogoavif.avif?updatedAt=1752349838584`;
    this.myProfileImage = `${this.imageKitBase}/Images/mylogowebp.webp?updatedAt=1752349838072`;
   
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

  createContactForm() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[A-Za-z\s]+$/)]],
      email: ['', [Validators.required, Validators.email, allowedEmailValidator, this.emailValidator, Validators.maxLength(40),]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  submitForm() {
    this.submitted = true;
    this.contactForm.get('email')?.updateValueAndValidity();
    console.log('Form submitted', this.contactForm.value);
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const formData = this.contactForm.value;
    // // console.log('Form submitted:', formData);
    // this.googleForm.submit(formData.name, formData.email, formData.message);
    // this.contactForm.reset();
    // this.submitted = false;
    this.googleForm.submit(formData.name, formData.email, formData.message)
      .then(() => {
        this.toastr.success('Your message has been sent!', 'Success');
        this.contactForm.reset();
        this.submitted = false;
      })
      .catch(() => {
        this.toastr.error('Something went wrong. Please try again.', 'Error');
      });
  }

  trackByCategory(index: number, item: any) {
    return item.category;
  }

  trackBySkillName(index: number, item: any) {
    return item.name;
  }

  emailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }
    if (!value.includes('@')) {
      return { missingAtSymbol: true };
    }
    if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/.test(value)) {
      return { invalidEmail: true };
    }
    return null;
  }

  allowOnlyLetters(event: KeyboardEvent) {
    const regex = /^[a-zA-Z\s]*$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  }

  blockEvent(event: ClipboardEvent | DragEvent) {
    event.preventDefault();
  }

  // This block the browser shortcuts like F12, Ctrl+Shift+I/J/C/U, and view source
  // @HostListener('document:contextmenu', ['$event'])
  // @HostListener('document:keydown', ['$event'])
  // handleBrowserShortcuts(event: MouseEvent | KeyboardEvent): boolean {
  //   if (
  //     event instanceof KeyboardEvent &&
  //     (
  //       event.key === 'F12' ||
  //       (event.ctrlKey && event.shiftKey && ['i', 'j', 'c', 'u'].includes(event.key.toLowerCase())) || // covers Ctrl+Shift+I/J/C/U
  //       (event.ctrlKey && event.key.toLowerCase() === 'u') // view source
  //     )
  //   ) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //     return false;
  //   }

  //   if (event instanceof MouseEvent) {
  //     event.preventDefault();
  //     return false;
  //   }

  //   return true;
  // }

  ngOnDestroy() {
    console.log('HomeComponent destroyed');
  }
}