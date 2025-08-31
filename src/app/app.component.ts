import { Component, HostListener, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'repo-trackr-angular';
  showScrollButton = signal<boolean>(false);

  // Distancia en píxeles que el usuario debe bajar para mostrar el botón
  private readonly scrollDistance = 300;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (window.scrollY > this.scrollDistance) {
      this.showScrollButton.set(true);
    } else {
      this.showScrollButton.set(false);
    }
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
