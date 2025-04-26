import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private _fb = inject(FormBuilder);
  private _router = inject(Router);

  public form = this._fb.group({
    searchTerm: [null, [Validators.required]],
  });

  get searchTerm() {
    return this.form.get('searchTerm')?.value;
  }

  public onSearch() {
    if (this.form.valid) {
      this._router.navigate(['repositories', this.searchTerm]);
    } else {
      this.form.markAllAsTouched();
    }
  }

  public clearSearchTerm() {
    this.form.get('searchTerm')?.setValue(null);
  }
}
