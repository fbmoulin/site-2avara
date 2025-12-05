export interface ServiceLink {
  label: string;
  url: string;
  icon?: string; // Nome do ícone para renderização dinâmica
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  url?: string;
  tutorial?: string[]; // Passo a passo opcional
  tutorialTip?: string; // Dica adicional do tutorial
  links?: ServiceLink[]; // Múltiplas opções de ação (ex: Agendamento)
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  summary: string;
  category: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  groundingMetadata?: any; // Para suportar dados do Google Maps/Search
}

export enum NavigationSection {
  HOME = 'home',
  INSTITUTIONAL = 'institutional',
  JUDGE = 'judge',
  SERVICES = 'services',
  FAQ = 'faq',
  CONTACT = 'contact'
}