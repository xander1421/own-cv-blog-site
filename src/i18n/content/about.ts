// Per-locale content for the ABOUT page:
//   - src/pages/about.astro  ->  rendered via src/components/pages/About.astro
// English is the source of truth and lives in `en` with ALL keys.
// Other locales start empty; translators fill them and missing keys
// fall back to English via getAboutContent().
//
// Proper nouns kept verbatim in the component (not translated): company names,
// skill/tech tags, email, external URLs, the emoji category icons, and the
// JSON-LD Person schema. Only user-facing prose lives here.

import type { Lang } from '../ui';

export const about = {
  en: {
    // ---- meta ----
    metaTitle: 'About — DevOps & Cloud Consultant',
    metaDescription:
      'Alexandru Pruteanu — DevOps & cloud consultant, 6+ years building production infrastructure on AWS, Kubernetes, and Terraform, and shipping products solo.',

    // ---- breadcrumb + header ----
    breadcrumbHome: 'Home',
    breadcrumbAbout: 'About',
    h1: 'About Me',
    headerSubtitle: 'DevOps Engineer specializing in cloud infrastructure',
    contactLabel: 'Email:',
    socialGithub: 'GitHub',
    socialLinkedin: 'LinkedIn',
    socialChatter: 'Chatter',

    // ---- professional summary ----
    summaryHeading: 'Professional Summary',
    summaryText:
      'DevOps Engineer with over 6 years of hands-on experience building and managing scalable cloud infrastructures using AWS, Kubernetes, and Terraform. Proven track record automating CI/CD pipelines, container orchestration, and infrastructure provisioning across multiple environments. Adept at improving deployment reliability, monitoring, and developer productivity through modern DevOps tooling.',

    // ---- technical skills (category headings; tags stay verbatim in component) ----
    skillsHeading: 'Technical Skills',
    skillCloud: 'Cloud & Infrastructure',
    skillCicd: 'CI/CD & Automation',
    skillContainers: 'Containers & Orchestration',
    skillMonitoring: 'Monitoring & Observability',
    skillLanguages: 'Languages & Databases',
    skillSecurity: 'Security & Compliance',

    // ---- professional experience ----
    experienceHeading: 'Professional Experience',
    experienceTechLabel: 'Tech Stack:',
    jobs: [
      {
        title: 'DevOps Engineer',
        company: 'Yopeso',
        period: 'Sep 2023 – Current',
        achievements: [
          'Designed and deployed AWS infrastructure using Terraform and Helm, improving environment provisioning time by 40%',
          'Deployed and maintained Kubernetes clusters to support microservices at scale, improving system resilience and reliability',
          'Automated infrastructure provisioning and configuration with Ansible, reducing deployment time and human error',
        ],
        tech: 'Terraform · AWS · Kubernetes · Helm · Jenkins · Ansible · Docker · Python · GitHub',
      },
      {
        title: 'DevOps Engineer',
        company: 'Quorum',
        period: 'Feb 2022 – May 2023',
        achievements: [
          'Managed and provisioned AWS infrastructure using Terraform, ensuring consistent, scalable, and auditable deployments across environments',
          'Configured and maintained key AWS services — including RDS (PostgreSQL/MySQL), Elasticache (Redis), and OpenSearch — delivering reliable and high-performance data platforms',
          'Implemented secure IAM roles and policies to enforce least-privilege access and strengthen cloud security posture',
          'Oversaw EC2 instance lifecycles, improving resource utilization and cost efficiency',
          'Built and maintained CI/CD pipelines with Jenkins, GitHub Actions, and CircleCI, accelerating software delivery and reducing manual errors',
          'Integrated Datadog for real-time infrastructure monitoring, improving uptime and observability across distributed systems',
        ],
        tech: 'AWS · Terraform · Jenkins · CircleCI · GitHub · Datadog · Ansible · Kubernetes · Docker',
      },
      {
        title: 'DevOps Engineer',
        company: 'Grid Dynamics',
        period: 'Mar 2021 – Jan 2022',
        achievements: [
          'Hosting client applications on Google Cloud Platform (GCP), ensuring reliable accessibility and optimal performance',
          'Maintaining Kubernetes infrastructure leveraging the Google Kubernetes Engine (GKE), resulting in smooth orchestration of containerized applications',
          'Establishing and maintaining CI/CD processes using tools such as Jenkins, Chef, and Spinnaker, streamlining development and deployment workflows',
          'Testing containerized workloads with Sonar and Black Duck, affirming the quality, security, and compliance of software',
          'Introducing new microservices into the existing stack, creating necessary pipelines and recipes using Chef for VMs and Helm for Kubernetes',
          'Actively responding to developer feedback and making appropriate changes to the infrastructure model to eliminate bottlenecks',
        ],
        tech: 'Google Cloud Platform (GCP) · Helm · Spinnaker · Ansible · Kubernetes',
      },
      {
        title: 'Machine Learning Internship',
        company: 'Smart AItomation',
        period: 'Nov 2020 – Feb 2021',
        achievements: [
          'Developed end-to-end machine learning pipelines, accelerating model deployment and reducing time-to-delivery for production ML solutions',
          'Collected and prepared custom datasets via Selenium and BeautifulSoup, enabling high-quality data inputs for training and evaluation',
          'Performed data analysis and visualization with Pandas and Matplotlib, uncovering insights to guide model refinement',
          'Implemented and trained models using scikit-learn (Logistic Regression) and spaCy (Named Entity Recognition), improving accuracy and processing speed',
          'Integrated GitHub Actions to automate CI/CD workflows, ensuring efficient and reproducible ML experiments',
          'Deployed containerized ML applications on Heroku, enabling seamless public access to project demos and prototypes',
        ],
        tech: 'Python · scikit-learn · spaCy · Selenium · BeautifulSoup · Pandas · Matplotlib · GitHub Actions · Docker · Heroku',
      },
      {
        title: 'DevOps Engineer',
        company: 'EBS-Integrator',
        period: 'Aug 2020 – Oct 2020',
        achievements: [
          'Implemented and maintained CI pipelines in GitLab, optimizing build, test, and deployment workflows across multiple environments',
          'Developed and managed Ansible playbooks for configuration management and automated provisioning, reducing manual setup time',
          'Built and deployed Docker containers, integrating Nginx for load balancing to enhance performance and ensure high availability',
          'Orchestrated microservice deployments using Docker Swarm, enabling modular, scalable, and fault-tolerant application architecture',
          'Collaborated with clients to design customized infrastructure solutions, aligning DevOps practices with specific performance and reliability goals',
        ],
        tech: 'GitLab · Docker Swarm · Ansible · Nginx · Redis · Elasticsearch · RabbitMQ · GitHub',
      },
      {
        title: 'DevOps Internship',
        company: 'Endava',
        period: 'Mar 2020 – Jul 2020',
        achievements: [
          'Implementing GIT for the seamless control of source-code, streamlining the version control process for efficient code management',
          'Creating and maintaining multi-branch Jenkins pipelines using Docker, thereby enhancing the automation and deployment process within the team',
          'Leveraging Docker multi-stage builds to isolate work, ensuring clean, efficient, and error-free code development',
          'Utilizing Python scripting skills to send build metrics from the Jenkins pipeline to Grafana for visualization and in-depth analysis',
          'Creating a deployment pipeline to push the newest Docker application images to AWS, enhancing the efficiency of app updates and ensuring timely delivery',
        ],
      },
      {
        title: 'IT Helpdesk',
        company: 'Gilat',
        period: 'Apr 2017 – Apr 2020',
        achievements: [
          'Providing 24/6 call center support, acting as the first point of contact for troubleshooting and resolving IT issues',
          'Specializing in the administration and troubleshooting of a wide variety of Microsoft products to maximize productivity and efficiency',
          'Implementing secure access within our domain network to uphold high security standards and protect against potential threats',
          'Hands-on maintenance and management of SAP systems, ensuring their optimal performance for smooth business operations',
          'Operating and performing minor development tasks on Salesforce to enhance its functionality and user experience',
        ],
      },
      {
        title: 'IT Helpdesk',
        company: 'Contraproducoes',
        period: 'May 2015 – Dec 2015',
        achievements: [
          'Computer maintenance',
          'Software updates',
          'Hardware infrastructure upgrade',
          'Customer support face to face',
        ],
      },
    ],

    // ---- additional info ----
    educationHeading: 'Education',
    educationDegree: 'High School Diploma',
    languagesHeading: 'Languages',
    languages: [
      { name: 'Romanian', level: '(Native)' },
      { name: 'English', level: '(C2)' },
      { name: 'Portuguese', level: '(C1)' },
      { name: 'Russian', level: '(B2)' },
    ],

    // ---- CTA ----
    ctaHeading: "Let's Connect",
    ctaText: 'Interested in working together or discussing DevOps practices?',
    ctaContact: 'Contact Me',
    ctaBlog: 'Read My Blog',
  },
  de: {
    // ---- meta ----
    metaTitle: 'Über mich — DevOps- & Cloud-Berater',
    metaDescription:
      'Alexandru Pruteanu — DevOps- und Cloud-Berater mit über 6 Jahren Erfahrung im Aufbau produktiver Infrastrukturen auf AWS, Kubernetes und Terraform sowie in der eigenständigen Produktentwicklung.',

    // ---- breadcrumb + header ----
    breadcrumbHome: 'Startseite',
    breadcrumbAbout: 'Über mich',
    h1: 'Über mich',
    headerSubtitle: 'DevOps-Engineer mit Spezialisierung auf Cloud-Infrastruktur',
    contactLabel: 'E-Mail:',
    socialGithub: 'GitHub',
    socialLinkedin: 'LinkedIn',
    socialChatter: 'Chatter',

    // ---- professional summary ----
    summaryHeading: 'Berufsprofil',
    summaryText:
      'DevOps-Engineer mit über 6 Jahren praktischer Erfahrung im Aufbau und Betrieb skalierbarer Cloud-Infrastrukturen mit AWS, Kubernetes und Terraform. Nachweisliche Erfolge bei der Automatisierung von CI/CD-Pipelines, der Container-Orchestrierung und der Bereitstellung von Infrastruktur über mehrere Umgebungen hinweg. Versiert darin, die Zuverlässigkeit von Deployments, das Monitoring und die Entwicklerproduktivität mithilfe moderner DevOps-Werkzeuge zu verbessern.',

    // ---- technical skills ----
    skillsHeading: 'Technische Fähigkeiten',
    skillCloud: 'Cloud & Infrastruktur',
    skillCicd: 'CI/CD & Automatisierung',
    skillContainers: 'Container & Orchestrierung',
    skillMonitoring: 'Monitoring & Observability',
    skillLanguages: 'Sprachen & Datenbanken',
    skillSecurity: 'Sicherheit & Compliance',

    // ---- professional experience ----
    experienceHeading: 'Berufserfahrung',
    experienceTechLabel: 'Tech-Stack:',
    jobs: [
      {
        title: 'DevOps-Engineer',
        company: 'Yopeso',
        period: 'Sep. 2023 – Aktuell',
        achievements: [
          'AWS-Infrastruktur mit Terraform und Helm konzipiert und bereitgestellt und damit die Bereitstellungszeit von Umgebungen um 40 % verbessert',
          'Kubernetes-Cluster zur Unterstützung von Microservices im großen Maßstab bereitgestellt und gepflegt und damit die Widerstandsfähigkeit und Zuverlässigkeit des Systems verbessert',
          'Infrastrukturbereitstellung und -konfiguration mit Ansible automatisiert und damit Bereitstellungszeit und menschliche Fehler reduziert',
        ],
        tech: 'Terraform · AWS · Kubernetes · Helm · Jenkins · Ansible · Docker · Python · GitHub',
      },
      {
        title: 'DevOps-Engineer',
        company: 'Quorum',
        period: 'Feb. 2022 – Mai 2023',
        achievements: [
          'AWS-Infrastruktur mit Terraform verwaltet und bereitgestellt und damit konsistente, skalierbare und prüfbare Deployments über alle Umgebungen hinweg sichergestellt',
          'Zentrale AWS-Dienste — darunter RDS (PostgreSQL/MySQL), Elasticache (Redis) und OpenSearch — konfiguriert und gepflegt und damit zuverlässige und leistungsstarke Datenplattformen bereitgestellt',
          'Sichere IAM-Rollen und -Richtlinien implementiert, um den Zugriff nach dem Least-Privilege-Prinzip durchzusetzen und die Cloud-Sicherheit zu stärken',
          'Den Lebenszyklus von EC2-Instanzen überwacht und damit Ressourcennutzung und Kosteneffizienz verbessert',
          'CI/CD-Pipelines mit Jenkins, GitHub Actions und CircleCI aufgebaut und gepflegt und damit die Softwareauslieferung beschleunigt und manuelle Fehler reduziert',
          'Datadog für das Echtzeit-Monitoring der Infrastruktur integriert und damit Verfügbarkeit und Observability über verteilte Systeme hinweg verbessert',
        ],
        tech: 'AWS · Terraform · Jenkins · CircleCI · GitHub · Datadog · Ansible · Kubernetes · Docker',
      },
      {
        title: 'DevOps-Engineer',
        company: 'Grid Dynamics',
        period: 'März 2021 – Jan. 2022',
        achievements: [
          'Client-Anwendungen auf der Google Cloud Platform (GCP) gehostet und damit zuverlässige Erreichbarkeit und optimale Leistung sichergestellt',
          'Kubernetes-Infrastruktur mit der Google Kubernetes Engine (GKE) gepflegt und damit eine reibungslose Orchestrierung containerisierter Anwendungen erreicht',
          'CI/CD-Prozesse mit Werkzeugen wie Jenkins, Chef und Spinnaker eingerichtet und gepflegt und damit Entwicklungs- und Bereitstellungsabläufe optimiert',
          'Containerisierte Workloads mit Sonar und Black Duck getestet und damit Qualität, Sicherheit und Compliance der Software bestätigt',
          'Neue Microservices in den bestehenden Stack eingeführt und die erforderlichen Pipelines und Rezepte mit Chef für VMs und Helm für Kubernetes erstellt',
          'Aktiv auf Entwicklerfeedback reagiert und das Infrastrukturmodell entsprechend angepasst, um Engpässe zu beseitigen',
        ],
        tech: 'Google Cloud Platform (GCP) · Helm · Spinnaker · Ansible · Kubernetes',
      },
      {
        title: 'Praktikum Machine Learning',
        company: 'Smart AItomation',
        period: 'Nov. 2020 – Feb. 2021',
        achievements: [
          'End-to-End-Machine-Learning-Pipelines entwickelt und damit die Modellbereitstellung beschleunigt und die Auslieferungszeit für produktive ML-Lösungen verkürzt',
          'Individuelle Datensätze mit Selenium und BeautifulSoup erfasst und aufbereitet und damit hochwertige Dateneingaben für Training und Evaluierung ermöglicht',
          'Datenanalyse und -visualisierung mit Pandas und Matplotlib durchgeführt und damit Erkenntnisse zur Verfeinerung der Modelle gewonnen',
          'Modelle mit scikit-learn (Logistische Regression) und spaCy (Named Entity Recognition) implementiert und trainiert und damit Genauigkeit und Verarbeitungsgeschwindigkeit verbessert',
          'GitHub Actions integriert, um CI/CD-Workflows zu automatisieren und effiziente, reproduzierbare ML-Experimente sicherzustellen',
          'Containerisierte ML-Anwendungen auf Heroku bereitgestellt und damit einen nahtlosen öffentlichen Zugang zu Projektdemos und Prototypen ermöglicht',
        ],
        tech: 'Python · scikit-learn · spaCy · Selenium · BeautifulSoup · Pandas · Matplotlib · GitHub Actions · Docker · Heroku',
      },
      {
        title: 'DevOps-Engineer',
        company: 'EBS-Integrator',
        period: 'Aug. 2020 – Okt. 2020',
        achievements: [
          'CI-Pipelines in GitLab implementiert und gepflegt und damit Build-, Test- und Bereitstellungsabläufe über mehrere Umgebungen hinweg optimiert',
          'Ansible-Playbooks für Konfigurationsmanagement und automatisierte Bereitstellung entwickelt und verwaltet und damit den manuellen Einrichtungsaufwand reduziert',
          'Docker-Container erstellt und bereitgestellt und Nginx für das Load Balancing integriert, um die Leistung zu steigern und hohe Verfügbarkeit sicherzustellen',
          'Microservice-Deployments mit Docker Swarm orchestriert und damit eine modulare, skalierbare und fehlertolerante Anwendungsarchitektur ermöglicht',
          'Mit Kunden zusammengearbeitet, um maßgeschneiderte Infrastrukturlösungen zu entwerfen und DevOps-Praktiken an spezifischen Leistungs- und Zuverlässigkeitszielen auszurichten',
        ],
        tech: 'GitLab · Docker Swarm · Ansible · Nginx · Redis · Elasticsearch · RabbitMQ · GitHub',
      },
      {
        title: 'Praktikum DevOps',
        company: 'Endava',
        period: 'März 2020 – Juli 2020',
        achievements: [
          'GIT für die nahtlose Verwaltung von Quellcode eingeführt und damit den Versionskontrollprozess für ein effizientes Code-Management optimiert',
          'Multi-Branch-Jenkins-Pipelines mit Docker erstellt und gepflegt und damit den Automatisierungs- und Bereitstellungsprozess im Team verbessert',
          'Docker-Multi-Stage-Builds genutzt, um Arbeitsschritte zu isolieren und eine saubere, effiziente und fehlerfreie Codeentwicklung sicherzustellen',
          'Python-Skripting eingesetzt, um Build-Metriken aus der Jenkins-Pipeline zur Visualisierung und detaillierten Analyse an Grafana zu senden',
          'Eine Bereitstellungs-Pipeline erstellt, um die neuesten Docker-Anwendungs-Images an AWS zu übertragen, und damit die Effizienz von App-Updates gesteigert und eine termingerechte Auslieferung sichergestellt',
        ],
      },
      {
        title: 'IT-Helpdesk',
        company: 'Gilat',
        period: 'Apr. 2017 – Apr. 2020',
        achievements: [
          'Rund-um-die-Uhr-Support im Callcenter (24/6) geleistet und als erste Anlaufstelle für die Fehlerbehebung und Lösung von IT-Problemen fungiert',
          'Auf die Administration und Fehlerbehebung einer Vielzahl von Microsoft-Produkten spezialisiert, um Produktivität und Effizienz zu maximieren',
          'Sicheren Zugriff innerhalb unseres Domänennetzwerks implementiert, um hohe Sicherheitsstandards einzuhalten und vor potenziellen Bedrohungen zu schützen',
          'SAP-Systeme praktisch gewartet und verwaltet und damit ihre optimale Leistung für einen reibungslosen Geschäftsbetrieb sichergestellt',
          'Salesforce betrieben und kleinere Entwicklungsaufgaben durchgeführt, um Funktionalität und Benutzererlebnis zu verbessern',
        ],
      },
      {
        title: 'IT-Helpdesk',
        company: 'Contraproducoes',
        period: 'Mai 2015 – Dez. 2015',
        achievements: [
          'Computerwartung',
          'Software-Updates',
          'Aufrüstung der Hardware-Infrastruktur',
          'Kundenbetreuung vor Ort',
        ],
      },
    ],

    // ---- additional info ----
    educationHeading: 'Ausbildung',
    educationDegree: 'Abitur',
    languagesHeading: 'Sprachen',
    languages: [
      { name: 'Rumänisch', level: '(Muttersprache)' },
      { name: 'Englisch', level: '(C2)' },
      { name: 'Portugiesisch', level: '(C1)' },
      { name: 'Russisch', level: '(B2)' },
    ],

    // ---- CTA ----
    ctaHeading: 'Kontakt aufnehmen',
    ctaText: 'Interesse an einer Zusammenarbeit oder an einem Austausch über DevOps-Praktiken?',
    ctaContact: 'Kontaktieren Sie mich',
    ctaBlog: 'Meinen Blog lesen',
  },
  es: {
    // ---- meta ----
    metaTitle: 'Sobre mí — Consultor DevOps y Cloud',
    metaDescription:
      'Alexandru Pruteanu — consultor DevOps y cloud con más de 6 años construyendo infraestructura en producción sobre AWS, Kubernetes y Terraform, y lanzando productos en solitario.',

    // ---- breadcrumb + header ----
    breadcrumbHome: 'Inicio',
    breadcrumbAbout: 'Sobre mí',
    h1: 'Sobre mí',
    headerSubtitle: 'Ingeniero DevOps especializado en infraestructura cloud',
    contactLabel: 'Correo:',
    socialGithub: 'GitHub',
    socialLinkedin: 'LinkedIn',
    socialChatter: 'Chatter',

    // ---- professional summary ----
    summaryHeading: 'Perfil profesional',
    summaryText:
      'Ingeniero DevOps con más de 6 años de experiencia práctica construyendo y gestionando infraestructuras cloud escalables con AWS, Kubernetes y Terraform. Trayectoria comprobada en la automatización de pipelines de CI/CD, la orquestación de contenedores y el aprovisionamiento de infraestructura en múltiples entornos. Con soltura para mejorar la fiabilidad de los despliegues, la monitorización y la productividad de los desarrolladores mediante herramientas modernas de DevOps.',

    // ---- technical skills ----
    skillsHeading: 'Habilidades técnicas',
    skillCloud: 'Cloud e infraestructura',
    skillCicd: 'CI/CD y automatización',
    skillContainers: 'Contenedores y orquestación',
    skillMonitoring: 'Monitorización y observabilidad',
    skillLanguages: 'Lenguajes y bases de datos',
    skillSecurity: 'Seguridad y cumplimiento',

    // ---- professional experience ----
    experienceHeading: 'Experiencia profesional',
    experienceTechLabel: 'Stack tecnológico:',
    jobs: [
      {
        title: 'Ingeniero DevOps',
        company: 'Yopeso',
        period: 'sept. 2023 – Actualidad',
        achievements: [
          'Diseñé y desplegué infraestructura en AWS con Terraform y Helm, mejorando en un 40 % el tiempo de aprovisionamiento de entornos',
          'Desplegué y mantuve clústeres de Kubernetes para dar soporte a microservicios a gran escala, mejorando la resiliencia y la fiabilidad del sistema',
          'Automaticé el aprovisionamiento y la configuración de la infraestructura con Ansible, reduciendo el tiempo de despliegue y el error humano',
        ],
        tech: 'Terraform · AWS · Kubernetes · Helm · Jenkins · Ansible · Docker · Python · GitHub',
      },
      {
        title: 'Ingeniero DevOps',
        company: 'Quorum',
        period: 'feb. 2022 – may. 2023',
        achievements: [
          'Gestioné y aprovisioné infraestructura en AWS con Terraform, garantizando despliegues consistentes, escalables y auditables en todos los entornos',
          'Configuré y mantuve servicios clave de AWS —incluidos RDS (PostgreSQL/MySQL), Elasticache (Redis) y OpenSearch—, ofreciendo plataformas de datos fiables y de alto rendimiento',
          'Implementé roles y políticas de IAM seguros para aplicar el acceso con privilegios mínimos y reforzar la postura de seguridad en la nube',
          'Supervisé el ciclo de vida de las instancias EC2, mejorando el uso de recursos y la eficiencia de costes',
          'Construí y mantuve pipelines de CI/CD con Jenkins, GitHub Actions y CircleCI, acelerando la entrega de software y reduciendo los errores manuales',
          'Integré Datadog para la monitorización de la infraestructura en tiempo real, mejorando la disponibilidad y la observabilidad en sistemas distribuidos',
        ],
        tech: 'AWS · Terraform · Jenkins · CircleCI · GitHub · Datadog · Ansible · Kubernetes · Docker',
      },
      {
        title: 'Ingeniero DevOps',
        company: 'Grid Dynamics',
        period: 'mar. 2021 – ene. 2022',
        achievements: [
          'Alojamiento de aplicaciones de clientes en Google Cloud Platform (GCP), garantizando una accesibilidad fiable y un rendimiento óptimo',
          'Mantenimiento de la infraestructura de Kubernetes aprovechando Google Kubernetes Engine (GKE), logrando una orquestación fluida de aplicaciones en contenedores',
          'Establecimiento y mantenimiento de procesos de CI/CD con herramientas como Jenkins, Chef y Spinnaker, agilizando los flujos de desarrollo y despliegue',
          'Pruebas de cargas de trabajo en contenedores con Sonar y Black Duck, confirmando la calidad, la seguridad y el cumplimiento del software',
          'Incorporación de nuevos microservicios al stack existente, creando los pipelines y las recetas necesarias con Chef para máquinas virtuales y Helm para Kubernetes',
          'Respuesta activa a los comentarios de los desarrolladores y ajustes adecuados del modelo de infraestructura para eliminar cuellos de botella',
        ],
        tech: 'Google Cloud Platform (GCP) · Helm · Spinnaker · Ansible · Kubernetes',
      },
      {
        title: 'Prácticas en Machine Learning',
        company: 'Smart AItomation',
        period: 'nov. 2020 – feb. 2021',
        achievements: [
          'Desarrollé pipelines de machine learning de extremo a extremo, acelerando el despliegue de modelos y reduciendo el tiempo de entrega de soluciones de ML en producción',
          'Recopilé y preparé conjuntos de datos personalizados con Selenium y BeautifulSoup, habilitando entradas de datos de alta calidad para el entrenamiento y la evaluación',
          'Realicé análisis y visualización de datos con Pandas y Matplotlib, descubriendo información para guiar el refinamiento de los modelos',
          'Implementé y entrené modelos con scikit-learn (regresión logística) y spaCy (reconocimiento de entidades nombradas), mejorando la precisión y la velocidad de procesamiento',
          'Integré GitHub Actions para automatizar los flujos de CI/CD, asegurando experimentos de ML eficientes y reproducibles',
          'Desplegué aplicaciones de ML en contenedores en Heroku, permitiendo un acceso público sin fricciones a las demos y los prototipos del proyecto',
        ],
        tech: 'Python · scikit-learn · spaCy · Selenium · BeautifulSoup · Pandas · Matplotlib · GitHub Actions · Docker · Heroku',
      },
      {
        title: 'Ingeniero DevOps',
        company: 'EBS-Integrator',
        period: 'ago. 2020 – oct. 2020',
        achievements: [
          'Implementé y mantuve pipelines de CI en GitLab, optimizando los flujos de compilación, prueba y despliegue en múltiples entornos',
          'Desarrollé y gestioné playbooks de Ansible para la gestión de configuración y el aprovisionamiento automatizado, reduciendo el tiempo de configuración manual',
          'Construí y desplegué contenedores Docker, integrando Nginx para el balanceo de carga con el fin de mejorar el rendimiento y garantizar una alta disponibilidad',
          'Orquesté despliegues de microservicios con Docker Swarm, habilitando una arquitectura de aplicaciones modular, escalable y tolerante a fallos',
          'Colaboré con clientes para diseñar soluciones de infraestructura personalizadas, alineando las prácticas de DevOps con objetivos específicos de rendimiento y fiabilidad',
        ],
        tech: 'GitLab · Docker Swarm · Ansible · Nginx · Redis · Elasticsearch · RabbitMQ · GitHub',
      },
      {
        title: 'Prácticas en DevOps',
        company: 'Endava',
        period: 'mar. 2020 – jul. 2020',
        achievements: [
          'Implementación de GIT para el control fluido del código fuente, agilizando el proceso de control de versiones para una gestión eficiente del código',
          'Creación y mantenimiento de pipelines multirrama de Jenkins con Docker, mejorando así el proceso de automatización y despliegue dentro del equipo',
          'Uso de compilaciones multietapa de Docker para aislar el trabajo, garantizando un desarrollo de código limpio, eficiente y sin errores',
          'Uso de scripting en Python para enviar métricas de compilación desde el pipeline de Jenkins a Grafana para su visualización y análisis en profundidad',
          'Creación de un pipeline de despliegue para enviar las imágenes más recientes de aplicaciones Docker a AWS, mejorando la eficiencia de las actualizaciones y asegurando una entrega puntual',
        ],
      },
      {
        title: 'Soporte técnico de TI',
        company: 'Gilat',
        period: 'abr. 2017 – abr. 2020',
        achievements: [
          'Prestación de soporte de centro de llamadas 24/6, actuando como primer punto de contacto para la resolución de problemas de TI',
          'Especialización en la administración y resolución de problemas de una amplia variedad de productos de Microsoft para maximizar la productividad y la eficiencia',
          'Implementación de acceso seguro dentro de nuestra red de dominio para mantener altos estándares de seguridad y proteger frente a posibles amenazas',
          'Mantenimiento y gestión prácticos de sistemas SAP, garantizando su rendimiento óptimo para una operación empresarial fluida',
          'Operación y realización de tareas menores de desarrollo en Salesforce para mejorar su funcionalidad y la experiencia de usuario',
        ],
      },
      {
        title: 'Soporte técnico de TI',
        company: 'Contraproducoes',
        period: 'may. 2015 – dic. 2015',
        achievements: [
          'Mantenimiento de equipos informáticos',
          'Actualizaciones de software',
          'Mejora de la infraestructura de hardware',
          'Atención al cliente presencial',
        ],
      },
    ],

    // ---- additional info ----
    educationHeading: 'Formación',
    educationDegree: 'Bachillerato',
    languagesHeading: 'Idiomas',
    languages: [
      { name: 'Rumano', level: '(Nativo)' },
      { name: 'Inglés', level: '(C2)' },
      { name: 'Portugués', level: '(C1)' },
      { name: 'Ruso', level: '(B2)' },
    ],

    // ---- CTA ----
    ctaHeading: 'Conectemos',
    ctaText: '¿Te interesa colaborar o hablar sobre prácticas de DevOps?',
    ctaContact: 'Contáctame',
    ctaBlog: 'Leer mi blog',
  },
  pt: {
    // ---- meta ----
    metaTitle: 'Sobre mim — Consultor DevOps e Cloud',
    metaDescription:
      'Alexandru Pruteanu — consultor DevOps e cloud com mais de 6 anos construindo infraestrutura em produção na AWS, no Kubernetes e no Terraform, e lançando produtos de forma independente.',

    // ---- breadcrumb + header ----
    breadcrumbHome: 'Início',
    breadcrumbAbout: 'Sobre mim',
    h1: 'Sobre mim',
    headerSubtitle: 'Engenheiro DevOps especializado em infraestrutura cloud',
    contactLabel: 'E-mail:',
    socialGithub: 'GitHub',
    socialLinkedin: 'LinkedIn',
    socialChatter: 'Chatter',

    // ---- professional summary ----
    summaryHeading: 'Resumo profissional',
    summaryText:
      'Engenheiro DevOps com mais de 6 anos de experiência prática construindo e gerenciando infraestruturas cloud escaláveis com AWS, Kubernetes e Terraform. Histórico comprovado na automação de pipelines de CI/CD, na orquestração de containers e no provisionamento de infraestrutura em múltiplos ambientes. Habilidoso em melhorar a confiabilidade dos deploys, o monitoramento e a produtividade dos desenvolvedores por meio de ferramentas modernas de DevOps.',

    // ---- technical skills ----
    skillsHeading: 'Habilidades técnicas',
    skillCloud: 'Cloud e infraestrutura',
    skillCicd: 'CI/CD e automação',
    skillContainers: 'Containers e orquestração',
    skillMonitoring: 'Monitoramento e observabilidade',
    skillLanguages: 'Linguagens e bancos de dados',
    skillSecurity: 'Segurança e conformidade',

    // ---- professional experience ----
    experienceHeading: 'Experiência profissional',
    experienceTechLabel: 'Stack de tecnologias:',
    jobs: [
      {
        title: 'Engenheiro DevOps',
        company: 'Yopeso',
        period: 'set. 2023 – Atual',
        achievements: [
          'Projetei e implantei infraestrutura na AWS com Terraform e Helm, melhorando em 40% o tempo de provisionamento de ambientes',
          'Implantei e mantive clusters de Kubernetes para dar suporte a microsserviços em larga escala, aumentando a resiliência e a confiabilidade do sistema',
          'Automatizei o provisionamento e a configuração da infraestrutura com Ansible, reduzindo o tempo de deploy e o erro humano',
        ],
        tech: 'Terraform · AWS · Kubernetes · Helm · Jenkins · Ansible · Docker · Python · GitHub',
      },
      {
        title: 'Engenheiro DevOps',
        company: 'Quorum',
        period: 'fev. 2022 – mai. 2023',
        achievements: [
          'Gerenciei e provisionei infraestrutura na AWS com Terraform, garantindo deploys consistentes, escaláveis e auditáveis em todos os ambientes',
          'Configurei e mantive serviços essenciais da AWS — incluindo RDS (PostgreSQL/MySQL), Elasticache (Redis) e OpenSearch —, entregando plataformas de dados confiáveis e de alto desempenho',
          'Implementei papéis e políticas de IAM seguros para aplicar o acesso com privilégio mínimo e fortalecer a postura de segurança na nuvem',
          'Supervisionei o ciclo de vida das instâncias EC2, melhorando o uso de recursos e a eficiência de custos',
          'Construí e mantive pipelines de CI/CD com Jenkins, GitHub Actions e CircleCI, acelerando a entrega de software e reduzindo erros manuais',
          'Integrei o Datadog para o monitoramento da infraestrutura em tempo real, melhorando a disponibilidade e a observabilidade em sistemas distribuídos',
        ],
        tech: 'AWS · Terraform · Jenkins · CircleCI · GitHub · Datadog · Ansible · Kubernetes · Docker',
      },
      {
        title: 'Engenheiro DevOps',
        company: 'Grid Dynamics',
        period: 'mar. 2021 – jan. 2022',
        achievements: [
          'Hospedagem de aplicações de clientes no Google Cloud Platform (GCP), garantindo acessibilidade confiável e desempenho ideal',
          'Manutenção da infraestrutura de Kubernetes com o Google Kubernetes Engine (GKE), resultando em uma orquestração fluida de aplicações em containers',
          'Estabelecimento e manutenção de processos de CI/CD com ferramentas como Jenkins, Chef e Spinnaker, otimizando os fluxos de desenvolvimento e deploy',
          'Testes de cargas de trabalho em containers com Sonar e Black Duck, confirmando a qualidade, a segurança e a conformidade do software',
          'Introdução de novos microsserviços na stack existente, criando os pipelines e as receitas necessárias com Chef para VMs e Helm para Kubernetes',
          'Resposta ativa ao feedback dos desenvolvedores e ajustes adequados no modelo de infraestrutura para eliminar gargalos',
        ],
        tech: 'Google Cloud Platform (GCP) · Helm · Spinnaker · Ansible · Kubernetes',
      },
      {
        title: 'Estágio em Machine Learning',
        company: 'Smart AItomation',
        period: 'nov. 2020 – fev. 2021',
        achievements: [
          'Desenvolvi pipelines de machine learning de ponta a ponta, acelerando a implantação de modelos e reduzindo o tempo de entrega de soluções de ML em produção',
          'Coletei e preparei conjuntos de dados personalizados com Selenium e BeautifulSoup, viabilizando entradas de dados de alta qualidade para treinamento e avaliação',
          'Realizei análise e visualização de dados com Pandas e Matplotlib, revelando insights para orientar o refinamento dos modelos',
          'Implementei e treinei modelos com scikit-learn (regressão logística) e spaCy (reconhecimento de entidades nomeadas), melhorando a precisão e a velocidade de processamento',
          'Integrei o GitHub Actions para automatizar os fluxos de CI/CD, garantindo experimentos de ML eficientes e reproduzíveis',
          'Implantei aplicações de ML em containers no Heroku, permitindo acesso público sem atritos às demonstrações e aos protótipos do projeto',
        ],
        tech: 'Python · scikit-learn · spaCy · Selenium · BeautifulSoup · Pandas · Matplotlib · GitHub Actions · Docker · Heroku',
      },
      {
        title: 'Engenheiro DevOps',
        company: 'EBS-Integrator',
        period: 'ago. 2020 – out. 2020',
        achievements: [
          'Implementei e mantive pipelines de CI no GitLab, otimizando os fluxos de build, teste e deploy em múltiplos ambientes',
          'Desenvolvi e gerenciei playbooks de Ansible para gerenciamento de configuração e provisionamento automatizado, reduzindo o tempo de configuração manual',
          'Construí e implantei containers Docker, integrando o Nginx para balanceamento de carga a fim de aprimorar o desempenho e garantir alta disponibilidade',
          'Orquestrei deploys de microsserviços com Docker Swarm, viabilizando uma arquitetura de aplicações modular, escalável e tolerante a falhas',
          'Colaborei com clientes para projetar soluções de infraestrutura personalizadas, alinhando as práticas de DevOps a metas específicas de desempenho e confiabilidade',
        ],
        tech: 'GitLab · Docker Swarm · Ansible · Nginx · Redis · Elasticsearch · RabbitMQ · GitHub',
      },
      {
        title: 'Estágio em DevOps',
        company: 'Endava',
        period: 'mar. 2020 – jul. 2020',
        achievements: [
          'Implementação do GIT para o controle fluido do código-fonte, otimizando o processo de controle de versão para um gerenciamento eficiente do código',
          'Criação e manutenção de pipelines multibranch do Jenkins com Docker, aprimorando assim o processo de automação e deploy na equipe',
          'Uso de builds multiestágio do Docker para isolar o trabalho, garantindo um desenvolvimento de código limpo, eficiente e livre de erros',
          'Uso de scripts em Python para enviar métricas de build do pipeline do Jenkins ao Grafana para visualização e análise aprofundada',
          'Criação de um pipeline de deploy para enviar as imagens mais recentes de aplicações Docker à AWS, aumentando a eficiência das atualizações e garantindo entrega pontual',
        ],
      },
      {
        title: 'Suporte técnico de TI',
        company: 'Gilat',
        period: 'abr. 2017 – abr. 2020',
        achievements: [
          'Prestação de suporte de call center 24/6, atuando como primeiro ponto de contato para a resolução de problemas de TI',
          'Especialização na administração e resolução de problemas de uma ampla variedade de produtos Microsoft para maximizar a produtividade e a eficiência',
          'Implementação de acesso seguro em nossa rede de domínio para manter altos padrões de segurança e proteger contra possíveis ameaças',
          'Manutenção e gerenciamento práticos de sistemas SAP, garantindo seu desempenho ideal para uma operação de negócios fluida',
          'Operação e execução de pequenas tarefas de desenvolvimento no Salesforce para aprimorar sua funcionalidade e a experiência do usuário',
        ],
      },
      {
        title: 'Suporte técnico de TI',
        company: 'Contraproducoes',
        period: 'maio 2015 – dez. 2015',
        achievements: [
          'Manutenção de computadores',
          'Atualizações de software',
          'Upgrade da infraestrutura de hardware',
          'Atendimento ao cliente presencial',
        ],
      },
    ],

    // ---- additional info ----
    educationHeading: 'Formação',
    educationDegree: 'Ensino médio',
    languagesHeading: 'Idiomas',
    languages: [
      { name: 'Romeno', level: '(Nativo)' },
      { name: 'Inglês', level: '(C2)' },
      { name: 'Português', level: '(C1)' },
      { name: 'Russo', level: '(B2)' },
    ],

    // ---- CTA ----
    ctaHeading: 'Vamos nos conectar',
    ctaText: 'Tem interesse em trabalhar em conjunto ou conversar sobre práticas de DevOps?',
    ctaContact: 'Fale comigo',
    ctaBlog: 'Ler meu blog',
  },
  fr: {
    // ---- meta ----
    metaTitle: 'À propos — Consultant DevOps et Cloud',
    metaDescription:
      'Alexandru Pruteanu — consultant DevOps et cloud fort de plus de 6 ans à concevoir des infrastructures en production sur AWS, Kubernetes et Terraform, et à lancer des produits en solo.',

    // ---- breadcrumb + header ----
    breadcrumbHome: 'Accueil',
    breadcrumbAbout: 'À propos',
    h1: 'À propos de moi',
    headerSubtitle: "Ingénieur DevOps spécialisé dans l'infrastructure cloud",
    contactLabel: 'E-mail :',
    socialGithub: 'GitHub',
    socialLinkedin: 'LinkedIn',
    socialChatter: 'Chatter',

    // ---- professional summary ----
    summaryHeading: 'Profil professionnel',
    summaryText:
      "Ingénieur DevOps fort de plus de 6 ans d'expérience concrète dans la conception et la gestion d'infrastructures cloud évolutives avec AWS, Kubernetes et Terraform. Expérience éprouvée dans l'automatisation des pipelines CI/CD, l'orchestration de conteneurs et le provisionnement d'infrastructure sur de multiples environnements. À l'aise pour améliorer la fiabilité des déploiements, la supervision et la productivité des développeurs grâce à des outils DevOps modernes.",

    // ---- technical skills ----
    skillsHeading: 'Compétences techniques',
    skillCloud: 'Cloud et infrastructure',
    skillCicd: 'CI/CD et automatisation',
    skillContainers: 'Conteneurs et orchestration',
    skillMonitoring: 'Supervision et observabilité',
    skillLanguages: 'Langages et bases de données',
    skillSecurity: 'Sécurité et conformité',

    // ---- professional experience ----
    experienceHeading: 'Expérience professionnelle',
    experienceTechLabel: 'Stack technique :',
    jobs: [
      {
        title: 'Ingénieur DevOps',
        company: 'Yopeso',
        period: 'sept. 2023 – Actuel',
        achievements: [
          "Conception et déploiement d'une infrastructure AWS avec Terraform et Helm, réduisant de 40 % le temps de provisionnement des environnements",
          'Déploiement et maintenance de clusters Kubernetes pour prendre en charge des microservices à grande échelle, améliorant la résilience et la fiabilité du système',
          "Automatisation du provisionnement et de la configuration de l'infrastructure avec Ansible, réduisant le temps de déploiement et les erreurs humaines",
        ],
        tech: 'Terraform · AWS · Kubernetes · Helm · Jenkins · Ansible · Docker · Python · GitHub',
      },
      {
        title: 'Ingénieur DevOps',
        company: 'Quorum',
        period: 'févr. 2022 – mai 2023',
        achievements: [
          "Gestion et provisionnement d'une infrastructure AWS avec Terraform, garantissant des déploiements cohérents, évolutifs et auditables sur tous les environnements",
          'Configuration et maintenance de services AWS clés — dont RDS (PostgreSQL/MySQL), Elasticache (Redis) et OpenSearch —, offrant des plateformes de données fiables et performantes',
          'Mise en place de rôles et de politiques IAM sécurisés pour appliquer le principe du moindre privilège et renforcer la posture de sécurité cloud',
          "Supervision du cycle de vie des instances EC2, améliorant l'utilisation des ressources et l'efficacité des coûts",
          'Création et maintenance de pipelines CI/CD avec Jenkins, GitHub Actions et CircleCI, accélérant la livraison logicielle et réduisant les erreurs manuelles',
          "Intégration de Datadog pour la supervision de l'infrastructure en temps réel, améliorant la disponibilité et l'observabilité des systèmes distribués",
        ],
        tech: 'AWS · Terraform · Jenkins · CircleCI · GitHub · Datadog · Ansible · Kubernetes · Docker',
      },
      {
        title: 'Ingénieur DevOps',
        company: 'Grid Dynamics',
        period: 'mars 2021 – janv. 2022',
        achievements: [
          'Hébergement des applications clientes sur Google Cloud Platform (GCP), garantissant une accessibilité fiable et des performances optimales',
          "Maintenance de l'infrastructure Kubernetes en s'appuyant sur Google Kubernetes Engine (GKE), assurant une orchestration fluide des applications conteneurisées",
          'Mise en place et maintenance de processus CI/CD avec des outils tels que Jenkins, Chef et Spinnaker, rationalisant les flux de développement et de déploiement',
          'Test des charges de travail conteneurisées avec Sonar et Black Duck, confirmant la qualité, la sécurité et la conformité du logiciel',
          'Introduction de nouveaux microservices dans la stack existante, création des pipelines et des recettes nécessaires avec Chef pour les VM et Helm pour Kubernetes',
          "Réponse active aux retours des développeurs et adaptation du modèle d'infrastructure pour éliminer les goulots d'étranglement",
        ],
        tech: 'Google Cloud Platform (GCP) · Helm · Spinnaker · Ansible · Kubernetes',
      },
      {
        title: 'Stage en Machine Learning',
        company: 'Smart AItomation',
        period: 'nov. 2020 – févr. 2021',
        achievements: [
          'Développement de pipelines de machine learning de bout en bout, accélérant le déploiement des modèles et réduisant les délais de livraison des solutions de ML en production',
          "Collecte et préparation de jeux de données personnalisés avec Selenium et BeautifulSoup, permettant des données d'entrée de haute qualité pour l'entraînement et l'évaluation",
          "Analyse et visualisation de données avec Pandas et Matplotlib, révélant des informations pour guider l'affinement des modèles",
          "Implémentation et entraînement de modèles avec scikit-learn (régression logistique) et spaCy (reconnaissance d'entités nommées), améliorant la précision et la vitesse de traitement",
          'Intégration de GitHub Actions pour automatiser les flux CI/CD, garantissant des expériences de ML efficaces et reproductibles',
          "Déploiement d'applications de ML conteneurisées sur Heroku, offrant un accès public fluide aux démonstrations et prototypes du projet",
        ],
        tech: 'Python · scikit-learn · spaCy · Selenium · BeautifulSoup · Pandas · Matplotlib · GitHub Actions · Docker · Heroku',
      },
      {
        title: 'Ingénieur DevOps',
        company: 'EBS-Integrator',
        period: 'août 2020 – oct. 2020',
        achievements: [
          'Implémentation et maintenance de pipelines CI dans GitLab, optimisant les flux de build, de test et de déploiement sur de multiples environnements',
          'Développement et gestion de playbooks Ansible pour la gestion de configuration et le provisionnement automatisé, réduisant le temps de configuration manuelle',
          "Construction et déploiement de conteneurs Docker, avec intégration de Nginx pour la répartition de charge afin d'améliorer les performances et d'assurer une haute disponibilité",
          'Orchestration des déploiements de microservices avec Docker Swarm, permettant une architecture applicative modulaire, évolutive et tolérante aux pannes',
          "Collaboration avec les clients pour concevoir des solutions d'infrastructure sur mesure, alignant les pratiques DevOps sur des objectifs précis de performance et de fiabilité",
        ],
        tech: 'GitLab · Docker Swarm · Ansible · Nginx · Redis · Elasticsearch · RabbitMQ · GitHub',
      },
      {
        title: 'Stage en DevOps',
        company: 'Endava',
        period: 'mars 2020 – juil. 2020',
        achievements: [
          'Mise en place de GIT pour un contrôle fluide du code source, rationalisant le processus de gestion de versions pour une gestion efficace du code',
          "Création et maintenance de pipelines Jenkins multi-branches avec Docker, améliorant ainsi le processus d'automatisation et de déploiement au sein de l'équipe",
          'Utilisation des builds multi-étapes de Docker pour isoler le travail, garantissant un développement de code propre, efficace et sans erreur',
          'Utilisation de scripts Python pour envoyer les métriques de build du pipeline Jenkins vers Grafana à des fins de visualisation et d\'analyse approfondie',
          "Création d'un pipeline de déploiement pour pousser les dernières images d'applications Docker vers AWS, améliorant l'efficacité des mises à jour et garantissant une livraison dans les délais",
        ],
      },
      {
        title: 'Support informatique',
        company: 'Gilat',
        period: 'avr. 2017 – avr. 2020',
        achievements: [
          "Fourniture d'un support de centre d'appels 24/6, en tant que premier point de contact pour le dépannage et la résolution des problèmes informatiques",
          "Spécialisation dans l'administration et le dépannage d'une grande variété de produits Microsoft afin de maximiser la productivité et l'efficacité",
          "Mise en place d'un accès sécurisé au sein de notre réseau de domaine pour maintenir des normes de sécurité élevées et protéger contre les menaces potentielles",
          "Maintenance et gestion pratiques des systèmes SAP, garantissant leurs performances optimales pour un fonctionnement fluide de l'entreprise",
          "Exploitation et réalisation de tâches de développement mineures sur Salesforce pour améliorer ses fonctionnalités et l'expérience utilisateur",
        ],
      },
      {
        title: 'Support informatique',
        company: 'Contraproducoes',
        period: 'mai 2015 – déc. 2015',
        achievements: [
          'Maintenance informatique',
          'Mises à jour logicielles',
          "Mise à niveau de l'infrastructure matérielle",
          'Support client en présentiel',
        ],
      },
    ],

    // ---- additional info ----
    educationHeading: 'Formation',
    educationDegree: 'Baccalauréat',
    languagesHeading: 'Langues',
    languages: [
      { name: 'Roumain', level: '(Langue maternelle)' },
      { name: 'Anglais', level: '(C2)' },
      { name: 'Portugais', level: '(C1)' },
      { name: 'Russe', level: '(B2)' },
    ],

    // ---- CTA ----
    ctaHeading: 'Restons en contact',
    ctaText: 'Vous souhaitez collaborer ou échanger sur les pratiques DevOps ?',
    ctaContact: 'Me contacter',
    ctaBlog: 'Lire mon blog',
  },
  ro: {
    // ---- meta ----
    metaTitle: 'Despre mine — Consultant DevOps și Cloud',
    metaDescription:
      'Alexandru Pruteanu — consultant DevOps și cloud cu peste 6 ani de experiență în construirea de infrastructuri de producție pe AWS, Kubernetes și Terraform și în lansarea de produse pe cont propriu.',

    // ---- breadcrumb + header ----
    breadcrumbHome: 'Acasă',
    breadcrumbAbout: 'Despre mine',
    h1: 'Despre mine',
    headerSubtitle: 'Inginer DevOps specializat în infrastructură cloud',
    contactLabel: 'E-mail:',
    socialGithub: 'GitHub',
    socialLinkedin: 'LinkedIn',
    socialChatter: 'Chatter',

    // ---- professional summary ----
    summaryHeading: 'Profil profesional',
    summaryText:
      'Inginer DevOps cu peste 6 ani de experiență practică în construirea și administrarea de infrastructuri cloud scalabile folosind AWS, Kubernetes și Terraform. Rezultate dovedite în automatizarea pipeline-urilor CI/CD, orchestrarea containerelor și aprovizionarea infrastructurii în multiple medii. Priceput în îmbunătățirea fiabilității implementărilor, a monitorizării și a productivității dezvoltatorilor prin instrumente moderne de DevOps.',

    // ---- technical skills ----
    skillsHeading: 'Competențe tehnice',
    skillCloud: 'Cloud și infrastructură',
    skillCicd: 'CI/CD și automatizare',
    skillContainers: 'Containere și orchestrare',
    skillMonitoring: 'Monitorizare și observabilitate',
    skillLanguages: 'Limbaje și baze de date',
    skillSecurity: 'Securitate și conformitate',

    // ---- professional experience ----
    experienceHeading: 'Experiență profesională',
    experienceTechLabel: 'Stivă tehnologică:',
    jobs: [
      {
        title: 'Inginer DevOps',
        company: 'Yopeso',
        period: 'sept. 2023 – Prezent',
        achievements: [
          'Am proiectat și implementat infrastructură AWS folosind Terraform și Helm, îmbunătățind cu 40% timpul de aprovizionare a mediilor',
          'Am implementat și întreținut clustere Kubernetes pentru a susține microservicii la scară largă, îmbunătățind reziliența și fiabilitatea sistemului',
          'Am automatizat aprovizionarea și configurarea infrastructurii cu Ansible, reducând timpul de implementare și erorile umane',
        ],
        tech: 'Terraform · AWS · Kubernetes · Helm · Jenkins · Ansible · Docker · Python · GitHub',
      },
      {
        title: 'Inginer DevOps',
        company: 'Quorum',
        period: 'feb. 2022 – mai 2023',
        achievements: [
          'Am administrat și aprovizionat infrastructură AWS folosind Terraform, asigurând implementări consecvente, scalabile și auditabile în toate mediile',
          'Am configurat și întreținut servicii AWS esențiale — inclusiv RDS (PostgreSQL/MySQL), Elasticache (Redis) și OpenSearch —, oferind platforme de date fiabile și performante',
          'Am implementat roluri și politici IAM securizate pentru a impune accesul cu privilegii minime și a consolida securitatea în cloud',
          'Am supravegheat ciclul de viață al instanțelor EC2, îmbunătățind utilizarea resurselor și eficiența costurilor',
          'Am construit și întreținut pipeline-uri CI/CD cu Jenkins, GitHub Actions și CircleCI, accelerând livrarea software-ului și reducând erorile manuale',
          'Am integrat Datadog pentru monitorizarea infrastructurii în timp real, îmbunătățind disponibilitatea și observabilitatea în sistemele distribuite',
        ],
        tech: 'AWS · Terraform · Jenkins · CircleCI · GitHub · Datadog · Ansible · Kubernetes · Docker',
      },
      {
        title: 'Inginer DevOps',
        company: 'Grid Dynamics',
        period: 'mar. 2021 – ian. 2022',
        achievements: [
          'Găzduirea aplicațiilor clienților pe Google Cloud Platform (GCP), asigurând accesibilitate fiabilă și performanță optimă',
          'Întreținerea infrastructurii Kubernetes folosind Google Kubernetes Engine (GKE), rezultând într-o orchestrare fluidă a aplicațiilor containerizate',
          'Stabilirea și întreținerea proceselor CI/CD cu instrumente precum Jenkins, Chef și Spinnaker, optimizând fluxurile de dezvoltare și implementare',
          'Testarea sarcinilor de lucru containerizate cu Sonar și Black Duck, confirmând calitatea, securitatea și conformitatea software-ului',
          'Introducerea de noi microservicii în stiva existentă, creând pipeline-urile și rețetele necesare folosind Chef pentru mașini virtuale și Helm pentru Kubernetes',
          'Răspunsul activ la feedbackul dezvoltatorilor și efectuarea modificărilor adecvate în modelul de infrastructură pentru a elimina blocajele',
        ],
        tech: 'Google Cloud Platform (GCP) · Helm · Spinnaker · Ansible · Kubernetes',
      },
      {
        title: 'Stagiu în Machine Learning',
        company: 'Smart AItomation',
        period: 'nov. 2020 – feb. 2021',
        achievements: [
          'Am dezvoltat pipeline-uri de machine learning de la un capăt la altul, accelerând implementarea modelelor și reducând timpul de livrare pentru soluțiile ML de producție',
          'Am colectat și pregătit seturi de date personalizate prin Selenium și BeautifulSoup, permițând date de intrare de înaltă calitate pentru antrenare și evaluare',
          'Am efectuat analiza și vizualizarea datelor cu Pandas și Matplotlib, descoperind informații pentru a ghida rafinarea modelelor',
          'Am implementat și antrenat modele folosind scikit-learn (regresie logistică) și spaCy (recunoașterea entităților denumite), îmbunătățind acuratețea și viteza de procesare',
          'Am integrat GitHub Actions pentru a automatiza fluxurile CI/CD, asigurând experimente ML eficiente și reproductibile',
          'Am implementat aplicații ML containerizate pe Heroku, permițând acces public fără fricțiuni la demonstrațiile și prototipurile proiectului',
        ],
        tech: 'Python · scikit-learn · spaCy · Selenium · BeautifulSoup · Pandas · Matplotlib · GitHub Actions · Docker · Heroku',
      },
      {
        title: 'Inginer DevOps',
        company: 'EBS-Integrator',
        period: 'aug. 2020 – oct. 2020',
        achievements: [
          'Am implementat și întreținut pipeline-uri CI în GitLab, optimizând fluxurile de build, testare și implementare în multiple medii',
          'Am dezvoltat și gestionat playbook-uri Ansible pentru gestionarea configurației și aprovizionarea automatizată, reducând timpul de configurare manuală',
          'Am construit și implementat containere Docker, integrând Nginx pentru echilibrarea încărcării pentru a îmbunătăți performanța și a asigura o disponibilitate ridicată',
          'Am orchestrat implementări de microservicii folosind Docker Swarm, permițând o arhitectură a aplicațiilor modulară, scalabilă și tolerantă la erori',
          'Am colaborat cu clienții pentru a proiecta soluții de infrastructură personalizate, aliniind practicile DevOps la obiective specifice de performanță și fiabilitate',
        ],
        tech: 'GitLab · Docker Swarm · Ansible · Nginx · Redis · Elasticsearch · RabbitMQ · GitHub',
      },
      {
        title: 'Stagiu în DevOps',
        company: 'Endava',
        period: 'mar. 2020 – iul. 2020',
        achievements: [
          'Implementarea GIT pentru controlul fluid al codului sursă, optimizând procesul de control al versiunilor pentru o gestionare eficientă a codului',
          'Crearea și întreținerea de pipeline-uri Jenkins cu mai multe ramuri folosind Docker, îmbunătățind astfel procesul de automatizare și implementare în cadrul echipei',
          'Utilizarea build-urilor Docker în mai multe etape pentru a izola munca, asigurând o dezvoltare a codului curată, eficientă și fără erori',
          'Utilizarea abilităților de scriptare în Python pentru a trimite metrici de build din pipeline-ul Jenkins către Grafana pentru vizualizare și analiză aprofundată',
          'Crearea unui pipeline de implementare pentru a trimite cele mai noi imagini de aplicații Docker către AWS, îmbunătățind eficiența actualizărilor și asigurând o livrare la timp',
        ],
      },
      {
        title: 'Suport IT',
        company: 'Gilat',
        period: 'apr. 2017 – apr. 2020',
        achievements: [
          'Furnizarea de suport de tip call center 24/6, acționând ca prim punct de contact pentru depanarea și rezolvarea problemelor IT',
          'Specializarea în administrarea și depanarea unei game variate de produse Microsoft pentru a maximiza productivitatea și eficiența',
          'Implementarea accesului securizat în cadrul rețelei noastre de domeniu pentru a menține standarde ridicate de securitate și a proteja împotriva amenințărilor potențiale',
          'Întreținerea și administrarea practică a sistemelor SAP, asigurând performanța lor optimă pentru operațiuni de afaceri fluide',
          'Operarea și efectuarea de sarcini minore de dezvoltare pe Salesforce pentru a-i îmbunătăți funcționalitatea și experiența utilizatorului',
        ],
      },
      {
        title: 'Suport IT',
        company: 'Contraproducoes',
        period: 'mai 2015 – dec. 2015',
        achievements: [
          'Întreținerea calculatoarelor',
          'Actualizări de software',
          'Modernizarea infrastructurii hardware',
          'Asistență clienți față în față',
        ],
      },
    ],

    // ---- additional info ----
    educationHeading: 'Educație',
    educationDegree: 'Diplomă de bacalaureat',
    languagesHeading: 'Limbi',
    languages: [
      { name: 'Română', level: '(Nativ)' },
      { name: 'Engleză', level: '(C2)' },
      { name: 'Portugheză', level: '(C1)' },
      { name: 'Rusă', level: '(B2)' },
    ],

    // ---- CTA ----
    ctaHeading: 'Să luăm legătura',
    ctaText: 'Vă interesează o colaborare sau o discuție despre practicile DevOps?',
    ctaContact: 'Contactați-mă',
    ctaBlog: 'Citiți blogul meu',
  },
} as const;

export function getAboutContent(lang: Lang) {
  return { ...about.en, ...about[lang] };
}
