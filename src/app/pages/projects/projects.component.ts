import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

interface Project {
  title: string;
  description: string;
  image: string;
  liveUrl: string;
  isLive: boolean;
  tags?: string[];
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  isDark: boolean = true;

  private imageKitBase = 'https://ik.imagekit.io/SuvojitDev';
  // private staticBase = 'https://imageplaceholder.net';
  private staticBase = 'https://ik.imagekit.io/SuvojitDev';

  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {
    this.projects = [
      {
        title: 'Audio to Text Application',
        description: 'An application that converts audio files to text using AssemblyAI\'s transcription API.',
        image: `${this.imageKitBase}/Images/audioToTxt-project.png?updatedAt=1750503084872`,
        liveUrl: 'https://text-to-audio-assemblyai-challenge.vercel.app/',
        isLive: true,
        tags: ['Angular', 'TypeScript', 'AssemblyAI', 'Tailwind']
      },
      {
        title: 'Parking Management System',
        description: 'A web-based parking management system built with the MEAN stack.',
        image: `${this.imageKitBase}/Images/PMS.png?updatedAt=1757267920357`,
        liveUrl: 'https://pmslive.netlify.app/',
        isLive: true,
        tags: ['MongoDB', 'Express', 'Angular', 'Node.js']
      },
      {
        title: 'Split Bill Application',
        description: 'A mobile-friendly application to split bills among friends and track expenses.',
        image: `${this.staticBase}/Images/splitBill.png?updatedAt=1757743585093`,
        liveUrl: 'https://split-bill-op.netlify.app/',
        isLive: true,
        tags: ['Angular', 'TypeScript', 'Tailwind', 'Netlify']
      },
      {
        title: 'HabitTracker Application',
        description: 'A habit tracking application to help users build and maintain good habits.',
        image: `${this.staticBase}/Images/habitTracker?updatedAt=1757794739162`,
        liveUrl: 'https://gemify-habit-tracker.netlify.app/home',
        isLive: true,
        tags: ['MongoDB', 'Express', 'Angular', 'Node.js']
      },
      {
        title: 'Box Rent Application',
        description: 'An online platform for renting and managing storage boxes with secure access.',
        image: `${this.staticBase}/Images/dummyimg.svg`,
        liveUrl: '',
        isLive: false,
        tags: ['Angular', 'Firebase', 'Stripe', 'Tailwind']
      }
    ];
  }

  trackByTitle(index: number, project: Project): string {
    return project.title;
  }

  goBack(): void {
    this.location.back();
  }
}