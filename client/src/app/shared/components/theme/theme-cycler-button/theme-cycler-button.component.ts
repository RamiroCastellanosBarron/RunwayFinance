import { Component, Input } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'theme-cycler-button',
  templateUrl: './theme-cycler-button.component.html',
  styleUrls: ['./theme-cycler-button.component.scss']
})
export class ThemeCyclerButtonComponent {
  // btn-sm for small btn-lg for large
  @Input() size: string = 'btn';

  constructor(public themeService: ThemeService) { }

  toggleTheme(): void {
    if (this.themeService.selectedTheme.value === 'light') {
      this.themeService.setTheme('dark');
    } else if (this.themeService.selectedTheme.value === 'dark') {
      this.themeService.setTheme('auto');
    } else {
      this.themeService.setTheme('light');
    }
  }
}
