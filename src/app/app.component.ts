import { Component } from '@angular/core';
import { FooterComponent } from './components/base/footer/footer.component';
import { HeaderComponent } from './components/base/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'davidortega.dev';
}
