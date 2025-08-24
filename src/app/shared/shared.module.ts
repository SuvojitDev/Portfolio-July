import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../pages/navbar/navbar.component';
import { FooterComponent } from '../pages/footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
@NgModule({
  declarations: [NavbarComponent, FooterComponent, LoaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgOptimizedImage
  ],
  exports: [
    NavbarComponent, 
    FooterComponent,
    LoaderComponent 
  ]
})
export class SharedModule { }
