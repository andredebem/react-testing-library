# Boas-vindas ao repositório do projeto de testes com _React Testing Library_!

Aqui você vai encontrar todos os detalhes de como usufruir do que foi desenvolvido.

Este repositório já tinha uma aplicação React criada e configurada. Após clonar o projeto e instalar as dependências, não foi necessário realizar nenhuma configuração adicional.

Dessa forma, utilizei o [`Jest`](https://jestjs.io/) e a biblioteca [`React Testing Library`](https://testing-library.com/) para escrever os testes.

Foi tomado um cuidado redobrado com [testes _falsos positivos_](https://talkingabouttesting.com/2015/08/04/falsos-negativos-falsos-positivos-verdadeiros-negativos-e-verdadeiros-positivos/).

# Sumário

  - [Habilidades](#habilidades)
  - [Instruções](#instruções)
    - [Para visualizar o projeto](#para-visualizar-o-projeto)
    - [Commits](#commits)
    - [Linter](#linter)
  - [Como funcionam os testes?](#como-funcionam-os-testes)
  - [Requisitos do projeto](#requisitos-do-projeto)
    - [Lista de requisitos](#lista-de-requisitos)
      - [1. Teste o componente `<App.js />`](#1-teste-o-componente-appjs-)
      - [2. Teste o componente `<About.js />`](#2-teste-o-componente-aboutjs-)
      - [3. Teste o componente `<FavoritePokemons.js />`](#3-teste-o-componente-favoritepokemonsjs-)
      - [4. Teste o componente `<NotFound.js />`](#4-teste-o-componente-notfoundjs-)
      - [5. Teste o componente `<Pokedex.js />`](#5-teste-o-componente-pokedexjs-)
      - [6. Teste o componente `<Pokemon.js />`](#6-teste-o-componente-pokemonjs-)
      - [7. Teste o componente `<PokemonDetails.js />`](#7-teste-o-componente-pokemondetailsjs-)
      - [Quer fazer mais? Temos algumas sugestões!](#quer-fazer-mais-temos-algumas-sugestões)
- [Avisos Finais](#avisos-finais)

# Habilidades

Tive que demonstrar conhecimento suficiente para:

* Utilizar os seletores (queries) da React-Testing-Library em testes automatizados.

* Simular eventos com a React-Testing-Library em testes automatizados.

* Testar fluxos lógicos assíncronos com a React-Testing-Library.

* Escrever testes que permitam a refatoração da estrutura dos componentes da aplicação sem necessidade de serem alterados.

* Criar mocks de APIs utilizando fetch.

* Testar inputs.

# Instruções:

### PARA VISUALIZAR O PROJETO:

1. Clone o repositório
  * `git clone https://github.com/andredebem/react-testing-library.git`.
  * Entre na pasta do repositório que você acabou de clonar;

2. Instale as dependências
    * `npm install`
 * Inicialize o projeto:
    * `npm start` (uma nova página já com o projeto deve abrir no seu navegador)

3. Há uma pasta chamada `./stryker` com diversos arquivos `nomeArquivo.conf.json`. Cada um deles é a configuração do avaliador para um requisito e ela **não deve ser alterada**. Rode o comando `npx stryker run ./stryker/nomeDoArquivo.conf.json` para testar aquele arquivo individualmente.
   * Quando o comando `npx stryker run ./stryker/PokemonDetails.conf.json` for executado, com todos os testes passando, o avaliador apresentará uma saída semelhante à abaixo.


    ![image](testepassando.png)
    

---

### COMMITS

* Os `commits` representam as alterações que foram feitas no código regularmente.

---

### Linter

Para garantir a qualidade do código, foi utilizado o linter _ESLint_. Assim o código estará alinhado com as boas práticas de desenvolvimento, sendo mais legível e de fácil manutenção.

---

# Como funcionam os testes?

  Nesse trabalho o avaliador automatizado **testa os testes!**
  
  A ideia dele é a seguinte: Se uma parte da aplicação quebrar, fazendo uma alteração no código, os testes devem quebrar, certo? Pois é isso que o avaliador faz.
  
  O avaliador vai navegar por toda a aplicação da Pokédex e vai fazer várias mudanças no código dela **para que ela quebre e pare de funcionar**. Em seguida ele vai rodar os testes. Caso os testes não acusem que aplicação está com problemas o avaliador não aprova aquele requisito! Se, para todas as alterações que o avaliador fizer no código da aplicação, os testes acusarem problemas, tudo será aprovado! O avaliador garante, portanto, que os testes realmente cobrem a aplicação em situações extraordinárias!
  
  Na linguagem do avaliador, dizemos que cada mudança que o avaliador faz na sua aplicação é um **mutante**. O avaliador cria vários mutantes e os testes **devem matar todos!** Se algum mutante sobreviver, temos problemas.
  
  Tudo certo? Vamos aos requisitos então!

# Requisitos do projeto

## Lista de requisitos

### 1. Teste o componente `<App.js />`

  - Teste se a página principal da Pokédex é renderizada ao carregar a aplicação no caminho de URL `/`.

  - Teste se o topo da aplicação contém um conjunto fixo de links de navegação.

    - O primeiro link deve possuir o texto `Home`.

    - O segundo link deve possuir o texto `About`.

    - O terceiro link deve possuir o texto `Favorite Pokémons`.

  - Teste se a aplicação é redirecionada para a página inicial, na URL `/` ao clicar no link `Home` da barra de navegação. 

  - Teste se a aplicação é redirecionada para a página de `About`, na URL `/about`, ao clicar no link `About` da barra de navegação. 

  - Teste se a aplicação é redirecionada para a página de `Pokémons Favoritados`, na URL `/favorites`, ao clicar no link `Favorite Pokémons` da barra de navegação.

  - Teste se a aplicação é redirecionada para a página `Not Found` ao entrar em uma URL desconhecida.

  **O que será verificado:**
  
  - Será avaliado se o arquivo teste `App.test.js` contemplam 100% dos casos de uso criados pelo Stryker.

### 2. Teste o componente `<About.js /.`

  - Teste se a página contém as informações sobre a Pokédex.

  - Teste se a página contém um heading `h2` com o texto `About Pokédex`.

  - Teste se a página contém dois parágrafos com texto sobre a Pokédex.

  - Teste se a página contém a seguinte imagem de uma Pokédex: `https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png`.

  **O que será verificado:**
    
  - Será avaliado se o arquivo teste `About.test.js` contemplam 100% dos casos de uso criados pelo Stryker.

### 3. Teste o componente `<FavoritePokemons.js />`

  - Teste se é exibido na tela a mensagem `No favorite pokemon found`, se a pessoa não tiver pokémons favoritos.

  - Teste se é exibido todos os cards de pokémons favoritados.

  - Teste se **nenhum** card de pokémon é exibido, se ele não estiver favoritado.

  **O que será verificado:**

  - Será avaliado se o arquivo teste `FavoritePokemons.test.js` contemplam 100% dos casos de uso criados pelo Stryker.

### 4. Teste o componente `<NotFound.js />`

  - Teste se página contém um heading `h2` com o texto `Page requested not found 😭`;

  - Teste se página mostra a imagem `https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`.

  **O que será verificado:**

  - Será avaliado se o arquivo teste `NotFound.test.js` contemplam 100% dos casos de uso criados pelo Stryker.

### 5. Teste o componente `<Pokedex.js />`

  - Teste se página contém um heading `h2` com o texto `Encountered pokémons`.

  - Teste se é exibido o próximo Pokémon da lista quando o botão `Próximo pokémon` é clicado.

    - O botão deve conter o texto `Próximo pokémon`;

    - Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;

    - O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista;

  - Teste se é mostrado apenas um Pokémon por vez.

  - Teste se a Pokédex tem os botões de filtro.

    - A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;

    - O texto do botão deve corresponder ao `nome do tipo`, ex. `Psychic`;

  - Teste se a Pokédex contém um botão para resetar o filtro

    - O texto do botão deve ser `All`;

    - A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) quando o botão `All` for clicado;

    - Ao carregar a página, o filtro selecionado deverá ser `All`;

  - Teste se é criado, dinamicamente, um botão de filtro para cada tipo de Pokémon.

    - Os botões de filtragem devem ser dinâmicos;

    - Deve existir um botão de filtragem para cada tipo de Pokémon disponível nos dados, sem repetição. Ou seja, a sua Pokédex deve possuir pokémons do tipo `Fire`, `Psychic`, `Electric`, `Bug`, `Poison`, `Dragon` e `Normal`;
    
    - Deve ser mostrado como opção de filtro, um botão para cada um dos tipos. Além disso, o botão `All` precisa estar **sempre** visível.

  - O botão de `Próximo pokémon` deve ser desabilitado quando a lista filtrada de Pokémons tiver um só pokémon.

  **O que será verificado:**

  - Será avaliado se o arquivo teste `Pokedex.test.js` contemplam 100% dos casos de uso criados pelo Stryker.

### 6. Teste o componente `<Pokemon.js />`

  - Teste se é renderizado um card com as informações de determinado pokémon.

    - O nome correto do Pokémon deve ser mostrado na tela;

    - O tipo correto do pokémon deve ser mostrado na tela.

    - O peso médio do pokémon deve ser exibido com um texto no formato `Average weight: <value> <measurementUnit>`; onde `<value>` e `<measurementUnit>` são, respectivamente, o peso médio do pokémon e sua unidade de medida.

    - A imagem do Pokémon deve ser exibida. Ela deve conter um atributo `src` com a URL da imagem e um atributo `alt` com o texto `<name> sprite`, onde `<name>` é o nome do pokémon;

  - Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL `/pokemons/<id>`, onde `<id>` é o id do Pokémon exibido;

  - Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon. 
  
  - Teste também se a URL exibida no navegador muda para `/pokemon/<id>`, onde `<id>` é o id do Pokémon cujos detalhes se deseja ver;

  - Teste se existe um ícone de estrela nos Pokémons favoritados.

    - O ícone deve ser uma imagem com o atributo `src` contendo o caminho `/star-icon.svg`;

    - A imagem deve ter o atributo `alt` igual a `<pokemon> is marked as favorite`, onde `<pokemon>` é o nome do Pokémon exibido.

    **O que será verificado:**

    - Será avaliado se o arquivo teste `Pokemon.test.js` contemplam 100% dos casos de uso criados pelo Stryker.

### 7. Teste o componente `<PokemonDetails.js />`

  - Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela.

    - A página deve conter um texto `<name> Details`, onde `<name>` é o nome do Pokémon;

    - **Não** deve existir o link de navegação para os detalhes do Pokémon selecionado.

    - A seção de detalhes deve conter um heading `h2` com o texto `Summary`.

    - A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado.

  - Teste se existe na página uma seção com os mapas contendo as localizações do pokémon

    - Na seção de detalhes deverá existir um heading `h2` com o texto `Game Locations of <name>`; onde `<name>` é o nome do Pokémon exibido.

    - Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;

    - Devem ser exibidos, o nome da localização e uma imagem do mapa em cada localização;

    - A imagem da localização deve ter um atributo `src` com a URL da localização;

    - A imagem da localização deve ter um atributo `alt` com o texto `<name> location`, onde `<name>` é o nome do Pokémon;

  - Teste se o usuário pode favoritar um pokémon através da página de detalhes.

    - A página deve exibir um `checkbox` que permite favoritar o Pokémon;

    - Cliques alternados no `checkbox` devem adicionar e remover respectivamente o Pokémon da lista de favoritos;

    - O `label` do `checkbox` deve conter o texto `Pokémon favoritado?`;

    **O que será verificado:**

    - Será avaliado se o arquivo teste `PokemonDetails.test.js` contemplam 100% dos casos de uso criados pelo Stryker.

---

# Avisos Finais

Ficou com alguma dúvida?

Sem problemas... Basta entrar em contato comigo!!

---
