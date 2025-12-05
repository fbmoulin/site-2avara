import React, { useEffect } from 'react';
import AccessibilityBar from './AccessibilityBar';
import Navbar from './Navbar';
import Footer from './Footer';
import { Chatbot } from '../Chatbot';
import { PrivacyPolicy, TermsOfUse } from '../LegalDocuments';
import { useUI } from '../../contexts/UIContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isChatOpen, setIsChatOpen, isPrivacyOpen, setIsPrivacyOpen, isTermsOpen, setIsTermsOpen } = useUI();

  useEffect(() => {
    if (document.getElementById('vlibras-script')) return;

    const container = document.createElement('div');
    container.setAttribute('vw', '');
    container.classList.add('enabled');
    container.innerHTML = `
      <div vw-access-button class="active" style="background-color: #1a3a6e !important;"></div>
      <div vw-plugin-wrapper>
        <div class="vw-plugin-top-wrapper"></div>
      </div>
    `;
    document.body.appendChild(container);

    const script = document.createElement('script');
    script.id = 'vlibras-script';
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.async = true;
    script.onload = () => {
      if ((window as any).VLibras) {
        new (window as any).VLibras.Widget('https://vlibras.gov.br/app');
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col transition-colors duration-300">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:bg-legal-gold focus:text-white focus:px-4 focus:py-2 focus:rounded shadow-lg"
      >
        Pular para o conteúdo principal
      </a>

      <AccessibilityBar />
      <Navbar />

      <main id="main-content" className="flex-1 outline-none" tabIndex={-1}>
        {children}
      </main>

      <Footer />

      <Chatbot isOpen={isChatOpen} onToggle={setIsChatOpen} />
      <PrivacyPolicy isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      <TermsOfUse isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
    </div>
  );
};

export default Layout;
