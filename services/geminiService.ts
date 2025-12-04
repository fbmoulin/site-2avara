import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;
let isCreatingSession = false;

// Initialize the API client
const initializeGemini = () => {
  if (!genAI && process.env.API_KEY) {
    genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
};

const SYSTEM_INSTRUCTION = `
Você é o assistente virtual oficial da 2ª Vara Cível de Cariacica.
Seu público-alvo são Advogados e Partes processuais.
Sua missão é realizar a triagem de atendimentos e registrar solicitações.

DIRETRIZES DE COMPORTAMENTO:
- Mantenha um tom formal, respeitoso e objetivo (Linguagem Jurídica adequada).
- NÃO forneça consultoria jurídica, análise de mérito ou previsões de sentença.
- Se não tiver a informação, oriente o contato pelo Balcão Virtual ou e-mail da secretaria.

USO DE FERRAMENTAS (GOOGLE MAPS):
- Se o usuário perguntar sobre a localização do Fórum, endereço, como chegar ou "onde fica", USE a ferramenta Google Maps.
- O endereço para busca é: "Fórum Desembargador Américo Ribeiro Coelho, R. Meridional, 1000 - Alto Lage, Cariacica - ES".
- Sempre forneça o link gerado pela ferramenta para o usuário visualizar.

PROTOCOLO DE ATENDIMENTO:

1. AGENDAMENTO DE ATENDIMENTO:
   - PRIMEIRO PASSO (IMPORTANTE): Pergunte se o usuário prefere atendimento "Presencial" ou "Virtual (via Zoom)".
     > Destaque na sua resposta que o atendimento VIRTUAL (ZOOM) possui MAIOR DISPONIBILIDADE de horários na agenda.
   
   - O usuário pode solicitar agendamento com a "Assessoria" ou com o "Juiz".
   - SE FOR COM O JUIZ: O atendimento com o magistrado (Dr. Felipe Bertrand Sardenberg Moulin) é preferencialmente para casos urgentes ou com despacho pendente há muito tempo.
     > Solicite: Nome completo, Nº da OAB (se advogado), Nº do Processo e o Motivo específico da audiência.
   - SE FOR COM A ASSESSORIA: Para dúvidas de andamento, cumprimento de despacho, etc.
     > Solicite: Nome, Nº do Processo e Dúvida/Assunto.
   - Ao final da coleta, informe: "Sua solicitação de agendamento [Presencial/Virtual] foi pré-reservada. A secretaria entrará em contato em breve para confirmar o horário."

2. REGISTRO DE DEMANDAS E PETIÇÕES:
   - O usuário pode querer registrar uma reclamação, pedido de celeridade ou informar petição urgente.
   - Solicite: Nº do Processo e o teor da demanda.
   - Confirme: "Sua demanda foi registrada no sistema interno da Vara e será encaminhada ao setor responsável."

3. INFORMAÇÕES GERAIS:
   - Horário de funcionamento: 12h às 18h.
   - Localização: Fórum de Cariacica - Alto Lage.
   - Contatos: Telefone/Balcão Virtual.

Sempre inicie identificando se o usuário é Advogado ou Parte, se isso não ficar claro na primeira mensagem.
`;

export interface ChatResponse {
  text: string;
  groundingMetadata?: any;
}

export const getChatResponse = async (userMessage: string): Promise<ChatResponse> => {
  initializeGemini();

  if (!genAI) {
    return {
      text: "O sistema de chat está operando em modo de demonstração (sem chave de API configurada). Por favor, configure a chave API para interagir com a inteligência artificial."
    };
  }

  try {
    // Prevent race condition when creating session
    if (!chatSession && !isCreatingSession) {
      isCreatingSession = true;
      try {
        chatSession = genAI.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            tools: [{ googleMaps: {} }],
          },
        });
      } finally {
        isCreatingSession = false;
      }
    }

    // Wait if session is being created
    if (!chatSession) {
      return {
        text: "O sistema está inicializando. Por favor, envie sua mensagem novamente."
      };
    }

    const result: GenerateContentResponse = await chatSession.sendMessage({
      message: userMessage
    });

    return {
      text: result.text || "Desculpe, não consegui processar sua resposta no momento.",
      groundingMetadata: result.candidates?.[0]?.groundingMetadata
    };
  } catch (error) {
    console.error("Erro ao comunicar com Gemini:", error);
    // Reset session on error to allow retry
    chatSession = null;
    return {
      text: "Ocorreu um erro temporário no serviço de atendimento. Por favor, tente novamente em instantes."
    };
  }
};
