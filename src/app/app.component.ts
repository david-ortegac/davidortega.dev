import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FooterComponent } from './components/base/footer/footer.component';
import { HeaderComponent } from './components/base/header/header.component';
import { RouterOutlet } from '@angular/router';
import { AnalyticsService } from './services/analytics.service';
import { WhatsappButtonComponent } from './components/shared/whatsapp-button/whatsapp-button.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, RouterOutlet, WhatsappButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'davidortega.dev';
  private startTime = Date.now();

  constructor(
    private analyticsService: AnalyticsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollTracking();
      this.setupTimeTracking();
    }
  }

  private setupScrollTracking(): void {
    let maxScroll = 0;
    let scrollTracked = {
      '25': false,
      '50': false,
      '75': false
    };

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;

        if (scrollPercent >= 25 && !scrollTracked['25']) {
          this.analyticsService.trackScrollDepth(25);
          scrollTracked['25'] = true;
        }
        if (scrollPercent >= 50 && !scrollTracked['50']) {
          this.analyticsService.trackScrollDepth(50);
          scrollTracked['50'] = true;
        }
        if (scrollPercent >= 75 && !scrollTracked['75']) {
          this.analyticsService.trackScrollDepth(75);
          scrollTracked['75'] = true;
        }
      }
    }, { passive: true });
  }

  private setupTimeTracking(): void {
    // Rastrear tiempo cuando el usuario sale de la página
    window.addEventListener('beforeunload', () => {
      const timeSpent = Math.round((Date.now() - this.startTime) / 1000);
      this.analyticsService.trackTimeOnPage(timeSpent);
    });

    // Rastrear tiempo cada 30 segundos para sesiones largas
    setInterval(() => {
      const timeSpent = Math.round((Date.now() - this.startTime) / 1000);
      if (timeSpent % 30 === 0) {
        this.analyticsService.trackTimeOnPage(timeSpent);
      }
    }, 30000);
  }
}
