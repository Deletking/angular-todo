import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private currentTheme = 'light';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  setTheme(theme: 'light' | 'dark') {
    this.renderer.removeClass(document.body, this.currentTheme);
    this.renderer.addClass(document.body, theme);
    this.currentTheme = theme;
  }

  getCurrentTheme(): string {
    return this.currentTheme;
  }
}
