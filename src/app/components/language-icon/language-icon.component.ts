import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

@Component({
  selector: 'app-language-icon',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (normalizedLanguage()) { @case ('JavaScript') {
    <img
      src="/languages/javascript.svg"
      [width]="size().width"
      [height]="size().height"
      alt="JavaScript"
    />
    } @case ('TypeScript') {
    <img
      src="/languages/typescript.svg"
      [width]="size().width"
      [height]="size().height"
      alt="TypeScript"
    />
    } @case ('C++') {
    <img
      src="/languages/c-plusplus.svg"
      [width]="size().width"
      [height]="size().height"
      alt="C++"
    />
    } @case ('Ruby') {
    <img
      src="/languages/ruby.svg"
      [width]="size().width"
      [height]="size().height"
      alt="Ruby"
    />
    } @case ('Go') {
    <img
      src="/languages/golang.svg"
      [width]="size().width"
      [height]="size().height"
      alt="Go"
    />
    } @case ('HTML') {
    <img
      src="/languages/html5.svg"
      [width]="size().width"
      [height]="size().height"
      alt="HTML"
    />
    } @case ('CSS') {
    <img
      src="/languages/css.svg"
      [width]="size().width"
      [height]="size().height"
      alt="CSS"
    />
    } @case ('Python') {
    <img
      src="/languages/python.svg"
      [width]="size().width"
      [height]="size().height"
      alt="Python"
    />
    } @case ('Java') {
    <img
      src="/languages/java.svg"
      [width]="size().width"
      [height]="size().height"
      alt="Java"
    />
    } @case ('PHP') {
    <img
      src="/languages/php.svg"
      [width]="size().width"
      [height]="size().height"
      alt="PHP"
    />
    } @case ('C') {
    <img
      src="/languages/c.svg"
      [width]="size().width"
      [height]="size().height"
      alt="C"
    />
    } @case ('C#') {
    <img
      src="/languages/csharp.svg"
      [width]="size().width"
      [height]="size().height"
      alt="C#"
    />
    } @case ('Dart') {
    <img
      src="/languages/dart.svg"
      [width]="size().width"
      [height]="size().height"
      alt="Dart"
    />
    } @case ('Sass') {
    <img
      src="/languages/sass.svg"
      [width]="size().width"
      [height]="size().height"
      alt="Sass"
    />
    } @case ('Markdown') {
    <img
      src="/languages/markdown-light.svg"
      [width]="size().width"
      [height]="size().height"
      alt="Markdown"
    />
    } @case ('Bash') {
    <img
      src="/languages/bash.svg"
      [width]="size().width"
      [height]="size().height"
      alt="Bash"
    />
    } @case ('Cobol') {
    <img
      src="/languages/cobol.svg"
      [width]="size().width"
      [height]="size().height"
      alt="Cobol"
    />
    } @case ('Fortran') {
    <img
      src="/languages/fortran.svg"
      [width]="size().width"
      [height]="size().height"
      alt="Fortran"
    />
    } @case ('Gleam') {
    <img
      src="/languages/gleam.svg"
      [width]="size().width"
      [height]="size().height"
      alt="Gleam"
    />
    } @case ('GraphQL') {
    <img
      src="/languages/graphql.svg"
      [width]="size().width"
      [height]="size().height"
      alt="GraphQL"
    />
    } @case ('Haskell') {
    <img
      src="/languages/haskell.svg"
      [width]="size().width"
      [height]="size().height"
      alt="Haskell"
    />
    } @case ('JSON') {
    <img
      src="/languages/json.svg"
      [width]="size().width"
      [height]="size().height"
      alt="JSON"
    />
    } @case ('Julia') {
    <img
      src="/languages/julia.svg"
      [width]="size().width"
      [height]="size().height"
      alt="Julia"
    />
    } @case ('Kotlin') {
    <img
      src="/languages/kotlin.svg"
      [width]="size().width"
      [height]="size().height"
      alt="Kotlin"
    />
    } @case ('Lua') {
    <img
      src="/languages/lua.svg"
      [width]="size().width"
      [height]="size().height"
      alt="Lua"
    />
    } @case ('MATLAB') {
    <img
      src="/languages/matlab.svg"
      [width]="size().width"
      [height]="size().height"
      alt="MATLAB"
    />
    } @case ('R') {
    <img
      src="/languages/r.svg"
      [width]="size().width"
      [height]="size().height"
      alt="R"
    />
    } @case ('Rust') {
    <img
      src="/languages/rust.svg"
      [width]="size().width"
      [height]="size().height"
      alt="Rust"
    />
    } @case ('Scala') {
    <img
      src="/languages/scala.svg"
      [width]="size().width"
      [height]="size().height"
      alt="Scala"
    />
    } @case ('Solidity') {
    <img
      src="/languages/solidity.svg"
      [width]="size().width"
      [height]="size().height"
      alt="Solidity"
    />
    } @case ('Swift') {
    <img
      src="/languages/swift.svg"
      [width]="size().width"
      [height]="size().height"
      alt="Swift"
    />
    } @case ('Zig') {
    <img
      src="/languages/zig.svg"
      [width]="size().width"
      [height]="size().height"
      alt="Zig"
    />
    } @case ('Racket') {
    <img
      src="/languages/racket.svg"
      [width]="size().width"
      [height]="size().height"
      alt="Racket"
    />
    } @default {
    <div class="generic-language">{{ language() }}</div>
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
  language = input<string | null>(null);
  size = input<{ width: number; height: number }>({ width: 16, height: 16 });

  protected normalizedLanguage = computed(() => {
    if (!this.language()) return null;

    const lang = this.language()?.toLowerCase();

    if (lang === 'typescript') return 'TypeScript';
    if (lang === 'javascript') return 'JavaScript';
    if (lang === 'html') return 'HTML';
    if (lang === 'css') return 'CSS';
    if (lang === 'python') return 'Python';
    if (lang === 'java') return 'Java';
    if (lang === 'php') return 'PHP';
    if (lang === 'c') return 'C';
    if (lang === 'c#' || lang === 'csharp') return 'C#';
    if (lang === 'c++' || lang === 'cpp') return 'C++';
    if (lang === 'dart') return 'Dart';
    if (lang === 'sass' || lang === 'scss') return 'Sass';
    if (lang === 'markdown' || lang === 'md') return 'Markdown';
    if (lang === 'shell' || lang === 'bash') return 'Bash';
    if (lang === 'go' || lang === 'golang') return 'Go';
    if (lang === 'ruby') return 'Ruby';
    if (lang === 'cobol') return 'Cobol';
    if (lang === 'fortran') return 'Fortran';
    if (lang === 'gleam') return 'Gleam';
    if (lang === 'graphql') return 'GraphQL';
    if (lang === 'haskell') return 'Haskell';
    if (lang === 'json') return 'JSON';
    if (lang === 'julia') return 'Julia';
    if (lang === 'kotlin') return 'Kotlin';
    if (lang === 'lua') return 'Lua';
    if (lang === 'matlab') return 'MATLAB';
    if (lang === 'r') return 'R';
    if (lang === 'racket') return 'Racket';
    if (lang === 'rust') return 'Rust';
    if (lang === 'scala') return 'Scala';
    if (lang === 'solidity') return 'Solidity';
    if (lang === 'swift') return 'Swift';
    if (lang === 'zig') return 'Zig';

    return this.language();
  });
}
