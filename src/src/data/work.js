// Edite este array para trocar os temas exibidos na seção "Trabalhos".
//
// Cada item é um TEMA (card). Ao clicar no card, a sub-galeria dele se expande
// mostrando as imagens do array `images`.
//
// Campos:
//   id          identificador único (string)
//   title, tag  texto do card
//   description (opcional) texto curto exibido no topo da sub-galeria
//   gradient    fundo CSS usado como capa/placeholder enquanto não há imagem
//   cover       (opcional) imagem de capa do card. Se omitido, usa a 1ª imagem com `src`
//   link        (opcional) URL externa — vira o botão "Ver projeto" na sub-galeria
//   images      lista de { src, thumb?, alt } — `src` vazio mostra um placeholder com o gradiente
//               thumb = versão leve usada na grade (a `src`, maior, só abre ao clicar e dá zoom)
//               vídeos: { type: 'video', src, poster, alt }

// Atalho para apontar para arquivos dentro de src/image/
// Uso: src: img('ilustracao-01.jpg')
const img = (file) => new URL(`../image/${file}`, import.meta.url).href
const vid = (file) => new URL(`../image/${file}`, import.meta.url).href

// Gera placeholders enquanto você não adiciona as imagens reais.
// Pode apagar essa função e escrever as imagens à mão (ver exemplo no 1º item).
const slots = (label, n) =>
  Array.from({ length: n }, (_, i) => ({
    alt: `${label} ${String(i + 1).padStart(2, '0')}`,
  }))

export const workItems = [
  {
    id: 'identidade-aurora',
    title: 'Ilustrações',
    tag: 'Desenho · Direção de arte',
    gradient: 'linear-gradient(150deg, #3a2a63, #12162f)',
    // cover: img('ilustracao-capa.jpg'),
    images: [
      { src: img('ilustracao-01.webp'), thumb: img('ilustracao-01-thumb.webp'), alt: 'Um cenário de floresta escuro, com um raio de luz no meio, onde é possível ver três criaturas (pokémons) no meio das árvores, imagem feita no ClipStudio Paint' },
      { src: img('ilustracao-02.webp'), thumb: img('ilustracao-02-thumb.webp'), alt: 'Três personagens, crianças admirando um filhote de pássarinho - imagem feita no ClipStudio Paint' },
      { src: img('ilustracao-03.webp'), thumb: img('ilustracao-03-thumb.webp'), alt: 'Imagem com personagem no centro em um ângulo de baixo para cima, com uma contrução ao fundo e a visão do céu, imagem feita no ClipStudio Paint' },
      //{ src: img('ilustracao-04.webp'), thumb: img('ilustracao-04-thumb.webp'), alt: 'Descrição da imagem' },
      { src: img('ilustracao-05.gif'), alt: 'Uma animação ilustrada de um gato da raça sphinx andando em loop - animação feita no ClipStudio Paint' },
      { src: img('ilustracao-06.webp'), thumb: img('ilustracao-06-thumb.webp'), alt: 'Ilustração de um cachorrinho da raça Lulu da Pomerânia no bolso - imagem feita no ClipStudio Paint' },
      { src: img('ilustracao-07.webp'), thumb: img('ilustracao-07-thumb.webp'), alt: 'Imagem feita para projeto da versão mais jovem de personagens conhecidos de jogos - imagem feita no ClipStudio Paint' },
      { src: img('ilustracao-08.webp'), alt: 'Uma animação ilustrada de um cachorro da raça Lulu da Pomerânia andando em loop - animação feita no ClipStudio Paint' },
      { src: img('ilustracao-09.webp'), thumb: img('ilustracao-09-thumb.webp'), alt: 'Rascunhos para mascote da Apdata, testes de aparência - imagem feita no Photoshop' },
      { src: img('ilustracao-10.webp'), thumb: img('ilustracao-10-thumb.webp'), alt: 'Mascote escolhida finalizada, personagem feminina estilizada de forma cartoon com pose simpática - imagem feita no Photoshop' },
      // { src: img('ilustracao-01.webp'), thumb: img('ilustracao-01-thumb.webp'), alt: 'Descrição da imagem' },
    ],
  },
  {
    id: 'constelacao-app',
    title: 'Web Development',
    tag: 'Web design · UI/UX · Edição',
    gradient: 'linear-gradient(150deg, #1c2f4a, #0a0e22)',
    cover: img('web-01-thumb.webp'),
    images: [
      { src: img('web-01.webp'), thumb: img('web-01-thumb.webp'), alt: 'Site feito com base no curso de CSS avançado' },
      { src: img('web-02.webp'), thumb: img('web-02-thumb.webp'), alt: 'Site feito com base no curso de CSS avançado' },
    ]
  },
  {
    id: 'editorial-eclipse',
    title: 'Desenho vetorial',
    tag: 'Direção de arte · Edição · Ilustração',
    gradient: 'linear-gradient(150deg, #402a4d, #14101f)',
    //cover: img('ilustracao-capa.jpg'),
    images: [
      { src: img('vetor-01.webp'), thumb: img('vetor-01-thumb.webp'), alt: 'Design de ícones para empresa software - ícones feito no Figma' },
      { src: img('vetor-02.webp'), thumb: img('vetor-02-thumb.webp'), alt: 'Design de logo para empresa de papelaria, versão normal e negativo - Logo feito no Photoshop' },
      { src: img('vetor-03.webp'), thumb: img('vetor-03-thumb.webp'), alt: 'Desenho em vetor de flor - Feito no Photoshop' },
      { src: img('vetor-04.webp'), thumb: img('vetor-04-thumb.webp'), alt: 'Desenho em vetor de paródia do Starbucks com um cachorrinho da raça Pinscher - Feito no Photoshop' },
      { src: img('vetor-05.webp'), thumb: img('vetor-05-thumb.webp'), alt: 'Desenho em vetor de logo de um projeto - Feito no Photoshop' },
      { src: img('vetor-06.webp'), thumb: img('vetor-06-thumb.webp'), alt: 'Desenho em vetor de projeto pessoal - Feito no Photoshop' },
      { src: img('vetor-07.webp'), thumb: img('vetor-07-thumb.webp'), alt: 'Design de logo para moda pet - Feito no Photoshop' },
    ],
  },
  {
    id: 'campanha-solsticio',
    title: 'Marketing',
    tag: 'Ilustração · Motion · Tipografia',
    gradient: 'linear-gradient(150deg, #24344a, #0c1226)',
    //link: 'https://site1.com',
    //cover: img('marketing_cover-01.webp'),
    images: [
      { type: 'video', src: img('marketing-01.mp4'), poster: img('marketing_cover-01.webp'), alt: 'Simples animação feita no Canva para praticar' },
      { src: img('marketing-02.webp'), thumb: img('marketing-02-thumb.webp'), alt: 'Cartaz feito no canva para teste' },
      { src: img('marketing-03.png'), alt: 'Cartaz feito no canva para teste' },
      { type: 'video', src: img('marketing-04.mp4'), alt: 'Simples animação feita no Canva para praticar' },
    ],
  },
]
