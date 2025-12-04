import React, { useState, useRef, useEffect } from 'react';
import { Icons } from './Icons';
import { getChatResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

interface ChatbotProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      role: 'model',
      text: 'Olá. Sou o assistente virtual da 2ª Vara Cível. Estou disponível para auxiliar Advogados e Partes no registro de demandas, agendamento de atendimento ou localização do Fórum. Como posso ajudar?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Focus management and Escape key
  useEffect(() => {
    if (isOpen) {
      // Move focus to input when opened
      setTimeout(() => inputRef.current?.focus(), 100);
      
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onToggle(false);
        }
      };
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    } else {
      // Return focus to trigger when closed
      if (triggerRef.current) {
        // Only focus if it was open previously to avoid focus stealing on load
        // But since this effect runs on isOpen change, it's fine.
        triggerRef.current.focus();
      }
    }
  }, [isOpen, onToggle]);

  const handleClose = () => {
    onToggle(false);
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await getChatResponse(userMsg.text);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.text,
        groundingMetadata: response.groundingMetadata,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  // Render Grounding Information (Google Maps)
  const renderGroundingInfo = (metadata: any) => {
    if (!metadata || !metadata.groundingChunks) return null;

    return (
      <div className="mt-3 flex flex-col gap-3 w-full">
        {metadata.groundingChunks.map((chunk: any, index: number) => {
          if (chunk.maps) {
            // Construct a simple embed URL using the title/query
            const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(chunk.maps.title || 'Tribunal de Justiça')}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

            return (
              <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transition-all hover:shadow-md w-full">
                {/* Map Iframe Area */}
                <div className="relative w-full h-48 bg-gray-100">
                   <iframe 
                     title={`Mapa de: ${chunk.maps.title}`}
                     width="100%" 
                     height="100%" 
                     src={embedUrl}
                     loading="lazy"
                     className="absolute inset-0 w-full h-full border-0"
                   />
                </div>
                
                {/* Info Area */}
                <div className="p-3">
                  <a 
                    href={chunk.maps.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-start gap-2 text-legal-blue font-bold hover:underline group"
                  >
                    <Icons.MapPin size={16} className="mt-0.5 text-legal-gold shrink-0 group-hover:text-legal-blue transition-colors" />
                    <span className="text-sm leading-tight">{chunk.maps.title || "Visualizar no Google Maps"}</span>
                    <Icons.ExternalLink size={12} className="mt-0.5 opacity-50" />
                  </a>
                  
                  {/* Reviews / Address Snippets */}
                  {chunk.maps.placeAnswerSources?.map((source: any, sIdx: number) => (
                    <div key={sIdx} className="mt-2 text-xs text-gray-500 pl-6 border-l-2 border-gray-100">
                      {source.reviewSnippets?.map((snippet: any, snipIdx: number) => (
                        <p key={snipIdx} className="italic line-clamp-2">"{snippet.text}"</p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end max-w-[calc(100vw-2rem)]">
      {/* Chat Window */}
      {isOpen && (
        <div 
          className="mb-4 w-full sm:w-80 md:w-96 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden flex flex-col animate-fade-in-up" 
          style={{ height: '500px', maxHeight: '80vh' }}
          role="dialog"
          aria-modal="true"
          aria-label="Janela de Atendimento Virtual"
        >
          {/* Header */}
          <div className="bg-legal-blue text-white p-4 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <Icons.Bot size={20} className="text-legal-gold" aria-hidden="true" />
              <h3 className="font-semibold text-sm">Atendimento Virtual</h3>
            </div>
            <button 
              onClick={handleClose}
              className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-legal-gold rounded-sm p-1"
              aria-label="Fechar chat"
            >
              <Icons.X size={18} aria-hidden="true" />
            </button>
          </div>

          {/* Messages Area */}
          <div 
            className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4"
            role="log"
            aria-live="polite"
            aria-atomic="false"
            tabIndex={0}
            aria-label="Histórico da conversa"
          >
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[90%] p-3 rounded-lg text-sm ${
                    msg.role === 'user' 
                      ? 'bg-legal-blue text-white rounded-br-none' 
                      : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  <span className="sr-only">{msg.role === 'user' ? 'Você disse:' : 'Assistente disse:'}</span>
                  <div className="whitespace-pre-wrap break-words">{msg.text}</div>
                  
                  {/* Render Map Links if available */}
                  {msg.role === 'model' && msg.groundingMetadata && renderGroundingInfo(msg.groundingMetadata)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 p-3 rounded-lg rounded-bl-none shadow-sm flex items-center gap-2" aria-label="Assistente digitando">
                  <div className="w-2 h-2 bg-legal-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }} aria-hidden="true"></div>
                  <div className="w-2 h-2 bg-legal-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }} aria-hidden="true"></div>
                  <div className="w-2 h-2 bg-legal-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }} aria-hidden="true"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-200 flex gap-2 shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Digite sua dúvida..."
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-legal-gold focus:ring-1 focus:ring-legal-gold"
              aria-label="Digite sua mensagem"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim()}
              className="bg-legal-gold hover:bg-legal-gold-hover text-white p-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-legal-gold"
              aria-label="Enviar mensagem"
            >
              <Icons.Send size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        ref={triggerRef}
        onClick={() => onToggle(!isOpen)}
        className="bg-legal-gold hover:bg-legal-gold-hover text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-legal-gold/50"
        aria-label={isOpen ? "Fechar atendimento virtual" : "Abrir atendimento virtual"}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        {isOpen ? <Icons.X size={28} aria-hidden="true" /> : <Icons.MessageSquare size={28} aria-hidden="true" />}
      </button>
    </div>
  );
};