import { Component } from '@angular/core';
import { FooterComponent } from './components/base/footer/footer.component';
import { HeaderComponent } from './components/base/header/header.component';
import { HeroComponent } from './components/main/hero/hero.component';
import { AboutComponent } from './components/main/about/about.component';
import { ServicesComponent } from './components/main/services/services.component';
import { StepsComponent } from './components/main/steps/steps.component';
import { CtaComponent } from './components/main/cta/cta.component';
import { TestimonialsComponent } from './components/main/testimonials/testimonials.component';
import { PortfolioComponent } from './components/main/portfolio/portfolio.component';
import { TeamComponent } from './components/main/team/team.component';
import { PricingComponent } from './components/main/pricing/pricing.component';
import { FaqComponent } from './components/main/faq/faq.component';
import { ContactComponent } from './components/main/contact/contact.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, HeroComponent, AboutComponent, ServicesComponent, StepsComponent, CtaComponent, TestimonialsComponent, PortfolioComponent, TeamComponent, PricingComponent, FaqComponent, ContactComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'davidortega.dev';
}
