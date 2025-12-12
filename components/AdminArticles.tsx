import React, { useState, useEffect } from 'react';
import { Icons } from './Icons';
import { Article } from '../services/articleService';
import { useAuth } from '../hooks/useAuth';
import { ArticleForm, ArticleList, type ArticleFormData } from './admin/articles';

interface AdminArticlesProps {
  isOpen: boolean;
  onClose: () => void;
}

const API_URL = '/api/articles';

const CATEGORIES = [
  'Artigo Jurídico',
  'Orientação ao Cidadão',
  'Notícia Interna',
  'Jurisprudência',
  'Opinião',
  'Informativo'
];

const getDefaultFormData = (): ArticleFormData => ({
  title: '',
  excerpt: '',
  content: '',
  author: '2ª Vara Cível de Cariacica',
  category: 'Artigo Jurídico',
  isFeatured: false
});

export const AdminArticles: React.FC<AdminArticlesProps> = ({ isOpen, onClose }) => {
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formData, setFormData] = useState<ArticleFormData>(getDefaultFormData);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadArticles();
    }
  }, [isOpen, isAuthenticated]);

  const loadArticles = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/admin`, {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setArticles(data.data || []);
      } else if (response.status === 401) {
        window.location.href = '/api/login';
      }
    } catch (error) {
      console.error('Error loading articles:', error);
    }
    setIsLoading(false);
  };

  const resetForm = () => {
    setFormData(getDefaultFormData());
    setEditingArticle(null);
    setIsEditing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const url = editingArticle ? `${API_URL}/${editingArticle.id}` : API_URL;
      const method = editingArticle ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ 
          type: 'success', 
          text: editingArticle ? 'Artigo atualizado com sucesso!' : 'Artigo publicado com sucesso!' 
        });
        resetForm();
        loadArticles();
      } else {
        setMessage({ type: 'error', text: data.error || 'Erro ao salvar artigo' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro de conexão. Tente novamente.' });
    }

    setIsLoading(false);
  };

  const handleEdit = (article: Article) => {
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      author: article.author,
      category: article.category,
      isFeatured: article.isFeatured
    });
    setEditingArticle(article);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este artigo?')) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/${id}`, { 
        method: 'DELETE',
        credentials: 'include'
      });
      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Artigo excluído com sucesso!' });
        loadArticles();
      } else {
        setMessage({ type: 'error', text: data.error || 'Erro ao excluir artigo' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro de conexão. Tente novamente.' });
    }
    setIsLoading(false);
  };

  if (!isOpen) return null;

  if (authLoading) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div className="relative min-h-screen flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 text-center">
            <div className="w-12 h-12 border-4 border-legal-gold/30 border-t-legal-gold rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Verificando autenticação...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
        <div className="relative min-h-screen flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center">
            <div className="bg-legal-blue/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icons.Lock className="text-legal-blue" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-legal-blue mb-2">Área Restrita</h2>
            <p className="text-gray-600 mb-6">
              Esta área é exclusiva para administradores. Por favor, faça login para continuar.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="/api/login"
                className="px-6 py-3 bg-legal-gold text-white font-semibold rounded-lg hover:bg-legal-gold-hover transition-colors flex items-center justify-center gap-2"
              >
                <Icons.LogIn size={20} />
                Entrar com Replit
              </a>
              <button
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative min-h-screen flex items-start justify-center p-4 pt-10">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
          <div className="sticky top-0 bg-legal-blue text-white p-6 flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <Icons.FileText size={28} />
              <div>
                <h2 className="text-2xl font-bold">Gerenciar Artigos</h2>
                <p className="text-white/70 text-sm">
                  Olá, {user?.firstName || user?.email || 'Administrador'}!
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="/api/logout"
                className="p-2 hover:bg-white/20 rounded-full transition-colors text-white/70 hover:text-white"
                title="Sair"
              >
                <Icons.LogOut size={20} />
              </a>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Fechar"
              >
                <Icons.X size={24} />
              </button>
            </div>
          </div>

          <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
            {message && (
              <div className={`mx-6 mt-4 p-4 rounded-lg flex items-center gap-2 ${
                message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {message.type === 'success' ? <Icons.CheckCircle size={20} /> : <Icons.AlertCircle size={20} />}
                {message.text}
              </div>
            )}

            <ArticleForm
              formData={formData}
              isEditing={isEditing}
              isLoading={isLoading}
              categories={CATEGORIES}
              onFormChange={setFormData}
              onSubmit={handleSubmit}
              onCancelEdit={resetForm}
            />

            <ArticleList
              articles={articles}
              isLoading={isLoading}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
