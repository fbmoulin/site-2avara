import React from 'react';
import { Icons } from './Icons';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div 
        className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-legal-blue text-white">
          <h2 className="text-2xl font-serif font-bold">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Fechar"
          >
            <Icons.X size={24} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto prose prose-sm max-w-none">
          {children}
        </div>
        <div className="p-4 border-t border-gray-200 bg-gray-50 text-center">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-legal-blue text-white font-semibold rounded hover:bg-slate-800 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export const PrivacyPolicy: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
  <LegalModal isOpen={isOpen} onClose={onClose} title="Política de Privacidade">
    <div className="text-gray-700 space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-legal-blue">
        <p className="text-sm text-gray-600">
          <strong>Versão:</strong> 1.0 | <strong>Última atualização:</strong> Dezembro de 2025
        </p>
      </div>

      <section>
        <h3 className="text-xl font-bold text-legal-blue mb-3">1. Introdução</h3>
        <p>
          Esta Política de Privacidade estabelece como é feita a coleta, uso, armazenamento e proteção 
          de informações pessoais dos usuários que acessam o portal da <strong>2ª Vara Cível de Cariacica</strong>, 
          unidade jurisdicional do Tribunal de Justiça do Estado do Espírito Santo (TJES).
        </p>
        <p className="mt-2">
          <strong>Controlador de Dados:</strong><br />
          Tribunal de Justiça do Estado do Espírito Santo - TJES<br />
          2ª Vara Cível da Comarca de Cariacica<br />
          Endereço: R. Meridional, 1000 - Alto Lage, Cariacica - ES, 29151-230<br />
          E-mail: 2acivelcariacica@gmail.com
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-legal-blue mb-3">2. Legislação Aplicável</h3>
        <p>Esta política está em conformidade com:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Lei Geral de Proteção de Dados (LGPD) – Lei Federal nº 13.709/2018</li>
          <li>Marco Civil da Internet – Lei Federal nº 12.965/2014</li>
          <li>Lei de Acesso à Informação – Lei Federal nº 12.527/2011</li>
          <li>Constituição Federal de 1988 (art. 5º, LXXIX)</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-legal-blue mb-3">3. Dados Coletados</h3>
        
        <h4 className="font-semibold text-gray-800 mt-4 mb-2">3.1 Dados Fornecidos pelo Usuário:</h4>
        <ul className="list-disc pl-6 space-y-1">
          <li>Nome completo</li>
          <li>Endereço de e-mail</li>
          <li>Número de telefone</li>
          <li>Número do processo (quando aplicável)</li>
          <li>Mensagens e solicitações enviadas através dos formulários</li>
        </ul>

        <h4 className="font-semibold text-gray-800 mt-4 mb-2">3.2 Dados Coletados Automaticamente:</h4>
        <ul className="list-disc pl-6 space-y-1">
          <li>Endereço IP (anonimizado)</li>
          <li>Tipo de navegador e sistema operacional</li>
          <li>Páginas visitadas e tempo de permanência</li>
          <li>Data e horário de acesso</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-legal-blue mb-3">4. Finalidade do Tratamento</h3>
        <p>Seus dados pessoais são tratados para:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Prestação de serviços jurisdicionais e administrativos</li>
          <li>Agendamento de atendimentos presenciais e virtuais</li>
          <li>Registro e acompanhamento de solicitações e demandas</li>
          <li>Comunicação institucional sobre processos e procedimentos</li>
          <li>Cumprimento de obrigações legais e regulatórias</li>
          <li>Melhoria contínua dos serviços oferecidos</li>
        </ul>
        <p className="mt-2">
          <strong>Base Legal:</strong> Art. 7º, incisos II, III e V da LGPD (cumprimento de obrigação legal, 
          execução de políticas públicas e execução de contrato/procedimento preliminar).
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-legal-blue mb-3">5. Compartilhamento de Dados</h3>
        <p>
          Seus dados pessoais podem ser compartilhados exclusivamente com:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Órgãos do Poder Judiciário do Estado do Espírito Santo</li>
          <li>Autoridades públicas, mediante determinação legal ou judicial</li>
          <li>Prestadores de serviços essenciais para funcionamento do portal (hospedagem, e-mail)</li>
        </ul>
        <p className="mt-2">
          <strong>Não comercializamos, alugamos ou vendemos dados pessoais a terceiros.</strong>
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-legal-blue mb-3">6. Segurança dos Dados</h3>
        <p>Implementamos medidas técnicas e organizacionais para proteger seus dados:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Criptografia de dados em trânsito (HTTPS/SSL)</li>
          <li>Controle de acesso restrito às informações</li>
          <li>Monitoramento e prevenção de incidentes de segurança</li>
          <li>Backups regulares e seguros</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-legal-blue mb-3">7. Direitos do Titular (Art. 18 da LGPD)</h3>
        <p>Você tem direito a:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Confirmação da existência de tratamento de dados</li>
          <li>Acesso aos seus dados pessoais</li>
          <li>Correção de dados incompletos, inexatos ou desatualizados</li>
          <li>Anonimização, bloqueio ou eliminação de dados desnecessários</li>
          <li>Portabilidade dos dados</li>
          <li>Informação sobre compartilhamento de dados</li>
          <li>Revogação do consentimento (quando aplicável)</li>
        </ul>
        <p className="mt-2">
          Para exercer seus direitos, entre em contato pelo e-mail: <strong>2acivelcariacica@gmail.com</strong>
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-legal-blue mb-3">8. Cookies</h3>
        <p>
          Este portal utiliza cookies essenciais para o funcionamento adequado do site, 
          garantindo a segurança e melhor experiência de navegação. Você pode gerenciar 
          as configurações de cookies através das opções do seu navegador.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-legal-blue mb-3">9. Retenção de Dados</h3>
        <p>
          Os dados pessoais serão mantidos pelo período necessário para cumprimento das 
          finalidades descritas nesta política, respeitando os prazos legais de guarda 
          documental estabelecidos pelo Conselho Nacional de Justiça (CNJ) e legislação aplicável.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-legal-blue mb-3">10. Alterações desta Política</h3>
        <p>
          Esta Política de Privacidade pode ser atualizada periodicamente. Quaisquer alterações 
          serão publicadas nesta página com a indicação da nova data de atualização.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-legal-blue mb-3">11. Contato e Reclamações</h3>
        <p>
          Para dúvidas, solicitações ou reclamações relacionadas a esta política ou ao 
          tratamento de seus dados pessoais:
        </p>
        <p className="mt-2">
          <strong>E-mail:</strong> 2acivelcariacica@gmail.com<br />
          <strong>Telefone:</strong> (27) 3246-5641
        </p>
        <p className="mt-2">
          Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD): 
          <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer" className="text-legal-blue hover:underline ml-1">
            www.gov.br/anpd
          </a>
        </p>
      </section>
    </div>
  </LegalModal>
);

