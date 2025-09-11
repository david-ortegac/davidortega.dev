import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { CtaComponent } from '../cta/cta.component';
import { FaqComponent } from '../faq/faq.component';
import { HeroComponent } from '../hero/hero.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { PricingComponent } from '../pricing/pricing.component';
import { ServicesComponent } from '../services/services.component';
import { StepsComponent } from '../steps/steps.component';

@Component({
  selector: 'app-index',
  imports: [HeroComponent, AboutComponent, ServicesComponent, StepsComponent, CtaComponent, PortfolioComponent, PricingComponent, FaqComponent, ContactComponent],
 templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent { }
