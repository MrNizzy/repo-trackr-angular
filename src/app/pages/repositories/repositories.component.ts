import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { repositories, RepositoriesResponse } from './repositories.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RepositoriesService } from './repositories.service';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-repositories',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatChipsModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    DatePipe,
  ],
  templateUrl: './repositories.component.html',
  styleUrl: './repositories.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoriesComponent implements OnInit {
  private _repositories = inject(RepositoriesService);
  private _router = inject(Router);
  private _snackbar = inject(MatSnackBar);
  public repositories = signal<RepositoriesResponse>(repositories);
  public isLoading = signal<boolean>(true);

  public username = input.required<string>();

  ngOnInit(): void {
    if (!this.username()) {
      this._snackbar.open(
        'No se ha proporcionado un nombre de usuario',
        'Cerrar',
        {
          duration: 3000,
        }
      );
      this._router.navigate(['/']);
    }
    this.getRepositories();
  }

  public goToHome(): void {
    this._router.navigate(['/']);
  }

  public getRepositories(): void {
    this.isLoading.set(true);
    this._repositories.getRepositories(this.username()).subscribe({
      next: (response) => {
        this.repositories.set(response);
        this.isLoading.set(false);
      },
      error: () => {
        this._snackbar.open(
          'No se han encontrado repositorios para el usuario ' +
            this.username() +
            '.',
          'Cerrar',
          {
            duration: 3000,
          }
        );
        this._router.navigate(['/']);
      },
    });
  }
}
