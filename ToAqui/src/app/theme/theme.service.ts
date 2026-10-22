import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'toaqui-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  readonly isDark = signal(this.loadTheme() === 'dark');

  constructor() {
    this.applyTheme();
  }

  toggle(): void {
    this.isDark.update((isDark) => !isDark);
    this.applyTheme();
    this.saveTheme(this.isDark() ? 'dark' : 'light');
  }

  private loadTheme(): Theme {
    try {
      const savedTheme = this.document.defaultView?.localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
      }
    } catch (error) {
      if (!(error instanceof DOMException)) {
        throw error;
      }
      console.warn('Não foi possível ler a preferência de tema salva.', error);
    }

    const view = this.document.defaultView;
    return view && typeof view.matchMedia === 'function'
      ? view.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : 'light';
  }

  private saveTheme(theme: Theme): void {
    try {
      this.document.defaultView?.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
      if (!(error instanceof DOMException)) {
        throw error;
      }
      console.warn('Não foi possível salvar a preferência de tema.', error);
    }
  }

  private applyTheme(): void {
    this.document.documentElement.dataset['theme'] = this.isDark() ? 'dark' : 'light';
  }
}
