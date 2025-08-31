import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { LANGUAGE_MAPPINGS } from './models/language.types';
import { LANGUAGE_ICONS } from './models/icon.types';

/**
 * Componente para mostrar iconos de lenguajes de programación
 *
 * @example
 * <app-language-icon [language]="'typescript'" [size]="{width: 24, height: 24}"></app-language-icon>
 */
@Component({
  selector: 'app-language-icon',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (normalizedLanguage()) { @let lang = normalizedLanguage()!; @if
    (hasIcon(lang)) {
    <img
      [src]="getIconPath(lang)"
      [width]="size().width"
      [height]="size().height"
      [alt]="lang"
      aria-hidden="true"
    />
    } @else {
    <div
      class="generic-language"
      role="img"
      [attr.aria-label]="'Lenguaje ' + lang"
    >
      {{ lang }}
    </div>
    } }
  `,
  styles: [
    `
      :host {
        display: inline-block;
      }
      .generic-language {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: currentColor;
      }
    `,
  ],
})
export class LanguageIconComponent {
  /** Nombre del lenguaje de programación */
  language = input<string | null>(null);

  /** Tamaño del icono */
  size = input<{ width: number; height: number }>({ width: 16, height: 16 });
  /**
   * Normaliza el nombre del lenguaje para asegurar consistencia en la visualización
   * @returns El nombre normalizado o el original si no hay mapeo
   */
  protected normalizedLanguage = computed(() => {
    if (!this.language()) return null;

    const lang = this.language()?.toLowerCase();
    return LANGUAGE_MAPPINGS[lang || ''] || this.language();
  });

  /**
   * Verifica si existe un icono para el lenguaje especificado
   * @param language Nombre del lenguaje
   * @returns true si existe un icono, false en caso contrario
   */
  protected hasIcon(language: string): boolean {
    return !!LANGUAGE_ICONS[language];
  }

  /**
   * Obtiene la ruta del icono para el lenguaje especificado
   * @param language Nombre del lenguaje
   * @returns Ruta del icono SVG
   */
  protected getIconPath(language: string): string {
    return LANGUAGE_ICONS[language] || '';
  }
}
