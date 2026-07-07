// Per-locale content for the HOME page (src/pages/index.astro).
// English is the source of truth and lives in `en` with ALL keys.
// Other locales start empty; translators fill them and missing keys
// fall back to English via getHomeContent().
//
// Values that contain HTML entities or inline markup (e.g. &amp;, &nbsp;,
// &#8209;) are rendered in the component with `set:html`, so keep the raw
// entity text here. Plain-text values are rendered with `{ }`.

import type { Lang } from '../ui';

export const home = {
  en: {
    // SEO / <head> (passed as props to BaseLayout — plain strings, not HTML)
    meta: {
      title: 'DevOps & Cloud Consultant',
      description:
        "DevOps & cloud consultant: I cut cloud bills and kill 3am pages with AWS, Kubernetes, and zero-downtime deploys. Plus architecture & AI-app audits.",
    },

    // Hero
    heroKicker: 'DevOps &amp; Cloud Consulting',
    heroTitleA: 'Cut your cloud bill.',
    heroTitleB: 'Kill the 3am wake&#8209;ups.',
    heroSubhead:
      "I make production fast, cheap, and boring — AWS, Kubernetes, and zero-downtime deploys that don't wake&nbsp;anyone&nbsp;up.",
    ctaBookCall: 'Book a free discovery call',
    ctaNote: '30 minutes · no obligation',
    proofStat1Value: '5×',
    proofStat1Label: 'smaller payloads with Protocol Buffers',
    proofStat2Value: '30%',
    proofStat2Label: 'lower infra spend with ARM &amp; Karpenter',
    proofStat3Value: '6+ yrs',
    proofStat3Label: 'shipping production cloud infrastructure',
    servicePill1: 'Cloud migration',
    servicePill2: 'Kubernetes',
    servicePill3: 'CI/CD &amp; IaC',
    servicePill4: 'Cost &amp; reliability',

    // Services
    servicesKicker: 'What I do',
    servicesHeading: 'Consulting that pays for itself',
    serviceCard1Title: 'Cloud migration',
    serviceCard1Body:
      "Get onto AWS or GCP without a scary big-bang weekend. We move what's worth moving, skip what isn't, and keep everything running while we do it.",
    serviceCard2Title: 'Kubernetes',
    serviceCard2Body:
      "Kubernetes — but only if you actually need it. Set up to grow when traffic spikes and shrink (with the bill) when it doesn't, minus the thousands of lines of YAML nobody understands.",
    serviceCard3Title: 'Cost &amp; reliability',
    serviceCard3Body:
      'Find the line items quietly draining your budget and cut them — then make deploys boring enough that nobody gets paged at 3am. Boring beats clever.',
    serviceCard4Title: 'CI/CD &amp; IaC',
    serviceCard4Body:
      'Make shipping a non-event: you push, it deploys, everyone moves on. The whole setup lives in Terraform — reviewed, versioned, and rebuildable from scratch.',
    roadEndText:
      'Where this leads: infrastructure you can stop thinking about — so your team gets back to building the product, not babysitting servers.',
    servicesMoreLead: 'Beyond ops, I also ',
    servicesMoreArchitecture: 'review architecture',
    servicesMoreAudit: ' audit AI-built apps',
    servicesMoreIdea: ' take ideas to production',
    servicesMoreAll: 'See all services →',

    // Process
    processKicker: 'How it works',
    processHeading: 'From first call to production',
    step1Title: 'Audit',
    step1Body:
      'A free call and a look at your stack. I find the quick wins and the real risks — no jargon, no upsell.',
    step2Title: 'Plan',
    step2Body:
      'A clear, prioritized roadmap with effort, cost, and expected impact. You decide what gets done and when.',
    step3Title: 'Ship',
    step3Body:
      'I implement alongside your team, document everything, and leave you able to run it without me.',

    // Flagship / side project
    flagshipKicker: 'On the side',
    flagshipHeading: "When I'm not running infra, I'm building Chatter",
    flagshipLead:
      "Chatter is a privacy-first encrypted messenger I'm building on the side — one Rust client (Slint) that runs on Linux, Windows, and Android today, with iOS and macOS planned, on a Go backend with Signal Protocol end-to-end encryption. It's still in development, but it's how I stay hands-on across the whole stack, from cryptography to deployment.",
    flagshipStat1Value: '1',
    flagshipStat1Label: ' codebase',
    flagshipStat2Value: 'Go',
    flagshipStat2Label: ' backend',
    flagshipStat3Value: 'Rust',
    flagshipStat3Label: ' client',
    flagshipStat4Value: 'Signal',
    flagshipStat4Label: ' E2E',
    flagshipStat5Value: 'In',
    flagshipStat5Label: ' development',
    flagshipMoreCta: 'More on Chatter →',
    flagshipAllProjects: 'All projects →',

    // About
    aboutKicker: "Who you'd work with",
    aboutHeading: "Hi, I'm Alexandru",
    aboutBody:
      "I'm a DevOps engineer with 6+ years shipping cloud infrastructure on AWS, Kubernetes, and Terraform — that's the day job, and the main spin. On the side I build Chatter, an encrypted messenger, from one cross-platform codebase — which keeps me hands-on across the whole stack. So I can also review your architecture, de-risk an AI-built app, or help take an idea to shipped. Either way, I care about boring, reliable systems and explain the trade-offs in plain language, not buzzwords.",

    // FAQ
    faqKicker: 'Questions',
    faqHeading: 'Before you book a call',
    faq1Q: 'What does a DevOps consultant actually do for my team?',
    faq1A:
      "I find what's slow, expensive, or fragile in your infrastructure and fix it — then set things up so your own team can run it after I leave. The goal is to make myself unnecessary, not to lock you into me.",
    faq2Q: 'Will migrating to the cloud cause downtime?',
    faq2A:
      'No scary big-bang weekend. We move one piece at a time, keep production running the whole way, and roll back the moment anything looks off. Most migrations finish without users noticing.',
    faq3Q: 'Do I actually need Kubernetes?',
    faq3A:
      "Honestly, often not. If a handful of containers or managed services do the job, that's what you get. Kubernetes only goes in when your scale or complexity actually earns the extra moving parts.",
    faq4Q: 'How do you charge?',
    faq4A:
      'It starts with a free call and a look at your stack. From there you get a fixed-scope proposal or a day rate — your choice. You approve the plan and the cost before any work begins.',
    faq5Q: 'How soon can we start, and do you work with my existing team?',
    faq5A:
      'Usually within a week or two. I work alongside your engineers rather than over them, document everything as I go, and hand it over so nothing depends on me being around.',

    // Final CTA band
    ctaBandHeading: 'Ready to cut your cloud bill?',
    ctaBandBody:
      "Book a free 30-minute call. We'll find the quickest wins in your infrastructure — no commitment.",

    // Featured posts (section header only; the post loop stays dynamic)
    latestPosts: 'Latest Posts',
    viewAllPosts: 'View all posts →',
  },
  de: {
    meta: {
      title: 'DevOps- & Cloud-Beratung',
      description:
        'DevOps- und Kubernetes-Beratung: Ich senke Ihre Cloud-Kosten (Kostenoptimierung), begleite Ihre Cloud-Migration und beende 3-Uhr-Alarme mit AWS, Kubernetes und Zero-Downtime-Deployments. Plus Architektur- und KI-App-Audits.',
    },

    heroKicker: 'DevOps- &amp; Cloud-Beratung',
    heroTitleA: 'Senken Sie Ihre Cloud-Kosten.',
    heroTitleB: 'Schluss mit den 3&#8209;Uhr&#8209;Weckrufen.',
    heroSubhead:
      'Ich mache Produktion schnell, günstig und langweilig — AWS, Kubernetes und Zero-Downtime-Deployments, die nachts&nbsp;niemanden&nbsp;wecken.',
    ctaBookCall: 'Kostenloses Erstgespräch buchen',
    ctaNote: '30 Minuten · unverbindlich',
    proofStat1Value: '5×',
    proofStat1Label: 'kleinere Payloads mit Protocol Buffers',
    proofStat2Value: '30%',
    proofStat2Label: 'weniger Infrastrukturkosten mit ARM &amp; Karpenter',
    proofStat3Value: '6+ Jahre',
    proofStat3Label: 'Cloud-Infrastruktur in Produktion ausgeliefert',
    servicePill1: 'Cloud-Migration',
    servicePill2: 'Kubernetes',
    servicePill3: 'CI/CD &amp; IaC',
    servicePill4: 'Kosten &amp; Zuverlässigkeit',

    servicesKicker: 'Was ich mache',
    servicesHeading: 'Beratung, die sich selbst bezahlt macht',
    serviceCard1Title: 'Cloud-Migration',
    serviceCard1Body:
      'Auf AWS oder GCP umziehen — ohne riskantes Big-Bang-Wochenende. Wir verlagern, was sich lohnt, lassen den Rest weg und halten alles am Laufen, während wir es tun.',
    serviceCard2Title: 'Kubernetes',
    serviceCard2Body:
      'Kubernetes — aber nur, wenn Sie es wirklich brauchen. So aufgesetzt, dass es bei Lastspitzen mitwächst und (samt Rechnung) wieder schrumpft, wenn nicht — ohne die tausenden Zeilen YAML, die keiner versteht.',
    serviceCard3Title: 'Kosten &amp; Zuverlässigkeit',
    serviceCard3Body:
      'Die Posten finden, die still Ihr Budget auffressen, und sie streichen — und dann Deployments so langweilig machen, dass niemand um 3 Uhr nachts geweckt wird. Langweilig schlägt clever.',
    serviceCard4Title: 'CI/CD &amp; IaC',
    serviceCard4Body:
      'Releases zum Nicht-Ereignis machen: Sie pushen, es deployt, alle machen weiter. Das ganze Setup lebt in Terraform — reviewt, versioniert und von Grund auf neu aufbaubar.',
    roadEndText:
      'Wohin das führt: Infrastruktur, über die Sie nicht mehr nachdenken müssen — damit Ihr Team wieder das Produkt baut, statt Server zu hüten.',
    servicesMoreLead: 'Über den Betrieb hinaus kann ich auch ',
    servicesMoreArchitecture: 'Architektur prüfen',
    servicesMoreAudit: ' KI-Apps auditieren',
    servicesMoreIdea: ' Ideen in Produktion bringen',
    servicesMoreAll: 'Alle Leistungen ansehen →',

    processKicker: 'So läuft es ab',
    processHeading: 'Vom ersten Gespräch bis in die Produktion',
    step1Title: 'Analyse',
    step1Body:
      'Ein kostenloses Gespräch und ein Blick auf Ihren Stack. Ich finde die schnellen Erfolge und die echten Risiken — kein Fachchinesisch, kein Upselling.',
    step2Title: 'Plan',
    step2Body:
      'Eine klare, priorisierte Roadmap mit Aufwand, Kosten und erwarteter Wirkung. Sie entscheiden, was wann umgesetzt wird.',
    step3Title: 'Umsetzen',
    step3Body:
      'Ich setze gemeinsam mit Ihrem Team um, dokumentiere alles und versetze Sie in die Lage, es ohne mich zu betreiben.',

    flagshipKicker: 'Nebenbei',
    flagshipHeading: 'Wenn ich nicht Infrastruktur betreibe, baue ich Chatter',
    flagshipLead:
      'Chatter ist ein Privacy-First-Messenger mit Ende-zu-Ende-Verschlüsselung, den ich nebenbei entwickle — ein Rust-Client (Slint), der heute auf Linux, Windows und Android läuft, mit iOS und macOS in Planung, auf einem Go-Backend mit Signal-Protocol-Ende-zu-Ende-Verschlüsselung. Es ist noch in Entwicklung, aber so bleibe ich über den gesamten Stack hinweg praktisch am Ball — von der Kryptografie bis zum Deployment.',
    flagshipStat1Value: '1',
    flagshipStat1Label: ' Codebase',
    flagshipStat2Value: 'Go',
    flagshipStat2Label: ' Backend',
    flagshipStat3Value: 'Rust',
    flagshipStat3Label: ' Client',
    flagshipStat4Value: 'Signal',
    flagshipStat4Label: ' E2E',
    flagshipStat5Value: 'In',
    flagshipStat5Label: ' Entwicklung',
    flagshipMoreCta: 'Mehr über Chatter →',
    flagshipAllProjects: 'Alle Projekte →',

    aboutKicker: 'Mit wem Sie arbeiten',
    aboutHeading: 'Hallo, ich bin Alexandru',
    aboutBody:
      'Ich bin DevOps-Engineer mit über 6 Jahren Erfahrung im Ausliefern von Cloud-Infrastruktur auf AWS, Kubernetes und Terraform — das ist der Hauptjob und der Schwerpunkt. Nebenbei baue ich Chatter, einen verschlüsselten Messenger, aus einer plattformübergreifenden Codebase — was mich über den gesamten Stack praktisch hält. So kann ich auch Ihre Architektur prüfen, eine KI-gebaute App absichern oder helfen, eine Idee bis zur Auslieferung zu bringen. In jedem Fall lege ich Wert auf langweilige, zuverlässige Systeme und erkläre die Kompromisse in klarer Sprache statt in Buzzwords.',

    faqKicker: 'Fragen',
    faqHeading: 'Bevor Sie ein Gespräch buchen',
    faq1Q: 'Was macht ein DevOps-Berater eigentlich für mein Team?',
    faq1A:
      'Ich finde, was in Ihrer Infrastruktur langsam, teuer oder fragil ist, und behebe es — und richte dann alles so ein, dass Ihr eigenes Team es nach meinem Weggang betreiben kann. Das Ziel ist, mich überflüssig zu machen, nicht Sie an mich zu binden.',
    faq2Q: 'Führt die Migration in die Cloud zu Ausfallzeiten?',
    faq2A:
      'Kein riskantes Big-Bang-Wochenende. Wir verlagern Stück für Stück, halten die Produktion durchgehend am Laufen und rollen sofort zurück, sobald etwas komisch aussieht. Die meisten Migrationen laufen durch, ohne dass Nutzer etwas merken.',
    faq3Q: 'Brauche ich wirklich Kubernetes?',
    faq3A:
      'Ehrlich gesagt oft nicht. Wenn eine Handvoll Container oder Managed Services den Job erledigen, bekommen Sie genau das. Kubernetes kommt nur ins Spiel, wenn Ihre Größe oder Komplexität die zusätzlichen beweglichen Teile wirklich rechtfertigt.',
    faq4Q: 'Wie rechnen Sie ab?',
    faq4A:
      'Es beginnt mit einem kostenlosen Gespräch und einem Blick auf Ihren Stack. Danach erhalten Sie ein Angebot mit festem Umfang oder einen Tagessatz — Ihre Wahl. Sie genehmigen Plan und Kosten, bevor die Arbeit beginnt.',
    faq5Q: 'Wie schnell können wir starten, und arbeiten Sie mit meinem bestehenden Team?',
    faq5A:
      'Meist innerhalb von ein bis zwei Wochen. Ich arbeite mit Ihren Entwicklern zusammen, nicht über sie hinweg, dokumentiere alles unterwegs und übergebe so, dass nichts von meiner Anwesenheit abhängt.',

    ctaBandHeading: 'Bereit, Ihre Cloud-Kosten zu senken?',
    ctaBandBody:
      'Buchen Sie ein kostenloses 30-minütiges Gespräch. Wir finden die schnellsten Erfolge in Ihrer Infrastruktur — ganz unverbindlich.',

    latestPosts: 'Neueste Beiträge',
    viewAllPosts: 'Alle Beiträge ansehen →',
  },
  es: {
    meta: {
      title: 'Consultor DevOps y Cloud',
      description:
        'Consultoría DevOps y consultor Kubernetes: reduzco tu factura de la nube y elimino las alertas de las 3 a.m. con AWS, Kubernetes y despliegues sin downtime. Migración a la nube, revisión de arquitectura y auditorías de apps con IA.',
    },

    heroKicker: 'Consultoría DevOps &amp; Cloud',
    heroTitleA: 'Reduce tu factura de la nube.',
    heroTitleB: 'Acaba con las llamadas de las 3&#8209;a.&#8209;m.',
    heroSubhead:
      'Hago que la producción sea rápida, barata y aburrida — AWS, Kubernetes y despliegues sin downtime que no despiertan&nbsp;a&nbsp;nadie.',
    ctaBookCall: 'Reserva una llamada gratuita',
    ctaNote: '30 minutos · sin compromiso',
    proofStat1Value: '5×',
    proofStat1Label: 'payloads más pequeños con Protocol Buffers',
    proofStat2Value: '30%',
    proofStat2Label: 'menos gasto en infraestructura con ARM &amp; Karpenter',
    proofStat3Value: '6+ años',
    proofStat3Label: 'desplegando infraestructura cloud en producción',
    servicePill1: 'Migración a la nube',
    servicePill2: 'Kubernetes',
    servicePill3: 'CI/CD &amp; IaC',
    servicePill4: 'Costes &amp; fiabilidad',

    servicesKicker: 'Qué hago',
    servicesHeading: 'Consultoría que se paga sola',
    serviceCard1Title: 'Migración a la nube',
    serviceCard1Body:
      'Múdate a AWS o GCP sin un temible fin de semana de big bang. Movemos lo que vale la pena mover, dejamos lo que no, y mantenemos todo funcionando mientras lo hacemos.',
    serviceCard2Title: 'Kubernetes',
    serviceCard2Body:
      'Kubernetes — pero solo si de verdad lo necesitas. Configurado para crecer cuando el tráfico se dispara y encogerse (junto con la factura) cuando no, sin las miles de líneas de YAML que nadie entiende.',
    serviceCard3Title: 'Costes &amp; fiabilidad',
    serviceCard3Body:
      'Encontrar las partidas que drenan tu presupuesto en silencio y eliminarlas — y luego hacer los despliegues tan aburridos que nadie reciba una alerta a las 3 de la madrugada. Lo aburrido gana a lo ingenioso.',
    serviceCard4Title: 'CI/CD &amp; IaC',
    serviceCard4Body:
      'Convierte cada release en un no-evento: haces push, se despliega, todos siguen a lo suyo. Todo el setup vive en Terraform — revisado, versionado y reconstruible desde cero.',
    roadEndText:
      'A dónde lleva esto: una infraestructura en la que puedes dejar de pensar — para que tu equipo vuelva a construir el producto, no a cuidar servidores.',
    servicesMoreLead: 'Más allá de las ops, también puedo ',
    servicesMoreArchitecture: 'revisar arquitecturas',
    servicesMoreAudit: ' auditar apps hechas con IA',
    servicesMoreIdea: ' llevar ideas a producción',
    servicesMoreAll: 'Ver todos los servicios →',

    processKicker: 'Cómo funciona',
    processHeading: 'De la primera llamada a producción',
    step1Title: 'Auditoría',
    step1Body:
      'Una llamada gratuita y un vistazo a tu stack. Encuentro las victorias rápidas y los riesgos reales — sin jerga, sin ventas de más.',
    step2Title: 'Plan',
    step2Body:
      'Una hoja de ruta clara y priorizada con esfuerzo, coste e impacto esperado. Tú decides qué se hace y cuándo.',
    step3Title: 'Entregar',
    step3Body:
      'Implemento junto a tu equipo, documento todo y te dejo capaz de operarlo sin mí.',

    flagshipKicker: 'En paralelo',
    flagshipHeading: 'Cuando no gestiono infraestructura, construyo Chatter',
    flagshipLead:
      'Chatter es un mensajero cifrado y centrado en la privacidad que construyo en paralelo — un único cliente en Rust (Slint) que hoy funciona en Linux, Windows y Android, con iOS y macOS previstos, sobre un backend en Go con cifrado de extremo a extremo mediante Signal Protocol. Todavía está en desarrollo, pero es como me mantengo manos a la obra en todo el stack, de la criptografía al despliegue.',
    flagshipStat1Value: '1',
    flagshipStat1Label: ' base de código',
    flagshipStat2Value: 'Go',
    flagshipStat2Label: ' backend',
    flagshipStat3Value: 'Rust',
    flagshipStat3Label: ' cliente',
    flagshipStat4Value: 'Signal',
    flagshipStat4Label: ' E2E',
    flagshipStat5Value: 'En',
    flagshipStat5Label: ' desarrollo',
    flagshipMoreCta: 'Más sobre Chatter →',
    flagshipAllProjects: 'Todos los proyectos →',

    aboutKicker: 'Con quién trabajarías',
    aboutHeading: 'Hola, soy Alexandru',
    aboutBody:
      'Soy ingeniero DevOps con más de 6 años desplegando infraestructura cloud en AWS, Kubernetes y Terraform — ese es el trabajo principal y el foco. En paralelo construyo Chatter, un mensajero cifrado, desde una única base de código multiplataforma — lo que me mantiene manos a la obra en todo el stack. Así también puedo revisar tu arquitectura, reducir el riesgo de una app hecha con IA o ayudar a llevar una idea hasta producción. En cualquier caso, me importan los sistemas aburridos y fiables, y explico los compromisos en lenguaje claro, no en palabras de moda.',

    faqKicker: 'Preguntas',
    faqHeading: 'Antes de reservar una llamada',
    faq1Q: '¿Qué hace realmente un consultor DevOps por mi equipo?',
    faq1A:
      'Encuentro lo que es lento, caro o frágil en tu infraestructura y lo arreglo — y luego lo dejo montado para que tu propio equipo pueda operarlo cuando me vaya. El objetivo es hacerme innecesario, no atarte a mí.',
    faq2Q: '¿Migrar a la nube causará downtime?',
    faq2A:
      'Nada de temibles fines de semana de big bang. Movemos una pieza a la vez, mantenemos la producción funcionando todo el tiempo y revertimos en cuanto algo pinta mal. La mayoría de las migraciones terminan sin que los usuarios lo noten.',
    faq3Q: '¿De verdad necesito Kubernetes?',
    faq3A:
      'Sinceramente, a menudo no. Si un puñado de contenedores o servicios gestionados hacen el trabajo, eso es lo que tendrás. Kubernetes solo entra cuando tu escala o complejidad justifican de verdad las piezas móviles extra.',
    faq4Q: '¿Cómo cobras?',
    faq4A:
      'Empieza con una llamada gratuita y un vistazo a tu stack. A partir de ahí recibes una propuesta de alcance cerrado o una tarifa por día — tú eliges. Apruebas el plan y el coste antes de empezar cualquier trabajo.',
    faq5Q: '¿En cuánto tiempo podemos empezar y trabajas con mi equipo actual?',
    faq5A:
      'Normalmente en una o dos semanas. Trabajo junto a tus ingenieros, no por encima de ellos, documento todo sobre la marcha y hago el traspaso para que nada dependa de que yo esté.',

    ctaBandHeading: '¿Listo para reducir tu factura de la nube?',
    ctaBandBody:
      'Reserva una llamada gratuita de 30 minutos. Encontraremos las victorias más rápidas en tu infraestructura — sin compromiso.',

    latestPosts: 'Últimas entradas',
    viewAllPosts: 'Ver todas las entradas →',
  },
  pt: {
    meta: {
      title: 'Consultor DevOps e Cloud',
      description:
        'Consultoria DevOps: reduzo sua conta de nuvem e acabo com os alertas das 3h da manhã com AWS, Kubernetes e deploys sem downtime. Migração para nuvem, otimização de custos, revisão de arquitetura e auditoria de apps com IA.',
    },

    heroKicker: 'Consultoria DevOps &amp; Cloud',
    heroTitleA: 'Reduza sua conta de nuvem.',
    heroTitleB: 'Acabe com os alertas das 3&#8209;da&#8209;manhã.',
    heroSubhead:
      'Deixo a produção rápida, barata e sem graça — AWS, Kubernetes e deploys sem downtime que não acordam&nbsp;ninguém.',
    ctaBookCall: 'Agende uma conversa inicial gratuita',
    ctaNote: '30 minutos · sem compromisso',
    proofStat1Value: '5×',
    proofStat1Label: 'payloads menores com Protocol Buffers',
    proofStat2Value: '30%',
    proofStat2Label: 'menos gasto com infraestrutura usando ARM &amp; Karpenter',
    proofStat3Value: '6+ anos',
    proofStat3Label: 'entregando infraestrutura cloud em produção',
    servicePill1: 'Migração para nuvem',
    servicePill2: 'Kubernetes',
    servicePill3: 'CI/CD &amp; IaC',
    servicePill4: 'Custos &amp; confiabilidade',

    servicesKicker: 'O que eu faço',
    servicesHeading: 'Consultoria que se paga sozinha',
    serviceCard1Title: 'Migração para nuvem',
    serviceCard1Body:
      'Vá para a AWS ou GCP sem um fim de semana de big bang assustador. Movemos o que vale a pena mover, deixamos de fora o que não vale e mantemos tudo funcionando enquanto isso.',
    serviceCard2Title: 'Kubernetes',
    serviceCard2Body:
      'Kubernetes — mas só se você realmente precisar. Configurado para crescer quando o tráfego dispara e encolher (junto com a conta) quando não, sem as milhares de linhas de YAML que ninguém entende.',
    serviceCard3Title: 'Custos &amp; confiabilidade',
    serviceCard3Body:
      'Encontrar os itens que drenam seu orçamento em silêncio e cortá-los — e então deixar os deploys sem graça o suficiente para ninguém ser acionado às 3 da manhã. Sem graça vence esperto.',
    serviceCard4Title: 'CI/CD &amp; IaC',
    serviceCard4Body:
      'Transforme cada release em um não-evento: você faz o push, o deploy acontece, todos seguem em frente. Toda a configuração vive no Terraform — revisada, versionada e reconstruível do zero.',
    roadEndText:
      'Aonde isso leva: uma infraestrutura em que você pode parar de pensar — para o seu time voltar a construir o produto, não a cuidar de servidores.',
    servicesMoreLead: 'Além do ops, também posso ',
    servicesMoreArchitecture: 'revisar arquiteturas',
    servicesMoreAudit: ' auditar apps feitos com IA',
    servicesMoreIdea: ' levar ideias à produção',
    servicesMoreAll: 'Ver todos os serviços →',

    processKicker: 'Como funciona',
    processHeading: 'Da primeira conversa à produção',
    step1Title: 'Diagnóstico',
    step1Body:
      'Uma conversa gratuita e uma olhada no seu stack. Encontro os ganhos rápidos e os riscos reais — sem jargão, sem empurrar serviço.',
    step2Title: 'Plano',
    step2Body:
      'Um roteiro claro e priorizado com esforço, custo e impacto esperado. Você decide o que é feito e quando.',
    step3Title: 'Entregar',
    step3Body:
      'Implemento junto com o seu time, documento tudo e deixo você capaz de tocar sem mim.',

    flagshipKicker: 'Nas horas vagas',
    flagshipHeading: 'Quando não estou cuidando de infra, estou construindo o Chatter',
    flagshipLead:
      'O Chatter é um mensageiro criptografado e focado em privacidade que construo nas horas vagas — um único cliente em Rust (Slint) que hoje roda no Linux, Windows e Android, com iOS e macOS planejados, sobre um backend em Go com criptografia de ponta a ponta via Signal Protocol. Ainda está em desenvolvimento, mas é assim que fico com a mão na massa em todo o stack, da criptografia ao deploy.',
    flagshipStat1Value: '1',
    flagshipStat1Label: ' base de código',
    flagshipStat2Value: 'Go',
    flagshipStat2Label: ' backend',
    flagshipStat3Value: 'Rust',
    flagshipStat3Label: ' cliente',
    flagshipStat4Value: 'Signal',
    flagshipStat4Label: ' E2E',
    flagshipStat5Value: 'Em',
    flagshipStat5Label: ' desenvolvimento',
    flagshipMoreCta: 'Mais sobre o Chatter →',
    flagshipAllProjects: 'Todos os projetos →',

    aboutKicker: 'Com quem você vai trabalhar',
    aboutHeading: 'Oi, eu sou o Alexandru',
    aboutBody:
      'Sou engenheiro DevOps com mais de 6 anos entregando infraestrutura cloud na AWS, Kubernetes e Terraform — esse é o trabalho principal e o foco. Nas horas vagas construo o Chatter, um mensageiro criptografado, a partir de uma única base de código multiplataforma — o que me mantém com a mão na massa em todo o stack. Assim também posso revisar sua arquitetura, reduzir o risco de um app feito com IA ou ajudar a levar uma ideia até a produção. De qualquer forma, me importo com sistemas sem graça e confiáveis, e explico os trade-offs em linguagem clara, não em jargões da moda.',

    faqKicker: 'Perguntas',
    faqHeading: 'Antes de agendar uma conversa',
    faq1Q: 'O que um consultor DevOps faz de verdade pelo meu time?',
    faq1A:
      'Encontro o que está lento, caro ou frágil na sua infraestrutura e conserto — e deixo tudo montado para o seu próprio time tocar depois que eu sair. O objetivo é me tornar desnecessário, não prender você a mim.',
    faq2Q: 'Migrar para a nuvem vai causar downtime?',
    faq2A:
      'Nada de fim de semana de big bang assustador. Movemos uma peça de cada vez, mantemos a produção rodando o tempo todo e revertemos assim que algo parece errado. A maioria das migrações termina sem os usuários perceberem.',
    faq3Q: 'Eu realmente preciso de Kubernetes?',
    faq3A:
      'Sinceramente, muitas vezes não. Se um punhado de contêineres ou serviços gerenciados dá conta, é isso que você recebe. Kubernetes só entra quando sua escala ou complexidade realmente justificam as peças móveis a mais.',
    faq4Q: 'Como você cobra?',
    faq4A:
      'Começa com uma conversa gratuita e uma olhada no seu stack. A partir daí você recebe uma proposta de escopo fechado ou uma diária — você escolhe. Você aprova o plano e o custo antes de qualquer trabalho começar.',
    faq5Q: 'Em quanto tempo podemos começar e você trabalha com meu time atual?',
    faq5A:
      'Normalmente em uma ou duas semanas. Trabalho ao lado dos seus engenheiros, não por cima deles, documento tudo no caminho e faço a passagem para que nada dependa da minha presença.',

    ctaBandHeading: 'Pronto para reduzir sua conta de nuvem?',
    ctaBandBody:
      'Agende uma conversa gratuita de 30 minutos. Vamos encontrar os ganhos mais rápidos na sua infraestrutura — sem compromisso.',

    latestPosts: 'Últimos posts',
    viewAllPosts: 'Ver todos os posts →',
  },
  fr: {
    meta: {
      title: 'Consultant DevOps et Cloud',
      description:
        "Conseil DevOps et consultant Kubernetes : je réduis votre facture cloud et j'élimine les alertes de 3h du matin avec AWS, Kubernetes et des déploiements sans interruption. Migration cloud, revue d'architecture et audits d'applications IA.",
    },

    heroKicker: 'Conseil DevOps &amp; Cloud',
    heroTitleA: 'Réduisez votre facture cloud.',
    heroTitleB: 'Finies les alertes de 3&#8209;h&#8209;du&#8209;matin.',
    heroSubhead:
      'Je rends la production rapide, économique et ennuyeuse — AWS, Kubernetes et des déploiements sans interruption qui ne réveillent&nbsp;personne.',
    ctaBookCall: 'Réservez un appel découverte gratuit',
    ctaNote: '30 minutes · sans engagement',
    proofStat1Value: '5×',
    proofStat1Label: 'charges utiles plus légères avec Protocol Buffers',
    proofStat2Value: '30%',
    proofStat2Label: 'de dépenses infra en moins avec ARM &amp; Karpenter',
    proofStat3Value: '6+ ans',
    proofStat3Label: "à livrer de l'infrastructure cloud en production",
    servicePill1: 'Migration cloud',
    servicePill2: 'Kubernetes',
    servicePill3: 'CI/CD &amp; IaC',
    servicePill4: 'Coûts &amp; fiabilité',

    servicesKicker: 'Ce que je fais',
    servicesHeading: 'Un conseil qui se rentabilise',
    serviceCard1Title: 'Migration cloud',
    serviceCard1Body:
      "Passez à AWS ou GCP sans week-end big-bang stressant. On déplace ce qui vaut la peine de l'être, on laisse le reste et on garde tout en marche pendant l'opération.",
    serviceCard2Title: 'Kubernetes',
    serviceCard2Body:
      "Kubernetes — mais seulement si vous en avez vraiment besoin. Configuré pour grandir quand le trafic explose et se réduire (facture comprise) quand ce n'est pas le cas, sans les milliers de lignes de YAML que personne ne comprend.",
    serviceCard3Title: 'Coûts &amp; fiabilité',
    serviceCard3Body:
      "Repérer les postes qui vident discrètement votre budget et les supprimer — puis rendre les déploiements assez ennuyeux pour que personne ne soit réveillé à 3h du matin. L'ennuyeux bat l'astucieux.",
    serviceCard4Title: 'CI/CD &amp; IaC',
    serviceCard4Body:
      "Faites de chaque mise en production un non-événement : vous poussez, ça se déploie, tout le monde passe à autre chose. Toute la configuration vit dans Terraform — relue, versionnée et reconstructible de zéro.",
    roadEndText:
      "Où cela mène : une infrastructure à laquelle vous pouvez arrêter de penser — pour que votre équipe reprenne la construction du produit, au lieu de veiller sur des serveurs.",
    servicesMoreLead: "Au-delà de l'ops, je peux aussi ",
    servicesMoreArchitecture: 'relire des architectures',
    servicesMoreAudit: ' auditer des applications conçues par IA',
    servicesMoreIdea: " mener des idées jusqu'en production",
    servicesMoreAll: 'Voir tous les services →',

    processKicker: 'Comment ça marche',
    processHeading: 'Du premier appel à la production',
    step1Title: 'Audit',
    step1Body:
      "Un appel gratuit et un coup d'œil à votre stack. Je repère les gains rapides et les vrais risques — sans jargon, sans vente forcée.",
    step2Title: 'Plan',
    step2Body:
      'Une feuille de route claire et priorisée, avec effort, coût et impact attendu. Vous décidez de ce qui est fait et quand.',
    step3Title: 'Livrer',
    step3Body:
      'Je mets en œuvre aux côtés de votre équipe, je documente tout et je vous laisse capable de le faire tourner sans moi.',

    flagshipKicker: 'En parallèle',
    flagshipHeading: "Quand je ne gère pas d'infra, je construis Chatter",
    flagshipLead:
      "Chatter est une messagerie chiffrée et respectueuse de la vie privée que je développe en parallèle — un seul client Rust (Slint) qui tourne aujourd'hui sur Linux, Windows et Android, avec iOS et macOS prévus, sur un backend Go avec un chiffrement de bout en bout via Signal Protocol. C'est encore en développement, mais c'est ainsi que je reste au contact de tout le stack, de la cryptographie au déploiement.",
    flagshipStat1Value: '1',
    flagshipStat1Label: ' base de code',
    flagshipStat2Value: 'Go',
    flagshipStat2Label: ' backend',
    flagshipStat3Value: 'Rust',
    flagshipStat3Label: ' client',
    flagshipStat4Value: 'Signal',
    flagshipStat4Label: ' E2E',
    flagshipStat5Value: 'En',
    flagshipStat5Label: ' développement',
    flagshipMoreCta: 'En savoir plus sur Chatter →',
    flagshipAllProjects: 'Tous les projets →',

    aboutKicker: 'Avec qui vous travailleriez',
    aboutHeading: 'Bonjour, je suis Alexandru',
    aboutBody:
      "Je suis ingénieur DevOps avec plus de 6 ans à livrer de l'infrastructure cloud sur AWS, Kubernetes et Terraform — c'est le métier principal et l'axe central. En parallèle, je construis Chatter, une messagerie chiffrée, à partir d'une seule base de code multiplateforme — ce qui me garde au contact de tout le stack. Je peux donc aussi relire votre architecture, sécuriser une application conçue par IA ou aider à mener une idée jusqu'à sa mise en production. Dans tous les cas, je tiens aux systèmes ennuyeux et fiables, et j'explique les compromis en langage clair, pas en mots à la mode.",

    faqKicker: 'Questions',
    faqHeading: 'Avant de réserver un appel',
    faq1Q: 'Que fait concrètement un consultant DevOps pour mon équipe ?',
    faq1A:
      "Je repère ce qui est lent, coûteux ou fragile dans votre infrastructure et je le corrige — puis je mets tout en place pour que votre propre équipe puisse l'exploiter après mon départ. Le but est de me rendre inutile, pas de vous rendre dépendant de moi.",
    faq2Q: 'La migration vers le cloud va-t-elle provoquer une interruption ?',
    faq2A:
      "Pas de week-end big-bang stressant. On déplace une pièce à la fois, on garde la production en marche tout du long et on revient en arrière dès que quelque chose semble anormal. La plupart des migrations se terminent sans que les utilisateurs s'en aperçoivent.",
    faq3Q: 'Ai-je vraiment besoin de Kubernetes ?',
    faq3A:
      "Honnêtement, souvent non. Si une poignée de conteneurs ou de services managés suffit, c'est ce que vous obtenez. Kubernetes n'entre en jeu que lorsque votre échelle ou votre complexité justifient vraiment les rouages supplémentaires.",
    faq4Q: 'Comment facturez-vous ?',
    faq4A:
      "Tout commence par un appel gratuit et un coup d'œil à votre stack. Ensuite, vous recevez une proposition à périmètre fixe ou un tarif journalier — à vous de choisir. Vous validez le plan et le coût avant que le moindre travail ne commence.",
    faq5Q: 'Sous combien de temps peut-on démarrer, et travaillez-vous avec mon équipe actuelle ?',
    faq5A:
      "En général sous une à deux semaines. Je travaille aux côtés de vos ingénieurs, pas au-dessus d'eux, je documente tout au fur et à mesure et je transmets pour que rien ne dépende de ma présence.",

    ctaBandHeading: 'Prêt à réduire votre facture cloud ?',
    ctaBandBody:
      "Réservez un appel gratuit de 30 minutes. Nous trouverons les gains les plus rapides dans votre infrastructure — sans engagement.",

    latestPosts: 'Derniers articles',
    viewAllPosts: 'Voir tous les articles →',
  },
  ro: {
    meta: {
      title: 'Consultant DevOps și cloud',
      description:
        'Consultant DevOps și cloud: reduc facturile cloud și pun capăt alertelor de la 3 dimineața cu AWS, Kubernetes și deploy-uri fără downtime. Plus analiză de arhitectură și audit de aplicații create cu IA.',
    },

    heroKicker: 'Consultanță DevOps &amp; cloud',
    heroTitleA: 'Reduceți factura cloud.',
    heroTitleB: 'Gata cu trezitul la 3&#8209;dimineața.',
    heroSubhead:
      'Fac producția rapidă, ieftină și fără surprize — AWS, Kubernetes și deploy-uri fără downtime care nu trezesc&nbsp;pe&nbsp;nimeni.',
    ctaBookCall: 'Programați o discuție gratuită de evaluare',
    ctaNote: '30 de minute · fără obligații',
    proofStat1Value: '5×',
    proofStat1Label: 'payload-uri mai mici cu Protocol Buffers',
    proofStat2Value: '30%',
    proofStat2Label: 'costuri de infrastructură mai mici cu ARM &amp; Karpenter',
    proofStat3Value: '6+ ani',
    proofStat3Label: 'livrând infrastructură cloud în producție',
    servicePill1: 'Migrare în cloud',
    servicePill2: 'Kubernetes',
    servicePill3: 'CI/CD &amp; IaC',
    servicePill4: 'Costuri &amp; fiabilitate',

    servicesKicker: 'Ce fac',
    servicesHeading: 'Consultanță care se plătește singură',
    serviceCard1Title: 'Migrare în cloud',
    serviceCard1Body:
      'Ajungeți pe AWS sau GCP fără un weekend riscant de tip big-bang. Mutăm ce merită mutat, lăsăm deoparte ce nu, și menținem totul funcțional în timp ce o facem.',
    serviceCard2Title: 'Kubernetes',
    serviceCard2Body:
      'Kubernetes — dar numai dacă chiar aveți nevoie. Configurat să crească la vârfuri de trafic și să se micșoreze (împreună cu factura) când nu, fără miile de linii de YAML pe care nu le înțelege nimeni.',
    serviceCard3Title: 'Costuri &amp; fiabilitate',
    serviceCard3Body:
      'Găsim liniile de cost care vă golesc discret bugetul și le eliminăm — apoi facem deploy-urile suficient de plictisitoare încât nimeni să nu fie alertat la 3 dimineața. Plictisitor bate ingenios.',
    serviceCard4Title: 'CI/CD &amp; IaC',
    serviceCard4Body:
      'Transformați lansarea într-un non-eveniment: dați push, se face deploy, toată lumea își vede de treabă. Întreaga configurație trăiește în Terraform — revizuită, versionată și reconstruibilă de la zero.',
    roadEndText:
      'Unde duc toate acestea: o infrastructură la care puteți înceta să vă mai gândiți — astfel încât echipa dumneavoastră să revină la construirea produsului, nu la supravegherea serverelor.',
    servicesMoreLead: 'Dincolo de operațiuni, mai și ',
    servicesMoreArchitecture: 'analizez arhitectura',
    servicesMoreAudit: ' auditez aplicații create cu IA',
    servicesMoreIdea: ' duc idei în producție',
    servicesMoreAll: 'Vedeți toate serviciile →',

    processKicker: 'Cum funcționează',
    processHeading: 'De la prima discuție la producție',
    step1Title: 'Analiză',
    step1Body:
      'O discuție gratuită și o privire asupra stack-ului dumneavoastră. Găsesc câștigurile rapide și riscurile reale — fără jargon, fără vânzări forțate.',
    step2Title: 'Plan',
    step2Body:
      'O foaie de parcurs clară și prioritizată, cu efort, cost și impact estimat. Dumneavoastră decideți ce se face și când.',
    step3Title: 'Livrare',
    step3Body:
      'Implementez alături de echipa dumneavoastră, documentez totul și vă las capabili să o operați fără mine.',

    flagshipKicker: 'În paralel',
    flagshipHeading: 'Când nu administrez infrastructură, construiesc Chatter',
    flagshipLead:
      'Chatter este un mesager criptat, axat pe confidențialitate, pe care îl construiesc în paralel — un singur client Rust (Slint) care rulează astăzi pe Linux, Windows și Android, cu iOS și macOS planificate, pe un backend Go cu criptare end-to-end prin Signal Protocol. Este încă în dezvoltare, dar este modul prin care rămân implicat practic în întregul stack, de la criptografie la deployment.',
    flagshipStat1Value: '1',
    flagshipStat1Label: ' bază de cod',
    flagshipStat2Value: 'Go',
    flagshipStat2Label: ' backend',
    flagshipStat3Value: 'Rust',
    flagshipStat3Label: ' client',
    flagshipStat4Value: 'Signal',
    flagshipStat4Label: ' E2E',
    flagshipStat5Value: 'În',
    flagshipStat5Label: ' dezvoltare',
    flagshipMoreCta: 'Mai multe despre Chatter →',
    flagshipAllProjects: 'Toate proiectele →',

    aboutKicker: 'Cu cine ați lucra',
    aboutHeading: 'Bună, sunt Alexandru',
    aboutBody:
      'Sunt inginer DevOps cu peste 6 ani de experiență în livrarea de infrastructură cloud pe AWS, Kubernetes și Terraform — aceasta este activitatea de zi cu zi și axa principală. În paralel construiesc Chatter, un mesager criptat, dintr-o singură bază de cod multiplatformă — ceea ce mă ține implicat practic în întregul stack. Așa că vă pot analiza și arhitectura, reduce riscurile unei aplicații create cu IA sau ajuta la ducerea unei idei până la lansare. În orice caz, îmi pasă de sistemele stabile și fiabile și explic compromisurile într-un limbaj clar, nu în cuvinte la modă.',

    faqKicker: 'Întrebări',
    faqHeading: 'Înainte să programați o discuție',
    faq1Q: 'Ce face de fapt un consultant DevOps pentru echipa mea?',
    faq1A:
      'Găsesc ce este lent, scump sau fragil în infrastructura dumneavoastră și repar — apoi configurez totul astfel încât propria echipă să o poată opera după plecarea mea. Scopul este să mă fac inutil, nu să vă leg de mine.',
    faq2Q: 'Migrarea în cloud va cauza downtime?',
    faq2A:
      'Fără weekenduri riscante de tip big-bang. Mutăm câte o piesă pe rând, menținem producția funcțională pe tot parcursul și revenim în momentul în care ceva pare în neregulă. Cele mai multe migrări se încheie fără ca utilizatorii să observe.',
    faq3Q: 'Am cu adevărat nevoie de Kubernetes?',
    faq3A:
      'Sincer, de multe ori nu. Dacă o mână de containere sau servicii gestionate rezolvă problema, exact asta veți primi. Kubernetes intră în joc doar atunci când scara sau complexitatea dumneavoastră justifică într-adevăr piesele suplimentare.',
    faq4Q: 'Cum tarifați?',
    faq4A:
      'Începe cu o discuție gratuită și o privire asupra stack-ului dumneavoastră. De acolo primiți o propunere cu scop fix sau un tarif pe zi — la alegere. Aprobați planul și costul înainte să înceapă orice lucrare.',
    faq5Q: 'Cât de curând putem începe și lucrați cu echipa mea actuală?',
    faq5A:
      'De obicei în una sau două săptămâni. Lucrez alături de inginerii dumneavoastră, nu peste ei, documentez totul pe parcurs și predau totul astfel încât nimic să nu depindă de prezența mea.',

    ctaBandHeading: 'Gata să reduceți factura cloud?',
    ctaBandBody:
      'Programați o discuție gratuită de 30 de minute. Găsim cele mai rapide câștiguri din infrastructura dumneavoastră — fără angajament.',

    latestPosts: 'Cele mai recente articole',
    viewAllPosts: 'Vedeți toate articolele →',
  },
} as const;

export function getHomeContent(lang: Lang) {
  return { ...home.en, ...home[lang] };
}
