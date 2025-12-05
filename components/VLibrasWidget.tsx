import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    VLibras: {
      Widget: new (url: string) => void;
    };
  }
}

const VLibrasWidget: React.FC = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const initVLibras = () => {
      let container = document.querySelector('[vw]');
      if (!container) {
        container = document.createElement('div');
        container.setAttribute('vw', '');
        container.className = 'enabled high-contrast-ignore';
        container.innerHTML = `
          <div vw-access-button class="active"></div>
          <div vw-plugin-wrapper>
            <div class="vw-plugin-top-wrapper"></div>
          </div>
        `;
        document.body.appendChild(container);
      }

      if (window.VLibras) {
        new window.VLibras.Widget('https://vlibras.gov.br/app');
      }
    };

    const existingScript = document.querySelector('script[src*="vlibras-plugin.js"]');
    
    if (existingScript) {
      initVLibras();
    } else {
      const script = document.createElement('script');
      script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
      script.async = true;
      script.onload = initVLibras;
      document.head.appendChild(script);
    }
  }, []);

  return null;
};

export default VLibrasWidget;
