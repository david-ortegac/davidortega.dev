import { Injectable, ErrorHandler, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  handleError(error: any): void {
    // Solo procesar errores en el navegador
    if (!isPlatformBrowser(this.platformId)) {
      console.error('Server-side error:', error);
      return;
    }

    // Filtrar errores de extensiones de Chrome
    if (this.isExtensionError(error)) {
      console.warn('Chrome extension error filtered:', this.getErrorMessage(error));
      return;
    }

    // Filtrar errores conocidos de terceros
    if (this.isThirdPartyError(error)) {
      console.warn('Third-party error filtered:', this.getErrorMessage(error));
      return;
    }

    // Procesar errores legítimos de la aplicación
    this.logError(error);
    
    // En producción, podrías enviar errores a un servicio de monitoreo
    if (this.isProduction()) {
      this.sendToMonitoringService(error);
    }
  }

  private isExtensionError(error: any): boolean {
    const errorMessage = this.getErrorMessage(error);
    const errorStack = this.getErrorStack(error);
    
    const extensionIndicators = [
      'chrome-extension://',
      'moz-extension://',
      'safari-extension://',
      'content_script.js',
      'parameter 1 is not of type \'Node\'',
      'Extension context invalidated',
      'Cannot access chrome://',
      'Script error.'
    ];

    return extensionIndicators.some(indicator => 
      errorMessage.includes(indicator) || 
      errorStack.includes(indicator)
    );
  }

  private isThirdPartyError(error: any): boolean {
    const errorMessage = this.getErrorMessage(error);
    const errorStack = this.getErrorStack(error);
    
    const thirdPartyIndicators = [
      'facebook.com',
      'google-analytics.com',
      'googletagmanager.com',
      'googlesyndication.com',
      'doubleclick.net',
      'adsystem.com',
      'Non-Error promise rejection captured'
    ];

    return thirdPartyIndicators.some(indicator => 
      errorMessage.includes(indicator) || 
      errorStack.includes(indicator)
    );
  }

  private getErrorMessage(error: any): string {
    if (typeof error === 'string') return error;
    if (error?.message) return error.message;
    if (error?.error?.message) return error.error.message;
    if (error?.rejection?.message) return error.rejection.message;
    return String(error);
  }

  private getErrorStack(error: any): string {
    if (error?.stack) return error.stack;
    if (error?.error?.stack) return error.error.stack;
    if (error?.rejection?.stack) return error.rejection.stack;
    return '';
  }

  private logError(error: any): void {
    const errorInfo = {
      message: this.getErrorMessage(error),
      stack: this.getErrorStack(error),
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    console.error('Application Error:', errorInfo);
  }

  private isProduction(): boolean {
    return window.location.hostname !== 'localhost' && 
           window.location.hostname !== '127.0.0.1';
  }

  private sendToMonitoringService(error: any): void {
    // Aquí podrías integrar con servicios como Sentry, LogRocket, etc.
    // Por ahora solo registramos que se enviaría
    console.log('Error would be sent to monitoring service in production');
    
    // Ejemplo de integración con Sentry:
    // Sentry.captureException(error);
    
    // Ejemplo de integración con Google Analytics:
    // gtag('event', 'exception', {
    //   description: this.getErrorMessage(error),
    //   fatal: false
    // });
  }

  // Método público para reportar errores manualmente
  public reportError(error: any, context?: string): void {
    const contextualError = {
      ...error,
      context: context || 'Manual report',
      timestamp: new Date().toISOString()
    };
    
    this.handleError(contextualError);
  }

  // Método para obtener estadísticas de errores (para desarrollo)
  public getErrorStats(): any {
    return {
      platform: isPlatformBrowser(this.platformId) ? 'browser' : 'server',
      userAgent: isPlatformBrowser(this.platformId) ? navigator.userAgent : 'N/A',
      timestamp: new Date().toISOString(),
      url: isPlatformBrowser(this.platformId) ? window.location.href : 'N/A'
    };
  }
}
