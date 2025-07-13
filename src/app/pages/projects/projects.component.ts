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
  private staticBase = 'https://imageplaceholder.net';

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
        image: `${this.staticBase}/600x400`,
        liveUrl: '',
        isLive: false,
        tags: ['MongoDB', 'Express', 'Angular', 'Node.js']
      },
      {
        title: 'Job Portal',
        description: 'A MEAN stack-based job portal allowing employers to post jobs and candidates to apply.',
        image: `${this.staticBase}/600x400`,
        liveUrl: '',
        isLive: false,
        tags: ['Angular', 'Node.js', 'JWT', 'REST API']
      },
      {
        title: 'Box Rent Application',
        description: 'An online platform for renting and managing storage boxes with secure access.',
        image: `${this.staticBase}/600x400`,
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