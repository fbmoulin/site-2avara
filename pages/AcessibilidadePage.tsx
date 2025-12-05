import React from 'react';
import { Icons } from '../components/Icons';

const AcessibilidadePage: React.FC = () => {
  return (
    <section className="bg-slate-900 py-16" aria-label="Recursos de Acessibilidade">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Icons.Accessibility className="text-legal-gold" size={32} />
            <h1 className="text-3xl font-serif font-bold text-white">Recursos de Acessibilidade</h1>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Este portal segue as diretrizes do CNJ (Resolução 401/2021), e-MAG 3.1 e WCAG 2.2 para garantir acesso a todos os cidadãos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          <div className="bg-slate-800/50 rounded-lg p-5 border border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-legal-gold/20 rounded-full flex items-center justify-center">
                <span className="text-legal-gold font-bold text-lg">A+</span>
              </div>
              <h3 className="text-white font-semibold">Tamanho da Fonte</h3>
            </div>
            <p className="text-gray-400 text-sm mb-3">
              Aumente ou diminua o tamanho do texto para melhor leitura.
            </p>
            <div className="bg-slate-900/50 rounded p-3 text-xs text-gray-500">
              <strong className="text-gray-300">Como usar:</strong> Clique nos botões A, A+ ou A- na barra superior.
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-5 border border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-legal-gold/20 rounded-full flex items-center justify-center">
                <Icons.Eye className="text-legal-gold" size={20} />
              </div>
              <h3 className="text-white font-semibold">Alto Contraste</h3>
            </div>
            <p className="text-gray-400 text-sm mb-3">
              Ativa fundo preto com texto claro para pessoas com baixa visão.
            </p>
            <div className="bg-slate-900/50 rounded p-3 text-xs text-gray-500">
              <strong className="text-gray-300">Como usar:</strong> Clique em "Alto Contraste" na barra superior.
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-5 border border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-legal-gold/20 rounded-full flex items-center justify-center">
                <Icons.Moon className="text-legal-gold" size={20} />
              </div>
              <h3 className="text-white font-semibold">Modo Noturno</h3>
            </div>
            <p className="text-gray-400 text-sm mb-3">
              Tema escuro para reduzir fadiga visual em ambientes com pouca luz.
            </p>
            <div className="bg-slate-900/50 rounded p-3 text-xs text-gray-500">
              <strong className="text-gray-300">Como usar:</strong> Clique em "Modo Noturno" na barra superior.
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-5 border border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-legal-gold/20 rounded-full flex items-center justify-center">
                <Icons.Keyboard className="text-legal-gold" size={20} />
              </div>
              <h3 className="text-white font-semibold">Navegação por Teclado</h3>
            </div>
            <p className="text-gray-400 text-sm mb-3">
              Navegue pelo site usando apenas o teclado, sem necessidade de mouse.
            </p>
            <div className="bg-slate-900/50 rounded p-3 text-xs text-gray-500">
              <strong className="text-gray-300">Como usar:</strong> Use Tab para avançar, Shift+Tab para voltar, Enter para ativar.
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-5 border border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-legal-gold/20 rounded-full flex items-center justify-center">
                <Icons.SkipForward className="text-legal-gold" size={20} />
              </div>
              <h3 className="text-white font-semibold">Pular para Conteúdo</h3>
            </div>
            <p className="text-gray-400 text-sm mb-3">
              Pule diretamente para o conteúdo principal, ignorando menus repetitivos.
            </p>
            <div className="bg-slate-900/50 rounded p-3 text-xs text-gray-500">
              <strong className="text-gray-300">Como usar:</strong> Pressione Tab ao carregar a página e clique no link que aparecer.
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-5 border border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-legal-gold/20 rounded-full flex items-center justify-center">
                <Icons.VLibras className="text-legal-gold" size={20} />
              </div>
              <h3 className="text-white font-semibold">VLibras (LIBRAS)</h3>
            </div>
            <p className="text-gray-400 text-sm mb-3">
              Tradução automática de textos para Língua Brasileira de Sinais.
            </p>
            <div className="bg-slate-900/50 rounded p-3 text-xs text-gray-500">
              <strong className="text-gray-300">Como usar:</strong> Clique no botão azul no canto direito da tela e selecione o texto.
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <h2 className="text-white font-semibold text-lg mb-4 text-center flex items-center justify-center gap-2">
            <Icons.Keyboard size={20} className="text-legal-gold" />
            Atalhos de Teclado (Padrão e-MAG)
          </h2>
          <div className="bg-slate-800/50 rounded-lg border border-gray-700 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-800 border-b border-gray-700">
                  <th className="text-left text-gray-300 font-semibold py-3 px-4">Atalho</th>
                  <th className="text-left text-gray-300 font-semibold py-3 px-4">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr>
                  <td className="py-3 px-4">
                    <kbd className="bg-slate-700 text-legal-gold px-2 py-1 rounded text-xs font-mono">Alt + 1</kbd>
                  </td>
                  <td className="py-3 px-4 text-gray-400">Ir para o conteúdo principal</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">
                    <kbd className="bg-slate-700 text-legal-gold px-2 py-1 rounded text-xs font-mono">Alt + 2</kbd>
                  </td>
                  <td className="py-3 px-4 text-gray-400">Ir para o menu de navegação</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">
                    <kbd className="bg-slate-700 text-legal-gold px-2 py-1 rounded text-xs font-mono">Alt + 3</kbd>
                  </td>
                  <td className="py-3 px-4 text-gray-400">Ir para o rodapé</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">
                    <kbd className="bg-slate-700 text-legal-gold px-2 py-1 rounded text-xs font-mono">Tab</kbd>
                  </td>
                  <td className="py-3 px-4 text-gray-400">Próximo elemento interativo</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">
                    <kbd className="bg-slate-700 text-legal-gold px-2 py-1 rounded text-xs font-mono">Shift + Tab</kbd>
                  </td>
                  <td className="py-3 px-4 text-gray-400">Elemento anterior</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">
                    <kbd className="bg-slate-700 text-legal-gold px-2 py-1 rounded text-xs font-mono">Enter</kbd>
                  </td>
                  <td className="py-3 px-4 text-gray-400">Ativar elemento focado</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">
                    <kbd className="bg-slate-700 text-legal-gold px-2 py-1 rounded text-xs font-mono">Esc</kbd>
                  </td>
                  <td className="py-3 px-4 text-gray-400">Fechar modal ou menu</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-500 text-xs text-center mt-3">
            <strong>Nota:</strong> No Firefox, use Alt+Shift+número. No Safari (Mac), use Control+Option+número.
          </p>
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm">
            Este portal está em conformidade com a{' '}
            <span className="text-legal-gold">Resolução CNJ nº 401/2021</span>,{' '}
            <span className="text-legal-gold">e-MAG 3.1</span> e{' '}
            <span className="text-legal-gold">WCAG 2.2 Nível AA</span>.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Problemas de acessibilidade? Entre em contato pelo formulário de contato ou ligue para a secretaria da vara.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AcessibilidadePage;
