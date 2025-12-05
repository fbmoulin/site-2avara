import React, { useState, useEffect } from 'react';
import { Icons } from './Icons';
import { Article } from '../services/articleService';
import { useAuth } from '../hooks/useAuth';

interface AdminArticlesProps {
  isOpen: boolean;
  onClose: () => void;
}

const API_URL = '/api/articles';

export const AdminArticles: React.FC<AdminArticlesProps> = ({ isOpen, onClose }) => {
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '2ª Vara Cível de Cariacica',
    category: 'Artigo Jurídico',
    isFeatured: false
  });

  const categories = [
    'Artigo Jurídico',
    'Orientação ao Cidadão',
    'Notícia Interna',
    'Jurisprudência',
    'Opinião',
    'Informativo'
  ];

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
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: '2ª Vara Cível de Cariacica',
      category: 'Artigo Jurídico',
      isFeatured: false
    });
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

            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-legal-blue">
                  {isEditing ? 'Editar Artigo' : 'Novo Artigo'}
                </h3>
                {isEditing && (
                  <button
                    onClick={resetForm}
                    className="text-sm text-gray-500 hover:text-legal-blue transition-colors"
                  >
                    Cancelar edição
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Título *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-legal-gold focus:border-transparent transition-all"
                      placeholder="Digite o título do artigo"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Autor</label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-legal-gold focus:border-transparent transition-all"
                      placeholder="Nome do autor"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Categoria</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-legal-gold focus:border-transparent transition-all bg-white"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Resumo *</label>
                    <textarea
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-legal-gold focus:border-transparent transition-all resize-none"
                      rows={2}
                      placeholder="Breve resumo do artigo (aparece na listagem)"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Conteúdo *</label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-legal-gold focus:border-transparent transition-all resize-none"
                      rows={6}
                      placeholder="Conteúdo completo do artigo"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isFeatured}
                        onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                        className="w-5 h-5 rounded border-gray-300 text-legal-gold focus:ring-legal-gold"
                      />
                      <span className="text-sm font-semibold text-gray-700">Marcar como destaque</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3 bg-legal-gold text-white font-semibold rounded-lg hover:bg-legal-gold-hover transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Salvando...
                      </>
                    ) : (
                      <>
                        <Icons.Send size={18} />
                        {isEditing ? 'Atualizar Artigo' : 'Publicar Artigo'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            <div className="border-t border-gray-200 p-6">
              <h3 className="text-xl font-bold text-legal-blue mb-4">Artigos Publicados</h3>
              
              {isLoading && articles.length === 0 ? (
                <div className="text-center py-8 text-gray-500">Carregando artigos...</div>
              ) : articles.length === 0 ? (
                <div className="text-center py-8 text-gray-500">Nenhum artigo publicado ainda.</div>
              ) : (
                <div className="space-y-3">
                  {articles.map((article) => (
                    <div 
                      key={article.id}
                      className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 bg-legal-blue/10 text-legal-blue text-xs font-semibold rounded-full">
                            {article.category}
                          </span>
                          {article.isFeatured && (
                            <span className="px-2 py-0.5 bg-legal-gold/10 text-legal-gold text-xs font-bold rounded-full">
                              Destaque
                            </span>
                          )}
                        </div>
                        <h4 className="font-semibold text-gray-800 truncate">{article.title}</h4>
                        <p className="text-sm text-gray-500 truncate">{article.excerpt}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                          <span>{article.author}</span>
                          <span>{new Date(article.publishedAt).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(article)}
                          className="p-2 text-legal-blue hover:bg-legal-blue/10 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Icons.Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Excluir"
                        >
                          <Icons.Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