export const TermsOfUse: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
  <LegalModal isOpen={isOpen} onClose={onClose} title="Termos de Uso">
    <div className="text-gray-700 space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-legal-blue">
        <p className="text-sm text-gray-600">
          <strong>Versão:</strong> 1.0 | <strong>Última atualização:</strong> Dezembro de 2025
        </p>
      </div>

      <section>
        <h3 className="text-xl font-bold text-legal-blue mb-3">1. Objeto</h3>
        <p>
          Estes Termos de Uso regulam as condições de acesso e utilização do portal da 
          <strong> 2ª Vara Cível de Cariacica</strong>, unidade jurisdicional integrante do 
          Tribunal de Justiça do Estado do Espírito Santo (TJES).
        </p>
        <p className="mt-2">
          O portal tem como objetivo disponibilizar informações institucionais, serviços 
          de atendimento ao cidadão, consultas processuais e canais de comunicação com a unidade.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-legal-blue mb-3">2. Definições</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Usuário:</strong> Qualquer pessoa que acesse ou utilize os serviços disponibilizados no portal.</li>
          <li><strong>Portal:</strong> Site institucional da 2ª Vara Cível de Cariacica e seus serviços associados.</li>
          <li><strong>Serviços:</strong> Funcionalidades disponibilizadas, incluindo consultas, formulários, agendamentos e chatbot.</li>
          <li><strong>Dados Pessoais:</strong> Informações relacionadas a pessoa natural identificada ou identificável.</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-legal-blue mb-3">3. Aceitação dos Termos</h3>
        <p>
          Ao acessar e utilizar este portal, o usuário declara ter lido, compreendido e 
          concordado com estes Termos de Uso e com a Política de Privacidade. Caso não 
          concorde com alguma disposição, recomenda-se não utilizar os serviços.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-legal-blue mb-3">4. Direitos do Usuário</h3>
        <p>O usuário tem direito a:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Acessar informações públicas disponibilizadas no portal</li>
          <li>Utilizar os serviços de atendimento e agendamento</li>
          <li>Enviar solicitações, demandas e mensagens através dos canais oficiais</li>
          <li>Receber tratamento respeitoso e igualitário</li>
          <li>Ter seus dados pessoais protegidos conforme a legislação vigente</li>
          <li>Obter respostas às suas solicitações em prazo razoável</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-legal-blue mb-3">5. Deveres do Usuário</h3>
        <p>O usuário compromete-se a:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Fornecer informações verdadeiras, atualizadas e completas</li>
          <li>Utilizar o portal de forma ética e respeitosa</li>
          <li>Não praticar atos que possam prejudicar o funcionamento do sistema</li>
          <li>Respeitar a propriedade intelectual do conteúdo disponibilizado</li>
          <li>Não transmitir conteúdo ilícito, ofensivo ou que viole direitos de terceiros</li>
          <li>Manter sigilo sobre informações processuais de terceiros</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-legal-blue mb-3">6. Vedações</h3>
        <p>É expressamente vedado ao usuário:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Utilizar o portal para fins ilícitos ou não autorizados</li>
          <li>Transmitir vírus, malware ou qualquer código malicioso</li>
          <li>Tentar obter acesso não autorizado a sistemas ou dados</li>
          <li>Praticar atos de calúnia, injúria, difamação ou discriminação</li>
          <li>Violar direitos autorais ou de propriedade intelectual</li>
          <li>Utilizar robôs, scrapers ou ferramentas automatizadas sem autorização</li>
          <li>Sobrecarregar intencionalmente os servidores ou sistemas</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-legal-blue mb-3">7. Propriedade Intelectual</h3>
        <p>
          Todo o conteúdo do portal, incluindo textos, imagens, logotipos, ícones e software, 
          é de propriedade do Tribunal de Justiça do Estado do Espírito Santo ou está 
          licenciado para uso institucional.
        </p>
        <p className="mt-2">
          É permitida a reprodução de conteúdo para fins educacionais e informativos, 
          desde que citada a fonte. O uso comercial não autorizado é proibido.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-legal-blue mb-3">8. Limitação de Responsabilidade</h3>
        <p>A 2ª Vara Cível de Cariacica e o TJES não se responsabilizam por:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Danos decorrentes de uso indevido do portal pelo usuário</li>
          <li>Indisponibilidade temporária dos serviços por manutenção ou falhas técnicas</li>
          <li>Conteúdo de sites externos acessados através de links disponibilizados</li>
          <li>Vírus ou códigos maliciosos adquiridos durante a navegação em outros sites</li>
          <li>Ações de terceiros que comprometam a segurança do dispositivo do usuário</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-legal-blue mb-3">9. Assistente Virtual (Chatbot)</h3>
        <p>
          O assistente virtual disponibilizado no portal tem função de triagem e orientação inicial. 
          As informações fornecidas pelo chatbot são de caráter orientativo e não substituem:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Consulta jurídica com advogado ou defensor público</li>
          <li>Análise de mérito ou previsões sobre decisões judiciais</li>
          <li>Atendimento personalizado pela secretaria da vara</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-legal-blue mb-3">10. Disponibilidade do Serviço</h3>
        <p>
          O portal opera em regime de disponibilidade contínua (24 horas), podendo haver 
          interrupções programadas para manutenção ou atualizações do sistema.
        </p>
        <p className="mt-2">
          O atendimento humano segue o horário de funcionamento da unidade: segunda a sexta-feira, 
          das 12h às 18h, exceto feriados.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-legal-blue mb-3">11. Alterações dos Termos</h3>
        <p>
          Estes Termos de Uso podem ser alterados a qualquer momento, sem aviso prévio. 
          A versão atualizada estará sempre disponível neste portal com a indicação da 
          data de atualização.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-legal-blue mb-3">12. Legislação Aplicável e Foro</h3>
        <p>
          Estes Termos são regidos pela legislação brasileira. Quaisquer controvérsias 
          decorrentes do uso do portal serão dirimidas no foro da Comarca de Cariacica/ES 
          ou na Justiça Federal, quando cabível, conforme art. 109 da Constituição Federal.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-legal-blue mb-3">13. Contato</h3>
        <p>
          Para dúvidas ou informações sobre estes Termos de Uso:
        </p>
        <p className="mt-2">
          <strong>2ª Vara Cível de Cariacica</strong><br />
          Endereço: R. Meridional, 1000 - Alto Lage, Cariacica - ES, 29151-230<br />
          E-mail: 2acivelcariacica@gmail.com<br />
          Telefone: (27) 3246-5641
        </p>
      </section>
    </div>
  </LegalModal>
);
