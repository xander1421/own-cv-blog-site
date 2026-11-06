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
    metaTitle: "Chatter — Private Messaging, Rust + Slint",
    metaDescription:
      "Meet Chatter: encrypted private conversations, voice calls and optional Shield metadata protection through Tor. A shared Rust and Slint client in closed alpha.",

    // Hero
    eyebrow: "Closed alpha",
    heroH1a: "Private conversations.",
    heroH1b: "Room to connect.",
    heroLead:
      "A messenger for everyday conversations, with encrypted private chats, voice calls and optional Shield metadata protection through Tor onion routing and anonymous mailboxes.",
    heroCta: "See the app",
    formNote: "Built by Alexandru Pruteanu. In closed alpha.",

    // Value props
    value1Title: "Private conversations",
    value1Text: "End-to-end encryption through libsignal",
    value2Title: "No phone number",
    value2Text: "Connect with a username",
    value3Title: "Shield + Tor",
    value3Text: "Optional onion routing and anonymous mailboxes",
    value4Title: "Voice calls",
    value4Text: "Keep the conversation open while you talk",

    // Big statement
    statementH2a: "Protection beyond ",
    statementH2b: "message contents",
    statementP:
      "Shield adds metadata protection with Tor onion routing and blind-signed anonymous mailboxes. It reduces IP exposure and account-to-mailbox linkage; it does not make every operation anonymous or eliminate traffic analysis.",

    // How it works
    how1Title: "Encrypt private conversations",
    how1P:
      "Private conversations use end-to-end encryption. Clients encrypt and decrypt the content; the service handles delivery. Public channels can contain service-readable content, with TLS protecting the connection.",
    how2Title: "Add metadata protection with Shield",
    how2P:
      "When enabled and connected, Shield routes RPC traffic and attachment transfers over Tor. Anonymous mailboxes use blind-signed tokens to reduce linkage. Authenticated operations can still identify an account; timing and traffic volume remain relevant.",
    how3Title: "Control what you share",
    how3P:
      "Choose who can see your profile and find you by username, and whether to share read receipts or typing indicators. Shield is optional and resets when the app restarts. Platform readiness and privacy features are still developing.",

    // Tech callout
    techTitle: "Shared Rust client. Go backend.",
    techP:
      "Rust and Slint share the application core and interface across platform builds. Go, Protobuf/Connect RPC, HTTP/3/QUIC, PostgreSQL, Redis and Temporal power the service. Platform support varies; Android and Linux are the current development focus.",
    techLink: "Read the closed-alpha update &rarr;",
    githubCta: "Ask about alpha testing",
    license: "Closed alpha · Built by Alexandru Pruteanu",
  },
  de: {
    // <head> meta
    metaTitle: "Chatter — Private Nachrichten, Rust + Slint",
    metaDescription:
      "Private Chats mit Ende-zu-Ende-Verschlüsselung, Sprachanrufe und optionaler Metadatenschutz über Shield und Tor. Chatter ist in der geschlossenen Alpha.",

    // Hero
    eyebrow: "Geschlossene Alpha",
    heroH1a: "Private Gespräche.",
    heroH1b: "Raum für Verbindung.",
    heroLead:
      "Ein Messenger für den Alltag: verschlüsselte private Chats, Sprachanrufe und optionaler Metadatenschutz durch Shield, Tor-Onion-Routing und anonyme Postfächer.",
    heroCta: "Die App ansehen",
    formNote: "Entwickelt von Alexandru Pruteanu. Geschlossene Alpha.",

    // Value props
    value1Title: "Private Gespräche",
    value1Text: "Ende-zu-Ende-Verschlüsselung mit libsignal",
    value2Title: "Keine Telefonnummer",
    value2Text: "Per Benutzername verbinden",
    value3Title: "Shield + Tor",
    value3Text: "Optionales Onion-Routing und anonyme Postfächer",
    value4Title: "Sprachanrufe",
    value4Text: "Beim Telefonieren im Chat bleiben",

    // Big statement
    statementH2a: "Schutz über den ",
    statementH2b: "Nachrichteninhalt hinaus",
    statementP:
      "Shield ergänzt Metadatenschutz durch Tor-Onion-Routing und anonymisierte Postfächer mit blinden Signaturen. Das reduziert IP-Offenlegung und Kontoverknüpfung, verhindert aber nicht jede Verkehrsanalyse.",

    // How it works
    how1Title: "Private Gespräche verschlüsseln",
    how1P:
      "Private Gespräche sind Ende-zu-Ende-verschlüsselt. Die Clients verschlüsseln und entschlüsseln; der Dienst stellt zu. Öffentliche Kanäle können für den Dienst lesbare Inhalte enthalten. TLS schützt die Verbindung.",
    how2Title: "Metadaten mit Shield schützen",
    how2P:
      "Wenn Shield aktiviert und verbunden ist, laufen RPC-Verkehr und Dateitransfers über Tor. Anonyme Postfächer nutzen blinde Signaturen. Authentifizierte Vorgänge können weiterhin ein Konto identifizieren; Zeitpunkt und Datenvolumen bleiben relevant.",
    how3Title: "Selbst bestimmen, was sichtbar ist",
    how3P:
      "Bestimmen Sie Profil-Sichtbarkeit, Auffindbarkeit, Lesebestätigungen und Tippanzeigen. Shield ist optional und wird beim Neustart zurückgesetzt. Plattformunterstützung und Datenschutzfunktionen werden weiterentwickelt.",

    // Tech callout
    techTitle: "Gemeinsamer Rust-Client. Go-Backend.",
    techP:
      "Rust und Slint teilen Kern und Oberfläche zwischen Plattform-Builds. Go, Protobuf/Connect RPC, HTTP/3/QUIC, PostgreSQL, Redis und Temporal betreiben den Dienst. Android und Linux stehen derzeit im Fokus.",
    techLink: "Alpha-Update lesen &rarr;",
    githubCta: "Nach Alpha-Tests fragen",
    license: "Geschlossene Alpha · Von Alexandru Pruteanu",
  },
  es: {
    // <head> meta
    metaTitle: "Chatter — Mensajería privada, Rust + Slint",
    metaDescription:
      "Conversaciones privadas cifradas de extremo a extremo, llamadas de voz y protección opcional de metadatos con Shield y Tor. Chatter está en alfa cerrada.",

    // Hero
    eyebrow: "Alfa cerrada",
    heroH1a: "Conversaciones privadas.",
    heroH1b: "Espacio para conectar.",
    heroLead:
      "Un mensajero para el día a día: chats privados cifrados, llamadas de voz y protección opcional de metadatos con Shield, rutas onion de Tor y buzones anónimos.",
    heroCta: "Ver la aplicación",
    formNote: "Creado por Alexandru Pruteanu. En alfa cerrada.",

    // Value props
    value1Title: "Conversaciones privadas",
    value1Text: "Cifrado de extremo a extremo con libsignal",
    value2Title: "Sin teléfono",
    value2Text: "Conecta con un nombre de usuario",
    value3Title: "Shield + Tor",
    value3Text: "Rutas onion y buzones anónimos opcionales",
    value4Title: "Llamadas de voz",
    value4Text: "Sigue en el chat mientras hablas",

    // Big statement
    statementH2a: "Protección más allá del ",
    statementH2b: "contenido",
    statementP:
      "Shield protege metadatos con rutas onion de Tor y buzones anónimos con firmas ciegas. Reduce la exposición de IP y la vinculación con la cuenta, sin eliminar todo análisis de tráfico.",

    // How it works
    how1Title: "Cifrar conversaciones privadas",
    how1P:
      "Los clientes cifran y descifran las conversaciones privadas de extremo a extremo; el servicio las entrega. Los canales públicos pueden contener mensajes legibles por el servicio. TLS protege la conexión.",
    how2Title: "Proteger metadatos con Shield",
    how2P:
      "Al estar activado y conectado, Shield lleva el tráfico RPC y los archivos por Tor. Los buzones anónimos usan firmas ciegas. Las operaciones autenticadas aún pueden identificar la cuenta; los tiempos y volúmenes siguen siendo relevantes.",
    how3Title: "Elige qué compartes",
    how3P:
      "Controla la visibilidad del perfil, la búsqueda por usuario, las confirmaciones de lectura y los indicadores de escritura. Shield es opcional y se restablece al reiniciar. La compatibilidad y las funciones de privacidad siguen en desarrollo.",

    // Tech callout
    techTitle: "Cliente Rust compartido. Backend Go.",
    techP:
      "Rust y Slint comparten el núcleo y la interfaz entre compilaciones. Go, Protobuf/Connect RPC, HTTP/3/QUIC, PostgreSQL, Redis y Temporal impulsan el servicio. Android y Linux son el foco actual.",
    techLink: "Leer la actualización de alfa &rarr;",
    githubCta: "Consultar sobre la alfa",
    license: "Alfa cerrada · Por Alexandru Pruteanu",
  },
  pt: {
    // <head> meta
    metaTitle: "Chatter — Mensagens privadas, Rust + Slint",
    metaDescription:
      "Conversas privadas com criptografia de ponta a ponta, chamadas de voz e proteção opcional de metadados com Shield e Tor. Chatter está em alfa fechada.",

    // Hero
    eyebrow: "Alfa fechada",
    heroH1a: "Conversas privadas.",
    heroH1b: "Espaço para se conectar.",
    heroLead:
      "Um mensageiro para o dia a dia: chats privados criptografados, chamadas de voz e proteção opcional de metadados com Shield, roteamento onion do Tor e caixas anônimas.",
    heroCta: "Ver o aplicativo",
    formNote: "Criado por Alexandru Pruteanu. Em alfa fechada.",

    // Value props
    value1Title: "Conversas privadas",
    value1Text: "Criptografia de ponta a ponta com libsignal",
    value2Title: "Sem número de telefone",
    value2Text: "Conecte-se por nome de usuário",
    value3Title: "Shield + Tor",
    value3Text: "Roteamento onion e caixas anônimas opcionais",
    value4Title: "Chamadas de voz",
    value4Text: "Continue no chat enquanto conversa",

    // Big statement
    statementH2a: "Proteção além do ",
    statementH2b: "conteúdo",
    statementP:
      "Shield protege metadados com roteamento onion do Tor e caixas anônimas com assinaturas cegas. Reduz a exposição do IP e o vínculo com a conta, mas não elimina toda análise de tráfego.",

    // How it works
    how1Title: "Criptografar conversas privadas",
    how1P:
      "Os clientes criptografam e descriptografam conversas privadas de ponta a ponta; o serviço faz a entrega. Canais públicos podem conter conteúdo legível pelo serviço. TLS protege a conexão.",
    how2Title: "Proteger metadados com Shield",
    how2P:
      "Quando ativado e conectado, Shield leva tráfego RPC e arquivos pelo Tor. Caixas anônimas usam assinaturas cegas. Operações autenticadas ainda podem identificar a conta; horários e volumes continuam relevantes.",
    how3Title: "Escolha o que compartilhar",
    how3P:
      "Controle a visibilidade do perfil, busca por usuário, confirmações de leitura e indicadores de digitação. Shield é opcional e é desativado ao reiniciar. Suporte a plataformas e recursos de privacidade seguem em desenvolvimento.",

    // Tech callout
    techTitle: "Cliente Rust compartilhado. Backend Go.",
    techP:
      "Rust e Slint compartilham o núcleo e a interface entre compilações. Go, Protobuf/Connect RPC, HTTP/3/QUIC, PostgreSQL, Redis e Temporal sustentam o serviço. Android e Linux são o foco atual.",
    techLink: "Ler a atualização da alfa &rarr;",
    githubCta: "Perguntar sobre a alfa",
    license: "Alfa fechada · Por Alexandru Pruteanu",
  },
  fr: {
    // <head> meta
    metaTitle: "Chatter — Messagerie privée, Rust + Slint",
    metaDescription:
      "Conversations privées chiffrées de bout en bout, appels vocaux et protection optionnelle des métadonnées avec Shield et Tor. Chatter est en alpha fermée.",

    // Hero
    eyebrow: "Alpha fermée",
    heroH1a: "Conversations privées.",
    heroH1b: "Le plaisir de se retrouver.",
    heroLead:
      "Une messagerie du quotidien : échanges privés chiffrés, appels vocaux et protection optionnelle des métadonnées par Shield, routage onion Tor et boîtes anonymes.",
    heroCta: "Découvrir l’application",
    formNote: "Développé par Alexandru Pruteanu. En alpha fermée.",

    // Value props
    value1Title: "Conversations privées",
    value1Text: "Chiffrement de bout en bout avec libsignal",
    value2Title: "Sans numéro de téléphone",
    value2Text: "Échangez avec un nom d’utilisateur",
    value3Title: "Shield + Tor",
    value3Text: "Routage onion et boîtes anonymes en option",
    value4Title: "Appels vocaux",
    value4Text: "Gardez le chat ouvert pendant l’appel",

    // Big statement
    statementH2a: "Une protection au-delà du ",
    statementH2b: "contenu",
    statementP:
      "Shield protège les métadonnées grâce à Tor et aux boîtes anonymes avec signatures aveugles. Il réduit l’exposition de l’IP et le lien avec le compte, sans éliminer toute analyse du trafic.",

    // How it works
    how1Title: "Chiffrer les échanges privés",
    how1P:
      "Les clients chiffrent et déchiffrent les échanges privés de bout en bout ; le service les distribue. Les canaux publics peuvent contenir des messages lisibles par le service. TLS protège la connexion.",
    how2Title: "Protéger les métadonnées avec Shield",
    how2P:
      "Une fois activé et connecté, Shield route le trafic RPC et les fichiers par Tor. Les boîtes anonymes utilisent des signatures aveugles. Les opérations authentifiées peuvent toujours identifier le compte ; horaires et volumes restent pertinents.",
    how3Title: "Choisir ce que vous partagez",
    how3P:
      "Réglez la visibilité du profil, la recherche par identifiant, les accusés de lecture et les indicateurs de saisie. Shield est optionnel et se désactive au redémarrage. La prise en charge des plateformes et la confidentialité continuent d’évoluer.",

    // Tech callout
    techTitle: "Client Rust partagé. Backend Go.",
    techP:
      "Rust et Slint partagent le cœur et l’interface entre les builds. Go, Protobuf/Connect RPC, HTTP/3/QUIC, PostgreSQL, Redis et Temporal assurent le service. Android et Linux sont les priorités actuelles.",
    techLink: "Lire les nouvelles de l’alpha &rarr;",
    githubCta: "Demander un accès à l’alpha",
    license: "Alpha fermée · Par Alexandru Pruteanu",
  },
  ro: {
    // <head> meta
    metaTitle: "Chatter — Mesagerie privată, Rust + Slint",
    metaDescription:
      "Conversații private criptate end-to-end, apeluri vocale și protecție opțională a metadatelor prin Shield și Tor. Chatter este în alfa închisă.",

    // Hero
    eyebrow: "Alfa închisă",
    heroH1a: "Conversații private.",
    heroH1b: "Spațiu pentru conexiuni.",
    heroLead:
      "Un mesager pentru fiecare zi: conversații private criptate, apeluri vocale și protecție opțională a metadatelor prin Shield, rutare onion Tor și căsuțe anonime.",
    heroCta: "Vezi aplicația",
    formNote: "Creat de Alexandru Pruteanu. În alfa închisă.",

    // Value props
    value1Title: "Conversații private",
    value1Text: "Criptare end-to-end prin libsignal",
    value2Title: "Fără număr de telefon",
    value2Text: "Conectare prin numele de utilizator",
    value3Title: "Shield + Tor",
    value3Text: "Rutare onion și căsuțe anonime opționale",
    value4Title: "Apeluri vocale",
    value4Text: "Păstrează conversația deschisă în timpul apelului",

    // Big statement
    statementH2a: "Protecție dincolo de ",
    statementH2b: "conținut",
    statementP:
      "Shield protejează metadatele prin rutare onion Tor și căsuțe anonime cu semnături oarbe. Reduce expunerea IP-ului și asocierea cu contul, fără a elimina orice analiză a traficului.",

    // How it works
    how1Title: "Criptează conversațiile private",
    how1P:
      "Clienții criptează și decriptează end-to-end conversațiile private; serviciul livrează mesajele. Canalele publice pot conține mesaje lizibile de către serviciu. TLS protejează conexiunea.",
    how2Title: "Protejează metadatele cu Shield",
    how2P:
      "Când este activat și conectat, Shield rutează traficul RPC și fișierele prin Tor. Căsuțele anonime folosesc semnături oarbe. Operațiile autentificate pot identifica în continuare contul; timpii și volumele rămân relevante.",
    how3Title: "Alege ce distribui",
    how3P:
      "Controlează vizibilitatea profilului, căutarea după nume, confirmările de citire și indicatorii de tastare. Shield este opțional și se dezactivează la repornire. Suportul platformelor și funcțiile de confidențialitate sunt în dezvoltare.",

    // Tech callout
    techTitle: "Client Rust comun. Backend Go.",
    techP:
      "Rust și Slint partajează nucleul și interfața între build-uri. Go, Protobuf/Connect RPC, HTTP/3/QUIC, PostgreSQL, Redis și Temporal susțin serviciul. Android și Linux sunt prioritățile actuale.",
    techLink: "Citește noutățile din alfa &rarr;",
    githubCta: "Întreabă despre testarea alfa",
    license: "Alfa închisă · Creat de Alexandru Pruteanu",
  },
} as const;

export function getChatterWaitlistContent(lang: Lang) {
  return { ...chatterWaitlist.en, ...chatterWaitlist[lang] };
}
