import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type ThemeType = "dark-theme" | "light-theme";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private themeSubject$: BehaviorSubject<ThemeType> = new BehaviorSubject<ThemeType>(null!);

  init(): void {

    console.log(`Current theme: ${this.currentTheme}`);

    if(!this.currentTheme) {

      const userThemePreference = window.matchMedia("(prefers-color-scheme: dark)");
      if(userThemePreference.matches) {
        localStorage.setItem("user_theme", "dark-theme");
      } else {
        localStorage.setItem("user_theme", "light-theme");
      }

      const theme: ThemeType = localStorage.getItem("user_theme") as any;
      this.themeSubject$.next(theme);
    }

    document.body.classList.add(this.currentTheme);
  }

  toggleTheme(): void {
    const theme = this.currentTheme == "dark-theme" ? "light-theme" : "dark-theme";
    switch(theme) {
      case "dark-theme":
        console.log("dark-theme");
        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");
        localStorage.setItem("user_theme", "dark-theme");
        break;
      case "light-theme":
        console.log("light-theme");
        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");
        localStorage.setItem("user_theme", "light-theme");
        break;
    }
  }

  get currentTheme(): ThemeType {
    return localStorage.getItem("user_theme") as any;
  }

  get theme$(): Observable<ThemeType> {
    const theme: ThemeType = localStorage.getItem("user_theme") as any;
    this.themeSubject$.next(theme);
    return this.themeSubject$.asObservable();
  }
}
