export interface ChatResponse {
  text: string;
  groundingMetadata?: any;
}

const generateSessionId = (): string => {
  const stored = sessionStorage.getItem('chat_session_id');
  if (stored) return stored;
  
  const newId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  sessionStorage.setItem('chat_session_id', newId);
  return newId;
};

export const getChatResponse = async (userMessage: string): Promise<ChatResponse> => {
  const sessionId = generateSessionId();
  
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage,
        sessionId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      return data.data;
    } else {
      return {
        text: data.message || "Ocorreu um erro ao processar sua mensagem.",
      };
    }
  } catch (error) {
    console.error("Erro ao comunicar com o servidor:", error);
    return {
      text: "Ocorreu um erro temporário no serviço de atendimento. Por favor, tente novamente em instantes ou entre em contato pelo telefone (27) 3246-5641.",
    };
  }
};

export const clearChatSession = async (): Promise<void> => {
  const sessionId = sessionStorage.getItem('chat_session_id');
  if (!sessionId) return;

  try {
    await fetch('/api/chat/clear', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId }),
    });
    
    sessionStorage.removeItem('chat_session_id');
  } catch (error) {
    console.error("Erro ao limpar sessão:", error);
  }
};
