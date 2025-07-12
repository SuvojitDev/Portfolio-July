import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../pages/navbar/navbar.component';
import { FooterComponent } from '../pages/footer/footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavbarComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    NavbarComponent, 
    FooterComponent,
  ]
})
export class SharedModule { }
