import { Component } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'theme-switcher-dropdown',
  templateUrl: './theme-switcher-dropdown.component.html',
  styleUrls: ['./theme-switcher-dropdown.component.scss']
})
export class ThemeSwitcherDropdownComponent {
  constructor(public themeService: ThemeService) { }

  setTheme(theme: string): void {
    this.themeService.setTheme(theme);
  }
}
