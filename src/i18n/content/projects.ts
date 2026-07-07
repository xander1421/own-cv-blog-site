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
      "A privacy-first encrypted messenger I'm building on the side — Signal Protocol encryption, sealed sender for metadata protection, anonymous inboxes, and one Rust client for every platform (Linux, Windows, Android today; iOS and macOS planned). Still in development.",
    indexProject1LiveLabel: 'Read more →',
    indexProject2Description:
      'A native system tray application for Spotify on Wayland/Hyprland. Scroll to change tracks, middle-click to pause, click to minimize to tray. Built after discovering Linux desktop integration requires five different subsystems.',
    indexProject2LiveLabel: 'AUR Package',
    indexProject3Description:
      "A lightweight browser extension that adds Twitch-style tab-fullscreen mode to YouTube. Hide all distractions and focus on your content with a keyboard shortcut (Alt+T) or a single click. Works seamlessly with YouTube's single-page app navigation.",
    indexProject3LiveLabel: 'Chrome Store',
    indexProject3Live2Label: 'Firefox Add-ons',

    // ---- projects/chatter.astro ----
    chatterMetaTitle: 'Chatter — Building an Encrypted Messenger Across Four Platforms',
    chatterMetaDescription:
      "Chatter is a privacy-first encrypted messenger I'm building on the side — one Rust client for every platform (Linux, Windows, Android today; iOS and macOS planned) on a Go backend, with Signal Protocol E2E. A personal project, in development.",
    chatterBreadcrumbHome: 'Home',
    chatterBreadcrumbProjects: 'Projects',
    chatterBreadcrumbChatter: 'Chatter',
    chatterKicker: 'Project · in development',
    chatterH1: 'One codebase, an encrypted messenger for every platform',
    chatterLead:
      "Chatter is a privacy-first, end-to-end encrypted messenger I'm building on the side — a single Rust client (Slint UI) that runs on Linux, Windows, and Android today, with iOS and macOS planned, on a Go backend. I design and build all of it — the cryptography, the backend, the client, and the infrastructure to run it. It's still in development, but it's how I stay hands-on across the whole stack.",

    chatterStats: [
      { n: '1', label: 'codebase — one Rust client for every platform' },
      { n: 'Signal', label: 'Protocol E2E encryption, from scratch' },
      { n: 'In dev', label: 'a personal project, not yet released' },
    ],

    chatterHardHeading: "The hard problems I'm solving",
    chatterHardProblems: [
      'One codebase, every platform: a single Rust client (Slint UI) sharing one crypto core, so end-to-end encryption behaves identically everywhere — X3DH key exchange, Double Ratchet forward secrecy, group Sender Keys, and post-quantum Kyber prekeys. Running and tested on Linux, Windows, and Android; iOS and macOS planned.',
      'Sealed sender: the server cannot identify who sent a message, even with full database access — with timing-attack resistance and multi-recipient validation.',
      'Ephemeral, correlation-resistant mailboxes (based on NDSS ’21 research) using blind signatures, so messages can’t be linked by timing.',
      'Multi-device sync with per-device auth tokens (HKDF, not JWT), per-device prekey bundles, and rotated group keys.',
      'Encrypted voice and video (LiveKit + WebRTC) with end-to-end key rotation and screen-share ingest.',
      'Chunked AES-256-GCM file encryption with virus scanning and anonymous, presigned access.',
    ],

    chatterStackHeading: 'The stack',
    chatterStack: [
      { group: 'Backend', items: 'Go + ConnectRPC services, Temporal workflows (saga compensation), SpiceDB (Zanzibar) permissions' },
      { group: 'Clients', items: 'One Rust + Slint client for every platform — running on Linux, Windows, and Android; iOS and macOS planned' },
      { group: 'Data', items: 'PostgreSQL, Redis, client-side SQLite/SQLCipher' },
      { group: 'Crypto', items: 'libsignal (X3DH, Double Ratchet, Sender Keys), Kyber1024 post-quantum, AES-256-GCM' },
      { group: 'Infra', items: 'Docker Compose, K3s (3-node HA), Fly.io, Terraform/Terragrunt, systemd' },
      { group: 'Quality', items: 'GitHub Actions CI (lint, race, security scan, proto checks), Prometheus + Grafana + OpenTelemetry' },
    ],

    chatterBlogHeading: 'Deep dives on the blog',
    chatterGithubLink: 'Source on GitHub →',

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

    chatterNote: 'Status: a personal project in active development — not yet released.',
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
      'Ein datenschutzorientierter, verschlüsselter Messenger, den ich nebenbei entwickle — Signal-Protocol-Verschlüsselung, Sealed Sender zum Schutz von Metadaten, anonyme Postfächer und ein Rust-Client für jede Plattform (heute Linux, Windows, Android; iOS und macOS geplant). Noch in Entwicklung.',
    indexProject1LiveLabel: 'Mehr erfahren →',
    indexProject2Description:
      'Eine native System-Tray-Anwendung für Spotify unter Wayland/Hyprland. Scrollen wechselt Titel, Mittelklick pausiert, Klick minimiert in den Tray. Entstanden, nachdem ich feststellte, dass die Linux-Desktop-Integration fünf verschiedene Subsysteme erfordert.',
    indexProject2LiveLabel: 'AUR-Paket',
    indexProject3Description:
      'Eine schlanke Browser-Erweiterung, die YouTube einen Tab-Vollbildmodus im Twitch-Stil hinzufügt. Blenden Sie alle Ablenkungen aus und konzentrieren Sie sich per Tastenkürzel (Alt+T) oder einem einzigen Klick auf Ihre Inhalte. Funktioniert nahtlos mit der Single-Page-Navigation von YouTube.',
    indexProject3LiveLabel: 'Chrome Store',
    indexProject3Live2Label: 'Firefox-Add-ons',

    // ---- projects/chatter.astro ----
    chatterMetaTitle: 'Chatter — Ein verschlüsselter Messenger für vier Plattformen',
    chatterMetaDescription:
      'Chatter ist ein datenschutzorientierter, verschlüsselter Messenger, den ich nebenbei entwickle — ein Rust-Client für jede Plattform (heute Linux, Windows, Android; iOS und macOS geplant) auf einem Go-Backend, mit Signal-Protocol-E2E-Verschlüsselung. Ein persönliches Projekt in Entwicklung.',
    chatterBreadcrumbHome: 'Start',
    chatterBreadcrumbProjects: 'Projekte',
    chatterBreadcrumbChatter: 'Chatter',
    chatterKicker: 'Projekt · in Entwicklung',
    chatterH1: 'Eine Codebasis, ein verschlüsselter Messenger für jede Plattform',
    chatterLead:
      'Chatter ist ein datenschutzorientierter, Ende-zu-Ende-verschlüsselter Messenger, den ich nebenbei entwickle — ein einziger Rust-Client (Slint-UI), der heute unter Linux, Windows und Android läuft, mit geplanter Unterstützung für iOS und macOS, auf einem Go-Backend. Ich entwerfe und baue alles selbst — die Kryptografie, das Backend, den Client und die Infrastruktur für den Betrieb. Es ist noch in Entwicklung, aber so bleibe ich über den gesamten Stack hinweg praktisch am Ball.',

    chatterStats: [
      { n: '1', label: 'Codebasis — ein Rust-Client für jede Plattform' },
      { n: 'Signal', label: 'Protocol-E2E-Verschlüsselung, von Grund auf' },
      { n: 'In Entw.', label: 'ein persönliches Projekt, noch nicht veröffentlicht' },
    ],

    chatterHardHeading: 'Die schwierigen Probleme, die ich löse',
    chatterHardProblems: [
      'Eine Codebasis, jede Plattform: ein einziger Rust-Client (Slint-UI) mit gemeinsamem Krypto-Kern, sodass sich die Ende-zu-Ende-Verschlüsselung überall identisch verhält — X3DH-Schlüsselaustausch, Double-Ratchet-Forward-Secrecy, Sender Keys für Gruppen und Post-Quantum-Kyber-Prekeys. Läuft und getestet unter Linux, Windows und Android; iOS und macOS geplant.',
      'Sealed Sender: Der Server kann selbst mit vollem Datenbankzugriff nicht feststellen, wer eine Nachricht gesendet hat — mit Schutz vor Timing-Angriffen und Validierung mehrerer Empfänger.',
      'Ephemere, korrelationsresistente Postfächer (basierend auf NDSS-’21-Forschung) mit blinden Signaturen, sodass sich Nachrichten nicht über das Timing verknüpfen lassen.',
      'Multi-Device-Synchronisierung mit gerätespezifischen Auth-Tokens (HKDF, nicht JWT), gerätespezifischen Prekey-Bundles und rotierten Gruppenschlüsseln.',
      'Verschlüsselte Sprach- und Videoanrufe (LiveKit + WebRTC) mit Ende-zu-Ende-Schlüsselrotation und Screen-Share-Ingest.',
      'Gechunkte AES-256-GCM-Dateiverschlüsselung mit Virenscan und anonymem, vorab signiertem Zugriff.',
    ],

    chatterStackHeading: 'Der Stack',
    chatterStack: [
      { group: 'Backend', items: 'Go + ConnectRPC-Services, Temporal-Workflows (Saga-Kompensation), SpiceDB-(Zanzibar-)Berechtigungen' },
      { group: 'Clients', items: 'Ein Rust-+-Slint-Client für jede Plattform — läuft unter Linux, Windows und Android; iOS und macOS geplant' },
      { group: 'Daten', items: 'PostgreSQL, Redis, clientseitiges SQLite/SQLCipher' },
      { group: 'Krypto', items: 'libsignal (X3DH, Double Ratchet, Sender Keys), Kyber1024 Post-Quantum, AES-256-GCM' },
      { group: 'Infra', items: 'Docker Compose, K3s (3-Node-HA), Fly.io, Terraform/Terragrunt, systemd' },
      { group: 'Qualität', items: 'GitHub-Actions-CI (Lint, Race, Security-Scan, Proto-Checks), Prometheus + Grafana + OpenTelemetry' },
    ],

    chatterBlogHeading: 'Tiefgehende Analysen im Blog',
    chatterGithubLink: 'Quellcode auf GitHub →',

    chatterWhyHeading: 'Warum es hier steht',
    chatterWhyP1:
      'Über Architektur reden können viele. Hier baue ich sie tatsächlich über den gesamten Stack hinweg — Kryptografie, Backend, native Clients und die Infrastruktur für den Betrieb. Daher stammt die Arbeit an',
    chatterWhyLink1: 'Idee bis Produktion',
    chatterWhyLink2: ' Bausteinen',
    chatterWhyLink3: ' Architektur-Review',
    chatterWhyAnd: ' und',
    chatterWhyLink4: ' KI-App-Audit',
    chatterWhyTail: ' — zuerst auf meinen eigenen Code angewendet.',

    chatterNote: 'Status: ein persönliches Projekt in aktiver Entwicklung — noch nicht veröffentlicht.',
    chatterCtaHeading: 'Möchten Sie diese Art von Arbeit für Ihr Produkt?',
    chatterCtaBody: 'Ein kostenloses 30-minütiges Gespräch. Sagen Sie mir, wo Sie stehen; ich zeige Ihnen den schnellsten Weg zum fertigen Produkt.',
    chatterCtaButton: 'Kostenloses Erstgespräch buchen',
  },
  es: {
    // ---- projects/index.astro ----
    indexMetaTitle: 'Proyectos — Herramientas DevOps y código abierto',
    indexMetaDescription:
      'Proyectos de código abierto de Alexandru Pruteanu — Chatter (un mensajero cifrado), una bandeja de Spotify para Wayland y herramientas DevOps surgidas de trabajo real en producción.',
    indexBreadcrumbHome: 'Inicio',
    indexBreadcrumbProjects: 'Proyectos',
    indexHeading: 'Proyectos',
    indexSubtitle: 'Herramientas y extensiones que he creado',

    indexProject1Description:
      'Un mensajero cifrado y centrado en la privacidad que desarrollo en mi tiempo libre — cifrado con Signal Protocol, sealed sender para proteger los metadatos, buzones anónimos y un único cliente en Rust para cada plataforma (hoy Linux, Windows y Android; iOS y macOS previstos). Todavía en desarrollo.',
    indexProject1LiveLabel: 'Leer más →',
    indexProject2Description:
      'Una aplicación nativa de bandeja del sistema para Spotify en Wayland/Hyprland. Desplázate para cambiar de pista, clic central para pausar, clic para minimizar a la bandeja. La creé tras descubrir que la integración con el escritorio de Linux requiere cinco subsistemas distintos.',
    indexProject2LiveLabel: 'Paquete AUR',
    indexProject3Description:
      'Una extensión de navegador ligera que añade a YouTube un modo de pantalla completa por pestaña al estilo de Twitch. Oculta todas las distracciones y céntrate en tu contenido con un atajo de teclado (Alt+T) o un solo clic. Funciona a la perfección con la navegación de página única de YouTube.',
    indexProject3LiveLabel: 'Chrome Store',
    indexProject3Live2Label: 'Firefox Add-ons',

    // ---- projects/chatter.astro ----
    chatterMetaTitle: 'Chatter — Un mensajero cifrado en cuatro plataformas',
    chatterMetaDescription:
      'Chatter es un mensajero cifrado y centrado en la privacidad que desarrollo en mi tiempo libre — un único cliente en Rust para cada plataforma (hoy Linux, Windows y Android; iOS y macOS previstos) sobre un backend en Go, con cifrado E2E de Signal Protocol. Un proyecto personal, en desarrollo.',
    chatterBreadcrumbHome: 'Inicio',
    chatterBreadcrumbProjects: 'Proyectos',
    chatterBreadcrumbChatter: 'Chatter',
    chatterKicker: 'Proyecto · en desarrollo',
    chatterH1: 'Una sola base de código, un mensajero cifrado para cada plataforma',
    chatterLead:
      'Chatter es un mensajero cifrado de extremo a extremo y centrado en la privacidad que desarrollo en mi tiempo libre — un único cliente en Rust (interfaz Slint) que hoy funciona en Linux, Windows y Android, con iOS y macOS previstos, sobre un backend en Go. Diseño y construyo todo: la criptografía, el backend, el cliente y la infraestructura para ejecutarlo. Aún está en desarrollo, pero es mi forma de mantenerme al día en toda la pila tecnológica.',

    chatterStats: [
      { n: '1', label: 'base de código: un cliente en Rust para cada plataforma' },
      { n: 'Signal', label: 'cifrado E2E con Protocol, desde cero' },
      { n: 'En curso', label: 'un proyecto personal, aún sin publicar' },
    ],

    chatterHardHeading: 'Los problemas difíciles que estoy resolviendo',
    chatterHardProblems: [
      'Una base de código, todas las plataformas: un único cliente en Rust (interfaz Slint) que comparte un mismo núcleo criptográfico, de modo que el cifrado de extremo a extremo se comporta igual en todas partes — intercambio de claves X3DH, forward secrecy con Double Ratchet, Sender Keys para grupos y prekeys poscuánticas Kyber. Funcionando y probado en Linux, Windows y Android; iOS y macOS previstos.',
      'Sealed sender: el servidor no puede identificar quién envió un mensaje, ni siquiera con acceso total a la base de datos — con resistencia a ataques de temporización y validación de múltiples destinatarios.',
      'Buzones efímeros y resistentes a la correlación (basados en la investigación de NDSS ’21) mediante firmas ciegas, de modo que los mensajes no puedan vincularse por su temporización.',
      'Sincronización multidispositivo con tokens de autenticación por dispositivo (HKDF, no JWT), paquetes de prekeys por dispositivo y claves de grupo rotadas.',
      'Voz y vídeo cifrados (LiveKit + WebRTC) con rotación de claves de extremo a extremo e ingesta de pantalla compartida.',
      'Cifrado de archivos por fragmentos con AES-256-GCM, con análisis de virus y acceso anónimo mediante URL prefirmadas.',
    ],

    chatterStackHeading: 'La pila tecnológica',
    chatterStack: [
      { group: 'Backend', items: 'Servicios en Go + ConnectRPC, flujos de trabajo en Temporal (compensación de sagas), permisos con SpiceDB (Zanzibar)' },
      { group: 'Clientes', items: 'Un cliente en Rust + Slint para cada plataforma — funcionando en Linux, Windows y Android; iOS y macOS previstos' },
      { group: 'Datos', items: 'PostgreSQL, Redis, SQLite/SQLCipher en el cliente' },
      { group: 'Cripto', items: 'libsignal (X3DH, Double Ratchet, Sender Keys), Kyber1024 poscuántico, AES-256-GCM' },
      { group: 'Infra', items: 'Docker Compose, K3s (HA de 3 nodos), Fly.io, Terraform/Terragrunt, systemd' },
      { group: 'Calidad', items: 'CI con GitHub Actions (lint, race, análisis de seguridad, comprobaciones de proto), Prometheus + Grafana + OpenTelemetry' },
    ],

    chatterBlogHeading: 'Análisis a fondo en el blog',
    chatterGithubLink: 'Código fuente en GitHub →',

    chatterWhyHeading: 'Por qué está aquí',
    chatterWhyP1:
      'Mucha gente sabe hablar de arquitectura. Aquí soy yo construyéndola de verdad en toda la pila — criptografía, backend, clientes nativos y la infraestructura para ejecutarlo. De ahí nace el trabajo de',
    chatterWhyLink1: 'idea a producción',
    chatterWhyLink2: ' bloques de construcción',
    chatterWhyLink3: ' revisión de arquitectura',
    chatterWhyAnd: ' y',
    chatterWhyLink4: ' auditoría de apps de IA',
    chatterWhyTail: ' — aplicado primero a mi propio código.',

    chatterNote: 'Estado: un proyecto personal en desarrollo activo — aún sin publicar.',
    chatterCtaHeading: '¿Quieres este tipo de trabajo en tu producto?',
    chatterCtaBody: 'Una llamada gratuita de 30 minutos. Cuéntame dónde estás; te diré el camino más rápido para lanzarlo.',
    chatterCtaButton: 'Reservar una llamada de descubrimiento gratuita',
  },
  pt: {
    // ---- projects/index.astro ----
    indexMetaTitle: 'Projetos — Ferramentas DevOps e código aberto',
    indexMetaDescription:
      'Projetos de código aberto de Alexandru Pruteanu — Chatter (um mensageiro criptografado), uma bandeja do Spotify para Wayland e ferramentas de DevOps nascidas de trabalho real em produção.',
    indexBreadcrumbHome: 'Início',
    indexBreadcrumbProjects: 'Projetos',
    indexHeading: 'Projetos',
    indexSubtitle: 'Ferramentas e extensões que criei',

    indexProject1Description:
      'Um mensageiro criptografado e focado em privacidade que desenvolvo nas horas vagas — criptografia com Signal Protocol, sealed sender para proteção de metadados, caixas de entrada anônimas e um único cliente em Rust para cada plataforma (hoje Linux, Windows e Android; iOS e macOS planejados). Ainda em desenvolvimento.',
    indexProject1LiveLabel: 'Saiba mais →',
    indexProject2Description:
      'Um aplicativo nativo de bandeja do sistema para o Spotify no Wayland/Hyprland. Role para trocar de faixa, clique com o botão do meio para pausar, clique para minimizar na bandeja. Criado depois de descobrir que a integração com o desktop Linux exige cinco subsistemas diferentes.',
    indexProject2LiveLabel: 'Pacote AUR',
    indexProject3Description:
      'Uma extensão de navegador leve que adiciona ao YouTube um modo de tela cheia por aba no estilo da Twitch. Oculte todas as distrações e concentre-se no seu conteúdo com um atalho de teclado (Alt+T) ou um único clique. Funciona perfeitamente com a navegação em página única do YouTube.',
    indexProject3LiveLabel: 'Chrome Store',
    indexProject3Live2Label: 'Firefox Add-ons',

    // ---- projects/chatter.astro ----
    chatterMetaTitle: 'Chatter — Um mensageiro criptografado em quatro plataformas',
    chatterMetaDescription:
      'O Chatter é um mensageiro criptografado e focado em privacidade que desenvolvo nas horas vagas — um único cliente em Rust para cada plataforma (hoje Linux, Windows e Android; iOS e macOS planejados) sobre um backend em Go, com criptografia E2E do Signal Protocol. Um projeto pessoal, em desenvolvimento.',
    chatterBreadcrumbHome: 'Início',
    chatterBreadcrumbProjects: 'Projetos',
    chatterBreadcrumbChatter: 'Chatter',
    chatterKicker: 'Projeto · em desenvolvimento',
    chatterH1: 'Uma base de código, um mensageiro criptografado para cada plataforma',
    chatterLead:
      'O Chatter é um mensageiro com criptografia de ponta a ponta e foco em privacidade que desenvolvo nas horas vagas — um único cliente em Rust (interface Slint) que hoje roda em Linux, Windows e Android, com iOS e macOS planejados, sobre um backend em Go. Eu projeto e construo tudo: a criptografia, o backend, o cliente e a infraestrutura para executá-lo. Ainda está em desenvolvimento, mas é assim que me mantenho com a mão na massa em toda a stack.',

    chatterStats: [
      { n: '1', label: 'base de código — um cliente em Rust para cada plataforma' },
      { n: 'Signal', label: 'criptografia E2E com Protocol, do zero' },
      { n: 'Em dev', label: 'um projeto pessoal, ainda não lançado' },
    ],

    chatterHardHeading: 'Os problemas difíceis que estou resolvendo',
    chatterHardProblems: [
      'Uma base de código, todas as plataformas: um único cliente em Rust (interface Slint) compartilhando um mesmo núcleo criptográfico, de modo que a criptografia de ponta a ponta se comporte de forma idêntica em todos os lugares — troca de chaves X3DH, forward secrecy com Double Ratchet, Sender Keys para grupos e prekeys pós-quânticas Kyber. Rodando e testado em Linux, Windows e Android; iOS e macOS planejados.',
      'Sealed sender: o servidor não consegue identificar quem enviou uma mensagem, mesmo com acesso total ao banco de dados — com resistência a ataques de temporização e validação de múltiplos destinatários.',
      'Caixas de mensagens efêmeras e resistentes à correlação (baseadas na pesquisa do NDSS ’21) usando assinaturas cegas, de modo que as mensagens não possam ser vinculadas pelo tempo.',
      'Sincronização entre vários dispositivos com tokens de autenticação por dispositivo (HKDF, não JWT), pacotes de prekeys por dispositivo e chaves de grupo rotacionadas.',
      'Voz e vídeo criptografados (LiveKit + WebRTC) com rotação de chaves de ponta a ponta e ingestão de compartilhamento de tela.',
      'Criptografia de arquivos em blocos com AES-256-GCM, com verificação de vírus e acesso anônimo por URLs pré-assinadas.',
    ],

    chatterStackHeading: 'A stack',
    chatterStack: [
      { group: 'Backend', items: 'Serviços em Go + ConnectRPC, workflows no Temporal (compensação de sagas), permissões com SpiceDB (Zanzibar)' },
      { group: 'Clientes', items: 'Um cliente em Rust + Slint para cada plataforma — rodando em Linux, Windows e Android; iOS e macOS planejados' },
      { group: 'Dados', items: 'PostgreSQL, Redis, SQLite/SQLCipher no cliente' },
      { group: 'Cripto', items: 'libsignal (X3DH, Double Ratchet, Sender Keys), Kyber1024 pós-quântico, AES-256-GCM' },
      { group: 'Infra', items: 'Docker Compose, K3s (HA de 3 nós), Fly.io, Terraform/Terragrunt, systemd' },
      { group: 'Qualidade', items: 'CI com GitHub Actions (lint, race, verificação de segurança, checagens de proto), Prometheus + Grafana + OpenTelemetry' },
    ],

    chatterBlogHeading: 'Análises detalhadas no blog',
    chatterGithubLink: 'Código-fonte no GitHub →',

    chatterWhyHeading: 'Por que está aqui',
    chatterWhyP1:
      'Muita gente sabe falar sobre arquitetura. Aqui sou eu de fato construindo em toda a stack — criptografia, backend, clientes nativos e a infraestrutura para executá-la. É daí que vem o trabalho de',
    chatterWhyLink1: 'ideia à produção',
    chatterWhyLink2: ' blocos de construção',
    chatterWhyLink3: ' revisão de arquitetura',
    chatterWhyAnd: ' e',
    chatterWhyLink4: ' auditoria de apps de IA',
    chatterWhyTail: ' — aplicado primeiro ao meu próprio código.',

    chatterNote: 'Status: um projeto pessoal em desenvolvimento ativo — ainda não lançado.',
    chatterCtaHeading: 'Quer esse tipo de trabalho no seu produto?',
    chatterCtaBody: 'Uma conversa gratuita de 30 minutos. Diga onde você está; eu mostro o caminho mais rápido até o lançamento.',
    chatterCtaButton: 'Agendar uma conversa inicial gratuita',
  },
  fr: {
    // ---- projects/index.astro ----
    indexMetaTitle: 'Projets — Outils DevOps et open source',
    indexMetaDescription:
      'Projets open source d’Alexandru Pruteanu — Chatter (une messagerie chiffrée), une applet Spotify pour Wayland et des outils DevOps issus de vrais déploiements en production.',
    indexBreadcrumbHome: 'Accueil',
    indexBreadcrumbProjects: 'Projets',
    indexHeading: 'Projets',
    indexSubtitle: 'Outils et extensions que j’ai créés',

    indexProject1Description:
      'Une messagerie chiffrée et respectueuse de la vie privée que je développe en parallèle — chiffrement Signal Protocol, sealed sender pour protéger les métadonnées, boîtes de réception anonymes et un seul client Rust pour chaque plateforme (aujourd’hui Linux, Windows et Android ; iOS et macOS prévus). Encore en développement.',
    indexProject1LiveLabel: 'En savoir plus →',
    indexProject2Description:
      'Une application native d’icône de la barre système pour Spotify sous Wayland/Hyprland. Faites défiler pour changer de piste, cliquez avec le bouton du milieu pour mettre en pause, cliquez pour réduire dans la barre. Créée après avoir découvert que l’intégration au bureau Linux nécessite cinq sous-systèmes différents.',
    indexProject2LiveLabel: 'Paquet AUR',
    indexProject3Description:
      'Une extension de navigateur légère qui ajoute à YouTube un mode plein écran par onglet à la manière de Twitch. Masquez toutes les distractions et concentrez-vous sur votre contenu grâce à un raccourci clavier (Alt+T) ou un simple clic. Fonctionne parfaitement avec la navigation en application monopage de YouTube.',
    indexProject3LiveLabel: 'Chrome Store',
    indexProject3Live2Label: 'Firefox Add-ons',

    // ---- projects/chatter.astro ----
    chatterMetaTitle: 'Chatter — Une messagerie chiffrée sur quatre plateformes',
    chatterMetaDescription:
      'Chatter est une messagerie chiffrée et respectueuse de la vie privée que je développe en parallèle — un seul client Rust pour chaque plateforme (aujourd’hui Linux, Windows et Android ; iOS et macOS prévus) sur un backend Go, avec chiffrement E2E Signal Protocol. Un projet personnel, en développement.',
    chatterBreadcrumbHome: 'Accueil',
    chatterBreadcrumbProjects: 'Projets',
    chatterBreadcrumbChatter: 'Chatter',
    chatterKicker: 'Projet · en développement',
    chatterH1: 'Une seule base de code, une messagerie chiffrée pour chaque plateforme',
    chatterLead:
      'Chatter est une messagerie chiffrée de bout en bout et respectueuse de la vie privée que je développe en parallèle — un unique client Rust (interface Slint) qui fonctionne aujourd’hui sous Linux, Windows et Android, avec iOS et macOS prévus, sur un backend Go. Je conçois et construis l’ensemble : la cryptographie, le backend, le client et l’infrastructure qui le fait tourner. C’est encore en développement, mais c’est ainsi que je garde les mains dans le cambouis sur toute la pile.',

    chatterStats: [
      { n: '1', label: 'base de code — un client Rust pour chaque plateforme' },
      { n: 'Signal', label: 'chiffrement E2E Protocol, de zéro' },
      { n: 'En dév.', label: 'un projet personnel, pas encore publié' },
    ],

    chatterHardHeading: 'Les problèmes difficiles que je résous',
    chatterHardProblems: [
      'Une base de code, toutes les plateformes : un unique client Rust (interface Slint) partageant un même cœur cryptographique, afin que le chiffrement de bout en bout se comporte de façon identique partout — échange de clés X3DH, confidentialité persistante Double Ratchet, Sender Keys pour les groupes et prékeys post-quantiques Kyber. Fonctionne et testé sous Linux, Windows et Android ; iOS et macOS prévus.',
      'Sealed sender : le serveur ne peut pas identifier l’expéditeur d’un message, même avec un accès complet à la base de données — avec résistance aux attaques temporelles et validation multi-destinataires.',
      'Boîtes aux lettres éphémères et résistantes à la corrélation (d’après les travaux NDSS ’21) grâce à des signatures aveugles, afin que les messages ne puissent pas être reliés par leur horodatage.',
      'Synchronisation multi-appareils avec des jetons d’authentification par appareil (HKDF, pas JWT), des lots de prékeys par appareil et des clés de groupe renouvelées.',
      'Voix et vidéo chiffrées (LiveKit + WebRTC) avec renouvellement des clés de bout en bout et ingestion du partage d’écran.',
      'Chiffrement de fichiers par blocs en AES-256-GCM, avec analyse antivirus et accès anonyme via des URL présignées.',
    ],

    chatterStackHeading: 'La pile technique',
    chatterStack: [
      { group: 'Backend', items: 'Services Go + ConnectRPC, workflows Temporal (compensation de sagas), permissions SpiceDB (Zanzibar)' },
      { group: 'Clients', items: 'Un client Rust + Slint pour chaque plateforme — fonctionnant sous Linux, Windows et Android ; iOS et macOS prévus' },
      { group: 'Données', items: 'PostgreSQL, Redis, SQLite/SQLCipher côté client' },
      { group: 'Crypto', items: 'libsignal (X3DH, Double Ratchet, Sender Keys), Kyber1024 post-quantique, AES-256-GCM' },
      { group: 'Infra', items: 'Docker Compose, K3s (HA à 3 nœuds), Fly.io, Terraform/Terragrunt, systemd' },
      { group: 'Qualité', items: 'CI GitHub Actions (lint, race, analyse de sécurité, vérifications proto), Prometheus + Grafana + OpenTelemetry' },
    ],

    chatterBlogHeading: 'Analyses approfondies sur le blog',
    chatterGithubLink: 'Code source sur GitHub →',

    chatterWhyHeading: 'Pourquoi c’est ici',
    chatterWhyP1:
      'Beaucoup de gens savent parler d’architecture. Ici, c’est moi qui la construis réellement sur toute la pile — cryptographie, backend, clients natifs et l’infrastructure qui le fait tourner. C’est de là que vient le travail',
    chatterWhyLink1: 'd’idée à production',
    chatterWhyLink2: ' de blocs de construction',
    chatterWhyLink3: ' de revue d’architecture',
    chatterWhyAnd: ' et',
    chatterWhyLink4: ' d’audit d’applications IA',
    chatterWhyTail: ' — appliqué d’abord à mon propre code.',

    chatterNote: 'Statut : un projet personnel en développement actif — pas encore publié.',
    chatterCtaHeading: 'Vous voulez ce type de travail sur votre produit ?',
    chatterCtaBody: 'Un appel gratuit de 30 minutes. Dites-moi où vous en êtes ; je vous indiquerai le chemin le plus rapide vers la mise en production.',
    chatterCtaButton: 'Réserver un appel de découverte gratuit',
  },
  ro: {
    // ---- projects/index.astro ----
    indexMetaTitle: 'Proiecte — Instrumente DevOps și open source',
    indexMetaDescription:
      'Proiecte open source create de Alexandru Pruteanu — Chatter (un mesager criptat), o pictogramă Spotify în tava de sistem pentru Wayland și instrumente DevOps născute din muncă reală în producție.',
    indexBreadcrumbHome: 'Acasă',
    indexBreadcrumbProjects: 'Proiecte',
    indexHeading: 'Proiecte',
    indexSubtitle: 'Instrumente și extensii pe care le-am construit',

    indexProject1Description:
      'Un mesager criptat, axat pe confidențialitate, pe care îl dezvolt în timpul liber — criptare Signal Protocol, sealed sender pentru protecția metadatelor, cutii poștale anonime și un singur client Rust pentru fiecare platformă (astăzi Linux, Windows și Android; iOS și macOS planificate). Încă în dezvoltare.',
    indexProject1LiveLabel: 'Află mai multe →',
    indexProject2Description:
      'O aplicație nativă în tava de sistem pentru Spotify pe Wayland/Hyprland. Derulați pentru a schimba piesa, clic pe butonul din mijloc pentru pauză, clic pentru a minimiza în tavă. Creată după ce am descoperit că integrarea cu desktopul Linux necesită cinci subsisteme diferite.',
    indexProject2LiveLabel: 'Pachet AUR',
    indexProject3Description:
      'O extensie de browser ușoară care adaugă în YouTube un mod ecran complet pe filă, în stilul Twitch. Ascundeți toate distragerile și concentrați-vă asupra conținutului printr-o scurtătură de tastatură (Alt+T) sau un singur clic. Funcționează perfect cu navigarea de tip aplicație cu o singură pagină a YouTube.',
    indexProject3LiveLabel: 'Chrome Store',
    indexProject3Live2Label: 'Firefox Add-ons',

    // ---- projects/chatter.astro ----
    chatterMetaTitle: 'Chatter — Un mesager criptat pe patru platforme',
    chatterMetaDescription:
      'Chatter este un mesager criptat, axat pe confidențialitate, pe care îl dezvolt în timpul liber — un singur client Rust pentru fiecare platformă (astăzi Linux, Windows și Android; iOS și macOS planificate) pe un backend Go, cu criptare E2E Signal Protocol. Un proiect personal, în dezvoltare.',
    chatterBreadcrumbHome: 'Acasă',
    chatterBreadcrumbProjects: 'Proiecte',
    chatterBreadcrumbChatter: 'Chatter',
    chatterKicker: 'Proiect · în dezvoltare',
    chatterH1: 'O singură bază de cod, un mesager criptat pentru fiecare platformă',
    chatterLead:
      'Chatter este un mesager criptat integral (end-to-end), axat pe confidențialitate, pe care îl dezvolt în timpul liber — un singur client Rust (interfață Slint) care rulează astăzi pe Linux, Windows și Android, cu iOS și macOS planificate, pe un backend Go. Proiectez și construiesc totul: criptografia, backendul, clientul și infrastructura care îl pune în funcțiune. Este încă în dezvoltare, dar așa rămân implicat direct în întreaga stivă tehnologică.',

    chatterStats: [
      { n: '1', label: 'bază de cod — un client Rust pentru fiecare platformă' },
      { n: 'Signal', label: 'criptare E2E Protocol, de la zero' },
      { n: 'În dezv.', label: 'un proiect personal, încă nelansat' },
    ],

    chatterHardHeading: 'Problemele dificile pe care le rezolv',
    chatterHardProblems: [
      'O singură bază de cod, fiecare platformă: un singur client Rust (interfață Slint) care partajează un nucleu criptografic comun, astfel încât criptarea integrală să se comporte identic peste tot — schimb de chei X3DH, forward secrecy prin Double Ratchet, Sender Keys pentru grupuri și prekey-uri post-cuantice Kyber. Rulează și este testat pe Linux, Windows și Android; iOS și macOS planificate.',
      'Sealed sender: serverul nu poate identifica cine a trimis un mesaj, nici măcar cu acces complet la baza de date — cu rezistență la atacuri de temporizare și validare pentru mai mulți destinatari.',
      'Cutii poștale efemere, rezistente la corelare (bazate pe cercetarea NDSS ’21), folosind semnături oarbe, astfel încât mesajele să nu poată fi asociate după temporizare.',
      'Sincronizare pe mai multe dispozitive cu token-uri de autentificare per dispozitiv (HKDF, nu JWT), pachete de prekey-uri per dispozitiv și chei de grup rotite.',
      'Voce și video criptate (LiveKit + WebRTC) cu rotația cheilor integral (end-to-end) și preluarea partajării ecranului.',
      'Criptarea fișierelor pe fragmente cu AES-256-GCM, cu scanare antivirus și acces anonim prin URL-uri presemnate.',
    ],

    chatterStackHeading: 'Stiva tehnologică',
    chatterStack: [
      { group: 'Backend', items: 'Servicii Go + ConnectRPC, fluxuri Temporal (compensare saga), permisiuni SpiceDB (Zanzibar)' },
      { group: 'Clienți', items: 'Un client Rust + Slint pentru fiecare platformă — rulând pe Linux, Windows și Android; iOS și macOS planificate' },
      { group: 'Date', items: 'PostgreSQL, Redis, SQLite/SQLCipher pe partea de client' },
      { group: 'Cripto', items: 'libsignal (X3DH, Double Ratchet, Sender Keys), Kyber1024 post-cuantic, AES-256-GCM' },
      { group: 'Infra', items: 'Docker Compose, K3s (HA cu 3 noduri), Fly.io, Terraform/Terragrunt, systemd' },
      { group: 'Calitate', items: 'CI cu GitHub Actions (lint, race, scanare de securitate, verificări proto), Prometheus + Grafana + OpenTelemetry' },
    ],

    chatterBlogHeading: 'Analize detaliate pe blog',
    chatterGithubLink: 'Codul sursă pe GitHub →',

    chatterWhyHeading: 'De ce se află aici',
    chatterWhyP1:
      'Mulți oameni pot vorbi despre arhitectură. Aici o construiesc efectiv pe toată stiva — criptografie, backend, clienți nativi și infrastructura care o pune în funcțiune. De aici provine munca de',
    chatterWhyLink1: 'idee la producție',
    chatterWhyLink2: ' blocuri de construcție',
    chatterWhyLink3: ' revizuire de arhitectură',
    chatterWhyAnd: ' și',
    chatterWhyLink4: ' audit de aplicații IA',
    chatterWhyTail: ' — aplicată mai întâi propriului meu cod.',

    chatterNote: 'Stare: un proiect personal în dezvoltare activă — încă nelansat.',
    chatterCtaHeading: 'Doriți acest tip de muncă pentru produsul dumneavoastră?',
    chatterCtaBody: 'O discuție gratuită de 30 de minute. Spuneți-mi unde vă aflați; vă voi arăta cea mai rapidă cale către lansare.',
    chatterCtaButton: 'Rezervați o discuție introductivă gratuită',
  },
} as const;

export function getProjectsContent(lang: Lang) {
  return { ...projects.en, ...projects[lang] };
}
