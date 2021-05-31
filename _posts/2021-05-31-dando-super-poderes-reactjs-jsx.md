---
layout: post
title: "Dando super poderes ao ReactJS com JSX 🦸‍♂️"
tags: [reactjs, jsx, frontend, programação, javascript]
excerpt: "Como JSX te ajuda a criar aplicações ReactJS melhores"
date: 2021-05-31 00:25:55
permalink: /:title
comments: true
---

# Dando super poderes ao ReactJS com JSX

Sempre que vejo algum artigo ou tutorial sobre React é sempre utilizando JSX. Fica quase impossível não atrelar os dois. Acredito que para muitas pessoas é a mesma coisa. Mas a verdade é que não é bem assim.

React nada mais é do que um framework criado utilizando JavaScript. Com isso, é possível utilizá-lo apenas com JavaScript.

Mas, espera aí!! JSX não é JavaScript??

Bom, mais ou menos! JSX é uma sintaxe de extensão para JavaScript. Um [_syntactic sugar_](https://en.wikipedia.org/wiki/Syntactic_sugar). JSX nos permite criar elementos escrevendo menos código e o deixando mais legível. E claro, tem uma pequena curva de aprendizado no início, mas após algumas horas escrever JSX tende a ficar mais natural.

Vamos ao exemplo do [post anterior](https://nelio.me/criando-sua-primeira-aplicacao-react):

Sem JSX:

{% highlight javascript %}
React.createElement(
  'button',
  { onClick: () => alert('Cliquei no botão') },
  'Meu botao React'
);
{% endhighlight %}

Com JSX:

{% highlight jsx %}
<button onClick={() => alert('Cliquei no botão')}>
  Meu botão React
</button>
{% endhighlight %}

Reflita por 2 minutinhos e tire suas próprias conclusões. 🧘‍♂️

## Por que JSX?

React abraça o fato de que lógica de renderização está inteiramente ligado com lógica de UI. Como os eventos são chamados, como o estado de um componente (ou página) muda e como os dados são preparados para serem mostrados.

Ao invés de artificialmente separar lógica e _web markup_, React em seu design, decidiu se valer dessa separação através de unidades chamadas _Componentes_ e manter lógica e _markup_ juntos. Nada melhor do que usar JSX para alcançar esse objetivo.

Você ainda pode escrever React sem JSX (como fizemos no post sobre [como criar sua primeira aplicação React](https://nelio.me/criando-sua-primeira-aplicacao-react)). No entanto, JSX te ajudar a trabalhar com as partes visuais junto ao código JavaScript. 👩‍🎨

## Expressões JavaScript com JSX

Renderizar conteúdo dinâmico é algo extremamente comum e JSX sabe bem como fazê-lo. Veja o pedaço de código abaixo:

{% highlight jsx %}
const name = 'Nelio';
const element = <h1>Hello, {name}</h1>;

React.DOM.render(element, document.getElementById('root'));
{% endhighlight %}

JSX me permitiu colocar a variável _name_ diretamente dentro da tag _h1_. E isso é possível com qualquer expressão JavaScript:

{% highlight jsx %}
const receita = 180;
const divida = 80;
const element = <p>Lucro: R${receita - divida}</p>;

React.DOM.render(element, document.getElementById('root'));
{% endhighlight %}

Nada mal, hein! 🤓

## Adicionando atributos com JSX

Você pode simplesmente utilizar aspas duplas para atributos do tipo _string_:

{% highlight jsx %}
const element = <div tabIndex="0"></div>
{% endhighlight %}

E chaves para atributos que são uma expressão:

{% highlight jsx %}
const element = <img src={user.avatar} />
{% endhighlight %}

Lembrando que atributos devem ser adicionados utilizando _[camelCase](https://en.wikipedia.org/wiki/Camel_case)_!

## _Children_ com JSX

Definir _children_ usando JSX é simples como escrever _HTML_.

Se a tag é vazia, não precisamos de uma tag de fechamento. Basta finalizar com `/>`:

    const foto = <img src={user.photo} />

Se não:

{% highlight jsx %}
const element = (

  <div className="welcome">
    <h1>Seja bem vindo!</h1>
    <p>Estou feliz com a sua presença.</p>
  </div>
);
{% endhighlight %}

## JSX previne ataques XSS (cross-site-scripting)

Quando dados dinâmicos são adicionados no _HTML_ este pode ficar vulnerável a ataques de [XSS](https://en.wikipedia.org/wiki/Cross-site_scripting). JSX por padrão previne que caracteres especiais que possam ser usados de forma maliciosa sejam executados na página. Uma preocupação a menos! 😅

## Desvantagens

A primeira desvantagem e talvez a principal, é o fato de JSX não ser compreendido por navegadores web. É preciso utilizar um software terceiro responsável por compilar o que foi escrito utilizando JSX para JavaScript, já que a biblioteca React também não o faz.

Outra desvantagem é a imensa flexibilidade permitida pelo JSX. A facilidade de poder escrever "JavaScript com HTML" de uma maneira tão livre pode acabar transformando o código em algo extremamente difícil de ler. Felizmente existem técnicas que serão abordadas em outros posts para evitar tal feito.

## Compilando JSX com Babel

Como disse anteriormente, JSX não é compreendido pelo browser e por isso precisamos de um compilador. Este será responsável por transformar JSX em JavaScript puro. Atualmente o mais utilizado (e também o que eu tenho utilizado em todos meus projetos) é o [Babel](https://babeljs.io/docs/en/).

Sua instalação exige pouco esforço. Basta copiarmos o seguinte trecho de código na nossa página _HTML_:

{% highlight html %}

<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

{% endhighlight %}

## Rescrevendo um componente utilizando JSX

No [post anterior](https://nelio.me/criando-sua-primeira-aplicacao-react) criei um componente botão utilizando apenas JavaScript (sem JSX). Agora vou reescrevê-lo utilizando JSX.

Como era o componente `Button` sem JSX:

{% highlight javascript %}
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
{% endhighlight %}

Com JSX:

{% highlight jsx %}
class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false };
  }

  render() {
    if (this.state.clicked) {
      return 'Voce clicou no botao.';
    }

    return (
      <button onClick={() => this.setState({ clicked: true })}>
        Meu botão React
      </button>
    );

  }
}

const domContainer = document.querySelector('#react-container');
ReactDOM.render(<Button />, domContainer);
{% endhighlight %}

Não parece tão diferente assim, certo!? Talvez não para um exemplo tão simples.

Vou agora colocar uma mensagem embaixo do botão e uma _div_ em volta dos dois:

{% highlight jsx %}
return (
  <div>
    <button onClick={() => this.setState({ clicked: true })}>
      Meu botão React
    </button>
    <p>Este botão ao ser clicado muda o estado da página</p>
  </div>
);
{% endhighlight %}

Essa similaridade com _HTML_ deixa tudo muito mais compreensível e de fácil leitura. Criar componente por componente utilizando JavaScript puro não seria um trabalho muito prazeroso.

## Concluindo

JSX e React andam de mãos dadas e apesar de apresentar algumas desvantagens, ainda é uma solução incrível para escrever componentes web com rapidez e boa legibilidade. Sua similaridade com _HTML_ faz com que sua curva de aprendizado seja rápida e indolor 😂. No entanto, é importante deixar claro que JSX te dá uma liberdade enorme. Escrever componentes menores, mais objetivos e com apenas uma finalidade vai ajudar a deixar o código mais legível e de fácil manutenção.

Se gostou desse artigo, se inscreva e receba semanalmente este e outros conteúdos diretamente no seu email. Sem spam! 😎
