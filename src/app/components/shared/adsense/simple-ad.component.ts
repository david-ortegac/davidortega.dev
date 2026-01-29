import { Component, Input, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

@Component({
  selector: 'app-simple-ad',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="simple-ad-container">
      <div class="ad-label" *ngIf="!testMode">
        <span>Publicidad</span>
      </div>
      
      <div *ngIf="testMode" class="test-ad-placeholder">
        <p><strong>MODO DESARROLLO</strong></p>
        <p>Anuncio AdSense ({{width}}x{{height}})</p>
      </div>
      
      <ins *ngIf="!testMode" 
           class="adsbygoogle"
           [style.display]="'block'"
           [style.width.px]="width"
           [style.height.px]="height"
           data-ad-client="ca-pub-6156141818582841"
           data-ad-format="auto"
           data-full-width-responsive="true">
      </ins>
    </div>
  `,
  styles: [`
    .simple-ad-container {
      text-align: center;
      margin: 20px 0;
      min-width: 300px;
    }
    
    .ad-label {
      font-size: 11px;
      color: #666;
      margin-bottom: 8px;
      text-transform: uppercase;
    }
    
    .ad-label span {
      background: #f5f5f5;
      padding: 2px 8px;
      border-radius: 3px;
      border: 1px solid #e0e0e0;
    }
    
    .test-ad-placeholder {
      background: #f0f0f0;
      border: 2px dashed #ccc;
      padding: 20px;
      color: #666;
      border-radius: 4px;
    }
    
    .adsbygoogle {
      background-color: #fafafa;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
    }
  `]
})
export class SimpleAdComponent implements OnInit, AfterViewInit {
  @Input() width: number = 728;
  @Input() height: number = 90;
  @Input() testMode: boolean = true;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && !this.testMode) {
      if (!(window as any).adsbygoogle) {
        (window as any).adsbygoogle = [];
      }
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId) && !this.testMode) {
      setTimeout(() => {
        try {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        } catch (e) {
          console.error('Error loading simple ad:', e);
        }
      }, 100);
    }
  }
}
