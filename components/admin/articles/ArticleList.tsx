import React from 'react';
import { Article } from '../../../services/articleService';
import { ArticleItem } from './ArticleItem';

interface ArticleListProps {
  articles: Article[];
  isLoading: boolean;
  onEdit: (article: Article) => void;
  onDelete: (id: string) => void;
}

export const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  isLoading,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="border-t border-gray-200 p-6">
      <h3 className="text-xl font-bold text-legal-blue mb-4">Artigos Publicados</h3>

      {isLoading && articles.length === 0 ? (
        <div className="text-center py-8 text-gray-500">Carregando artigos...</div>
      ) : articles.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Nenhum artigo publicado ainda.
        </div>
      ) : (
        <div className="space-y-3">
          {articles.map((article) => (
            <ArticleItem
              key={article.id}
              article={article}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticleList;
