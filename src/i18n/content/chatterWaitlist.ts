// Per-locale content for the CHATTER-WAITLIST landing page:
//   - src/pages/chatter-waitlist.astro (rendered via ChatterWaitlist.astro)
// English is the source of truth and lives in `en` with ALL keys.
// Other locales start empty; translators fill them and missing keys
// fall back to English via getChatterWaitlistContent().
//
// Only human-visible text lives here. The WebGL black-hole shader, canvas
// sizing/animation logic, scroll handlers and all markup structure stay in the
// component. Strings carrying HTML entities (&rarr;, &middot;) are rendered
// with `set:html`; the accent-span in the H1 and the <em> in the statement
// heading stay in the template (scoped styling) with the text split around them.

import type { Lang } from '../ui';

export const chatterWaitlist = {
  en: {
    // <head> meta
    metaTitle: 'Chatter - Private Encrypted Messaging with Metadata Protection',
    metaDescription:
      'End-to-end encrypted messaging that protects your metadata, not just content. No phone number required. Sealed Sender, anonymous inboxes, and local AI. Open source.',

    // Hero
    eyebrow: 'Coming Soon',
    heroH1a: 'Your messages are encrypted.',
    heroH1b: "Your metadata isn't.",
    heroLead:
      'Most secure messengers protect what you say—but leak who you talk to, when, and how often. Chatter protects everything.',
    heroCta: 'View on GitHub',
    formNote: 'Open source. GPL-3.0.',

    // Value props
    value1Title: 'Sealed Sender',
    value1Text: 'Server never sees who sent the message',
    value2Title: 'No Phone Required',
    value2Text: "Just a username. That's it.",
    value3Title: 'Anonymous Inbox',
    value3Text: 'Ephemeral mailboxes defeat traffic analysis',
    value4Title: 'Local AI',
    value4Text: 'Search stays on your device',

    // Big statement
    statementH2a: 'Beyond ',
    statementH2b: 'encryption',
    statementP:
      'Encryption protects your content. We protect your social graph, your communication patterns, your identity. The server knows nothing—by design.',

    // How it works
    how1Title: 'Hide your social graph',
    how1P:
      "Who you talk to is as sensitive as what you say. Sealed Sender ensures the server never knows who sent a message—only the recipient can decrypt the sender's identity.",
    how2Title: 'Defeat traffic analysis',
    how2P:
      'Anonymous inboxes with blind signatures break the correlation between sender and recipient. Your communication patterns stay invisible to everyone—including us.',
    how3Title: 'AI without surveillance',
    how3P:
      'Search and summarize your messages with Ollama. All inference runs locally on your device. Your data never touches our servers or any cloud.',

    // Tech callout
    techTitle: 'Built with Rust and Go',
    techP:
      'Native performance. No Electron. No browser engine. Lightweight with native Wayland support on Linux.',
    techLink: 'Our tech journey &rarr;',
    githubCta: 'View on GitHub',
    license: '100% Open Source &middot; GPL-3.0',
  },
  de: {
    // <head> meta
    metaTitle: 'Chatter - Privater verschlüsselter Messenger mit Metadatenschutz',
    metaDescription:
      'Ende-zu-Ende-verschlüsselter Messenger, der nicht nur Inhalte, sondern auch Ihre Metadaten schützt. Keine Telefonnummer erforderlich. Sealed Sender, anonyme Postfächer und lokale KI. Open Source.',

    // Hero
    eyebrow: 'Demnächst',
    heroH1a: 'Ihre Nachrichten sind verschlüsselt.',
    heroH1b: 'Ihre Metadaten nicht.',
    heroLead:
      'Die meisten sicheren Messenger schützen, was Sie sagen – verraten aber, mit wem Sie sprechen, wann und wie oft. Chatter schützt alles.',
    heroCta: 'Auf GitHub ansehen',
    formNote: 'Open Source. GPL-3.0.',

    // Value props
    value1Title: 'Sealed Sender',
    value1Text: 'Der Server sieht nie, wer die Nachricht gesendet hat',
    value2Title: 'Keine Telefonnummer nötig',
    value2Text: 'Nur ein Benutzername. Mehr nicht.',
    value3Title: 'Anonymes Postfach',
    value3Text: 'Kurzlebige Postfächer vereiteln Verkehrsanalyse',
    value4Title: 'Lokale KI',
    value4Text: 'Die Suche bleibt auf Ihrem Gerät',

    // Big statement
    statementH2a: 'Mehr als ',
    statementH2b: 'Verschlüsselung',
    statementP:
      'Verschlüsselung schützt Ihre Inhalte. Wir schützen Ihren sozialen Graphen, Ihre Kommunikationsmuster, Ihre Identität. Der Server weiß nichts – ganz bewusst.',

    // How it works
    how1Title: 'Verbergen Sie Ihren sozialen Graphen',
    how1P:
      'Mit wem Sie sprechen, ist genauso sensibel wie das, was Sie sagen. Sealed Sender stellt sicher, dass der Server nie erfährt, wer eine Nachricht gesendet hat – nur der Empfänger kann die Identität des Absenders entschlüsseln.',
    how2Title: 'Verkehrsanalyse vereiteln',
    how2P:
      'Anonyme Postfächer mit blinden Signaturen durchbrechen die Verbindung zwischen Absender und Empfänger. Ihre Kommunikationsmuster bleiben für alle unsichtbar – auch für uns.',
    how3Title: 'KI ohne Überwachung',
    how3P:
      'Durchsuchen und fassen Sie Ihre Nachrichten mit Ollama zusammen. Die gesamte Verarbeitung läuft lokal auf Ihrem Gerät. Ihre Daten erreichen nie unsere Server oder irgendeine Cloud.',

    // Tech callout
    techTitle: 'Entwickelt mit Rust und Go',
    techP:
      'Native Leistung. Kein Electron. Keine Browser-Engine. Ressourcenschonend mit nativer Wayland-Unterstützung unter Linux.',
    techLink: 'Unser technischer Weg &rarr;',
    githubCta: 'Auf GitHub ansehen',
    license: '100% Open Source &middot; GPL-3.0',
  },
  es: {
    // <head> meta
    metaTitle: 'Chatter - Mensajería cifrada y privada con protección de metadatos',
    metaDescription:
      'Mensajería con cifrado de extremo a extremo que protege tus metadatos, no solo el contenido. Sin número de teléfono. Sealed Sender, buzones anónimos e IA local. Código abierto.',

    // Hero
    eyebrow: 'Próximamente',
    heroH1a: 'Tus mensajes están cifrados.',
    heroH1b: 'Tus metadatos no.',
    heroLead:
      'La mayoría de los mensajeros seguros protegen lo que dices, pero revelan con quién hablas, cuándo y con qué frecuencia. Chatter lo protege todo.',
    heroCta: 'Ver en GitHub',
    formNote: 'Código abierto. GPL-3.0.',

    // Value props
    value1Title: 'Sealed Sender',
    value1Text: 'El servidor nunca ve quién envió el mensaje',
    value2Title: 'Sin teléfono',
    value2Text: 'Solo un nombre de usuario. Nada más.',
    value3Title: 'Buzón anónimo',
    value3Text: 'Los buzones efímeros frustran el análisis de tráfico',
    value4Title: 'IA local',
    value4Text: 'La búsqueda permanece en tu dispositivo',

    // Big statement
    statementH2a: 'Más allá del ',
    statementH2b: 'cifrado',
    statementP:
      'El cifrado protege tu contenido. Nosotros protegemos tu grafo social, tus patrones de comunicación, tu identidad. El servidor no sabe nada, por diseño.',

    // How it works
    how1Title: 'Oculta tu grafo social',
    how1P:
      'Con quién hablas es tan sensible como lo que dices. Sealed Sender garantiza que el servidor nunca sepa quién envió un mensaje: solo el destinatario puede descifrar la identidad del remitente.',
    how2Title: 'Frustra el análisis de tráfico',
    how2P:
      'Los buzones anónimos con firmas ciegas rompen la correlación entre remitente y destinatario. Tus patrones de comunicación permanecen invisibles para todos, incluidos nosotros.',
    how3Title: 'IA sin vigilancia',
    how3P:
      'Busca y resume tus mensajes con Ollama. Toda la inferencia se ejecuta localmente en tu dispositivo. Tus datos nunca tocan nuestros servidores ni ninguna nube.',

    // Tech callout
    techTitle: 'Creado con Rust y Go',
    techP:
      'Rendimiento nativo. Sin Electron. Sin motor de navegador. Ligero y con soporte nativo de Wayland en Linux.',
    techLink: 'Nuestro recorrido técnico &rarr;',
    githubCta: 'Ver en GitHub',
    license: '100% Código abierto &middot; GPL-3.0',
  },
  pt: {
    // <head> meta
    metaTitle: 'Chatter - Mensagens criptografadas e privadas com proteção de metadados',
    metaDescription:
      'Mensagens com criptografia de ponta a ponta que protegem seus metadados, não apenas o conteúdo. Sem número de telefone. Sealed Sender, caixas de entrada anônimas e IA local. Código aberto.',

    // Hero
    eyebrow: 'Em breve',
    heroH1a: 'Suas mensagens são criptografadas.',
    heroH1b: 'Seus metadados não.',
    heroLead:
      'A maioria dos mensageiros seguros protege o que você diz, mas revela com quem você fala, quando e com que frequência. O Chatter protege tudo.',
    heroCta: 'Ver no GitHub',
    formNote: 'Código aberto. GPL-3.0.',

    // Value props
    value1Title: 'Sealed Sender',
    value1Text: 'O servidor nunca vê quem enviou a mensagem',
    value2Title: 'Sem telefone',
    value2Text: 'Apenas um nome de usuário. Só isso.',
    value3Title: 'Caixa de entrada anônima',
    value3Text: 'Caixas de entrada efêmeras frustram a análise de tráfego',
    value4Title: 'IA local',
    value4Text: 'A busca permanece no seu dispositivo',

    // Big statement
    statementH2a: 'Além da ',
    statementH2b: 'criptografia',
    statementP:
      'A criptografia protege seu conteúdo. Nós protegemos seu grafo social, seus padrões de comunicação, sua identidade. O servidor não sabe de nada — por design.',

    // How it works
    how1Title: 'Oculte seu grafo social',
    how1P:
      'Com quem você fala é tão sensível quanto o que você diz. O Sealed Sender garante que o servidor nunca saiba quem enviou uma mensagem — apenas o destinatário pode descriptografar a identidade do remetente.',
    how2Title: 'Frustre a análise de tráfego',
    how2P:
      'Caixas de entrada anônimas com assinaturas cegas quebram a correlação entre remetente e destinatário. Seus padrões de comunicação permanecem invisíveis para todos — inclusive para nós.',
    how3Title: 'IA sem vigilância',
    how3P:
      'Pesquise e resuma suas mensagens com o Ollama. Toda a inferência é executada localmente no seu dispositivo. Seus dados nunca chegam aos nossos servidores nem a qualquer nuvem.',

    // Tech callout
    techTitle: 'Desenvolvido com Rust e Go',
    techP:
      'Desempenho nativo. Sem Electron. Sem motor de navegador. Leve e com suporte nativo a Wayland no Linux.',
    techLink: 'Nossa jornada técnica &rarr;',
    githubCta: 'Ver no GitHub',
    license: '100% Código aberto &middot; GPL-3.0',
  },
  fr: {
    // <head> meta
    metaTitle: 'Chatter - Messagerie chiffrée et privée avec protection des métadonnées',
    metaDescription:
      'Messagerie chiffrée de bout en bout qui protège vos métadonnées, pas seulement le contenu. Sans numéro de téléphone. Sealed Sender, boîtes de réception anonymes et IA locale. Open source.',

    // Hero
    eyebrow: 'Bientôt disponible',
    heroH1a: 'Vos messages sont chiffrés.',
    heroH1b: 'Vos métadonnées ne le sont pas.',
    heroLead:
      'La plupart des messageries sécurisées protègent ce que vous dites, mais révèlent avec qui vous parlez, quand et à quelle fréquence. Chatter protège tout.',
    heroCta: 'Voir sur GitHub',
    formNote: 'Open source. GPL-3.0.',

    // Value props
    value1Title: 'Sealed Sender',
    value1Text: 'Le serveur ne voit jamais qui a envoyé le message',
    value2Title: 'Sans téléphone',
    value2Text: "Juste un nom d'utilisateur. C'est tout.",
    value3Title: 'Boîte de réception anonyme',
    value3Text: "Des boîtes éphémères déjouent l'analyse de trafic",
    value4Title: 'IA locale',
    value4Text: 'La recherche reste sur votre appareil',

    // Big statement
    statementH2a: 'Au-delà du ',
    statementH2b: 'chiffrement',
    statementP:
      "Le chiffrement protège votre contenu. Nous protégeons votre graphe social, vos habitudes de communication, votre identité. Le serveur ne sait rien, par conception.",

    // How it works
    how1Title: 'Masquez votre graphe social',
    how1P:
      "Avec qui vous parlez est aussi sensible que ce que vous dites. Sealed Sender garantit que le serveur ne sait jamais qui a envoyé un message : seul le destinataire peut déchiffrer l'identité de l'expéditeur.",
    how2Title: "Déjouez l'analyse de trafic",
    how2P:
      "Des boîtes de réception anonymes à signatures aveugles brisent la corrélation entre expéditeur et destinataire. Vos habitudes de communication restent invisibles pour tout le monde, y compris pour nous.",
    how3Title: 'IA sans surveillance',
    how3P:
      "Recherchez et résumez vos messages avec Ollama. Toute l'inférence s'exécute localement sur votre appareil. Vos données ne touchent jamais nos serveurs ni aucun cloud.",

    // Tech callout
    techTitle: 'Conçu avec Rust et Go',
    techP:
      "Performances natives. Pas d'Electron. Pas de moteur de navigateur. Léger, avec prise en charge native de Wayland sous Linux.",
    techLink: 'Notre parcours technique &rarr;',
    githubCta: 'Voir sur GitHub',
    license: '100% Open Source &middot; GPL-3.0',
  },
  ro: {
    // <head> meta
    metaTitle: 'Chatter - Mesagerie criptată și privată cu protecția metadatelor',
    metaDescription:
      'Mesagerie cu criptare end-to-end care vă protejează metadatele, nu doar conținutul. Fără număr de telefon. Sealed Sender, căsuțe poștale anonime și IA locală. Sursă deschisă.',

    // Hero
    eyebrow: 'În curând',
    heroH1a: 'Mesajele dumneavoastră sunt criptate.',
    heroH1b: 'Metadatele nu sunt.',
    heroLead:
      'Majoritatea aplicațiilor de mesagerie securizată protejează ceea ce spuneți, dar dezvăluie cu cine vorbiți, când și cât de des. Chatter protejează totul.',
    heroCta: 'Vizualizați pe GitHub',
    formNote: 'Sursă deschisă. GPL-3.0.',

    // Value props
    value1Title: 'Sealed Sender',
    value1Text: 'Serverul nu vede niciodată cine a trimis mesajul',
    value2Title: 'Fără telefon',
    value2Text: 'Doar un nume de utilizator. Atât.',
    value3Title: 'Căsuță anonimă',
    value3Text: 'Căsuțele efemere înfrâng analiza traficului',
    value4Title: 'IA locală',
    value4Text: 'Căutarea rămâne pe dispozitivul dumneavoastră',

    // Big statement
    statementH2a: 'Dincolo de ',
    statementH2b: 'criptare',
    statementP:
      'Criptarea vă protejează conținutul. Noi vă protejăm graful social, tiparele de comunicare, identitatea. Serverul nu știe nimic — prin proiectare.',

    // How it works
    how1Title: 'Ascundeți-vă graful social',
    how1P:
      'Cu cine vorbiți este la fel de sensibil ca ceea ce spuneți. Sealed Sender garantează că serverul nu află niciodată cine a trimis un mesaj — doar destinatarul poate decripta identitatea expeditorului.',
    how2Title: 'Înfrângeți analiza traficului',
    how2P:
      'Căsuțele anonime cu semnături oarbe rup corelația dintre expeditor și destinatar. Tiparele dumneavoastră de comunicare rămân invizibile pentru toată lumea — inclusiv pentru noi.',
    how3Title: 'IA fără supraveghere',
    how3P:
      'Căutați și rezumați mesajele cu Ollama. Toată inferența rulează local, pe dispozitivul dumneavoastră. Datele dumneavoastră nu ajung niciodată pe serverele noastre sau în vreun cloud.',

    // Tech callout
    techTitle: 'Construit cu Rust și Go',
    techP:
      'Performanță nativă. Fără Electron. Fără motor de browser. Ușor, cu suport nativ Wayland pe Linux.',
    techLink: 'Parcursul nostru tehnic &rarr;',
    githubCta: 'Vizualizați pe GitHub',
    license: '100% Sursă deschisă &middot; GPL-3.0',
  },
} as const;

export function getChatterWaitlistContent(lang: Lang) {
  return { ...chatterWaitlist.en, ...chatterWaitlist[lang] };
}
