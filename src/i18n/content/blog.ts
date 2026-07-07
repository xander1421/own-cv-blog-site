// Per-locale content for the BLOG INDEX page (src/pages/blog.astro ->
// src/components/pages/BlogIndex.astro). This is ONLY the page's own chrome:
// meta title/description, heading/subtitle, breadcrumb label, the empty-state
// message, and the "Read Article →" card link text.
//
// The blog POSTS themselves (titles, descriptions, dates, tags) come from the
// `blog` content collection and stay English — they are NOT translated here.
// The "min read" / "Read more" inline labels reuse the existing `post.*` keys
// in ui.ts via useTranslations, so they are not duplicated here.
//
// English is the source of truth and lives in `en` with ALL keys. Other locales
// start empty; translators fill them and missing keys fall back to English via
// getBlogContent().

import type { Lang } from '../ui';

export const blog = {
  en: {
    metaTitle: 'Blog — DevOps, Cloud & Security',
    metaDescription:
      'Articles on DevOps, AWS, Kubernetes, Terraform, containers, CI/CD, and security — written from real production experience, with concrete examples.',
    breadcrumbBlog: 'Blog',
    heading: 'Blog',
    subtitle: 'Insights on DevOps, Cloud Infrastructure, and Automation',
    noPosts: 'No blog posts yet. Check back soon!',
    // "Read Article →" card link, split so the {post.title} stays in the
    // sr-only span. Rendered as: Read<span> full article: TITLE</span> Article →
    readArticleLabel: 'Read',
    readArticleSrLabel: ' full article: ',
    readArticleTail: ' Article →',
  },
  de: {
    metaTitle: 'Blog — DevOps, Cloud & Sicherheit',
    metaDescription:
      'Artikel über DevOps, AWS, Kubernetes, Terraform, Container, CI/CD und Sicherheit — aus echter Produktionserfahrung, mit konkreten Beispielen.',
    breadcrumbBlog: 'Blog',
    heading: 'Blog',
    subtitle: 'Einblicke in DevOps, Cloud-Infrastruktur und Automatisierung',
    noPosts: 'Noch keine Blogbeiträge. Schauen Sie bald wieder vorbei!',
    readArticleLabel: 'Artikel',
    readArticleSrLabel: ' vollständigen Artikel: ',
    readArticleTail: ' lesen →',
  },
  es: {
    metaTitle: 'Blog — DevOps, Cloud y Seguridad',
    metaDescription:
      'Artículos sobre DevOps, AWS, Kubernetes, Terraform, contenedores, CI/CD y seguridad — escritos desde experiencia real en producción, con ejemplos concretos.',
    breadcrumbBlog: 'Blog',
    heading: 'Blog',
    subtitle: 'Ideas sobre DevOps, infraestructura en la nube y automatización',
    noPosts: 'Aún no hay artículos en el blog. ¡Vuelve pronto!',
    readArticleLabel: 'Leer',
    readArticleSrLabel: ' el artículo completo: ',
    readArticleTail: ' artículo →',
  },
  pt: {
    metaTitle: 'Blog — DevOps, Cloud e Segurança',
    metaDescription:
      'Artigos sobre DevOps, AWS, Kubernetes, Terraform, containers, CI/CD e segurança — escritos a partir de experiência real em produção, com exemplos concretos.',
    breadcrumbBlog: 'Blog',
    heading: 'Blog',
    subtitle: 'Insights sobre DevOps, infraestrutura em nuvem e automação',
    noPosts: 'Ainda não há posts no blog. Volte em breve!',
    readArticleLabel: 'Ler',
    readArticleSrLabel: ' o artigo completo: ',
    readArticleTail: ' artigo →',
  },
  fr: {
    metaTitle: 'Blog — DevOps, Cloud et Sécurité',
    metaDescription:
      "Articles sur le DevOps, AWS, Kubernetes, Terraform, les conteneurs, le CI/CD et la sécurité — issus d'une expérience réelle en production, avec des exemples concrets.",
    breadcrumbBlog: 'Blog',
    heading: 'Blog',
    subtitle: "Regards sur le DevOps, l'infrastructure cloud et l'automatisation",
    noPosts: 'Aucun article de blog pour le moment. Revenez bientôt !',
    readArticleLabel: 'Lire',
    readArticleSrLabel: " l'article complet : ",
    readArticleTail: " l'article →",
  },
  ro: {
    metaTitle: 'Blog — DevOps, Cloud și Securitate',
    metaDescription:
      'Articole despre DevOps, AWS, Kubernetes, Terraform, containere, CI/CD și securitate — scrise din experiență reală de producție, cu exemple concrete.',
    breadcrumbBlog: 'Blog',
    heading: 'Blog',
    subtitle: 'Perspective despre DevOps, infrastructură cloud și automatizare',
    noPosts: 'Încă nu există articole pe blog. Reveniți în curând!',
    readArticleLabel: 'Citiți',
    readArticleSrLabel: ' articolul complet: ',
    readArticleTail: ' articolul →',
  },
} as const;

export function getBlogContent(lang: Lang) {
  return { ...blog.en, ...blog[lang] };
}
