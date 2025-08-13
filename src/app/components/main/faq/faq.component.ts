import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent implements OnInit {

  // Signal para manejar el FAQ activo
  activeFaqIndex = signal<number | null>(0); // El primer FAQ está activo por defecto

  // Array de FAQs con sus datos
  faqs = [
    {
      question: '¿Qué tecnologías utilizas para el desarrollo de aplicaciones?',
      answer: 'Utilizo tecnologías modernas y robustas como Java Spring Boot para el backend, Angular para aplicaciones web frontend, Laravel para desarrollo web completo, y bases de datos Oracle y MySQL. También trabajo con Docker, AWS y Jenkins para despliegues automatizados.'
    },
    {
      question: '¿Cuánto tiempo toma desarrollar una aplicación web completa?',
      answer: 'El tiempo de desarrollo varía según la complejidad del proyecto. Una aplicación web básica puede tomar 4-6 semanas, mientras que aplicaciones más complejas con múltiples funcionalidades pueden requerir 8-12 semanas. Siempre proporciono cronogramas detallados al inicio del proyecto.'
    },
    {
      question: '¿Incluyes pruebas y documentación en tus proyectos?',
      answer: 'Sí, todos mis proyectos incluyen pruebas unitarias con JUnit y Mockito, documentación técnica completa, y manuales de usuario. También implemento análisis de código con SonarQube para garantizar la calidad y mantenibilidad del software.'
    },
    {
      question: '¿Ofreces servicios de mantenimiento y soporte post-lanzamiento?',
      answer: 'Sí, ofrezco servicios de mantenimiento continuo que incluyen monitoreo 24/7, actualizaciones de seguridad, respaldos automáticos y soporte técnico prioritario. También proporciono reportes mensuales del estado de la aplicación.'
    },
    {
      question: '¿Trabajas con empresas de diferentes tamaños y sectores?',
      answer: 'Sí, tengo experiencia trabajando con startups, pequeñas empresas y grandes corporaciones. He desarrollado soluciones para el sector financiero, educativo, comercial y gubernamental. Cada proyecto se adapta a las necesidades específicas del cliente.'
    },
    {
      question: '¿Cómo puedo solicitar una cotización para mi proyecto?',
      answer: 'Puedes contactarme a través del formulario de contacto en esta página, enviarme un email a smartandcomputer@gmail.com, o contactarme por LinkedIn. Te responderé en menos de 24 horas para agendar una reunión y discutir los detalles de tu proyecto.'
    }
  ];

  ngOnInit(): void {
    // Inicialización
  }

  // Método para manejar el click en un FAQ item
  toggleFaq(index: number): void {
    const currentActive = this.activeFaqIndex();
    
    // Si el FAQ clickeado ya está activo, lo cerramos
    if (currentActive === index) {
      this.activeFaqIndex.set(null);
    } else {
      // Si no está activo, lo abrimos (cerrando el anterior)
      this.activeFaqIndex.set(index);
    }
  }

  // Método para verificar si un FAQ está activo
  isFaqActive(index: number): boolean {
    return this.activeFaqIndex() === index;
  }

  // Método para obtener la clase CSS del FAQ item
  getFaqItemClass(index: number): string {
    return this.isFaqActive(index) ? 'faq-item faq-active' : 'faq-item';
  }

  // Método para obtener la clase CSS del toggle
  getToggleClass(index: number): string {
    return this.isFaqActive(index) ? 'faq-toggle bi bi-chevron-right active' : 'faq-toggle bi bi-chevron-right';
  }

  // Método para trackBy en ngFor (optimización de rendimiento)
  trackByFaqIndex(index: number, faq: any): number {
    return index;
  }
}
