import React from 'react';
import { Icons } from '../../Icons';

export interface ArticleFormData {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  isFeatured: boolean;
}

interface ArticleFormProps {
  formData: ArticleFormData;
  isEditing: boolean;
  isLoading: boolean;
  categories: string[];
  onFormChange: (data: ArticleFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancelEdit: () => void;
}

export const ArticleForm: React.FC<ArticleFormProps> = ({
  formData,
  isEditing,
  isLoading,
  categories,
  onFormChange,
  onSubmit,
  onCancelEdit,
}) => {
  const updateField = <K extends keyof ArticleFormData>(
    field: K,
    value: ArticleFormData[K]
  ) => {
    onFormChange({ ...formData, [field]: value });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-legal-blue">
          {isEditing ? 'Editar Artigo' : 'Novo Artigo'}
        </h3>
        {isEditing && (
          <button
            onClick={onCancelEdit}
            className="text-sm text-gray-500 hover:text-legal-blue transition-colors"
          >
            Cancelar edição
          </button>
        )}
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Título *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-legal-gold focus:border-transparent transition-all"
              placeholder="Digite o título do artigo"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Autor
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => updateField('author', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-legal-gold focus:border-transparent transition-all"
              placeholder="Nome do autor"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Categoria
            </label>
            <select
              value={formData.category}
              onChange={(e) => updateField('category', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-legal-gold focus:border-transparent transition-all bg-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Resumo *
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => updateField('excerpt', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-legal-gold focus:border-transparent transition-all resize-none"
              rows={2}
              placeholder="Breve resumo do artigo (aparece na listagem)"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Conteúdo *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => updateField('content', e.target.value)}
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
                onChange={(e) => updateField('isFeatured', e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-legal-gold focus:ring-legal-gold"
              />
              <span className="text-sm font-semibold text-gray-700">
                Marcar como destaque
              </span>
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
  );
};

export default ArticleForm;
