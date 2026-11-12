// Todos os textos fixos do site, por idioma.
// Para adicionar um idioma: copie o bloco `pt`, troque a chave (ex.: es) e traduza.
// Depois inclua o código dele (e o nome nativo) em LANGUAGES, em LanguageSwitch.jsx.

export const translations = {
  pt: {
    lang: { label: 'Idioma', pt: 'Português', en: 'English', es: 'Español' },
    nav: {
      work: 'Trabalhos',
      about: 'Sobre',
      skills: 'Habilidades',
      contact: 'Contato',
      openMenu: 'Abrir menu',
      closeMenu: 'Fechar menu',
    },
    hero: {
      eyebrow: 'Portfólio',
      titleBefore: 'Trabalhos pensados para',
      titleEm: 'brilhar',
      titleAfter: 'na medida certa.',
      line1:
        'Profissional web design, com 12 anos de atuação formada em design gráfico.',
      line2:
        'Experiência no processo de desenvolvimento de identidade visual, suporte de clientes e elaboração de peças gráficas.',
      ctaWork: 'Ver trabalhos',
      ctaContact: 'Falar comigo',
    },
    work: {
      eyebrow: 'Seleção',
      title: 'Trabalhos',
      intro:
        'Uma curadoria dos projetos que melhor representam minhas habilidades. Clique em um tema para ver mais imagens.',
      count: (n) => (n === 1 ? '1 imagem' : `${n} imagens`),
      viewProject: 'Ver projeto',
      empty: 'Em breve, novas imagens.',
      galleryLabel: (title) => `Galeria: ${title}`,
      closeGallery: (title) => `Fechar galeria ${title}`,
      enlarge: (alt) => `Ampliar: ${alt}`,
      imageN: (n) => `imagem ${n}`,
      lightboxLabel: (title, i, total) => `${title} — imagem ${i} de ${total}`,
      close: 'Fechar',
      prev: 'Imagem anterior',
      next: 'Próxima imagem',
      zoomIn: 'Aumentar zoom',
      zoomOut: 'Diminuir zoom',
      zoomReset: 'Ajustar à tela',
    },
    about: {
      eyebrow: 'Sobre',
      p1: 'Meu interesse por desenho e animação me levou ao Web Design, área em que atuo com uma visão ampla das diferentes frentes do design. Ao longo de 12 anos em uma empresa de software, desenvolvi minha experiência em identidade visual, atendimento a clientes e criação de peças gráficas.',
      p2: 'Estou sempre em busca de aprender e me atualizar. Priorizo o cumprimento de prazos e mantenho uma comunicação clara e eficiente, com alinhamentos e confirmações ao longo de todo o projeto, para entregar o melhor resultado possível.',
      stats: [
        { value: '+400', label: 'Projetos entregues' },
        { value: '12', label: 'Anos de experiência' },
      ],
    },
    skills: {
      eyebrow: 'Competências',
      title: 'Habilidades',
      intro: '',
    },
    contact: {
      eyebrow: 'Contato',
      titleBefore: 'Vamos criar algo',
      titleEm: 'memorável',
      titleAfter: 'juntos?',
      text: 'Envie uma mensagem contando sobre seu projeto — respondo pessoalmente em até dois dias úteis.',
    },
    footer: {
      rights: (year) => `© ${year} Nicole Augusto. Todos os direitos reservados.`,
    },
  },

  en: {
    lang: { label: 'Language', pt: 'Português', en: 'English', es: 'Español' },
    nav: {
      work: 'Work',
      about: 'About',
      skills: 'Skills',
      contact: 'Contact',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    hero: {
      eyebrow: 'Portfolio',
      titleBefore: 'Work crafted to',
      titleEm: 'shine',
      titleAfter: 'just the right amount.',
      line1:
        'Web design professional with 12 years of experience and a background in graphic design.',
      line2:
        'Experienced in developing visual identities, supporting clients and creating graphic pieces.',
      ctaWork: 'View work',
      ctaContact: 'Get in touch',
    },
    work: {
      eyebrow: 'Selection',
      title: 'Work',
      intro:
        'A selection of the projects that best represent my skills. Click a theme to see more images.',
      count: (n) => (n === 1 ? '1 image' : `${n} images`),
      viewProject: 'View project',
      empty: 'New images coming soon.',
      galleryLabel: (title) => `Gallery: ${title}`,
      closeGallery: (title) => `Close ${title} gallery`,
      enlarge: (alt) => `Enlarge: ${alt}`,
      imageN: (n) => `image ${n}`,
      lightboxLabel: (title, i, total) => `${title} — image ${i} of ${total}`,
      close: 'Close',
      prev: 'Previous image',
      next: 'Next image',
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom out',
      zoomReset: 'Fit to screen',
    },
    about: {
      eyebrow: 'About',
      p1: 'My interest in drawing and animation led me to Web Design, a field in which I work with a broad view of the different areas of design. Over 12 years at a software company, I developed my experience in visual identity, client support and the creation of graphic pieces.',
      p2: 'I’m always looking to learn and stay up to date. I prioritize meeting deadlines and keep communication clear and efficient, with regular check-ins and confirmations throughout the project, to deliver the best possible result.',
      stats: [
        { value: '+400', label: 'Projects delivered' },
        { value: '12', label: 'Years of experience' },
      ],
    },
    skills: {
      eyebrow: 'Expertise',
      title: 'Skills',
      intro: '',
    },
    contact: {
      eyebrow: 'Contact',
      titleBefore: "Let's create something",
      titleEm: 'memorable',
      titleAfter: 'together?',
      text: 'Send me a message about your project — I reply personally within two business days.',
    },
    footer: {
      rights: (year) => `© ${year} Nicole Augusto. All rights reserved.`,
    },
  },

  es: {
    lang: { label: 'Idioma', pt: 'Português', en: 'English', es: 'Español' },
    nav: {
      work: 'Trabajos',
      about: 'Sobre mí',
      skills: 'Habilidades',
      contact: 'Contacto',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
    },
    hero: {
      eyebrow: 'Portafolio',
      titleBefore: 'Trabajos pensados para',
      titleEm: 'brillar',
      titleAfter: 'en su justa medida.',
      line1:
        'Profesional de diseño web, con 12 años de trayectoria y formación en diseño gráfico.',
      line2:
        'Experiencia en el desarrollo de identidad visual, atención a clientes y elaboración de piezas gráficas.',
      ctaWork: 'Ver trabajos',
      ctaContact: 'Hablemos',
    },
    work: {
      eyebrow: 'Selección',
      title: 'Trabajos',
      intro:
        'Una curaduría de los proyectos que mejor representan mis habilidades. Haz clic en un tema para ver más imágenes.',
      count: (n) => (n === 1 ? '1 imagen' : `${n} imágenes`),
      viewProject: 'Ver proyecto',
      empty: 'Próximamente, nuevas imágenes.',
      galleryLabel: (title) => `Galería: ${title}`,
      closeGallery: (title) => `Cerrar galería ${title}`,
      enlarge: (alt) => `Ampliar: ${alt}`,
      imageN: (n) => `imagen ${n}`,
      lightboxLabel: (title, i, total) => `${title} — imagen ${i} de ${total}`,
      close: 'Cerrar',
      prev: 'Imagen anterior',
      next: 'Siguiente imagen',
      zoomIn: 'Acercar',
      zoomOut: 'Alejar',
      zoomReset: 'Ajustar a la pantalla',
    },
    about: {
      eyebrow: 'Sobre mí',
      p1: 'Mi interés por el dibujo y la animación me llevó al Diseño Web, un área en la que trabajo con una visión amplia de los distintos frentes del diseño. A lo largo de 12 años en una empresa de software, desarrollé mi experiencia en identidad visual, atención a clientes y creación de piezas gráficas.',
      p2: 'Siempre estoy en busca de aprender y mantenerme al día. Priorizo el cumplimiento de los plazos y mantengo una comunicación clara y eficiente, con alineaciones y confirmaciones a lo largo de todo el proyecto, para entregar el mejor resultado posible.',
      stats: [
        { value: '+400', label: 'Proyectos entregados' },
        { value: '12', label: 'Años de experiencia' },
      ],
    },
    skills: {
      eyebrow: 'Competencias',
      title: 'Habilidades',
      intro: '',
    },
    contact: {
      eyebrow: 'Contacto',
      titleBefore: '¿Creamos algo',
      titleEm: 'memorable',
      titleAfter: 'juntos?',
      text: 'Envíame un mensaje contándome sobre tu proyecto — respondo personalmente en un plazo de dos días hábiles.',
    },
    footer: {
      rights: (year) => `© ${year} Nicole Augusto. Todos los derechos reservados.`,
    },
  },
}
