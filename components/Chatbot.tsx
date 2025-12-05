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
      text: 'Olá! Sou o assistente virtual da 2ª Vara Cível de Cariacica. Posso ajudar com agendamentos, informações processuais e localização do Fórum. Como posso ajudar?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeDismissed, setWelcomeDismissed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    if (!welcomeDismissed && !isOpen) {
      const timer = setTimeout(() => {
        setShowWelcome(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [welcomeDismissed, isOpen]);

  // Auto-dismiss welcome tooltip after 5 seconds
  useEffect(() => {
    if (showWelcome) {
      const dismissTimer = setTimeout(() => {
        setShowWelcome(false);
        setWelcomeDismissed(true);
      }, 5000);
      return () => clearTimeout(dismissTimer);
    }
  }, [showWelcome]);

  useEffect(() => {
    if (isOpen) {
      setShowWelcome(false);
      setWelcomeDismissed(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onToggle(false);
        }
      };
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    } else {
      if (triggerRef.current) {
        triggerRef.current.focus();
      }
    }
  }, [isOpen, onToggle]);

  const handleClose = () => {
    onToggle(false);
  };

  const handleDismissWelcome = () => {
    setShowWelcome(false);
    setWelcomeDismissed(true);
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

  const renderGroundingInfo = (metadata: any) => {
    if (!metadata || !metadata.groundingChunks) return null;

    return (
      <div className="mt-3 flex flex-col gap-3 w-full">
        {metadata.groundingChunks.map((chunk: any, index: number) => {
          if (chunk.maps) {
            const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(chunk.maps.title || 'Tribunal de Justiça')}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

            return (
              <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transition-all hover:shadow-md w-full">
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
              <div className="relative">
                <Icons.Bot size={20} className="text-legal-gold" aria-hidden="true" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-legal-blue" aria-hidden="true"></span>
              </div>
              <div>
                <h3 className="font-semibold text-sm">Atendimento Virtual</h3>
                <span className="text-xs text-green-300">Online agora</span>
              </div>
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
                  <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }} />
                  
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
              placeholder="Digite sua mensagem..."
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

      {/* Welcome Tooltip */}
      {showWelcome && !isOpen && (
        <div className="mb-3 animate-fade-in-up">
          <div className="relative bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-[280px]">
            <button
              onClick={handleDismissWelcome}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Fechar mensagem"
            >
              <Icons.X size={14} />
            </button>
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-10 h-10 bg-legal-gold/10 rounded-full flex items-center justify-center">
                <Icons.MessageSquare size={20} className="text-legal-gold" />
              </div>
              <div>
                <p className="font-semibold text-legal-blue text-sm mb-1">Precisa de ajuda?</p>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Nosso assistente virtual pode ajudar com agendamentos, informações e localização.
                </p>
              </div>
            </div>
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r border-b border-gray-200 transform rotate-45"></div>
          </div>
        </div>
      )}

      {/* Toggle Button - Enhanced */}
      <button
        ref={triggerRef}
        onClick={() => onToggle(!isOpen)}
        className={`
          group relative flex items-center gap-3 
          bg-legal-gold hover:bg-legal-gold-hover text-white 
          shadow-xl hover:shadow-2xl
          transition-all duration-300 ease-out
          focus:outline-none focus:ring-4 focus:ring-legal-gold/50
          ${isOpen 
            ? 'w-14 h-14 rounded-full justify-center' 
            : 'h-14 rounded-full pl-4 pr-5 md:pr-6'
          }
        `}
        aria-label={isOpen ? "Fechar atendimento virtual" : "Abrir atendimento virtual"}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        style={{
          boxShadow: isOpen 
            ? '0 10px 40px -10px rgba(196, 154, 60, 0.5)' 
            : '0 10px 40px -10px rgba(196, 154, 60, 0.5), 0 0 0 0 rgba(196, 154, 60, 0.4)'
        }}
      >
        {/* Pulse animation ring */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full animate-ping-slow bg-legal-gold/30" aria-hidden="true"></span>
        )}
        
        {/* Online indicator */}
        {!isOpen && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm" aria-hidden="true">
            <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></span>
          </span>
        )}
        
        {/* Icon */}
        <span className="relative z-10">
          {isOpen 
            ? <Icons.X size={26} aria-hidden="true" /> 
            : <Icons.MessageSquare size={24} aria-hidden="true" />
          }
        </span>
        
        {/* Label - visible when closed */}
        {!isOpen && (
          <span className="relative z-10 font-semibold text-sm whitespace-nowrap">
            <span className="hidden md:inline">Atendimento Virtual</span>
            <span className="md:hidden">Fale Conosco</span>
          </span>
        )}
      </button>
    </div>
  );
};
