import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements OnInit, AfterViewInit {
  
  @ViewChild('portfolioContainer', { static: false }) portfolioContainer!: ElementRef;
  
  activeFilter = signal('*');
  
  // Definir los proyectos con sus categorías
  projects = [
    {
      id: 1,
      title: 'RepairApp',
      category: 'mobile',
      meta: 'Aplicación Móvil',
      description: 'Aplicación móvil desarrollada en TypeScript para gestión de reparaciones y servicios técnicos.',
      image: './img/portfolio/repairapp.png',
      githubUrl: 'https://github.com/david-ortegac/RepairApp'
    },
    {
      id: 2,
      title: 'Fundaprocol',
      category: 'web',
      meta: 'Sistema de gestion para fundación',
      description: 'Sistema de gestión de base de datos para administración empresarial.',
      image: 'https://raw.githubusercontent.com/david-ortegac/fundaprocol/refs/heads/master/foin/logo%20nuevo.png',
      githubUrl: 'https://github.com/david-ortegac/fundaprocol'
    },
    {
      id: 3,
      title: 'London Beds',
      category: 'web',
      meta: 'Diseño web para empresa de colchones de Ibagué',
      description: 'Diseño web para empresa de colchones de Ibagué',
      image: 'https://colchoneslondonbeds.com/assets/img/logo.png',
      githubUrl: 'https://github.com/david-ortegac/londonbeds'
    },
    {
      id: 4,
      title: 'Feria Virtual UCC',
      category: 'web',
      meta: 'Plataforma Web',
      description: 'Plataforma web para ferias virtuales desarrollada con CSS y tecnologías frontend.',
      image: './img/portfolio/feriavirtualucc.png',
      githubUrl: 'https://github.com/david-ortegac/feriavirtualucc'
    },
    {
      id: 5,
      title: 'ProyectoGrado',
      category: 'academic',
      meta: 'Proyecto de Grado',
      description: 'Proyecto de grado universitario desarrollado en PHP para la Universidad Cooperativa de Colombia.',
      image: 'https://raw.githubusercontent.com/david-ortegac/ProyectoGrado/refs/heads/master/public/img/logo.png',
      githubUrl: 'https://github.com/david-ortegac/ProyectoGrado_old'
    },
    {
      id: 6,
      title: 'BienestarUCC',
      category: 'academic',
      meta: 'Proyecto Académico',
      description: 'Sistema de bienestar estudiantil desarrollado en CSS para la Universidad Cooperativa de Colombia.',
      image: './img/portfolio/bienestarucc.png',
      githubUrl: 'https://github.com/david-ortegac/BienestarUCC'
    },
    {
      id: 7,
      title: 'Users API (CUN)',
      category: 'backend',
      meta: 'Aplicación Web',
      description: 'API de usuarios desarrollada en Java Spring Boot academica de la CUN.',
      image: 'https://200lab.io/blog/_next/image?url=https%3A%2F%2Fstatics.cdn.200lab.io%2F2024%2F11%2Fspring-boot-la-gi.png&w=3840&q=75',
      githubUrl: 'https://github.com/david-ortegac/cun-backend-user-java-api'
    },
    {
      id: 8,
      title: 'API Gateway (CUN)',
      category: 'backend',
      meta: 'API Gateway',
      description: 'API Gateway desarrollada en Java Spring Boot academica de la CUN.',
      image: 'https://200lab.io/blog/_next/image?url=https%3A%2F%2Fstatics.cdn.200lab.io%2F2024%2F11%2Fspring-boot-la-gi.png&w=3840&q=75',
      githubUrl: 'https://github.com/david-ortegac/backend-java-api-gateway'
    }
  ];

  // Filtrar proyectos basado en el filtro activo
  get filteredProjects() {
    const filter = this.activeFilter();
    if (filter === '*') {
      return this.projects;
    }
    return this.projects.filter(project => project.category === filter);
  }

  ngOnInit(): void {
    // Inicialización
  }

  ngAfterViewInit(): void {
    // Asegurar que el DOM esté listo
  }

  // Método para cambiar filtro
  setFilter(filter: string): void {
    this.activeFilter.set(filter);
  }

  // Método para obtener la clase CSS del filtro
  getFilterClass(filter: string): string {
    return this.activeFilter() === filter ? 'filter-active' : '';
  }

  // Método para trackBy en ngFor (optimización de rendimiento)
  trackByProjectId(index: number, project: any): number {
    return project.id;
  }
}
