import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { isAuthenticated } from '../middleware/replitAuth.js';

const router = Router();
const prisma = new PrismaClient();

router.get('/admin', isAuthenticated, async (req: Request, res: Response) => {
  try {
    const articles = await prisma.article.findMany({
      orderBy: [
        { isFeatured: 'desc' },
        { publishedAt: 'desc' }
      ]
    });

    res.json({
      success: true,
      data: articles
    });
  } catch (error) {
    console.error('Error fetching articles for admin:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar artigos'
    });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const articles = await prisma.article.findMany({
      where: { isPublished: true },
      orderBy: [
        { isFeatured: 'desc' },
        { publishedAt: 'desc' }
      ],
      take: 10
    });

    res.json({
      success: true,
      data: articles
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar artigos'
    });
  }
});

router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const article = await prisma.article.findUnique({
      where: { slug, isPublished: true }
    });

    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'Artigo não encontrado'
      });
    }

    res.json({
      success: true,
      data: article
    });
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar artigo'
    });
  }
});

router.post('/', isAuthenticated, async (req: Request, res: Response) => {
  try {
    const { title, excerpt, content, author, category, imageUrl, isFeatured } = req.body;

    if (!title || !excerpt || !content) {
      return res.status(400).json({
        success: false,
        error: 'Título, resumo e conteúdo são obrigatórios'
      });
    }

    const slug = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const article = await prisma.article.create({
      data: {
        title,
        slug: `${slug}-${Date.now()}`,
        excerpt,
        content,
        author: author || '2ª Vara Cível de Cariacica',
        category: category || 'Artigo Jurídico',
        imageUrl,
        isFeatured: isFeatured || false
      }
    });

    res.status(201).json({
      success: true,
      data: article
    });
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao criar artigo'
    });
  }
});

router.put('/:id', isAuthenticated, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, excerpt, content, author, category, imageUrl, isPublished, isFeatured } = req.body;

    const article = await prisma.article.update({
      where: { id },
      data: {
        title,
        excerpt,
        content,
        author,
        category,
        imageUrl,
        isPublished,
        isFeatured
      }
    });

    res.json({
      success: true,
      data: article
    });
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao atualizar artigo'
    });
  }
});

router.delete('/:id', isAuthenticated, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.article.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Artigo excluído com sucesso'
    });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao excluir artigo'
    });
  }
});

export default router;
