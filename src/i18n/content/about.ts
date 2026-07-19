// Per-locale content for the ABOUT page:
//   - src/pages/about.astro  ->  rendered via src/components/pages/About.astro
// English is the source of truth and lives in `en` with ALL keys.
// Other locales start empty; translators fill them and missing keys
// fall back to English via getAboutContent().
//
// Proper nouns kept verbatim in the component (not translated): company names,
// skill/tech tags, email, external URLs, and the JSON-LD Person schema.
// Only user-facing prose lives here.

import type { Lang } from '../ui';

export const about = {
  en: {
    // ---- meta ----
    metaTitle: 'About — Kubernetes & Cloud Cost Engineer',
    metaDescription:
      'DevOps engineer, 6+ years of AWS, GCP, and Kubernetes in production. I cut cloud bills without touching reliability — fixed-scope consulting for scaling teams.',

    // ---- breadcrumb + header ----
    breadcrumbHome: 'Home',
    breadcrumbAbout: 'About',
    h1: "Hi, I'm Alexandru",
    headerSubtitle:
      "I'm a DevOps engineer who cuts cloud and Kubernetes bills without touching reliability — six-plus years of AWS, GCP, and Kubernetes in production. Available for fixed-scope consulting, and worth a look if you're hiring.",
    ctaBookCall: 'Book a free discovery call',
    ctaBookNote: '30 minutes · no obligation',
    socialGithub: 'GitHub',
    socialLinkedin: 'LinkedIn',

    // ---- what I do ----
    doHeading: 'What I actually do',
    doCard1Title: 'Cut the cloud bill',
    doCard1Body:
      'Right-sizing, autoscaling, bin-packing, killing idle spend. The waste is almost always there — I find it and remove it without making anything more fragile.',
    doCard2Title: 'Make deploys boring',
    doCard2Body:
      "Terraform for everything, CI/CD where you push and it deploys, Kubernetes only when it's earned. Nobody gets paged at 3am for boring.",
    doCard3Title: 'Migrate without drama',
    doCard3Body:
      "To AWS or GCP one piece at a time, production running the whole way. We move what's worth moving and skip what isn't.",
    doServicesLink: 'See services & how I charge →',

    // ---- proof ----
    proofHeading: 'Proof, not promises',
    proofChatterTitle: "I'm building an encrypted messenger from scratch",
    proofChatterBody:
      'Chatter is a privacy-first messenger I build solo — Rust client, Go backend, full Signal Protocol end-to-end encryption, running on Linux, Windows, and Android. Most consultants host systems like this; I build them.',
    proofChatterLink: 'See the project →',
    proofNumbersTitle: 'Real numbers from real jobs',
    proofNumbersBody:
      'At my current role I cut environment provisioning time by 40% with Terraform and Helm. Before that, at Quorum, I locked IAM down to least privilege and improved EC2 cost efficiency across environments.',
    proofBlogTitle: 'I write about what I run',
    proofBlogBody:
      'Write-ups of things I have actually built and operated — no rewritten press releases.',
    proofBlogLink: 'Read the blog →',

    // ---- career timeline ----
    timelineHeading: "Where I've worked",
    timelineIntro: 'Four DevOps engineer roles, six years — the short version. Details on request, or on LinkedIn.',
    experienceTechLabel: 'Stack:',
    jobs: [
      {
        company: 'Yopeso',
        period: 'Sep 2023 – Current',
        summary:
          'AWS infrastructure with Terraform and Helm — cut environment provisioning time by 40% — plus the Kubernetes clusters that run its microservices at scale.',
        tech: 'Terraform · AWS · Kubernetes · Helm · Ansible',
      },
      {
        company: 'Quorum',
        period: 'Feb 2022 – May 2023',
        summary:
          'Owned AWS infrastructure with Terraform — RDS, ElastiCache, OpenSearch — locked IAM down to least privilege and improved EC2 cost efficiency.',
        tech: 'AWS · Terraform · Jenkins · CircleCI · Datadog',
      },
      {
        company: 'Grid Dynamics',
        period: 'Mar 2021 – Jan 2022',
        summary:
          'Ran client workloads on GCP and GKE, built CI/CD with Jenkins, Chef, and Spinnaker, and onboarded new microservices end to end.',
        tech: 'GCP · GKE · Helm · Spinnaker · Chef',
      },
      {
        company: 'EBS-Integrator',
        period: 'Aug 2020 – Oct 2020',
        summary:
          'GitLab CI pipelines, Ansible automation, and Docker Swarm orchestration for client microservice stacks.',
        tech: 'GitLab · Docker Swarm · Ansible · Nginx',
      },
    ],
    timelineEarlier:
      "Earlier: a DevOps internship at Endava, a machine-learning internship at Smart AItomation, and three years of IT support at Gilat — where I learned to explain technical problems to people who don't care about YAML.",
    timelineLinkedin: 'Full history on LinkedIn →',

    // ---- how I work ----
    workHeading: 'How I work',
    value1Title: 'Fixed scope, no surprises',
    value1Body:
      'You approve the plan and the price before any work begins. Fixed-scope proposal or day rate — your choice.',
    value2Title: 'Plain language',
    value2Body:
      'I explain trade-offs without buzzwords and document everything as I go.',
    value3Title: 'I make myself unnecessary',
    value3Body:
      'Everything is handed over so your team can run it without me. The goal is no lock-in — not even on me.',
    languagesLine:
      'Working languages: English (C2) · Romanian (native) · Portuguese (C1) · Russian (B2)',

    // ---- CTA ----
    ctaHeading: 'Ready to talk?',
    ctaText:
      "If your cloud bill is growing faster than revenue, book a call. If you're hiring, my inbox is open.",
    ctaBook: 'Book a free discovery call',
    ctaEmail: 'Email me',
    ctaLinkedinBtn: 'LinkedIn',
  },
  de: {
    // ---- meta ----
    metaTitle: 'Über mich — Kubernetes & Cloud-Kosten',
    metaDescription:
      'DevOps-Engineer mit über 6 Jahren AWS, GCP und Kubernetes in Produktion. Ich senke Cloud-Kosten ohne Zuverlässigkeitsverlust — Beratung mit festem Umfang.',

    // ---- breadcrumb + header ----
    breadcrumbHome: 'Startseite',
    breadcrumbAbout: 'Über mich',
    h1: 'Hallo, ich bin Alexandru',
    headerSubtitle:
      'Ich bin DevOps-Engineer und senke Cloud- und Kubernetes-Kosten, ohne die Zuverlässigkeit anzutasten — über sechs Jahre AWS, GCP und Kubernetes in Produktion. Verfügbar für Beratung mit festem Umfang — und einen Blick wert, wenn Sie einstellen.',
    ctaBookCall: 'Kostenloses Erstgespräch buchen',
    ctaBookNote: '30 Minuten · unverbindlich',
    socialGithub: 'GitHub',
    socialLinkedin: 'LinkedIn',

    // ---- what I do ----
    doHeading: 'Was ich wirklich tue',
    doCard1Title: 'Cloud-Rechnung senken',
    doCard1Body:
      'Right-Sizing, Autoscaling, Bin-Packing, ungenutzte Ressourcen abschalten. Die Verschwendung ist fast immer da — ich finde sie und entferne sie, ohne etwas fragiler zu machen.',
    doCard2Title: 'Deployments langweilig machen',
    doCard2Body:
      'Terraform für alles, CI/CD, bei dem ein Push automatisch deployt, Kubernetes nur, wenn es sich wirklich lohnt. Für langweilige Systeme wird niemand um 3 Uhr nachts geweckt.',
    doCard3Title: 'Migrieren ohne Drama',
    doCard3Body:
      'In die AWS- oder GCP-Cloud, Stück für Stück, während die Produktion durchgehend läuft. Wir migrieren, was sich lohnt, und lassen weg, was sich nicht lohnt.',
    doServicesLink: 'Leistungen & Konditionen ansehen →',

    // ---- proof ----
    proofHeading: 'Belege statt Versprechen',
    proofChatterTitle: 'Ich baue einen verschlüsselten Messenger von Grund auf',
    proofChatterBody:
      'Chatter ist ein Privacy-First-Messenger, den ich im Alleingang entwickle — Rust-Client, Go-Backend, vollständige Ende-zu-Ende-Verschlüsselung mit dem Signal-Protokoll, lauffähig auf Linux, Windows und Android. Die meisten Berater hosten solche Systeme nur; ich baue sie.',
    proofChatterLink: 'Zum Projekt →',
    proofNumbersTitle: 'Echte Zahlen aus echten Jobs',
    proofNumbersBody:
      'In meiner aktuellen Rolle habe ich die Bereitstellungszeit von Umgebungen mit Terraform und Helm um 40 % verkürzt. Davor habe ich bei Quorum IAM auf das Least-Privilege-Prinzip umgestellt und die EC2-Kosteneffizienz über alle Umgebungen hinweg verbessert.',
    proofBlogTitle: 'Ich schreibe über das, was ich betreibe',
    proofBlogBody:
      'Berichte über Dinge, die ich tatsächlich gebaut und betrieben habe — keine umformulierten Pressemitteilungen.',
    proofBlogLink: 'Blog lesen →',

    // ---- career timeline ----
    timelineHeading: 'Wo ich gearbeitet habe',
    timelineIntro: 'Vier Stationen als DevOps-Engineer, sechs Jahre — die Kurzfassung. Details auf Anfrage oder auf LinkedIn.',
    experienceTechLabel: 'Stack:',
    jobs: [
      {
        company: 'Yopeso',
        period: 'Sep. 2023 – Aktuell',
        summary:
          'AWS-Infrastruktur mit Terraform und Helm — Bereitstellungszeit von Umgebungen um 40 % verkürzt — plus die Kubernetes-Cluster, auf denen die Microservices im großen Maßstab laufen.',
        tech: 'Terraform · AWS · Kubernetes · Helm · Ansible',
      },
      {
        company: 'Quorum',
        period: 'Feb. 2022 – Mai 2023',
        summary:
          'AWS-Infrastruktur mit Terraform verantwortet — RDS, ElastiCache, OpenSearch — IAM auf Least Privilege umgestellt und die EC2-Kosteneffizienz verbessert.',
        tech: 'AWS · Terraform · Jenkins · CircleCI · Datadog',
      },
      {
        company: 'Grid Dynamics',
        period: 'März 2021 – Jan. 2022',
        summary:
          'Client-Workloads auf GCP und GKE betrieben, CI/CD mit Jenkins, Chef und Spinnaker aufgebaut und neue Microservices von Anfang bis Ende eingeführt.',
        tech: 'GCP · GKE · Helm · Spinnaker · Chef',
      },
      {
        company: 'EBS-Integrator',
        period: 'Aug. 2020 – Okt. 2020',
        summary:
          'GitLab-CI-Pipelines, Ansible-Automatisierung und Docker-Swarm-Orchestrierung für Microservice-Stacks von Kunden.',
        tech: 'GitLab · Docker Swarm · Ansible · Nginx',
      },
    ],
    timelineEarlier:
      'Davor: ein DevOps-Praktikum bei Endava, ein Machine-Learning-Praktikum bei Smart AItomation und drei Jahre IT-Support bei Gilat — wo ich gelernt habe, technische Probleme Menschen zu erklären, die sich nicht für YAML interessieren.',
    timelineLinkedin: 'Vollständiger Werdegang auf LinkedIn →',

    // ---- how I work ----
    workHeading: 'Wie ich arbeite',
    value1Title: 'Fester Umfang, keine Überraschungen',
    value1Body:
      'Sie genehmigen Plan und Preis, bevor die Arbeit beginnt. Angebot mit festem Umfang oder Tagessatz — Ihre Wahl.',
    value2Title: 'Klare Sprache',
    value2Body:
      'Ich erkläre Kompromisse ohne Buzzwords und dokumentiere alles im laufenden Betrieb.',
    value3Title: 'Ich mache mich überflüssig',
    value3Body:
      'Alles wird so übergeben, dass Ihr Team es ohne mich betreiben kann. Das Ziel ist kein Lock-in — auch nicht an mich.',
    languagesLine:
      'Arbeitssprachen: Englisch (C2) · Rumänisch (Muttersprache) · Portugiesisch (C1) · Russisch (B2)',

    // ---- CTA ----
    ctaHeading: 'Bereit für ein Gespräch?',
    ctaText:
      'Wenn Ihre Cloud-Rechnung schneller wächst als Ihr Umsatz, buchen Sie ein Gespräch. Wenn Sie einstellen, ist mein Postfach offen.',
    ctaBook: 'Kostenloses Erstgespräch buchen',
    ctaEmail: 'E-Mail schreiben',
    ctaLinkedinBtn: 'LinkedIn',
  },
  es: {
    // ---- meta ----
    metaTitle: 'Sobre mí — Kubernetes y costes cloud',
    metaDescription:
      'Ingeniero DevOps con más de 6 años de AWS, GCP y Kubernetes en producción. Reduzco facturas cloud sin tocar la fiabilidad — consultoría de alcance fijo.',

    // ---- breadcrumb + header ----
    breadcrumbHome: 'Inicio',
    breadcrumbAbout: 'Sobre mí',
    h1: 'Hola, soy Alexandru',
    headerSubtitle:
      'Soy un ingeniero DevOps que reduce facturas de cloud y Kubernetes sin tocar la fiabilidad — más de seis años de AWS, GCP y Kubernetes en producción. Disponible para consultoría de alcance fijo, y vale la pena echar un vistazo si estás contratando.',
    ctaBookCall: 'Reserva una llamada gratuita',
    ctaBookNote: '30 minutos · sin compromiso',
    socialGithub: 'GitHub',
    socialLinkedin: 'LinkedIn',

    // ---- what I do ----
    doHeading: 'Lo que realmente hago',
    doCard1Title: 'Reducir la factura cloud',
    doCard1Body:
      'Right-sizing, autoescalado, bin-packing, eliminar gasto ocioso. El desperdicio casi siempre está ahí — lo encuentro y lo elimino sin hacer nada más frágil.',
    doCard2Title: 'Hacer aburridos los despliegues',
    doCard2Body:
      'Terraform para todo, CI/CD donde haces push y se despliega, Kubernetes solo cuando se lo merece. A nadie le despiertan a las 3 de la mañana por algo aburrido.',
    doCard3Title: 'Migrar sin drama',
    doCard3Body:
      'A AWS o GCP pieza a pieza, con producción funcionando todo el tiempo. Movemos lo que vale la pena mover y omitimos lo que no.',
    doServicesLink: 'Ver servicios y tarifas →',

    // ---- proof ----
    proofHeading: 'Pruebas, no promesas',
    proofChatterTitle: 'Estoy construyendo un mensajero cifrado desde cero',
    proofChatterBody:
      'Chatter es un mensajero centrado en la privacidad que desarrollo en solitario — cliente en Rust, backend en Go, cifrado de extremo a extremo completo con el protocolo Signal, funcionando en Linux, Windows y Android. La mayoría de los consultores solo alojan sistemas así; yo los construyo.',
    proofChatterLink: 'Ver el proyecto →',
    proofNumbersTitle: 'Números reales de trabajos reales',
    proofNumbersBody:
      'En mi puesto actual reduje en un 40 % el tiempo de aprovisionamiento de entornos con Terraform y Helm. Antes, en Quorum, apliqué el principio de privilegios mínimos en IAM y mejoré la eficiencia de costes de EC2 en todos los entornos.',
    proofBlogTitle: 'Escribo sobre lo que opero',
    proofBlogBody:
      'Artículos sobre cosas que realmente he construido y operado — nada de notas de prensa reescritas.',
    proofBlogLink: 'Leer el blog →',

    // ---- career timeline ----
    timelineHeading: 'Dónde he trabajado',
    timelineIntro: 'Cuatro puestos como ingeniero DevOps, seis años — la versión corta. Detalles bajo petición, o en LinkedIn.',
    experienceTechLabel: 'Stack:',
    jobs: [
      {
        company: 'Yopeso',
        period: 'sept. 2023 – Actualidad',
        summary:
          'Infraestructura en AWS con Terraform y Helm — reduje en un 40 % el tiempo de aprovisionamiento de entornos — además de los clústeres de Kubernetes que ejecutan sus microservicios a gran escala.',
        tech: 'Terraform · AWS · Kubernetes · Helm · Ansible',
      },
      {
        company: 'Quorum',
        period: 'feb. 2022 – may. 2023',
        summary:
          'Responsable de la infraestructura en AWS con Terraform — RDS, ElastiCache, OpenSearch — apliqué privilegios mínimos en IAM y mejoré la eficiencia de costes de EC2.',
        tech: 'AWS · Terraform · Jenkins · CircleCI · Datadog',
      },
      {
        company: 'Grid Dynamics',
        period: 'mar. 2021 – ene. 2022',
        summary:
          'Operé cargas de trabajo de clientes en GCP y GKE, construí CI/CD con Jenkins, Chef y Spinnaker, e incorporé nuevos microservicios de principio a fin.',
        tech: 'GCP · GKE · Helm · Spinnaker · Chef',
      },
      {
        company: 'EBS-Integrator',
        period: 'ago. 2020 – oct. 2020',
        summary:
          'Pipelines de CI en GitLab, automatización con Ansible y orquestación con Docker Swarm para stacks de microservicios de clientes.',
        tech: 'GitLab · Docker Swarm · Ansible · Nginx',
      },
    ],
    timelineEarlier:
      'Antes: unas prácticas de DevOps en Endava, unas prácticas de machine learning en Smart AItomation y tres años de soporte de TI en Gilat — donde aprendí a explicar problemas técnicos a gente a la que no le importa el YAML.',
    timelineLinkedin: 'Historial completo en LinkedIn →',

    // ---- how I work ----
    workHeading: 'Cómo trabajo',
    value1Title: 'Alcance fijo, sin sorpresas',
    value1Body:
      'Apruebas el plan y el precio antes de que empiece cualquier trabajo. Propuesta de alcance fijo o tarifa diaria — tú eliges.',
    value2Title: 'Lenguaje claro',
    value2Body:
      'Explico los pros y contras sin palabras de moda y documento todo sobre la marcha.',
    value3Title: 'Me hago innecesario',
    value3Body:
      'Todo se entrega para que tu equipo pueda operarlo sin mí. El objetivo es cero dependencia — ni siquiera de mí.',
    languagesLine:
      'Idiomas de trabajo: inglés (C2) · rumano (nativo) · portugués (C1) · ruso (B2)',

    // ---- CTA ----
    ctaHeading: '¿Hablamos?',
    ctaText:
      'Si tu factura cloud crece más rápido que tus ingresos, reserva una llamada. Si estás contratando, mi bandeja de entrada está abierta.',
    ctaBook: 'Reserva una llamada gratuita',
    ctaEmail: 'Escríbeme',
    ctaLinkedinBtn: 'LinkedIn',
  },
  pt: {
    // ---- meta ----
    metaTitle: 'Sobre mim — Kubernetes e custos cloud',
    metaDescription:
      'Engenheiro DevOps com mais de 6 anos de AWS, GCP e Kubernetes em produção. Reduzo faturas cloud sem tocar na confiabilidade — consultoria de escopo fixo.',

    // ---- breadcrumb + header ----
    breadcrumbHome: 'Início',
    breadcrumbAbout: 'Sobre mim',
    h1: 'Olá, sou o Alexandru',
    headerSubtitle:
      'Sou um engenheiro DevOps que reduz faturas de cloud e Kubernetes sem tocar na confiabilidade — mais de seis anos de AWS, GCP e Kubernetes em produção. Disponível para consultoria de escopo fixo, e vale a pena dar uma olhada se você está contratando.',
    ctaBookCall: 'Agende uma chamada gratuita',
    ctaBookNote: '30 minutos · sem compromisso',
    socialGithub: 'GitHub',
    socialLinkedin: 'LinkedIn',

    // ---- what I do ----
    doHeading: 'O que eu realmente faço',
    doCard1Title: 'Reduzir a fatura cloud',
    doCard1Body:
      'Right-sizing, autoscaling, bin-packing, eliminar gasto ocioso. O desperdício quase sempre está lá — eu o encontro e removo sem tornar nada mais frágil.',
    doCard2Title: 'Tornar os deploys entediantes',
    doCard2Body:
      'Terraform para tudo, CI/CD em que você faz push e o deploy acontece, Kubernetes só quando ele se justifica. Ninguém é acordado às 3 da manhã por algo entediante.',
    doCard3Title: 'Migrar sem drama',
    doCard3Body:
      'Para AWS ou GCP, peça por peça, com a produção rodando o tempo todo. Movemos o que vale a pena mover e pulamos o que não vale.',
    doServicesLink: 'Ver serviços e valores →',

    // ---- proof ----
    proofHeading: 'Provas, não promessas',
    proofChatterTitle: 'Estou construindo um mensageiro criptografado do zero',
    proofChatterBody:
      'O Chatter é um mensageiro com foco em privacidade que desenvolvo sozinho — cliente em Rust, backend em Go, criptografia de ponta a ponta completa com o protocolo Signal, rodando em Linux, Windows e Android. A maioria dos consultores apenas hospeda sistemas assim; eu os construo.',
    proofChatterLink: 'Ver o projeto →',
    proofNumbersTitle: 'Números reais de trabalhos reais',
    proofNumbersBody:
      'No meu cargo atual, reduzi em 40% o tempo de provisionamento de ambientes com Terraform e Helm. Antes, na Quorum, apliquei o privilégio mínimo no IAM e melhorei a eficiência de custos do EC2 em todos os ambientes.',
    proofBlogTitle: 'Escrevo sobre o que opero',
    proofBlogBody:
      'Textos sobre coisas que realmente construí e operei — nada de comunicados de imprensa reescritos.',
    proofBlogLink: 'Ler o blog →',

    // ---- career timeline ----
    timelineHeading: 'Onde trabalhei',
    timelineIntro: 'Quatro cargos como engenheiro DevOps, seis anos — a versão curta. Detalhes sob demanda, ou no LinkedIn.',
    experienceTechLabel: 'Stack:',
    jobs: [
      {
        company: 'Yopeso',
        period: 'set. 2023 – Atual',
        summary:
          'Infraestrutura na AWS com Terraform e Helm — reduzi em 40% o tempo de provisionamento de ambientes — além dos clusters de Kubernetes que rodam seus microsserviços em larga escala.',
        tech: 'Terraform · AWS · Kubernetes · Helm · Ansible',
      },
      {
        company: 'Quorum',
        period: 'fev. 2022 – mai. 2023',
        summary:
          'Responsável pela infraestrutura na AWS com Terraform — RDS, ElastiCache, OpenSearch — apliquei privilégio mínimo no IAM e melhorei a eficiência de custos do EC2.',
        tech: 'AWS · Terraform · Jenkins · CircleCI · Datadog',
      },
      {
        company: 'Grid Dynamics',
        period: 'mar. 2021 – jan. 2022',
        summary:
          'Operei cargas de trabalho de clientes no GCP e no GKE, construí CI/CD com Jenkins, Chef e Spinnaker e integrei novos microsserviços de ponta a ponta.',
        tech: 'GCP · GKE · Helm · Spinnaker · Chef',
      },
      {
        company: 'EBS-Integrator',
        period: 'ago. 2020 – out. 2020',
        summary:
          'Pipelines de CI no GitLab, automação com Ansible e orquestração com Docker Swarm para stacks de microsserviços de clientes.',
        tech: 'GitLab · Docker Swarm · Ansible · Nginx',
      },
    ],
    timelineEarlier:
      'Antes disso: um estágio de DevOps na Endava, um estágio de machine learning na Smart AItomation e três anos de suporte de TI na Gilat — onde aprendi a explicar problemas técnicos para pessoas que não se importam com YAML.',
    timelineLinkedin: 'Histórico completo no LinkedIn →',

    // ---- how I work ----
    workHeading: 'Como eu trabalho',
    value1Title: 'Escopo fixo, sem surpresas',
    value1Body:
      'Você aprova o plano e o preço antes de qualquer trabalho começar. Proposta de escopo fixo ou diária — você escolhe.',
    value2Title: 'Linguagem clara',
    value2Body:
      'Explico os trade-offs sem jargão e documento tudo enquanto trabalho.',
    value3Title: 'Eu me torno desnecessário',
    value3Body:
      'Tudo é entregue de forma que sua equipe possa operar sem mim. O objetivo é zero dependência — nem mesmo de mim.',
    languagesLine:
      'Idiomas de trabalho: inglês (C2) · romeno (nativo) · português (C1) · russo (B2)',

    // ---- CTA ----
    ctaHeading: 'Vamos conversar?',
    ctaText:
      'Se a sua fatura cloud cresce mais rápido que a receita, agende uma chamada. Se você está contratando, minha caixa de entrada está aberta.',
    ctaBook: 'Agende uma chamada gratuita',
    ctaEmail: 'Envie um e-mail',
    ctaLinkedinBtn: 'LinkedIn',
  },
  fr: {
    // ---- meta ----
    metaTitle: 'À propos — Kubernetes et coûts cloud',
    metaDescription:
      'Ingénieur DevOps, plus de 6 ans d’AWS, GCP et Kubernetes en production. Je réduis les factures cloud sans toucher à la fiabilité — conseil à périmètre fixe.',

    // ---- breadcrumb + header ----
    breadcrumbHome: 'Accueil',
    breadcrumbAbout: 'À propos',
    h1: 'Bonjour, je suis Alexandru',
    headerSubtitle:
      'Je suis un ingénieur DevOps qui réduit les factures cloud et Kubernetes sans toucher à la fiabilité — plus de six ans d’AWS, GCP et Kubernetes en production. Disponible pour du conseil à périmètre fixe, et un profil à considérer si vous recrutez.',
    ctaBookCall: 'Réserver un appel découverte gratuit',
    ctaBookNote: '30 minutes · sans engagement',
    socialGithub: 'GitHub',
    socialLinkedin: 'LinkedIn',

    // ---- what I do ----
    doHeading: 'Ce que je fais vraiment',
    doCard1Title: 'Réduire la facture cloud',
    doCard1Body:
      'Right-sizing, autoscaling, bin-packing, suppression des dépenses inutiles. Le gaspillage est presque toujours là — je le trouve et je l’élimine sans rien fragiliser.',
    doCard2Title: 'Rendre les déploiements ennuyeux',
    doCard2Body:
      'Terraform pour tout, une CI/CD où un push suffit à déployer, Kubernetes seulement quand il est justifié. Personne n’est réveillé à 3 h du matin pour un système ennuyeux.',
    doCard3Title: 'Migrer sans drame',
    doCard3Body:
      'Vers AWS ou GCP, morceau par morceau, avec la production qui tourne en continu. On migre ce qui en vaut la peine et on laisse de côté le reste.',
    doServicesLink: 'Voir les services et les tarifs →',

    // ---- proof ----
    proofHeading: 'Des preuves, pas des promesses',
    proofChatterTitle: 'Je construis une messagerie chiffrée à partir de zéro',
    proofChatterBody:
      'Chatter est une messagerie axée sur la confidentialité que je développe en solo — client en Rust, backend en Go, chiffrement de bout en bout complet avec le protocole Signal, fonctionnant sur Linux, Windows et Android. La plupart des consultants ne font qu’héberger ce genre de systèmes ; moi, je les construis.',
    proofChatterLink: 'Voir le projet →',
    proofNumbersTitle: 'De vrais chiffres, de vrais postes',
    proofNumbersBody:
      'À mon poste actuel, j’ai réduit de 40 % le temps de provisionnement des environnements avec Terraform et Helm. Avant cela, chez Quorum, j’ai appliqué le principe du moindre privilège dans IAM et amélioré l’efficacité des coûts EC2 sur tous les environnements.',
    proofBlogTitle: 'J’écris sur ce que j’exploite',
    proofBlogBody:
      'Des articles sur des choses que j’ai réellement construites et exploitées — pas de communiqués de presse réécrits.',
    proofBlogLink: 'Lire le blog →',

    // ---- career timeline ----
    timelineHeading: 'Où j’ai travaillé',
    timelineIntro: 'Quatre postes d’ingénieur DevOps, six ans — la version courte. Détails sur demande, ou sur LinkedIn.',
    experienceTechLabel: 'Stack :',
    jobs: [
      {
        company: 'Yopeso',
        period: 'sept. 2023 – Actuel',
        summary:
          'Infrastructure AWS avec Terraform et Helm — temps de provisionnement des environnements réduit de 40 % — plus les clusters Kubernetes qui font tourner ses microservices à grande échelle.',
        tech: 'Terraform · AWS · Kubernetes · Helm · Ansible',
      },
      {
        company: 'Quorum',
        period: 'févr. 2022 – mai 2023',
        summary:
          'Responsable de l’infrastructure AWS avec Terraform — RDS, ElastiCache, OpenSearch — application du moindre privilège dans IAM et amélioration de l’efficacité des coûts EC2.',
        tech: 'AWS · Terraform · Jenkins · CircleCI · Datadog',
      },
      {
        company: 'Grid Dynamics',
        period: 'mars 2021 – janv. 2022',
        summary:
          'Exploitation des charges de travail clientes sur GCP et GKE, mise en place de la CI/CD avec Jenkins, Chef et Spinnaker, et intégration de nouveaux microservices de bout en bout.',
        tech: 'GCP · GKE · Helm · Spinnaker · Chef',
      },
      {
        company: 'EBS-Integrator',
        period: 'août 2020 – oct. 2020',
        summary:
          'Pipelines CI GitLab, automatisation Ansible et orchestration Docker Swarm pour les stacks de microservices des clients.',
        tech: 'GitLab · Docker Swarm · Ansible · Nginx',
      },
    ],
    timelineEarlier:
      'Avant cela : un stage DevOps chez Endava, un stage en machine learning chez Smart AItomation et trois ans de support informatique chez Gilat — où j’ai appris à expliquer des problèmes techniques à des gens qui se moquent du YAML.',
    timelineLinkedin: 'Parcours complet sur LinkedIn →',

    // ---- how I work ----
    workHeading: 'Comment je travaille',
    value1Title: 'Périmètre fixe, zéro surprise',
    value1Body:
      'Vous validez le plan et le prix avant le début de tout travail. Proposition à périmètre fixe ou tarif journalier — à vous de choisir.',
    value2Title: 'Un langage clair',
    value2Body:
      'J’explique les compromis sans jargon et je documente tout au fur et à mesure.',
    value3Title: 'Je me rends inutile',
    value3Body:
      'Tout est transmis pour que votre équipe puisse l’exploiter sans moi. L’objectif : aucune dépendance — pas même envers moi.',
    languagesLine:
      'Langues de travail : anglais (C2) · roumain (langue maternelle) · portugais (C1) · russe (B2)',

    // ---- CTA ----
    ctaHeading: 'Prêt à en parler ?',
    ctaText:
      'Si votre facture cloud croît plus vite que votre chiffre d’affaires, réservez un appel. Si vous recrutez, ma boîte mail est ouverte.',
    ctaBook: 'Réserver un appel découverte gratuit',
    ctaEmail: 'M’écrire',
    ctaLinkedinBtn: 'LinkedIn',
  },
  ro: {
    // ---- meta ----
    metaTitle: 'Despre mine — Kubernetes și costuri cloud',
    metaDescription:
      'Inginer DevOps cu peste 6 ani de AWS, GCP și Kubernetes în producție. Reduc facturile cloud fără să ating fiabilitatea — consultanță cu obiective fixe.',

    // ---- breadcrumb + header ----
    breadcrumbHome: 'Acasă',
    breadcrumbAbout: 'Despre mine',
    h1: 'Salut, sunt Alexandru',
    headerSubtitle:
      'Sunt un inginer DevOps care reduce facturile de cloud și Kubernetes fără să atingă fiabilitatea — peste șase ani de AWS, GCP și Kubernetes în producție. Disponibil pentru consultanță cu obiective fixe — și un profil de luat în calcul dacă angajați.',
    ctaBookCall: 'Programează un apel gratuit',
    ctaBookNote: '30 de minute · fără obligații',
    socialGithub: 'GitHub',
    socialLinkedin: 'LinkedIn',

    // ---- what I do ----
    doHeading: 'Ce fac de fapt',
    doCard1Title: 'Reduc factura cloud',
    doCard1Body:
      'Right-sizing, autoscaling, bin-packing, eliminarea cheltuielilor inutile. Risipa este aproape întotdeauna acolo — o găsesc și o elimin fără să fac nimic mai fragil.',
    doCard2Title: 'Fac implementările plictisitoare',
    doCard2Body:
      'Terraform pentru tot, CI/CD în care dai push și se face deploy, Kubernetes doar când se justifică. Nimeni nu e trezit la 3 dimineața pentru ceva plictisitor.',
    doCard3Title: 'Migrez fără dramă',
    doCard3Body:
      'Spre AWS sau GCP, bucată cu bucată, cu producția funcționând tot timpul. Mutăm ce merită mutat și sărim peste ce nu merită.',
    doServicesLink: 'Vezi serviciile și tarifele →',

    // ---- proof ----
    proofHeading: 'Dovezi, nu promisiuni',
    proofChatterTitle: 'Construiesc de la zero un mesager criptat',
    proofChatterBody:
      'Chatter este un mesager axat pe confidențialitate pe care îl dezvolt singur — client în Rust, backend în Go, criptare end-to-end completă cu protocolul Signal, funcțional pe Linux, Windows și Android. Majoritatea consultanților doar găzduiesc astfel de sisteme; eu le construiesc.',
    proofChatterLink: 'Vezi proiectul →',
    proofNumbersTitle: 'Cifre reale din joburi reale',
    proofNumbersBody:
      'În rolul meu actual am redus cu 40% timpul de aprovizionare a mediilor cu Terraform și Helm. Înainte, la Quorum, am aplicat principiul privilegiilor minime în IAM și am îmbunătățit eficiența costurilor EC2 în toate mediile.',
    proofBlogTitle: 'Scriu despre ce operez',
    proofBlogBody:
      'Articole despre lucruri pe care chiar le-am construit și operat — fără comunicate de presă rescrise.',
    proofBlogLink: 'Citește blogul →',

    // ---- career timeline ----
    timelineHeading: 'Unde am lucrat',
    timelineIntro: 'Patru roluri de inginer DevOps, șase ani — versiunea scurtă. Detalii la cerere sau pe LinkedIn.',
    experienceTechLabel: 'Stack:',
    jobs: [
      {
        company: 'Yopeso',
        period: 'sept. 2023 – Prezent',
        summary:
          'Infrastructură AWS cu Terraform și Helm — am redus cu 40% timpul de aprovizionare a mediilor — plus clusterele Kubernetes care rulează microserviciile la scară largă.',
        tech: 'Terraform · AWS · Kubernetes · Helm · Ansible',
      },
      {
        company: 'Quorum',
        period: 'feb. 2022 – mai 2023',
        summary:
          'Responsabil de infrastructura AWS cu Terraform — RDS, ElastiCache, OpenSearch — am aplicat privilegii minime în IAM și am îmbunătățit eficiența costurilor EC2.',
        tech: 'AWS · Terraform · Jenkins · CircleCI · Datadog',
      },
      {
        company: 'Grid Dynamics',
        period: 'mar. 2021 – ian. 2022',
        summary:
          'Am operat sarcini de lucru ale clienților pe GCP și GKE, am construit CI/CD cu Jenkins, Chef și Spinnaker și am integrat noi microservicii de la un capăt la altul.',
        tech: 'GCP · GKE · Helm · Spinnaker · Chef',
      },
      {
        company: 'EBS-Integrator',
        period: 'aug. 2020 – oct. 2020',
        summary:
          'Pipeline-uri CI în GitLab, automatizare cu Ansible și orchestrare cu Docker Swarm pentru stivele de microservicii ale clienților.',
        tech: 'GitLab · Docker Swarm · Ansible · Nginx',
      },
    ],
    timelineEarlier:
      'Mai devreme: un stagiu DevOps la Endava, un stagiu de machine learning la Smart AItomation și trei ani de suport IT la Gilat — unde am învățat să explic probleme tehnice unor oameni cărora nu le pasă de YAML.',
    timelineLinkedin: 'Istoricul complet pe LinkedIn →',

    // ---- how I work ----
    workHeading: 'Cum lucrez',
    value1Title: 'Obiective fixe, fără surprize',
    value1Body:
      'Aprobați planul și prețul înainte să înceapă orice lucrare. Propunere cu obiective fixe sau tarif pe zi — alegerea vă aparține.',
    value2Title: 'Limbaj clar',
    value2Body:
      'Explic compromisurile fără cuvinte la modă și documentez totul pe parcurs.',
    value3Title: 'Mă fac inutil',
    value3Body:
      'Totul este predat astfel încât echipa dumneavoastră să poată opera fără mine. Scopul este zero dependență — nici măcar de mine.',
    languagesLine:
      'Limbi de lucru: engleză (C2) · română (nativ) · portugheză (C1) · rusă (B2)',

    // ---- CTA ----
    ctaHeading: 'Gata de discuție?',
    ctaText:
      'Dacă factura cloud crește mai repede decât veniturile, programați un apel. Dacă angajați, inboxul meu este deschis.',
    ctaBook: 'Programează un apel gratuit',
    ctaEmail: 'Trimite-mi un e-mail',
    ctaLinkedinBtn: 'LinkedIn',
  },
} as const;

export function getAboutContent(lang: Lang) {
  return { ...about.en, ...about[lang] };
}
