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

@Component({
  selector: 'app-repositories',
  imports: [],
  templateUrl: './repositories.component.html',
  styleUrl: './repositories.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoriesComponent implements OnInit {
  private _repositories = inject(RepositoriesService);
  private _router = inject(Router);
  private _snackbar = inject(MatSnackBar);
  public repositories = signal<RepositoriesResponse>(repositories);

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

  public getRepositories(): void {
    this._repositories.getRepositories(this.username()).subscribe({
      next: (response) => {
        this.repositories.set(response);
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
