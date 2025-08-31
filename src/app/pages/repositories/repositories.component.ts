import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { Repository } from './repositories.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RepositoriesService } from './repositories.service';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from '@components/paginator/paginator.component';
import { RepositoryCardComponent } from '@components/repository-card/repository-card.component';

@Component({
  selector: 'app-repositories',
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatChipsModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    PaginatorComponent,
    RepositoryCardComponent,
  ],
  templateUrl: './repositories.component.html',
  styleUrl: './repositories.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      // Esto elimina el estilo de subíndice en los selectores de Angular Material
      // para evitar que haya un espacio adicional en la parte inferior de los
      // selectores. Esto es un problema conocido en Angular Material y se
      // puede solucionar configurando el valor de subscriptSizing a 'dynamic'.
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic',
      },
    },
  ],
})
export class RepositoriesComponent implements OnInit {
  // Servicios inyectados → por conveniencia, usamos "_" como prefijo para
  // indicar que son servicios y no variables de estado.
  private _repositories = inject(RepositoriesService);
  private _router = inject(Router);
  private _snackbar = inject(MatSnackBar);

  // Variables de estado
  public repositories = signal<Repository[]>([]);
  public queryParams = signal({
    page: 1,
    per_page: 10,
    sort: 'created',
    direction: 'desc',
  });
  public isLoading = signal<boolean>(true);
  public hasNextPage = signal<boolean>(false);

  public username = input.required<string>();

  public sortOptions = [
    { value: 'created', viewValue: 'Fecha de creación' },
    { value: 'updated', viewValue: 'Fecha de actualización' },
    { value: 'pushed', viewValue: 'Fecha de último push' },
    { value: 'full_name', viewValue: 'Nombre completo' },
  ];

  public orderOptions = [
    { value: 'asc', viewValue: 'Ascendente' },
    { value: 'desc', viewValue: 'Descendente' },
  ];

  public perPageOptions = [5, 10, 25, 50, 100];

  /**
   * La función `ngOnInit` se ejecuta cuando el componente se inicializa. Verifica
   * si se ha proporcionado un nombre de usuario y, si no, muestra un mensaje de
   * error y navega a la ruta raíz ('/'). Luego, llama a la función
   * `getRepositories` para obtener los repositorios del usuario.
   */
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

  /**
   * La función `goToHome` navega a la ruta raíz ('/') utilizando el enrutador
   * de Angular, con una animación de transición de vista si está disponible.
   */
  public goToHome(): void {
    if (document.startViewTransition) {
      // Usamos startViewTransition para animar la navegación de regreso
      document.startViewTransition(() => {
        this._router.navigate(['/']);
      });
    } else {
      // Fallback para navegadores que no soportan view transitions
      this._router.navigate(['/']);
    }
  }

  /**
   * La función `getRepositories` obtiene los repositorios del servicio
   * `RepositoriesService` y actualiza la señal `repositories` con la
   * respuesta. También maneja la paginación y muestra un mensaje de error si
   * no se encuentran repositorios.
   */
  public getRepositories(): void {
    this.isLoading.set(true);
    this._repositories
      .getRepositories(this.username(), this.queryParams())
      .subscribe({
        next: (response) => {
          this.repositories.set(response);
          // Determinar si hay más páginas basado en si recibimos el número
          // máximo de elementos por página debido a que la API no proporciona
          // un total de elementos y no podemos calcularlo a partir de la
          //  respuesta.
          this.hasNextPage.set(
            response.length >= this.queryParams().per_page
          );
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

  /**
   * La función handlePageChange actualiza el parámetro de página en los
   * parámetros de consulta, establece los parámetros actualizados y luego
   * obtiene los repositorios.
   * @param {number} page - La función `handlePageChange` toma un parámetro
   * `page` de tipo `number`, que representa el número de página al que se
   * desea navegar. La función actualiza los parámetros de consulta con el
   * nuevo número de página y luego obtiene los repositorios basados en los
   * parámetros actualizados.
   */
  public handlePageChange(page: number): void {
    const params = { ...this.queryParams() };
    params.page = page;
    this.queryParams.set(params);
    this.getRepositories();
  }

  /**
   * La función `queryParams` devuelve los parámetros de consulta actuales
   * como un objeto.
   * @returns Los parámetros de consulta actuales como un objeto.
   */
  public changeSort(sort: string): void {
    const params = { ...this.queryParams() };
    params.sort = sort;
    params.page = 1;
    this.queryParams.set(params);
    this.getRepositories();
  }

  /**
   * La función `changeOrder` actualiza el orden de los parámetros de
   * consulta y vuelve a cargar los repositorios.
   * @param {string} order - La función `changeOrder` toma un parámetro
   * `order` de tipo `string`, que representa el nuevo orden (ascendente o
   * descendente) para los parámetros de consulta. Actualiza los parámetros
   * de consulta y vuelve a cargar los repositorios.
   */
  public changeOrder(order: 'asc' | 'desc'): void {
    const params = { ...this.queryParams() };
    params.direction = order;
    params.page = 1;
    this.queryParams.set(params);
    this.getRepositories();
  }

  /**
   * La función `changePerPage` actualiza el número de elementos por página
   * en los parámetros de consulta y vuelve a cargar los repositorios.
   * @param {number} perPage - La función `changePerPage` toma un parámetro
   * `perPage` de tipo `number`, que representa el nuevo número de elementos
   * por página. Actualiza los parámetros de consulta y vuelve a cargar los
   * repositorios.
   */
  public changePerPage(perPage: number): void {
    const params = { ...this.queryParams() };
    params.per_page = perPage;
    params.page = 1;
    this.queryParams.set(params);
    this.getRepositories();
  }
}
