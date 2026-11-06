// Per-locale content for the PROJECTS pages:
//   - src/pages/projects/index.astro      (listing)   -> keys prefixed `index*`
//   - src/pages/projects/chatter.astro     (case study) -> keys prefixed `chatter*`
// English is the source of truth and lives in `en` with ALL keys.
// Other locales start empty; translators fill them and missing keys
// fall back to English via getProjectsContent().
//
// Project names, URLs, tech tags and external links stay verbatim in the
// components — only user-facing prose lives here. Values are plain text and
// rendered with `{ }`; the only inline-HTML case (the "Why it's here"
// paragraph with links) is split into text fragments so the anchors stay in
// the template and keep Astro's scoped styling.

import type { Lang } from '../ui';

export const projects = {
  en: {
    // ---- projects/index.astro ----
    indexMetaTitle: 'Projects — DevOps Tools & Open Source',
    indexMetaDescription:
      'Open-source projects by Alexandru Pruteanu — Chatter (an encrypted messenger), a Spotify Wayland tray, and DevOps tooling from real production work.',
    indexBreadcrumbHome: 'Home',
    indexBreadcrumbProjects: 'Projects',
    indexHeading: 'Projects',
    indexSubtitle: "Tools and extensions I've built",

    indexProject1Description:
      "A messenger for everyday conversations, with encrypted private chats, voice calls and optional Shield metadata protection through Tor onion routing and anonymous mailboxes.",
    indexProject1LiveLabel: 'Read more →',
    indexProject2Description:
      'A native system tray application for Spotify on Wayland/Hyprland. Scroll to change tracks, middle-click to pause, click to minimize to tray. Built after discovering Linux desktop integration requires five different subsystems.',
    indexProject2LiveLabel: 'AUR Package',
    indexProject3Description:
      "A lightweight browser extension that adds Twitch-style tab-fullscreen mode to YouTube. Hide all distractions and focus on your content with a keyboard shortcut (Alt+T) or a single click. Works seamlessly with YouTube's single-page app navigation.",
    indexProject3LiveLabel: 'Chrome Store',
    indexProject3Live2Label: 'Firefox Add-ons',

    // ---- projects/chatter.astro ----
    chatterMetaTitle: "Chatter — Rust Messenger in Closed Alpha",
    chatterMetaDescription:
      "Meet Chatter: encrypted private conversations, voice calls and optional Shield metadata protection through Tor. A shared Rust and Slint client in closed alpha.",
    chatterBreadcrumbHome: 'Home',
    chatterBreadcrumbProjects: 'Projects',
    chatterBreadcrumbChatter: 'Chatter',
    chatterKicker: "Closed alpha",
    chatterH1: "Chatter: a shared Rust client for private conversations",
    chatterLead:
      "A messenger for everyday conversations, with encrypted private chats, voice calls and optional Shield metadata protection through Tor onion routing and anonymous mailboxes. Rust and Slint share the application core and interface across platform builds. Go, Protobuf/Connect RPC, HTTP/3/QUIC, PostgreSQL, Redis and Temporal power the service. Platform support varies; Android and Linux are the current development focus.",

    chatterStats: [
  {
    "n": "Rust + Slint",
    "label": "shared client core and interface"
  },
  {
    "n": "Shield + Tor",
    "label": "optional metadata protection"
  },
  {
    "n": "Closed alpha",
    "label": "real device testing; still developing"
  }
],

    chatterHardHeading: "The hard problems I'm solving",
    chatterHardProblems: [
  "Sharing the Rust application core and Slint UI while handling native permissions, notifications, media devices and app lifecycle on each platform. Android and Linux are the focus; Windows build support and macOS packaging exist, and the iOS UI port is in progress.",
  "Private conversations require end-to-end encryption through libsignal. The client refuses plaintext fallback when encryption is required. Public channels are a separate mode and can carry service-readable content.",
  "Shield routes RPC traffic and attachment transfers through Tor when enabled and connected. Blind-signed anonymous mailbox tokens reduce account-to-mailbox linkage. This protects metadata without promising zero metadata or immunity to traffic analysis.",
  "Multi-device identity, key changes, background delivery and reconnect behavior need to remain consistent across the shared core and native platform adapters.",
  "LiveKit/WebRTC calling with a verification emoji display and compact or full-screen call views. The screenshots show a connected voice call between two Android test phones.",
  "Encrypted local history through SQLCipher, encrypted attachment handling, and an operational privacy model that also considers logs, retained metadata and key custody."
],

    chatterStackHeading: 'The stack',
    chatterStack: [
  {
    "group": "Client",
    "items": "Rust + Slint, shared application logic and UI, native platform adapters"
  },
  {
    "group": "Backend",
    "items": "Go, Protobuf/Connect RPC, HTTP/3/QUIC with HTTP/2 fallback, Temporal workflows and SpiceDB authorization"
  },
  {
    "group": "Data",
    "items": "PostgreSQL, Redis, object storage and client-side SQLCipher"
  },
  {
    "group": "Privacy",
    "items": "libsignal, optional Shield mode, Tor onion routing and blind-signed anonymous mailboxes"
  },
  {
    "group": "Calls",
    "items": "LiveKit + WebRTC; platform-specific media and audio integration"
  },
  {
    "group": "Infrastructure",
    "items": "OVHcloud in France, containers, systemd and infrastructure as code"
  }
],

    chatterBlogHeading: 'Deep dives on the blog',
    chatterGithubLink: "Ask about alpha testing →",

    chatterWhyHeading: "Why it's here",
    // Split so the inline <a> links stay in the template (scoped styling + hreflang).
    chatterWhyP1:
      "Plenty of people can talk about architecture. This is me actually building it across the whole stack — cryptography, backend, native clients, and the infrastructure to run it. It's where the",
    chatterWhyLink1: 'idea-to-production',
    chatterWhyLink2: ' building-blocks',
    chatterWhyLink3: ' architecture review',
    chatterWhyAnd: ', and',
    chatterWhyLink4: ' AI-app audit',
    chatterWhyTail: ' work comes from — applied to my own code first.',

    chatterNote: "Status: closed alpha. Platform readiness and privacy features are still developing. An independent security audit is not being claimed.",
    chatterCtaHeading: 'Want this kind of work on your product?',
    chatterCtaBody: 'A free 30-minute call. Tell me where you are; I’ll tell you the fastest path to shipped.',
    chatterCtaButton: 'Book a free discovery call',
  },
  de: {
    // ---- projects/index.astro ----
    indexMetaTitle: 'Projekte — DevOps-Tools & Open Source',
    indexMetaDescription:
      'Open-Source-Projekte von Alexandru Pruteanu — Chatter (ein verschlüsselter Messenger), ein Spotify-Tray für Wayland und DevOps-Tooling aus echter Produktionsarbeit.',
    indexBreadcrumbHome: 'Start',
    indexBreadcrumbProjects: 'Projekte',
    indexHeading: 'Projekte',
    indexSubtitle: 'Tools und Erweiterungen, die ich gebaut habe',

    indexProject1Description:
      "Ein Messenger für den Alltag: verschlüsselte private Chats, Sprachanrufe und optionaler Metadatenschutz durch Shield, Tor-Onion-Routing und anonyme Postfächer.",
    indexProject1LiveLabel: 'Mehr erfahren →',
    indexProject2Description:
      'Eine native System-Tray-Anwendung für Spotify unter Wayland/Hyprland. Scrollen wechselt Titel, Mittelklick pausiert, Klick minimiert in den Tray. Entstanden, nachdem ich feststellte, dass die Linux-Desktop-Integration fünf verschiedene Subsysteme erfordert.',
    indexProject2LiveLabel: 'AUR-Paket',
    indexProject3Description:
      'Eine schlanke Browser-Erweiterung, die YouTube einen Tab-Vollbildmodus im Twitch-Stil hinzufügt. Blenden Sie alle Ablenkungen aus und konzentrieren Sie sich per Tastenkürzel (Alt+T) oder einem einzigen Klick auf Ihre Inhalte. Funktioniert nahtlos mit der Single-Page-Navigation von YouTube.',
    indexProject3LiveLabel: 'Chrome Store',
    indexProject3Live2Label: 'Firefox-Add-ons',

    // ---- projects/chatter.astro ----
    chatterMetaTitle: "Chatter — Rust Messenger in Closed Alpha",
    chatterMetaDescription:
      "Private Chats mit Ende-zu-Ende-Verschlüsselung, Sprachanrufe und optionaler Metadatenschutz über Shield und Tor. Chatter ist in der geschlossenen Alpha.",
    chatterBreadcrumbHome: 'Start',
    chatterBreadcrumbProjects: 'Projekte',
    chatterBreadcrumbChatter: 'Chatter',
    chatterKicker: "Geschlossene Alpha",
    chatterH1: "Chatter: a shared Rust client for private conversations",
    chatterLead:
      "Ein Messenger für den Alltag: verschlüsselte private Chats, Sprachanrufe und optionaler Metadatenschutz durch Shield, Tor-Onion-Routing und anonyme Postfächer. Rust und Slint teilen Kern und Oberfläche zwischen Plattform-Builds. Go, Protobuf/Connect RPC, HTTP/3/QUIC, PostgreSQL, Redis und Temporal betreiben den Dienst. Android und Linux stehen derzeit im Fokus.",

    chatterStats: [
  {
    "n": "Rust + Slint",
    "label": "shared client core and interface"
  },
  {
    "n": "Shield + Tor",
    "label": "optional metadata protection"
  },
  {
    "n": "Closed alpha",
    "label": "real device testing; still developing"
  }
],

    chatterHardHeading: 'Die schwierigen Probleme, die ich löse',
    chatterHardProblems: [
  "Sharing the Rust application core and Slint UI while handling native permissions, notifications, media devices and app lifecycle on each platform. Android and Linux are the focus; Windows build support and macOS packaging exist, and the iOS UI port is in progress.",
  "Private conversations require end-to-end encryption through libsignal. The client refuses plaintext fallback when encryption is required. Public channels are a separate mode and can carry service-readable content.",
  "Shield routes RPC traffic and attachment transfers through Tor when enabled and connected. Blind-signed anonymous mailbox tokens reduce account-to-mailbox linkage. This protects metadata without promising zero metadata or immunity to traffic analysis.",
  "Multi-device identity, key changes, background delivery and reconnect behavior need to remain consistent across the shared core and native platform adapters.",
  "LiveKit/WebRTC calling with a verification emoji display and compact or full-screen call views. The screenshots show a connected voice call between two Android test phones.",
  "Encrypted local history through SQLCipher, encrypted attachment handling, and an operational privacy model that also considers logs, retained metadata and key custody."
],

    chatterStackHeading: 'Der Stack',
    chatterStack: [
  {
    "group": "Client",
    "items": "Rust + Slint, shared application logic and UI, native platform adapters"
  },
  {
    "group": "Backend",
    "items": "Go, Protobuf/Connect RPC, HTTP/3/QUIC with HTTP/2 fallback, Temporal workflows and SpiceDB authorization"
  },
  {
    "group": "Data",
    "items": "PostgreSQL, Redis, object storage and client-side SQLCipher"
  },
  {
    "group": "Privacy",
    "items": "libsignal, optional Shield mode, Tor onion routing and blind-signed anonymous mailboxes"
  },
  {
    "group": "Calls",
    "items": "LiveKit + WebRTC; platform-specific media and audio integration"
  },
  {
    "group": "Infrastructure",
    "items": "OVHcloud in France, containers, systemd and infrastructure as code"
  }
],

    chatterBlogHeading: 'Tiefgehende Analysen im Blog',
    chatterGithubLink: "Nach Alpha-Tests fragen →",

    chatterWhyHeading: 'Warum es hier steht',
    chatterWhyP1:
      'Über Architektur reden können viele. Hier baue ich sie tatsächlich über den gesamten Stack hinweg — Kryptografie, Backend, native Clients und die Infrastruktur für den Betrieb. Daher stammt die Arbeit an',
    chatterWhyLink1: 'Idee bis Produktion',
    chatterWhyLink2: ' Bausteinen',
    chatterWhyLink3: ' Architektur-Review',
    chatterWhyAnd: ' und',
    chatterWhyLink4: ' KI-App-Audit',
    chatterWhyTail: ' — zuerst auf meinen eigenen Code angewendet.',

    chatterNote: "Status: closed alpha. Platform readiness and privacy features are still developing. An independent security audit is not being claimed.",
    chatterCtaHeading: 'Möchten Sie diese Art von Arbeit für Ihr Produkt?',
    chatterCtaBody: 'Ein kostenloses 30-minütiges Gespräch. Sagen Sie mir, wo Sie stehen; ich zeige Ihnen den schnellsten Weg zum fertigen Produkt.',
    chatterCtaButton: 'Kostenloses Erstgespräch buchen',
  },
  es: {
    // ---- projects/index.astro ----
    indexMetaTitle: 'Proyectos — DevOps y código abierto',
    indexMetaDescription:
      'Proyectos de código abierto de Alexandru Pruteanu — Chatter (un mensajero cifrado), una bandeja de Spotify para Wayland y herramientas DevOps de producción real.',
    indexBreadcrumbHome: 'Inicio',
    indexBreadcrumbProjects: 'Proyectos',
    indexHeading: 'Proyectos',
    indexSubtitle: 'Herramientas y extensiones que he creado',

    indexProject1Description:
      "Un mensajero para el día a día: chats privados cifrados, llamadas de voz y protección opcional de metadatos con Shield, rutas onion de Tor y buzones anónimos.",
    indexProject1LiveLabel: 'Leer más →',
    indexProject2Description:
      'Una aplicación nativa de bandeja del sistema para Spotify en Wayland/Hyprland. Desplázate para cambiar de pista, clic central para pausar, clic para minimizar a la bandeja. La creé tras descubrir que la integración con el escritorio de Linux requiere cinco subsistemas distintos.',
    indexProject2LiveLabel: 'Paquete AUR',
    indexProject3Description:
      'Una extensión de navegador ligera que añade a YouTube un modo de pantalla completa por pestaña al estilo de Twitch. Oculta todas las distracciones y céntrate en tu contenido con un atajo de teclado (Alt+T) o un solo clic. Funciona a la perfección con la navegación de página única de YouTube.',
    indexProject3LiveLabel: 'Chrome Store',
    indexProject3Live2Label: 'Firefox Add-ons',

    // ---- projects/chatter.astro ----
    chatterMetaTitle: "Chatter — Rust Messenger in Closed Alpha",
    chatterMetaDescription:
      "Conversaciones privadas cifradas de extremo a extremo, llamadas de voz y protección opcional de metadatos con Shield y Tor. Chatter está en alfa cerrada.",
    chatterBreadcrumbHome: 'Inicio',
    chatterBreadcrumbProjects: 'Proyectos',
    chatterBreadcrumbChatter: 'Chatter',
    chatterKicker: "Alfa cerrada",
    chatterH1: "Chatter: a shared Rust client for private conversations",
    chatterLead:
      "Un mensajero para el día a día: chats privados cifrados, llamadas de voz y protección opcional de metadatos con Shield, rutas onion de Tor y buzones anónimos. Rust y Slint comparten el núcleo y la interfaz entre compilaciones. Go, Protobuf/Connect RPC, HTTP/3/QUIC, PostgreSQL, Redis y Temporal impulsan el servicio. Android y Linux son el foco actual.",

    chatterStats: [
  {
    "n": "Rust + Slint",
    "label": "shared client core and interface"
  },
  {
    "n": "Shield + Tor",
    "label": "optional metadata protection"
  },
  {
    "n": "Closed alpha",
    "label": "real device testing; still developing"
  }
],

    chatterHardHeading: 'Los problemas difíciles que estoy resolviendo',
    chatterHardProblems: [
  "Sharing the Rust application core and Slint UI while handling native permissions, notifications, media devices and app lifecycle on each platform. Android and Linux are the focus; Windows build support and macOS packaging exist, and the iOS UI port is in progress.",
  "Private conversations require end-to-end encryption through libsignal. The client refuses plaintext fallback when encryption is required. Public channels are a separate mode and can carry service-readable content.",
  "Shield routes RPC traffic and attachment transfers through Tor when enabled and connected. Blind-signed anonymous mailbox tokens reduce account-to-mailbox linkage. This protects metadata without promising zero metadata or immunity to traffic analysis.",
  "Multi-device identity, key changes, background delivery and reconnect behavior need to remain consistent across the shared core and native platform adapters.",
  "LiveKit/WebRTC calling with a verification emoji display and compact or full-screen call views. The screenshots show a connected voice call between two Android test phones.",
  "Encrypted local history through SQLCipher, encrypted attachment handling, and an operational privacy model that also considers logs, retained metadata and key custody."
],

    chatterStackHeading: 'La pila tecnológica',
    chatterStack: [
  {
    "group": "Client",
    "items": "Rust + Slint, shared application logic and UI, native platform adapters"
  },
  {
    "group": "Backend",
    "items": "Go, Protobuf/Connect RPC, HTTP/3/QUIC with HTTP/2 fallback, Temporal workflows and SpiceDB authorization"
  },
  {
    "group": "Data",
    "items": "PostgreSQL, Redis, object storage and client-side SQLCipher"
  },
  {
    "group": "Privacy",
    "items": "libsignal, optional Shield mode, Tor onion routing and blind-signed anonymous mailboxes"
  },
  {
    "group": "Calls",
    "items": "LiveKit + WebRTC; platform-specific media and audio integration"
  },
  {
    "group": "Infrastructure",
    "items": "OVHcloud in France, containers, systemd and infrastructure as code"
  }
],

    chatterBlogHeading: 'Análisis a fondo en el blog',
    chatterGithubLink: "Consultar sobre la alfa →",

    chatterWhyHeading: 'Por qué está aquí',
    chatterWhyP1:
      'Mucha gente sabe hablar de arquitectura. Aquí soy yo construyéndola de verdad en toda la pila — criptografía, backend, clientes nativos y la infraestructura para ejecutarlo. De ahí nace el trabajo de',
    chatterWhyLink1: 'idea a producción',
    chatterWhyLink2: ' bloques de construcción',
    chatterWhyLink3: ' revisión de arquitectura',
    chatterWhyAnd: ' y',
    chatterWhyLink4: ' auditoría de apps de IA',
    chatterWhyTail: ' — aplicado primero a mi propio código.',

    chatterNote: "Status: closed alpha. Platform readiness and privacy features are still developing. An independent security audit is not being claimed.",
    chatterCtaHeading: '¿Quieres este tipo de trabajo en tu producto?',
    chatterCtaBody: 'Una llamada gratuita de 30 minutos. Cuéntame dónde estás; te diré el camino más rápido para lanzarlo.',
    chatterCtaButton: 'Reservar una llamada de descubrimiento gratuita',
  },
  pt: {
    // ---- projects/index.astro ----
    indexMetaTitle: 'Projetos — DevOps e código aberto',
    indexMetaDescription:
      'Projetos de código aberto de Alexandru Pruteanu — Chatter (um mensageiro criptografado), uma bandeja do Spotify para Wayland e ferramentas DevOps de produção real.',
    indexBreadcrumbHome: 'Início',
    indexBreadcrumbProjects: 'Projetos',
    indexHeading: 'Projetos',
    indexSubtitle: 'Ferramentas e extensões que criei',

    indexProject1Description:
      "Um mensageiro para o dia a dia: chats privados criptografados, chamadas de voz e proteção opcional de metadados com Shield, roteamento onion do Tor e caixas anônimas.",
    indexProject1LiveLabel: 'Saiba mais →',
    indexProject2Description:
      'Um aplicativo nativo de bandeja do sistema para o Spotify no Wayland/Hyprland. Role para trocar de faixa, clique com o botão do meio para pausar, clique para minimizar na bandeja. Criado depois de descobrir que a integração com o desktop Linux exige cinco subsistemas diferentes.',
    indexProject2LiveLabel: 'Pacote AUR',
    indexProject3Description:
      'Uma extensão de navegador leve que adiciona ao YouTube um modo de tela cheia por aba no estilo da Twitch. Oculte todas as distrações e concentre-se no seu conteúdo com um atalho de teclado (Alt+T) ou um único clique. Funciona perfeitamente com a navegação em página única do YouTube.',
    indexProject3LiveLabel: 'Chrome Store',
    indexProject3Live2Label: 'Firefox Add-ons',

    // ---- projects/chatter.astro ----
    chatterMetaTitle: "Chatter — Rust Messenger in Closed Alpha",
    chatterMetaDescription:
      "Conversas privadas com criptografia de ponta a ponta, chamadas de voz e proteção opcional de metadados com Shield e Tor. Chatter está em alfa fechada.",
    chatterBreadcrumbHome: 'Início',
    chatterBreadcrumbProjects: 'Projetos',
    chatterBreadcrumbChatter: 'Chatter',
    chatterKicker: "Alfa fechada",
    chatterH1: "Chatter: a shared Rust client for private conversations",
    chatterLead:
      "Um mensageiro para o dia a dia: chats privados criptografados, chamadas de voz e proteção opcional de metadados com Shield, roteamento onion do Tor e caixas anônimas. Rust e Slint compartilham o núcleo e a interface entre compilações. Go, Protobuf/Connect RPC, HTTP/3/QUIC, PostgreSQL, Redis e Temporal sustentam o serviço. Android e Linux são o foco atual.",

    chatterStats: [
  {
    "n": "Rust + Slint",
    "label": "shared client core and interface"
  },
  {
    "n": "Shield + Tor",
    "label": "optional metadata protection"
  },
  {
    "n": "Closed alpha",
    "label": "real device testing; still developing"
  }
],

    chatterHardHeading: 'Os problemas difíceis que estou resolvendo',
    chatterHardProblems: [
  "Sharing the Rust application core and Slint UI while handling native permissions, notifications, media devices and app lifecycle on each platform. Android and Linux are the focus; Windows build support and macOS packaging exist, and the iOS UI port is in progress.",
  "Private conversations require end-to-end encryption through libsignal. The client refuses plaintext fallback when encryption is required. Public channels are a separate mode and can carry service-readable content.",
  "Shield routes RPC traffic and attachment transfers through Tor when enabled and connected. Blind-signed anonymous mailbox tokens reduce account-to-mailbox linkage. This protects metadata without promising zero metadata or immunity to traffic analysis.",
  "Multi-device identity, key changes, background delivery and reconnect behavior need to remain consistent across the shared core and native platform adapters.",
  "LiveKit/WebRTC calling with a verification emoji display and compact or full-screen call views. The screenshots show a connected voice call between two Android test phones.",
  "Encrypted local history through SQLCipher, encrypted attachment handling, and an operational privacy model that also considers logs, retained metadata and key custody."
],

    chatterStackHeading: 'A stack',
    chatterStack: [
  {
    "group": "Client",
    "items": "Rust + Slint, shared application logic and UI, native platform adapters"
  },
  {
    "group": "Backend",
    "items": "Go, Protobuf/Connect RPC, HTTP/3/QUIC with HTTP/2 fallback, Temporal workflows and SpiceDB authorization"
  },
  {
    "group": "Data",
    "items": "PostgreSQL, Redis, object storage and client-side SQLCipher"
  },
  {
    "group": "Privacy",
    "items": "libsignal, optional Shield mode, Tor onion routing and blind-signed anonymous mailboxes"
  },
  {
    "group": "Calls",
    "items": "LiveKit + WebRTC; platform-specific media and audio integration"
  },
  {
    "group": "Infrastructure",
    "items": "OVHcloud in France, containers, systemd and infrastructure as code"
  }
],

    chatterBlogHeading: 'Análises detalhadas no blog',
    chatterGithubLink: "Perguntar sobre a alfa →",

    chatterWhyHeading: 'Por que está aqui',
    chatterWhyP1:
      'Muita gente sabe falar sobre arquitetura. Aqui sou eu de fato construindo em toda a stack — criptografia, backend, clientes nativos e a infraestrutura para executá-la. É daí que vem o trabalho de',
    chatterWhyLink1: 'ideia à produção',
    chatterWhyLink2: ' blocos de construção',
    chatterWhyLink3: ' revisão de arquitetura',
    chatterWhyAnd: ' e',
    chatterWhyLink4: ' auditoria de apps de IA',
    chatterWhyTail: ' — aplicado primeiro ao meu próprio código.',

    chatterNote: "Status: closed alpha. Platform readiness and privacy features are still developing. An independent security audit is not being claimed.",
    chatterCtaHeading: 'Quer esse tipo de trabalho no seu produto?',
    chatterCtaBody: 'Uma conversa gratuita de 30 minutos. Diga onde você está; eu mostro o caminho mais rápido até o lançamento.',
    chatterCtaButton: 'Agendar uma conversa inicial gratuita',
  },
  fr: {
    // ---- projects/index.astro ----
    indexMetaTitle: 'Projets — Outils DevOps et open source',
    indexMetaDescription:
      'Projets open source d’Alexandru Pruteanu — Chatter (une messagerie chiffrée), une applet Spotify pour Wayland et des outils DevOps issus de la production.',
    indexBreadcrumbHome: 'Accueil',
    indexBreadcrumbProjects: 'Projets',
    indexHeading: 'Projets',
    indexSubtitle: 'Outils et extensions que j’ai créés',

    indexProject1Description:
      "Une messagerie du quotidien : échanges privés chiffrés, appels vocaux et protection optionnelle des métadonnées par Shield, routage onion Tor et boîtes anonymes.",
    indexProject1LiveLabel: 'En savoir plus →',
    indexProject2Description:
      'Une application native d’icône de la barre système pour Spotify sous Wayland/Hyprland. Faites défiler pour changer de piste, cliquez avec le bouton du milieu pour mettre en pause, cliquez pour réduire dans la barre. Créée après avoir découvert que l’intégration au bureau Linux nécessite cinq sous-systèmes différents.',
    indexProject2LiveLabel: 'Paquet AUR',
    indexProject3Description:
      'Une extension de navigateur légère qui ajoute à YouTube un mode plein écran par onglet à la manière de Twitch. Masquez toutes les distractions et concentrez-vous sur votre contenu grâce à un raccourci clavier (Alt+T) ou un simple clic. Fonctionne parfaitement avec la navigation en application monopage de YouTube.',
    indexProject3LiveLabel: 'Chrome Store',
    indexProject3Live2Label: 'Firefox Add-ons',

    // ---- projects/chatter.astro ----
    chatterMetaTitle: "Chatter — Rust Messenger in Closed Alpha",
    chatterMetaDescription:
      "Conversations privées chiffrées de bout en bout, appels vocaux et protection optionnelle des métadonnées avec Shield et Tor. Chatter est en alpha fermée.",
    chatterBreadcrumbHome: 'Accueil',
    chatterBreadcrumbProjects: 'Projets',
    chatterBreadcrumbChatter: 'Chatter',
    chatterKicker: "Alpha fermée",
    chatterH1: "Chatter: a shared Rust client for private conversations",
    chatterLead:
      "Une messagerie du quotidien : échanges privés chiffrés, appels vocaux et protection optionnelle des métadonnées par Shield, routage onion Tor et boîtes anonymes. Rust et Slint partagent le cœur et l’interface entre les builds. Go, Protobuf/Connect RPC, HTTP/3/QUIC, PostgreSQL, Redis et Temporal assurent le service. Android et Linux sont les priorités actuelles.",

    chatterStats: [
  {
    "n": "Rust + Slint",
    "label": "shared client core and interface"
  },
  {
    "n": "Shield + Tor",
    "label": "optional metadata protection"
  },
  {
    "n": "Closed alpha",
    "label": "real device testing; still developing"
  }
],

    chatterHardHeading: 'Les problèmes difficiles que je résous',
    chatterHardProblems: [
  "Sharing the Rust application core and Slint UI while handling native permissions, notifications, media devices and app lifecycle on each platform. Android and Linux are the focus; Windows build support and macOS packaging exist, and the iOS UI port is in progress.",
  "Private conversations require end-to-end encryption through libsignal. The client refuses plaintext fallback when encryption is required. Public channels are a separate mode and can carry service-readable content.",
  "Shield routes RPC traffic and attachment transfers through Tor when enabled and connected. Blind-signed anonymous mailbox tokens reduce account-to-mailbox linkage. This protects metadata without promising zero metadata or immunity to traffic analysis.",
  "Multi-device identity, key changes, background delivery and reconnect behavior need to remain consistent across the shared core and native platform adapters.",
  "LiveKit/WebRTC calling with a verification emoji display and compact or full-screen call views. The screenshots show a connected voice call between two Android test phones.",
  "Encrypted local history through SQLCipher, encrypted attachment handling, and an operational privacy model that also considers logs, retained metadata and key custody."
],

    chatterStackHeading: 'La pile technique',
    chatterStack: [
  {
    "group": "Client",
    "items": "Rust + Slint, shared application logic and UI, native platform adapters"
  },
  {
    "group": "Backend",
    "items": "Go, Protobuf/Connect RPC, HTTP/3/QUIC with HTTP/2 fallback, Temporal workflows and SpiceDB authorization"
  },
  {
    "group": "Data",
    "items": "PostgreSQL, Redis, object storage and client-side SQLCipher"
  },
  {
    "group": "Privacy",
    "items": "libsignal, optional Shield mode, Tor onion routing and blind-signed anonymous mailboxes"
  },
  {
    "group": "Calls",
    "items": "LiveKit + WebRTC; platform-specific media and audio integration"
  },
  {
    "group": "Infrastructure",
    "items": "OVHcloud in France, containers, systemd and infrastructure as code"
  }
],

    chatterBlogHeading: 'Analyses approfondies sur le blog',
    chatterGithubLink: "Demander un accès à l’alpha →",

    chatterWhyHeading: 'Pourquoi c’est ici',
    chatterWhyP1:
      'Beaucoup de gens savent parler d’architecture. Ici, c’est moi qui la construis réellement sur toute la pile — cryptographie, backend, clients natifs et l’infrastructure qui le fait tourner. C’est de là que vient le travail',
    chatterWhyLink1: 'd’idée à production',
    chatterWhyLink2: ' de blocs de construction',
    chatterWhyLink3: ' de revue d’architecture',
    chatterWhyAnd: ' et',
    chatterWhyLink4: ' d’audit d’applications IA',
    chatterWhyTail: ' — appliqué d’abord à mon propre code.',

    chatterNote: "Status: closed alpha. Platform readiness and privacy features are still developing. An independent security audit is not being claimed.",
    chatterCtaHeading: 'Vous voulez ce type de travail sur votre produit ?',
    chatterCtaBody: 'Un appel gratuit de 30 minutes. Dites-moi où vous en êtes ; je vous indiquerai le chemin le plus rapide vers la mise en production.',
    chatterCtaButton: 'Réserver un appel de découverte gratuit',
  },
  ro: {
    // ---- projects/index.astro ----
    indexMetaTitle: 'Proiecte — Instrumente DevOps și open source',
    indexMetaDescription:
      'Proiecte open source de Alexandru Pruteanu — Chatter (un mesager criptat), o pictogramă Spotify pentru Wayland și instrumente DevOps din muncă reală în producție.',
    indexBreadcrumbHome: 'Acasă',
    indexBreadcrumbProjects: 'Proiecte',
    indexHeading: 'Proiecte',
    indexSubtitle: 'Instrumente și extensii pe care le-am construit',

    indexProject1Description:
      "Un mesager pentru fiecare zi: conversații private criptate, apeluri vocale și protecție opțională a metadatelor prin Shield, rutare onion Tor și căsuțe anonime.",
    indexProject1LiveLabel: 'Află mai multe →',
    indexProject2Description:
      'O aplicație nativă în tava de sistem pentru Spotify pe Wayland/Hyprland. Derulați pentru a schimba piesa, clic pe butonul din mijloc pentru pauză, clic pentru a minimiza în tavă. Creată după ce am descoperit că integrarea cu desktopul Linux necesită cinci subsisteme diferite.',
    indexProject2LiveLabel: 'Pachet AUR',
    indexProject3Description:
      'O extensie de browser ușoară care adaugă în YouTube un mod ecran complet pe filă, în stilul Twitch. Ascundeți toate distragerile și concentrați-vă asupra conținutului printr-o scurtătură de tastatură (Alt+T) sau un singur clic. Funcționează perfect cu navigarea de tip aplicație cu o singură pagină a YouTube.',
    indexProject3LiveLabel: 'Chrome Store',
    indexProject3Live2Label: 'Firefox Add-ons',

    // ---- projects/chatter.astro ----
    chatterMetaTitle: "Chatter — Rust Messenger in Closed Alpha",
    chatterMetaDescription:
      "Conversații private criptate end-to-end, apeluri vocale și protecție opțională a metadatelor prin Shield și Tor. Chatter este în alfa închisă.",
    chatterBreadcrumbHome: 'Acasă',
    chatterBreadcrumbProjects: 'Proiecte',
    chatterBreadcrumbChatter: 'Chatter',
    chatterKicker: "Alfa închisă",
    chatterH1: "Chatter: a shared Rust client for private conversations",
    chatterLead:
      "Un mesager pentru fiecare zi: conversații private criptate, apeluri vocale și protecție opțională a metadatelor prin Shield, rutare onion Tor și căsuțe anonime. Rust și Slint partajează nucleul și interfața între build-uri. Go, Protobuf/Connect RPC, HTTP/3/QUIC, PostgreSQL, Redis și Temporal susțin serviciul. Android și Linux sunt prioritățile actuale.",

    chatterStats: [
  {
    "n": "Rust + Slint",
    "label": "shared client core and interface"
  },
  {
    "n": "Shield + Tor",
    "label": "optional metadata protection"
  },
  {
    "n": "Closed alpha",
    "label": "real device testing; still developing"
  }
],

    chatterHardHeading: 'Problemele dificile pe care le rezolv',
    chatterHardProblems: [
  "Sharing the Rust application core and Slint UI while handling native permissions, notifications, media devices and app lifecycle on each platform. Android and Linux are the focus; Windows build support and macOS packaging exist, and the iOS UI port is in progress.",
  "Private conversations require end-to-end encryption through libsignal. The client refuses plaintext fallback when encryption is required. Public channels are a separate mode and can carry service-readable content.",
  "Shield routes RPC traffic and attachment transfers through Tor when enabled and connected. Blind-signed anonymous mailbox tokens reduce account-to-mailbox linkage. This protects metadata without promising zero metadata or immunity to traffic analysis.",
  "Multi-device identity, key changes, background delivery and reconnect behavior need to remain consistent across the shared core and native platform adapters.",
  "LiveKit/WebRTC calling with a verification emoji display and compact or full-screen call views. The screenshots show a connected voice call between two Android test phones.",
  "Encrypted local history through SQLCipher, encrypted attachment handling, and an operational privacy model that also considers logs, retained metadata and key custody."
],

    chatterStackHeading: 'Stiva tehnologică',
    chatterStack: [
  {
    "group": "Client",
    "items": "Rust + Slint, shared application logic and UI, native platform adapters"
  },
  {
    "group": "Backend",
    "items": "Go, Protobuf/Connect RPC, HTTP/3/QUIC with HTTP/2 fallback, Temporal workflows and SpiceDB authorization"
  },
  {
    "group": "Data",
    "items": "PostgreSQL, Redis, object storage and client-side SQLCipher"
  },
  {
    "group": "Privacy",
    "items": "libsignal, optional Shield mode, Tor onion routing and blind-signed anonymous mailboxes"
  },
  {
    "group": "Calls",
    "items": "LiveKit + WebRTC; platform-specific media and audio integration"
  },
  {
    "group": "Infrastructure",
    "items": "OVHcloud in France, containers, systemd and infrastructure as code"
  }
],

    chatterBlogHeading: 'Analize detaliate pe blog',
    chatterGithubLink: "Întreabă despre testarea alfa →",

    chatterWhyHeading: 'De ce se află aici',
    chatterWhyP1:
      'Mulți oameni pot vorbi despre arhitectură. Aici o construiesc efectiv pe toată stiva — criptografie, backend, clienți nativi și infrastructura care o pune în funcțiune. De aici provine munca de',
    chatterWhyLink1: 'idee la producție',
    chatterWhyLink2: ' blocuri de construcție',
    chatterWhyLink3: ' revizuire de arhitectură',
    chatterWhyAnd: ' și',
    chatterWhyLink4: ' audit de aplicații IA',
    chatterWhyTail: ' — aplicată mai întâi propriului meu cod.',

    chatterNote: "Status: closed alpha. Platform readiness and privacy features are still developing. An independent security audit is not being claimed.",
    chatterCtaHeading: 'Doriți acest tip de muncă pentru produsul dumneavoastră?',
    chatterCtaBody: 'O discuție gratuită de 30 de minute. Spuneți-mi unde vă aflați; vă voi arăta cea mai rapidă cale către lansare.',
    chatterCtaButton: 'Rezervați o discuție introductivă gratuită',
  },
} as const;

export function getProjectsContent(lang: Lang) {
  return { ...projects.en, ...projects[lang] };
}
