// Cliente API para comunicação com o backend

// Use relative path for API calls so it works in both development and production
// In Replit, both frontend and backend are on the same host
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  id?: string;
  errors?: Array<{ field: string; message: string }>;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao processar requisição');
      }

      return data;
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw error;
    }
  }

  // Enviar formulário de contato
  async sendContact(contact: {
    name: string;
    phone: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<ApiResponse> {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(contact),
    });
  }

  // Criar agendamento
  async createAppointment(appointment: {
    type: 'presencial' | 'virtual';
    withWhom: 'assessoria' | 'juiz';
    name: string;
    oabNumber?: string;
    processNumber: string;
    reason: string;
  }): Promise<ApiResponse> {
    return this.request('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointment),
    });
  }

  // Registrar demanda
  async createDemand(demand: {
    processNumber: string;
    demandType: 'reclamacao' | 'celeridade' | 'peticao_urgente';
    description: string;
    priority?: 'low' | 'normal' | 'high' | 'urgent';
  }): Promise<ApiResponse> {
    return this.request('/demands', {
      method: 'POST',
      body: JSON.stringify(demand),
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
