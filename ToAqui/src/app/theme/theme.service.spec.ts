import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.removeItem('toaqui-theme');
    document.documentElement.removeAttribute('data-theme');
    TestBed.configureTestingModule({});
  });

  it('toggles the full application theme and saves the preference', () => {
    const theme = TestBed.inject(ThemeService);

    expect(theme.isDark()).toBe(false);
    expect(document.documentElement.dataset['theme']).toBe('light');

    theme.toggle();

    expect(theme.isDark()).toBe(true);
    expect(document.documentElement.dataset['theme']).toBe('dark');
    expect(localStorage.getItem('toaqui-theme')).toBe('dark');
  });

  it('restores the saved preference when the service starts', () => {
    localStorage.setItem('toaqui-theme', 'dark');

    const theme = TestBed.inject(ThemeService);

    expect(theme.isDark()).toBe(true);
    expect(document.documentElement.dataset['theme']).toBe('dark');
  });
});
