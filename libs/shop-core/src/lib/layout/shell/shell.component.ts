import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'core-shell',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `<core-header /><main><router-outlet /></main><core-footer />`,
  styles: `:host { display: flex; flex-direction: column; min-height: 100vh; } main { flex: 1; padding: 24px; }`,
})
export class ShellComponent {}
