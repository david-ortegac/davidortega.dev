export interface AnalyticsConfig {
  googleAnalyticsId: string;
  adsenseClientId: string;
  adsenseSlots: {
    header: string;
    sidebar: string;
    footer: string;
    inContent: string;
    mobile: string;
  };
}

export const ANALYTICS_CONFIG: AnalyticsConfig = {
  googleAnalyticsId: 'G-4WXJQTGE5P', // Reemplazar con tu ID real de Google Analytics 4
  adsenseClientId: 'ca-pub-6156141818582841',
  adsenseSlots: {
    header: 'auto', // Usar 'auto' para anuncios automáticos inicialmente
    sidebar: 'auto',
    footer: 'auto', 
    inContent: 'auto',
    mobile: 'auto'
  }
};

// Configuración para diferentes tipos de anuncios
export const AD_FORMATS = {
  AUTO: 'auto',
  RECTANGLE: 'rectangle',
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
  RESPONSIVE: 'fluid'
};

// Configuración de estilos para diferentes posiciones
export const AD_STYLES = {
  header: {
    display: 'block',
    width: '728px',
    height: '90px'
  },
  sidebar: {
    display: 'block',
    width: '300px',
    height: '250px'
  },
  footer: {
    display: 'block',
    width: '728px',
    height: '90px'
  },
  inContent: {
    display: 'block',
    width: '100%',
    height: 'auto'
  },
  mobile: {
    display: 'block',
    width: '320px',
    height: '50px'
  }
};