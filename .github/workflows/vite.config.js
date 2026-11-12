import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // './' deixa os caminhos relativos: o site funciona em qualquer endereço do
  // GitHub Pages (usuario.github.io ou usuario.github.io/nome-do-repositorio/),
  // sem precisar escrever o nome do repositório aqui.
  base: './',
})
