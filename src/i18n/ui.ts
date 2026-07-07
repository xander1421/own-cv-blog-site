// UI string dictionary for chrome + short reusable strings.
// English is the source of truth; other langs fall back to English per key.
// Long-form page prose does NOT live here — keep that as per-locale content.

export const languages = {
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
  pt: 'Português',
  fr: 'Français',
  ro: 'Română',
} as const;

export const defaultLang = 'en';

export const ui = {
  en: {
    'nav.services': 'Services',
    'nav.blog': 'Blog',
    'nav.projects': 'Projects',
    'nav.about': 'About',
    'nav.bookCall': 'Book a call',
    'nav.toggleMenu': 'Toggle menu',
    'nav.search': 'Search',
    'search.placeholder': 'Search services and posts...',
    'search.noResults': 'No results found. Try different keywords.',
    'backToTop': 'Back to top',
    'footer.role': 'DevOps Engineer',
    'breadcrumb.home': 'Home',
    // Blog post cards (shown on localized home + project pages)
    'post.minRead': 'min read',
    'post.readMore': 'Read more →',
    // Services pages chrome (shared across /services and /services/<slug>)
    'svc.metaTitle': 'DevOps & Cloud Consulting Services',
    'svc.metaDescription': 'DevOps and cloud consulting: cloud migration, Kubernetes, cost optimization, CI/CD, plus architecture review, AI-app audits, and idea-to-production builds.',
    'svc.kicker': 'Services',
    'svc.h1': 'From keeping production boring to shipping your whole product',
    'svc.lead': 'DevOps and cloud is the day job — migrations, Kubernetes, cost, CI/CD. But I also review architecture, audit AI-built apps, and take ideas all the way to shipped. Pick where it hurts most.',
    'svc.groupDevopsLabel': 'DevOps & Cloud',
    'svc.groupDevopsBlurb': 'The main spin — keep production fast, cheap, and boring.',
    'svc.groupProductLabel': 'Product, Architecture & Build',
    'svc.groupProductBlurb': 'Take an idea to a real, secure, shipped app — and de-risk the AI-built ones.',
    'svc.learnMore': 'Learn more →',
    'svc.bookDiscovery': 'Book a free discovery call',
    'svc.hereBecause': "You're probably here because",
    'svc.whatYouGet': 'What you get',
    'svc.tldr': 'TL;DR',
    'svc.commonQuestions': 'Common questions',
    'svc.fitHeading': "Let's see if it's a fit",
    'svc.fitBody': "A free 30-minute call, no obligation. We'll find the quickest wins in your setup.",
    'svc.otherHelp': 'Other things I help with',
  },
  de: {
    'nav.services': 'Leistungen',
    'nav.blog': 'Blog',
    'nav.projects': 'Projekte',
    'nav.about': 'Über mich',
    'nav.bookCall': 'Termin buchen',
    'nav.toggleMenu': 'Menü umschalten',
    'nav.search': 'Suche',
    'search.placeholder': 'Leistungen und Beiträge durchsuchen...',
    'search.noResults': 'Keine Ergebnisse. Andere Suchbegriffe versuchen.',
    'backToTop': 'Nach oben',
    'footer.role': 'DevOps-Ingenieur',
    'breadcrumb.home': 'Startseite',
    'post.minRead': 'Min. Lesezeit',
    'post.readMore': 'Mehr lesen →',
    // Services pages chrome (shared across /services and /services/<slug>)
    'svc.metaTitle': 'DevOps- & Cloud-Beratung',
    'svc.metaDescription': 'DevOps- und Cloud-Beratung: Cloud-Migration, Kubernetes-Beratung, Kostenoptimierung, CI/CD sowie Architektur-Reviews, KI-App-Audits und Umsetzung von der Idee bis in die Produktion.',
    'svc.kicker': 'Leistungen',
    'svc.h1': 'Von reibungslosem Produktivbetrieb bis zur Umsetzung Ihres ganzen Produkts',
    'svc.lead': 'DevOps und Cloud sind das Tagesgeschäft — Migrationen, Kubernetes, Kosten, CI/CD. Ich prüfe aber auch Architekturen, auditiere KI-gebaute Apps und bringe Ideen bis zum Livegang. Wählen Sie, wo es am meisten drückt.',
    'svc.groupDevopsLabel': 'DevOps & Cloud',
    'svc.groupDevopsBlurb': 'Das Kerngeschäft — der Produktivbetrieb bleibt schnell, günstig und unauffällig.',
    'svc.groupProductLabel': 'Produkt, Architektur & Umsetzung',
    'svc.groupProductBlurb': 'Aus einer Idee eine echte, sichere und ausgelieferte App machen — und die KI-gebauten absichern.',
    'svc.learnMore': 'Mehr erfahren →',
    'svc.bookDiscovery': 'Kostenloses Erstgespräch buchen',
    'svc.hereBecause': 'Sie sind vermutlich hier, weil',
    'svc.whatYouGet': 'Was Sie erhalten',
    'svc.tldr': 'Kurz gesagt',
    'svc.commonQuestions': 'Häufige Fragen',
    'svc.fitHeading': 'Sehen wir, ob es passt',
    'svc.fitBody': 'Ein kostenloses 30-minütiges Gespräch, unverbindlich. Wir finden die schnellsten Erfolge in Ihrem Setup.',
    'svc.otherHelp': 'Weitere Themen, bei denen ich helfe',
  },
  es: {
    'nav.services': 'Servicios',
    'nav.blog': 'Blog',
    'nav.projects': 'Proyectos',
    'nav.about': 'Sobre mí',
    'nav.bookCall': 'Reservar llamada',
    'nav.toggleMenu': 'Alternar menú',
    'nav.search': 'Buscar',
    'search.placeholder': 'Buscar servicios y publicaciones...',
    'search.noResults': 'Sin resultados. Prueba otras palabras clave.',
    'backToTop': 'Volver arriba',
    'footer.role': 'Ingeniero DevOps',
    'breadcrumb.home': 'Inicio',
    'post.minRead': 'min de lectura',
    'post.readMore': 'Leer más →',
    // Services pages chrome (shared across /services and /services/<slug>)
    'svc.metaTitle': 'Consultoría DevOps y cloud',
    'svc.metaDescription': 'Consultoría DevOps y cloud: migración a la nube, consultor Kubernetes, optimización de costes cloud, CI/CD, además de revisión de arquitectura, auditorías de apps con IA y desarrollo de la idea a producción.',
    'svc.kicker': 'Servicios',
    'svc.h1': 'De mantener la producción sin sobresaltos a lanzar todo tu producto',
    'svc.lead': 'DevOps y cloud son el día a día: migraciones, Kubernetes, costes, CI/CD. Pero también reviso arquitecturas, audito apps creadas con IA y llevo las ideas hasta el lanzamiento. Elige donde más te duele.',
    'svc.groupDevopsLabel': 'DevOps y cloud',
    'svc.groupDevopsBlurb': 'El trabajo principal: mantener la producción rápida, económica y sin sorpresas.',
    'svc.groupProductLabel': 'Producto, arquitectura y desarrollo',
    'svc.groupProductBlurb': 'Llevar una idea a una app real, segura y lanzada, y reducir los riesgos de las creadas con IA.',
    'svc.learnMore': 'Saber más →',
    'svc.bookDiscovery': 'Reserva una llamada de descubrimiento gratuita',
    'svc.hereBecause': 'Probablemente estás aquí porque',
    'svc.whatYouGet': 'Qué obtienes',
    'svc.tldr': 'En resumen',
    'svc.commonQuestions': 'Preguntas frecuentes',
    'svc.fitHeading': 'Veamos si encaja',
    'svc.fitBody': 'Una llamada gratuita de 30 minutos, sin compromiso. Encontraremos las mejoras más rápidas en tu configuración.',
    'svc.otherHelp': 'Otras cosas en las que ayudo',
  },
  pt: {
    'nav.services': 'Serviços',
    'nav.blog': 'Blog',
    'nav.projects': 'Projetos',
    'nav.about': 'Sobre',
    'nav.bookCall': 'Agendar chamada',
    'nav.toggleMenu': 'Alternar menu',
    'nav.search': 'Buscar',
    'search.placeholder': 'Buscar serviços e publicações...',
    'search.noResults': 'Nenhum resultado. Tente outras palavras-chave.',
    'backToTop': 'Voltar ao topo',
    'footer.role': 'Engenheiro DevOps',
    'breadcrumb.home': 'Início',
    'post.minRead': 'min de leitura',
    'post.readMore': 'Ler mais →',
    // Services pages chrome (shared across /services and /services/<slug>)
    'svc.metaTitle': 'Consultoria DevOps e em nuvem',
    'svc.metaDescription': 'Consultoria DevOps e em nuvem: migração para nuvem, Kubernetes, otimização de custos, CI/CD, além de revisão de arquitetura, auditoria de apps feitas com IA e desenvolvimento da ideia até produção.',
    'svc.kicker': 'Serviços',
    'svc.h1': 'De manter a produção tranquila a colocar todo o seu produto no ar',
    'svc.lead': 'DevOps e nuvem são o trabalho do dia a dia: migrações, Kubernetes, custos, CI/CD. Mas também reviso arquiteturas, audito apps criadas com IA e levo ideias até a entrega. Escolha onde dói mais.',
    'svc.groupDevopsLabel': 'DevOps e nuvem',
    'svc.groupDevopsBlurb': 'O trabalho principal: manter a produção rápida, barata e sem surpresas.',
    'svc.groupProductLabel': 'Produto, arquitetura e desenvolvimento',
    'svc.groupProductBlurb': 'Transformar uma ideia em uma app real, segura e entregue, e reduzir os riscos das criadas com IA.',
    'svc.learnMore': 'Saiba mais →',
    'svc.bookDiscovery': 'Agende uma conversa inicial gratuita',
    'svc.hereBecause': 'Você provavelmente está aqui porque',
    'svc.whatYouGet': 'O que você recebe',
    'svc.tldr': 'Em resumo',
    'svc.commonQuestions': 'Perguntas frequentes',
    'svc.fitHeading': 'Vamos ver se faz sentido',
    'svc.fitBody': 'Uma conversa gratuita de 30 minutos, sem compromisso. Vamos encontrar as vitórias mais rápidas na sua configuração.',
    'svc.otherHelp': 'Outras coisas em que ajudo',
  },
  fr: {
    'nav.services': 'Services',
    'nav.blog': 'Blog',
    'nav.projects': 'Projets',
    'nav.about': 'À propos',
    'nav.bookCall': 'Réserver un appel',
    'nav.toggleMenu': 'Basculer le menu',
    'nav.search': 'Rechercher',
    'search.placeholder': 'Rechercher services et articles...',
    'search.noResults': 'Aucun résultat. Essayez d\'autres mots-clés.',
    'backToTop': 'Retour en haut',
    'footer.role': 'Ingénieur DevOps',
    'breadcrumb.home': 'Accueil',
    'post.minRead': 'min de lecture',
    'post.readMore': 'Lire plus →',
    // Services pages chrome (shared across /services and /services/<slug>)
    'svc.metaTitle': 'Conseil DevOps & cloud',
    'svc.metaDescription': "Conseil DevOps et cloud : migration cloud, consultant Kubernetes, optimisation des coûts cloud, CI/CD, ainsi que revue d'architecture, audits d'applications créées par IA et réalisation de l'idée à la production.",
    'svc.kicker': 'Services',
    'svc.h1': 'De la production sans accroc au lancement de tout votre produit',
    'svc.lead': "DevOps et cloud, c'est le quotidien : migrations, Kubernetes, coûts, CI/CD. Mais je revois aussi les architectures, j'audite les applications créées par IA et je mène les idées jusqu'à la mise en production. Choisissez là où ça fait le plus mal.",
    'svc.groupDevopsLabel': 'DevOps & cloud',
    'svc.groupDevopsBlurb': 'Le cœur du métier : garder une production rapide, économique et sans surprise.',
    'svc.groupProductLabel': 'Produit, architecture & réalisation',
    'svc.groupProductBlurb': "Transformer une idée en une application réelle, sûre et livrée, et sécuriser celles créées par IA.",
    'svc.learnMore': 'En savoir plus →',
    'svc.bookDiscovery': 'Réservez un appel découverte gratuit',
    'svc.hereBecause': 'Vous êtes probablement ici parce que',
    'svc.whatYouGet': 'Ce que vous obtenez',
    'svc.tldr': 'En bref',
    'svc.commonQuestions': 'Questions fréquentes',
    'svc.fitHeading': 'Voyons si le courant passe',
    'svc.fitBody': "Un appel gratuit de 30 minutes, sans engagement. Nous trouverons les gains les plus rapides dans votre configuration.",
    'svc.otherHelp': "Autres sujets sur lesquels j'interviens",
  },
  ro: {
    'nav.services': 'Servicii',
    'nav.blog': 'Blog',
    'nav.projects': 'Proiecte',
    'nav.about': 'Despre',
    'nav.bookCall': 'Programează o discuție',
    'nav.toggleMenu': 'Comută meniul',
    'nav.search': 'Caută',
    'search.placeholder': 'Caută servicii și articole...',
    'search.noResults': 'Niciun rezultat. Încercați alte cuvinte cheie.',
    'backToTop': 'Înapoi sus',
    'footer.role': 'Inginer DevOps',
    'breadcrumb.home': 'Acasă',
    'post.minRead': 'min de citit',
    'post.readMore': 'Citește mai mult →',
    // Services pages chrome (shared across /services and /services/<slug>)
    'svc.metaTitle': 'Servicii de consultanță DevOps și cloud',
    'svc.metaDescription': 'Consultanță DevOps și cloud: migrare în cloud, Kubernetes, optimizarea costurilor cloud, CI/CD, plus analiză de arhitectură, audit de aplicații create cu IA și dezvoltare de la idee la producție.',
    'svc.kicker': 'Servicii',
    'svc.h1': 'De la o producție stabilă la lansarea întregului dumneavoastră produs',
    'svc.lead': 'DevOps și cloud sunt activitatea de zi cu zi — migrări, Kubernetes, costuri, CI/CD. Dar analizez și arhitecturi, auditez aplicații create cu IA și duc ideile până la lansare. Alegeți unde vă doare cel mai tare.',
    'svc.groupDevopsLabel': 'DevOps și cloud',
    'svc.groupDevopsBlurb': 'Activitatea principală — o producție rapidă, ieftină și fără surprize.',
    'svc.groupProductLabel': 'Produs, arhitectură și dezvoltare',
    'svc.groupProductBlurb': 'Transformați o idee într-o aplicație reală, sigură și lansată — și reduceți riscurile celor create cu IA.',
    'svc.learnMore': 'Aflați mai multe →',
    'svc.bookDiscovery': 'Programați o discuție gratuită de evaluare',
    'svc.hereBecause': 'Probabil sunteți aici pentru că',
    'svc.whatYouGet': 'Ce primiți',
    'svc.tldr': 'Pe scurt',
    'svc.commonQuestions': 'Întrebări frecvente',
    'svc.fitHeading': 'Să vedem dacă ne potrivim',
    'svc.fitBody': 'O discuție gratuită de 30 de minute, fără obligații. Găsim cele mai rapide îmbunătățiri din configurația dumneavoastră.',
    'svc.otherHelp': 'Alte lucruri cu care vă ajut',
  },
} as const;

