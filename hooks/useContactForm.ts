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

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [status, setStatus] = useState<ContactStatus>('idle');
  const [message, setMessage] = useState('');

  const updateField = useCallback(<K extends keyof ContactFormData>(
    field: K,
    value: ContactFormData[K]
  ) => {
    setFormData(prev => {
      if (field === 'userType') {
        return { ...prev, [field]: value, cpf: '', oab: '' };
      }
      return { ...prev, [field]: value };
    });
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setStatus('idle');
    setMessage('');
  }, []);

  const submitForm = useCallback(async () => {
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
        return true;
      } else {
        setStatus('error');
        setMessage(data.message || 'Erro ao enviar mensagem. Tente novamente.');
        return false;
      }
    } catch (error) {
      setStatus('error');
      setMessage('Erro de conexão. Verifique sua internet e tente novamente.');
      return false;
    }
  }, [formData]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    return submitForm();
  }, [submitForm]);

  return {
    formData,
    status,
    message,
    updateField,
    resetForm,
    handleSubmit,
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    isError: status === 'error',
  };
}

export default useContactForm;
