import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepositoryCardComponent } from './repository-card.component';
import { By } from '@angular/platform-browser';
import { Repository } from '@pages/repositories/repositories.model';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ScrollFadeInDirective } from '@directives/scroll-fade-in.directive';
import { LanguageIconComponent } from '@components/language-icon/language-icon.component';
import { CUSTOM_ELEMENTS_SCHEMA, Component, input } from '@angular/core';

@Component({
  selector: 'app-language-icon',
  standalone: true,
  template: '<div class="language-icon-mock">{{ language() }}</div>',
})
class LanguageIconMockComponent {
  language = input<string>();
  size = input<{ width: number; height: number }>();
}

describe('RepositoryCardComponent', () => {
  let component: RepositoryCardComponent;
  let fixture: ComponentFixture<RepositoryCardComponent>;
  const mockRepository: Repository = {
    name: 'repo-test',
    full_name: 'MrNizzy/repo-test',
    description: 'Test repository description',
    url: 'https://github.com/MrNizzy/repo-test',
    stars: 42,
    forks: 13,
    language: 'TypeScript',
    created_at: new Date().toDateString(),
    updated_at: new Date().toDateString(),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RepositoryCardComponent,
        MatCardModule,
        MatIconModule,
        MatDividerModule,
        MatButtonModule,
        DatePipe,
        LanguageIconMockComponent,
      ],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideComponent(RepositoryCardComponent, {
        remove: { imports: [LanguageIconComponent, ScrollFadeInDirective] },
        add: { imports: [LanguageIconMockComponent] },
      })
      .compileComponents();
    fixture = TestBed.createComponent(RepositoryCardComponent);
    component = fixture.componentInstance;
    // En Angular 19, los inputs se manejan como propiedades de TestObject
    fixture.componentRef.setInput('repository', mockRepository);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display repository name in card title', () => {
    const titleElement = fixture.debugElement.query(By.css('mat-card-title'));
    expect(titleElement.nativeElement.textContent.trim()).toBe(
      mockRepository.name
    );
  });

  it('should display repository full name in card subtitle', () => {
    const subtitleElement = fixture.debugElement.query(
      By.css('mat-card-subtitle a')
    );
    expect(subtitleElement.nativeElement.textContent.trim()).toBe(
      mockRepository.full_name
    );
  });

  it('should display correct repository URL in links', () => {
    const links = fixture.debugElement.queryAll(By.css('a[href]'));
    links.forEach((link) => {
      expect(link.nativeElement.getAttribute('href')).toBe(mockRepository.url);
    });
  });

  it('should display repository description when available', () => {
    const descriptionElement = fixture.debugElement.query(
      By.css('mat-card-content p')
    );
    expect(descriptionElement.nativeElement.textContent.trim()).toBe(
      mockRepository.description
    );
  });
  it('should display "Sin descripción" when description is null', () => {
    // Actualizar el mock con descripción nula
    const repoWithoutDesc: Repository = {
      ...mockRepository,
      description: null,
    };
    fixture.componentRef.setInput('repository', repoWithoutDesc);
    fixture.detectChanges();

    const descriptionElement = fixture.debugElement.query(
      By.css('mat-card-content p.no-description')
    );
    expect(descriptionElement.nativeElement.textContent.trim()).toBe(
      'Sin descripción'
    );
  });

  it('should display repository stats correctly', () => {
    const statsElements = fixture.debugElement.queryAll(
      By.css('.repo-stats .stat span')
    );
    expect(statsElements[0].nativeElement.textContent.trim()).toBe(
      mockRepository.stars.toString()
    );
    expect(statsElements[1].nativeElement.textContent.trim()).toBe(
      mockRepository.forks.toString()
    );
    expect(statsElements[2].nativeElement.textContent.trim()).toBe(
      mockRepository.language
    );
  });
  it('should not display language section when language is null', () => {
    // Actualizar el mock con lenguaje nulo
    const repoWithoutLanguage: Repository = {
      ...mockRepository,
      language: null,
    };
    fixture.componentRef.setInput('repository', repoWithoutLanguage);
    fixture.detectChanges();

    const languageElements = fixture.debugElement.queryAll(
      By.css('.repo-stats .stat app-language-icon')
    );
    expect(languageElements.length).toBe(0);
  });

  it('should format dates correctly', () => {
    const dateElements = fixture.debugElement.queryAll(By.css('.repo-dates p'));

    // Las fechas deben estar formateadas según el pipe date con formato "MMM dd, yyyy"
    const datePipe = new DatePipe('en-US'); // Nota: el locale puede necesitar ajuste según tu app
    const expectedCreatedDate = datePipe.transform(
      mockRepository.created_at,
      'MMM dd, yyyy'
    );
    const expectedUpdatedDate = datePipe.transform(
      mockRepository.updated_at,
      'MMM dd, yyyy'
    );

    expect(dateElements[0].nativeElement.textContent).toContain(
      expectedCreatedDate
    );
    expect(dateElements[1].nativeElement.textContent).toContain(
      expectedUpdatedDate
    );
  });
});
