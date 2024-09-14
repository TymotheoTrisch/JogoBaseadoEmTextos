# Jogo Baseado Em Textos

Um jogo para web onde o jogador governa um Reino com quatro fundamentos principais. O jogador deve responder a questões de "Sim" ou "Não", e, conforme as respostas, os valores dos fundamentos se alteram. Se qualquer um desses valores atingir o máximo ou mínimo, o jogador perde. O objetivo é manter o equilíbrio enquanto toma decisões.

### Tecnologias Utilizadas

- HTML
- CSS
- Javascript
- [Typeit](https://typeitjs.com/) (framework)

## Dependências e Versões Necessárias

Não há dependências externas necessárias.

## Como rodar o projeto ✅

1. Clone o repositório:
   ```bash
   git clone https://github.com/TymotheoTrisch/JogoBaseadoEmTextos.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd JogoBaseadoEmTextos
   ```
3. Abra o arquivo `index.html` diretamente no seu navegador.

Esse é um projeto simples, portanto, não é necessário configurar um ambiente de desenvolvimento específico.

## Informações importantes sobre a aplicação 📌

O jogo utiliza um arquivo JSON como "banco de dados" para armazenar as perguntas. A cada vez que o jogador responde, o Javascript faz uma requisição ao JSON para carregar a próxima pergunta. Esse formato permite flexibilidade na adição de novas questões sem necessidade de alterar o código principal do jogo.

## ⚠️ Problemas enfrentados

### Problema 1: Comunicar o JSON com o Javascript
- **Solução:** Utilize a função `fetch` para fazer requisições ao arquivo JSON e manipular os dados retornados para exibir novas perguntas.

### Problema 2: Estrutura de funções no Javascript
- **Solução:** Organizei o código para garantir que as funções que alteram os valores dos fundamentos e verificam as condições de vitória/derrota sejam reutilizáveis, de forma a otimizar o fluxo do jogo.

## ⏭️ Próximos passos

- Melhorar a responsividade para diferentes tamanhos de tela.
- Adicionar uma lógica de perguntas aleatórias baseadas nas respostas anteriores.
- Criar uma narrativa envolvente para dar mais contexto às decisões do jogador.
