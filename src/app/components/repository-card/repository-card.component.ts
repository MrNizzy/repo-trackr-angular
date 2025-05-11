import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { DatePipe } from '@angular/common';
import { Repository } from '@pages/repositories/repositories.model';
import { ScrollFadeInDirective } from '@directives/scroll-fade-in.directive';
import { MatButtonModule } from '@angular/material/button';
import { LanguageIconComponent } from '@components/language-icon/language-icon.component';

@Component({
  selector: 'app-repository-card',
  imports: [
    MatCardModule,
    MatIconModule,
    LanguageIconComponent,
    MatDividerModule,
    DatePipe,
    ScrollFadeInDirective,
    MatButtonModule,
  ],
  templateUrl: './repository-card.component.html',
  styleUrl: './repository-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoryCardComponent {
  public readonly repository = input.required<Repository>();
}
