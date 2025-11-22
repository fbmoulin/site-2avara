import { ServiceItem, FaqItem, NewsItem } from './types';

export const SERVICES: ServiceItem[] = [
  {
    id: '1',
    title: 'Consulta Processual',
    description: 'Acesse o andamento atualizado dos seus processos judiciais.',
    icon: 'search',
    url: 'https://sso.cloud.pje.jus.br/auth/realms/pje/protocol/openid-connect/auth?client_id=portalexterno-frontend&redirect_uri=https%3A%2F%2Fportaldeservicos.pdpj.jus.br%2Fconsulta&state=843bfcd9-02b7-4103-8046-614b7d4f4258&response_mode=fragment&response_type=code&scope=openid&nonce=37a449bc-09a8-4d96-8b22-2ec1e7df8c34'
  },
  {
    id: '2',
    title: 'Balcão Virtual',
    description: 'Atendimento por videoconferência com a secretaria da vara.',
    icon: 'video',
    url: 'https://sistemas.tjes.jus.br/balcaovirtual/atendimento/informar-dados?unidade_id=5253'
  },
  {
    id: '5',
    title: 'Zoom (Audiências)',
    description: 'Baixe o aplicativo e prepare-se para sua audiência virtual.',
    icon: 'download',
    url: 'https://zoom.us/download',
    tutorial: [
      "Instale o aplicativo Zoom no seu celular ou computador.",
      "Clique no link da audiência enviado por e-mail/WhatsApp.",
      "Ao entrar na sala, clique em 'Ligar via Internet' ou 'Juntar-se ao áudio' para ouvir e falar."
    ]
  },
  {
    id: '4',
    title: 'Agendamento',
    description: 'Escolha o melhor canal para solicitar seu agendamento:',
    icon: 'calendar',
    links: [
      { label: 'Preencher Formulário', url: '#contact', icon: 'file-text' },
      { label: 'Enviar E-mail', url: 'mailto:2varacivel@tjes.jus.br', icon: 'mail' },
      { label: 'Agendar via Chat', url: '#chatbot', icon: 'message-square' }
    ]
  }
];

export const FAQS: FaqItem[] = [
  {
    id: '1',
    category: 'Geral',
    question: 'Qual o horário de atendimento presencial?',
    answer: 'O atendimento presencial ocorre de segunda a sexta-feira, das 12h às 18h, exceto feriados.'
  },
  {
    id: '2',
    category: 'Processual',
    question: 'Como faço para consultar meu processo?',
    answer: 'A consulta pode ser realizada através da opção "Consulta Processual" neste site, utilizando o número do processo ou nome das partes.'
  },
  {
    id: '3',
    category: 'Audiências',
    question: 'As audiências são presenciais ou virtuais?',
    answer: 'Atualmente, as audiências ocorrem em formato híbrido. Verifique a intimação para confirmar a modalidade específica do seu caso.'
  },
  {
    id: '4',
    category: 'Contato',
    question: 'Como entro em contato com o Juiz?',
    answer: 'O atendimento com o magistrado deve ser agendado previamente através do Balcão Virtual ou solicitação por e-mail, conforme disponibilidade.'
  }
];

export const LATEST_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'TJES publica novo edital de Leilão Eletrônico Unificado',
    date: 'Atualizado',
    summary: 'Bens penhorados vão a leilão eletrônico conforme determinação do tribunal.',
    category: 'Editais'
  },
  {
    id: '2',
    title: 'PJe: Sistema passará por manutenção programada neste fim de semana',
    date: 'Aviso',
    summary: 'Indisponibilidade prevista para atualização de segurança e novas funcionalidades.',
    category: 'Tecnologia'
  },
  {
    id: '3',
    title: 'Corregedoria Geral da Justiça divulga calendário de correições',
    date: 'Institucional',
    summary: 'Confira as datas das correições ordinárias nas comarcas do estado.',
    category: 'Corregedoria'
  },
  {
    id: '4',
    title: 'Poder Judiciário do ES funciona em regime de plantão no feriado',
    date: 'Plantão',
    summary: 'Atendimento urgente será realizado pelas equipes de plantão judiciário.',
    category: 'Avisos'
  }
];

export const JUDGE_INFO = {
  name: 'Dr. Felipe Bertrand Sardenberg Moulin',
  role: 'Juiz de Direito Titular',
  bio: 'Graduado em Direito pela FDV, especialista em Processo Civil, Digital Hacking e IA aplicada ao Direito. Atua na magistratura capixaba há mais de 20 anos, com foco em celeridade e gestão processual por meio do uso de ferramentas de Inteligência Artificial e humanização da Justiça.',
  imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800'
};

export const CONTACT_INFO = {
  address: 'R. Meridional, 1000 - Alto Lage, Cariacica - ES, 29151-230',
  email: '2varacivel@tjes.jus.br',
  phone: '(27) 3246-5500',
  whatsapp: '(27) 99999-8888'
};