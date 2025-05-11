/**
 * Tipo para el mapeo de lenguajes
 */
export type LanguageMapping = Record<string, string>;

/**
 * Mapeo de nombres de lenguajes en minúsculas a sus nombres normalizados
 */
export const LANGUAGE_MAPPINGS: LanguageMapping = {
  typescript: 'TypeScript',
  javascript: 'JavaScript',
  html: 'HTML',
  css: 'CSS',
  python: 'Python',
  java: 'Java',
  php: 'PHP',
  c: 'C',
  'c#': 'C#',
  csharp: 'C#',
  'c++': 'C++',
  cpp: 'C++',
  dart: 'Dart',
  sass: 'Sass',
  scss: 'Sass',
  markdown: 'Markdown',
  md: 'Markdown',
  shell: 'Bash',
  bash: 'Bash',
  go: 'Go',
  golang: 'Go',
  ruby: 'Ruby',
  cobol: 'Cobol',
  fortran: 'Fortran',
  gleam: 'Gleam',
  graphql: 'GraphQL',
  haskell: 'Haskell',
  json: 'JSON',
  julia: 'Julia',
  kotlin: 'Kotlin',
  lua: 'Lua',
  matlab: 'MATLAB',
  r: 'R',
  racket: 'Racket',
  rust: 'Rust',
  scala: 'Scala',
  solidity: 'Solidity',
  swift: 'Swift',
  zig: 'Zig',
  svelte: 'Svelte',
  astro: 'Astro',
  blade: 'Blade',
};
