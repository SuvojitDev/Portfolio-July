import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
// import { NavbarComponent } from '../navbar/navbar.component';
// import { FooterComponent } from '../footer/footer.component';
// import { LucideAngularModule, CodeXml, Server, Database, PanelsTopLeft, FileBadge, Mail, Linkedin, Twitter, Download, Sun, Moon, Wrench, ArrowUp           } from 'lucide-angular';
import { NgOptimizedImage } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    // NavbarComponent,
    // FooterComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule
    // LucideAngularModule.pick({ CodeXml, Server, Database, PanelsTopLeft, FileBadge, Mail,Linkedin, Twitter, Download, Sun, Moon, Wrench, ArrowUp           },)
  ]
})
export class HomeModule { }