export type Lang = keyof typeof ui;
export type UIKey = keyof typeof ui[typeof defaultLang];

export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split('/');
  if (seg in ui) return seg as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  // Cast: non-default langs may hold only a subset of keys (translated incrementally);
  // any missing key falls back to English.
  return function t(key: UIKey): string {
    return (ui[lang] as Record<UIKey, string | undefined>)[key] ?? ui[defaultLang][key];
  };
}

// og:locale value per language (used in <head>).
export const ogLocale: Record<Lang, string> = {
  en: 'en_US',
  de: 'de_DE',
  es: 'es_ES',
  pt: 'pt_BR',
  fr: 'fr_FR',
  ro: 'ro_RO',
};

// Non-default locales — single source for route generation (getStaticPaths).
export const nonDefaultLocales = (Object.keys(ui) as Lang[]).filter(l => l !== defaultLang);

// Strip a leading locale segment, returning the base path (always starts with '/').
export function stripLangPrefix(pathname: string): string {
  const [, seg, ...rest] = pathname.split('/');
  if (seg in ui && seg !== defaultLang) return '/' + rest.join('/');
  return pathname;
}

// Build the URL path for `path` in `lang`. Default lang stays unprefixed.
// `path` is the base path (e.g. '/services'); '/' maps to '' correctly.
export function getLocalizedPath(path: string, lang: Lang): string {
  const base = stripLangPrefix(path);
  const clean = base === '/' ? '' : base;
  return lang === defaultLang ? (clean || '/') : `/${lang}${clean}`;
}

// hreflang alternates for the current URL: one entry per locale + x-default (en).
export function getAlternates(url: URL): { hreflang: string; href: string }[] {
  const base = stripLangPrefix(url.pathname);
  const origin = url.origin;
  const alts: { hreflang: string; href: string }[] = (Object.keys(ui) as Lang[]).map(l => ({
    hreflang: l,
    href: new URL(getLocalizedPath(base, l), origin).href,
  }));
  alts.push({ hreflang: 'x-default', href: new URL(getLocalizedPath(base, defaultLang), origin).href });
  return alts;
}
