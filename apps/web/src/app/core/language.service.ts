import { Injectable, signal, effect, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private document = inject(DOCUMENT);
  
  // Manage language state, defaulting to 'en-us'
  language = signal<'en-us' | 'pt-br'>('en-us');

  constructor() {
    const savedLang = localStorage.getItem('language') as 'en-us' | 'pt-br' | null;
    if (savedLang) {
      this.language.set(savedLang);
    } else {
      // Basic heuristic for setting default lang
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('pt')) {
         this.language.set('pt-br');
      }
    }

    // Effect to apply language to the HTML document and persist in localStorage
    effect(() => {
      const currentLang = this.language();
      this.document.documentElement.lang = currentLang;
      localStorage.setItem('language', currentLang);
    });
  }

  toggleLanguage() {
    this.language.update(l => l === 'en-us' ? 'pt-br' : 'en-us');
  }
}
