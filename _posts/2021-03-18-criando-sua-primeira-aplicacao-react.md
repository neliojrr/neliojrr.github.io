---
layout: post
title: "Criando sua primeira aplicação React 👨‍💻"
tags: [reactjs, frontend, programação, javascript]
excerpt: "Criar uma aplicação React nunca foi tão fácil"
date: 2021-03-18 00:25:55
permalink: /:title
redirect_from: /writing/criando-sua-primeira-aplicacao-react/
comments: true
tweet: true
---

# Criando a sua primeira aplicação React

Já há algum tempo [React](https://reactjs.org/) é a biblioteca queridinha para desenvolvimento frontend. Criado e mantido pelo todo poderoso Facebook, React já conta com mais de 160 mil estrelas no [github](https://github.com/facebook/react) e fãs por todo mundo, sendo inclusive um dos grandes responsáveis pela popularidade do Javascript. Grandes empresas como o próprio Facebook, [Netflix](https://netflix.com), [Airbnb](https://airbnb.com) e várias outras fazem uso desta biblioteca.

Se aventurar pelo mundo React pode parecer complicado. Vemos tantos artigos e vídeos sobre _JSX_, _React hooks_, _React lifecycle_ e tantos outros nomes que acabam por nos intimidar a começar. No entanto, vamos ver aqui que começar é muito mais fácil do que você imagina.

De início não precisamos saber todas as terminologias do mundo React. O que realmente precisamos é simplesmente colocar a mão na massa e só então, buscar entender seus conceitos conforme os mesmos vão aparecendo.

Vamos lá:

## Um simples arquivo _.html_

O primeiro passo é criar um simples arquivo _HTML_ que vamos dar o nome de _index.html_. Salve o arquivo em alguma pasta e abra-o em seu navegador.

Você vai ver uma página completamente em branco.

![]({{ site.url }}/assets/img/screenshot-1.png)

Precisamos então adicionar algumas _tags HTML_.

    <html>
      <head>
      </head>
      <body>
      </body>
    </html>

Bom, a nossa página web foi criada e estruturada - completamente em branco, mas foi :)

## Adicionando _React_ a nossa página

Precisamos agora adicionar _React_ - seus scripts - a nossa página.

Primeiro vamos adicionar uma tag `<div>` vazia dentro do `<body>` para marcar o lugar onde nossa aplicação _React_ vai ser carregada

    <html>
      <head>
      </head>
      <body>
        <div id="react-container"></div>
      </body>
    </html>

Depois, vamos adicionar as tags `<script>` de carregamento do _React_.

    <html>
      <head>
      </head>
      </body>
        <div id="react-container"></div>

        <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
        <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
      </body>
    </html>

Essas 2 tags `<script>` são responsáveis por baixar todo o código necessário para rodar _React_ em nossa página.

## Criando nosso primeiro componente _React_

Como primeiro componente vamos criar um botão que registra o clique do usuário. Mais uma vez, não precisamos nos prender a todos os detalhes da implementação, pois muitos dos conceitos e técnicas utilizadas serão abordadas nos próximos artigos.

Na mesma pasta onde está o nosso `index.html` vamos criar um arquivo chamado `Button.js`:

    const e = React.createElement;

    class Button extends React.Component {
      constructor(props) {
        super(props);
        this.state = { clicked: false };
      }

      render() {
        if (this.state.clicked) {
          return 'Voce clicou no botao.';
        }

        return e(
          'button',
          { onClick: () => this.setState({ clicked: true }) },
          'Meu botao React'
        );
      }
    }

    const domContainer = document.querySelector('#react-container');
    ReactDOM.render(e(Button), domContainer);

Precisamos compreender três coisas importantes:

- O método `render()` é o responsável por carregar o que será mostrado na tela.
- `this.state` carrega a informação necessária para nos dizer se o botão foi clicado ou não. Este, portanto, é o estado do nosso componente.
- As últimas duas linhas de código são responsáveis por atrelar o nosso componente _Button_ ao nosso arquivo _HTML_. Primeiro tratamos de encontrar a `div` - através do seu _id_ - onde vamos carregar nosso componente. E então, adicionamos o nosso componente a ela.

Agora adicionamos o arquivo _Button_ criado ao nosso `index.html`:

    <html>
      <head>
      </head>
      <body>
        <div id="react-container"></div>

        <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
        <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>

        <!-- Load our React component. -->
        <script src="Button.js"></script>
      </body>
    </html>

## O resultado

Vamos ao resultado final:

![]({{ site.url }}/assets/img/button-gif.gif)

E lá está a nossa primeira - e bem simples - aplicação _React_. 🎉
Nos próximos artigos vamos implementar mais funcionalidades e mergulhar a fundo nos conceitos por trás dessa biblioteca tão fantástica.

Se o seu resultado foi algo diferente disso, me manda um tweet no [@neliojrr](https://twitter.com/neliojrr).

Até a próxima semana! 😎
