import React from 'react';
import { Icons } from '../../Icons';
import { Article } from '../../../services/articleService';

interface ArticleItemProps {
  article: Article;
  onEdit: (article: Article) => void;
  onDelete: (id: string) => void;
}

export const ArticleItem: React.FC<ArticleItemProps> = ({
  article,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
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
          onClick={() => onEdit(article)}
          className="p-2 text-legal-blue hover:bg-legal-blue/10 rounded-lg transition-colors"
          title="Editar"
        >
          <Icons.Edit size={18} />
        </button>
        <button
          onClick={() => onDelete(article.id)}
          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          title="Excluir"
        >
          <Icons.Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default ArticleItem;
