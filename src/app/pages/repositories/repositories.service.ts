import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { RepositoriesResponse } from './repositories.model';

@Injectable({
  providedIn: 'root',
})
export class RepositoriesService {
  private _http = inject(HttpClient);

  /**
   * Esta función recupera los repositorios para un nombre de usuario dado utilizando una solicitud HTTP GET.
   * @param {string} username - El parámetro `username` es una cadena que representa el nombre de usuario
   * de un usuario para el cual deseas recuperar repositorios.
   * @returns Se devuelve un Observable de tipo RepositoriesResponse.
   */
  public getRepositories(username: string): Observable<RepositoriesResponse> {
    return this._http.get<RepositoriesResponse>(
      environment.apiUrl + '/user/' + username
    );
  }
}
