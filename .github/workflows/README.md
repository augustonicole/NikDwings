# Portfólio — Céu Noturno (React)

App em React (Vite) com fundo de céu noturno animado: estrelas piscando lentamente e estrelas cadentes em intervalos aleatórios.

## Como rodar

```bash
npm install
npm run dev
```

Abra o endereço mostrado no terminal (geralmente `http://localhost:5173`).

## Build para produção

```bash
npm run build
npm run preview   # para testar o build localmente
```

Os arquivos finais ficam em `dist/`, prontos para publicar em qualquer hospedagem estática (Vercel, Netlify, GitHub Pages, etc).

## Estrutura

```
src/
  components/
    StarField.jsx   → fundo animado (estrelas + estrelas cadentes)
    Header.jsx       → navegação, com menu mobile
    Hero.jsx         → seção principal
    Work.jsx          → seção "Trabalhos" (grade de projetos)
    WorkCard.jsx      → card individual de projeto
    About.jsx         → seção "Sobre"
    Contact.jsx       → seção de contato
    Footer.jsx        → rodapé
  data/
    work.js           → lista de projetos exibidos (edite aqui)
  hooks/
    useReveal.js       → animação de "revelar ao rolar a página"
  index.css            → todos os estilos e variáveis de design
  App.jsx              → monta todas as seções
  main.jsx             → ponto de entrada do React
```

## O que editar primeiro

1. **Textos**: `Hero.jsx`, `About.jsx` e `Contact.jsx` têm os textos placeholder em português — troque pelo seu conteúdo.
2. **Projetos**: edite `src/data/work.js` para trocar título, categoria e cor de cada card. Para usar imagens reais no lugar dos gradientes, troque a `<div className="tex" />` em `WorkCard.jsx` por uma `<img>`.
3. **Cores**: as variáveis de cor estão no topo de `index.css`, em `:root`.
4. **Links reais**: e-mail de contato (`Contact.jsx`) e redes sociais (`Footer.jsx`).

## Acessibilidade

O componente `StarField` e a animação de revelação respeitam `prefers-reduced-motion`: quem tem essa preferência ativada no sistema não vê o piscar das estrelas nem as transições de entrada.
