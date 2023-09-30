import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  selectedTheme: BehaviorSubject<string> = new BehaviorSubject<string>('');
  effectiveTheme$: Observable<string> = this.selectedTheme.pipe(
    map(() => this.getEffectiveTheme())
  );

  constructor() {
    this.initTheme();
  }

  initTheme() {
    const storedTheme = localStorage.getItem('theme');
    const currentTheme = document.documentElement.getAttribute('data-bs-theme')!;
    if (storedTheme) {
      if (storedTheme === 'auto') {
        this.setMediaQueryListener();
        this.selectedTheme.next('auto');
      } else {
        this.setTheme(storedTheme);
      }
    } else if (currentTheme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const autoTheme = prefersDark ? 'dark' : 'light';
      this.setTheme(autoTheme);
    } else {
      this.selectedTheme.next(currentTheme);
    }
  }

  setTheme(theme: string): void {
    if (theme === 'auto') {
      this.setMediaQueryListener();
      this.selectedTheme.next('auto');
      localStorage.setItem('theme', 'auto');
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme);
      this.selectedTheme.next(theme);
      localStorage.setItem('theme', theme);
    }
  }

  private setMediaQueryListener(): void {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.updateAutoTheme(prefersDark.matches);
    prefersDark.addEventListener('change', (event) => {
      this.updateAutoTheme(event.matches);
    });
  }

  private updateAutoTheme(isDark: boolean): void {
    const autoTheme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', autoTheme);
    this.selectedTheme.next(autoTheme);
  }

  private getEffectiveTheme(): string {
    if (this.selectedTheme.value === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return this.selectedTheme.value;
  }

}
