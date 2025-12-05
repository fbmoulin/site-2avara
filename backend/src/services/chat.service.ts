import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

let chatSessions: Map<string, Chat> = new Map();
let genAI: GoogleGenAI | null = null;

const initializeGemini = () => {
  if (!genAI && process.env.GEMINI_API_KEY) {
    genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return genAI !== null;
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
   
   - SEGUNDO PASSO (IMPORTANTE): Pergunte se o usuário é "Advogado" ou "Parte" no processo.
     > Se for ADVOGADO: Solicite o número da OAB.
     > Se for PARTE: Solicite o número do CPF.
   
   - POR PADRÃO, direcione o agendamento para a ASSESSORIA DO GABINETE.
     > Destaque que o atendimento com a Assessoria é indicado para dúvidas de andamento, cumprimento de despacho, informações processuais, etc.
     > Solicite: Nome completo, Nº do Processo e Dúvida/Assunto.
     > NÃO mencione a opção de atendimento com o Juiz, a menos que o usuário pergunte.
   
   - ATENDIMENTO COM O JUIZ: NÃO ofereça ou mencione esta opção espontaneamente.
     > SOMENTE informe sobre atendimento com o Juiz se o usuário EXPRESSAMENTE pedir, perguntar ou mencionar "juiz", "magistrado" ou "Dr. Felipe".
     > SE FOR SOLICITADO: Informe que o atendimento com o magistrado (Dr. Felipe Bertrand Sardenberg Moulin) é preferencialmente para casos urgentes ou com despacho pendente há muito tempo.
     > Solicite: Nome completo, Nº do Processo e o Motivo específico da audiência.
   
   - Ao final da coleta, informe: "Sua solicitação de agendamento [Presencial/Virtual] foi pré-reservada. A secretaria entrará em contato em breve para confirmar o horário."

2. REGISTRO DE DEMANDAS E PETIÇÕES:
   - O usuário pode querer registrar uma reclamação, pedido de celeridade ou informar petição urgente.
   - Pergunte se o usuário é "Advogado" ou "Parte" e solicite o documento correspondente (OAB ou CPF).
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

export const getChatResponse = async (sessionId: string, userMessage: string): Promise<ChatResponse> => {
  const isInitialized = initializeGemini();

  if (!isInitialized || !genAI) {
    return {
      text: "O sistema de chat não está disponível no momento. A chave de API do Gemini não está configurada. Por favor, entre em contato com a secretaria pelo telefone (27) 3246-5641 ou e-mail 2varacivel@tjes.jus.br."
    };
  }

  try {
    let chatSession = chatSessions.get(sessionId);
    
    if (!chatSession) {
      chatSession = genAI.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          tools: [{ googleMaps: {} }],
        },
      });
      chatSessions.set(sessionId, chatSession);
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
    return {
      text: "Ocorreu um erro temporário no serviço de atendimento. Por favor, tente novamente em instantes."
    };
  }
};

export const clearChatSession = (sessionId: string): void => {
  chatSessions.delete(sessionId);
};
