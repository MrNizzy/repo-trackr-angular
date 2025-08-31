import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Repository } from './repositories.model';

interface QueryParams {
  sort?: string;
  direction?: string;
  page?: number;
  per_page?: number;
}

@Injectable({
  providedIn: 'root',
})
export class RepositoriesService {
  private _http = inject(HttpClient);

  /**
   * Esta función recupera los repositorios para un nombre de usuario dado utilizando una solicitud HTTP GET.
   * @param {string} username - El parámetro `username` es una cadena que representa el nombre de usuario
   * de un usuario para el cual deseas recuperar repositorios.
   * @returns Se devuelve un Observable de tipo Repository[].
   */
  public getRepositories(
    username: string,
    queryParams?: QueryParams
  ): Observable<Repository[]> {
    return this._http.get<Repository[]>(
      environment.apiUrl +
        '/users/' +
        username +
        '/repos?' +
        new URLSearchParams(queryParams as string)
    );
  }
}
