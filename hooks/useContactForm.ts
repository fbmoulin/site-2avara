import { useState, useCallback } from 'react';

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  userType: '' | 'parte' | 'advogado';
  cpf: string;
  oab: string;
  subject: string;
  message: string;
}

export type ContactStatus = 'idle' | 'loading' | 'success' | 'error';

const initialFormData: ContactFormData = {
  name: '',
  phone: '',
  email: '',
  userType: '',
  cpf: '',
  oab: '',
  subject: '',
  message: '',
};

interface UseContactFormResult {
  formData: ContactFormData;
  status: ContactStatus;
  message: string;
  updateField: <K extends keyof ContactFormData>(field: K, value: ContactFormData[K]) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  reset: () => void;
}

export function useContactForm(): UseContactFormResult {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [status, setStatus] = useState<ContactStatus>('idle');
  const [message, setMessage] = useState('');

  const updateField = useCallback(<K extends keyof ContactFormData>(
    field: K,
    value: ContactFormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const reset = useCallback(() => {
    setFormData(initialFormData);
    setStatus('idle');
    setMessage('');
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setMessage(data.message || 'Mensagem enviada com sucesso!');
        setFormData(initialFormData);
      } else {
        setStatus('error');
        setMessage(data.message || 'Erro ao enviar mensagem. Tente novamente.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Erro de conexão. Verifique sua internet e tente novamente.');
    }
  }, [formData]);

  return {
    formData,
    status,
    message,
    updateField,
    handleSubmit,
    reset,
  };
}

export default useContactForm;
