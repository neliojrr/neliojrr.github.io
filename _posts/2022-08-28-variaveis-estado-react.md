---
layout: post
title: "React - Variáveis de estado - 'setState' e 'useState' 🤩"
tags: [frontend, programação, javascript, react]
excerpt: "Entendendo como funcionam as variáves de estado em React."
date: 2022-08-28 17:00:00
permalink: /:title
comments: true
tweet: true
---

![]({{ site.url }}/assets/img/blog-set-state.jpeg)

Uma das vantagens mais legais de *[React](https://reactjs.org/)* é poder controlar o estado de um único componente de sua aplicação de um jeito simples e direto. Isso inclusive sem influenciar o estado de outros componentes. Tal ~~mágica~~ é um conceito que deve ser bem compreendido, a fim de construir aplicativos mais complexos e robustos.

Nesse post vou tentar deixar bem claro como estados são controlados, o conceito de *controlled vs uncontrolled components*, como variáveis de estado eram criadas em componentes classes e por fim, como são criadas hoje com *[hooks](https://reactjs.org/docs/hooks-intro.html)*.

## Nomes

Para um melhor alinhamento com o código e com a documentação oficial, vou utilizar alguns termos em inglês:
* *state variables*: variável estado
* *stateless component*: componente que não possui qualquer variável de estado
* *controlled components*: Componentes os quais sua renderização depende de uma ou mais variáveis de estado
* *uncontrolled components*: Componentes os quais sua renderização não depende de qualquer variável de estado

## No começo era (quase) tudo classe

Se você começou a aprender *React* por agora (últimos 2-3 anos) se deparou de cara com o conceito de *hooks*. Através de *hooks* é possível declarar *state variables* em componentes funções. Dependendo de quão recente é o seu conhecimento sobre *React*, é totalmente possível que você sequer tenha visto um componente classe.

Bom, nem sempre foi assim. Na verdade, nem sempre É ASSIM!

Antes de *hooks* serem introduzidos, para que um componente pudesse ter *state variables* era necessário que este componente fosse uma classe.

Vamos ver na prática:

{% highlight jsx %}
import React from 'react';

class TextInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.onChangeValue = this.onChangeValue.bind(this);
  }

  onChangeValue(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <input type="text" value={this.state.value} onChange={this.onChangeValue} />
    );
  }
}

export default TextInput;
{% endhighlight %}

Este é um simples componente classe. Nada de *[useState hook](https://reactjs.org/docs/hooks-state.html)*.

Vamos entender o código acima, mas focar no uso do *setState* e no conceito de estado do componente:

{% highlight jsx %}
this.state = {
  value: ''
};
{% endhighlight %}

Este bloco é responsável pela declaração inicial da variável de estado que será usada no componente. O objeto `this.state` aceita inúmeras propriedades e de quaisquer tipos.

Por exemplo, poderíamos adicionar uma outra propriedade `disabled` para habilitar/desabilitar nosso campo texto. Ficaria assim:

{% highlight jsx %}
this.state = {
  value: '',
  disabled: false
};
{% endhighlight %}

E no elemento input:

{% highlight jsx %}
<input type="text" value={this.state.value} onChange={this.onChangeValue} disabled={this.state.disabled} />
{% endhighlight %}

Por fim, temos a função `render` que é responsável por mostrar os elementos *HTML* do nosso componente. É dentro dela que vou utilizar as variáveis de estado. Vejamos:

{% highlight jsx %}
render() {
  return (
    <input type="text" value={this.state.value} onChange={this.onChangeValue} />
  );
}
{% endhighlight %}

O `return` da função `render` é sempre o que será renderizado na tela pelo componente. No caso acima um `input` do tipo texto. A função `render` é re-executada sempre que há uma mudança na variável de estado. Ou seja, sempre que a propriedade `value` da nossa variável de estado muda, o método `render` executa e atualiza o campo `value` do `input`.

Este processo se repete sempre que alguma propriedade de uma variável de estado atualize. Na verdade, para ser um pouco mais claro, sempre após uma chamada ao método `setState`, a função `render` vai ser chamada.

Isto nos leva a uma nota importante:

NUNCA altere o valor de uma variável de estável diretamente! 😱💣

Em componentes classes, variáveis de estado devem ser alteradas apenas com o uso do método `setState`. Isto porque quando alterado diretamente, o componente não vai atualizar. Ou seja (mais uma vez), para que o método `render` seja chamado novamente e com valores diferentes, `setState` tem que ter sido acionado antes. Desta maneira a interface muda de acordo com a mudança da variável de estado.

### Controlled vs Uncontrolled Components

O componente que acabei de criar é chamado de *[controlled component](https://reactjs.org/docs/forms.html#controlled-components)*. Tal componente é composto por um ou mais elementos de um formulário e, seu valores e as atualizações dos mesmos são controlados por variáveis de estado *React*.

Componentes que apresentam elementos de formulário, mas seus valores não são controlados por variáveis de estado, são chamados de *uncontrolled components*.

## E tudo virou função (e *hooks*)

![]({{ site.url }}/assets/img/blog-use-state.jpeg)

A introdução dos *[hooks](https://reactjs.org/docs/hooks-intro.html)* nos deu uma nova alternativa de como escrever e controlar as variáveis de estado de um componente. Na minha opinião, foi uma melhora muito grande. A começar pelo fato de (na maioria dos casos) não haver a necessidade de criar componentes classe, mas apenas funções.

Mas como isso é feito!? 🤔

Através do *hook* [`useState`](https://reactjs.org/docs/hooks-state.html)!

Para que possamos ter um claro entendimento e podermos comparar com o *setState*, vou rescrever o código que fiz acima utilizando apenas o *useState hook*.

O primeiro passo é transformar meu componente classe em uma função. Isso porque, *hooks* não podem ser usados dentro de componentes classe. Sendo assim, vamos as mudanças necessárias:

{% highlight jsx %}
import React from 'react';

const TextInput = () => {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.onChangeValue = this.onChangeValue.bind(this);
  }

  onChangeValue(e) {
    this.setState({ value: e.target.value });
  }

  return (
    <input type="text" value={this.state.value} onChange={this.onChangeValue} />
  );
};

export default TextInput;
{% endhighlight %}

A primeira delas foi declarar o nosso como uma variável que recebe uma função. A outra foi remover o método `render`, já que dentro de um componente função o que será renderizado é o retorno da mesma, ou seja, tudo aquilo dentro do `return`.

O segundo passo é alterar a nossa variável de estado `value` para *hooks*:

{% highlight jsx %}
import React, { useState } from 'react';

const TextInput = () => {
  const [value, setValue] = useState('');
  
  const onChangeValue = (e) => {
    setValue(e.target.value);
  };

  return (
    <input type="text" value={value} onChange={onChangeValue} />
  );
};

export default TextInput;
{% endhighlight %}

Uau!! 😱😱
Agora sim! Mudanças significativas!

A principal foi a alteração do `this.state` pelo `useState`.

Diferentemente do `this.state` - que é um objeto - o `useState` é uma função que recebe um argumento e retorna um *array* com dois elementos. Posso ter inúmeros `useState` dentro do meu componente, separando assim as minhas variáveis de estado. Ou então, posso criar uma única variável de estado que vai armazenar outras variáveis. Depende do que estou implementando.

O argumento é o valor inicial da minha variável de estado. No caso acima uma *string* vazia (''). Este pode ser qualquer valor que uma variável JS pode suportar. *Strings, arrays, numbers, objects, functions* e por aí vai.

Os dois elementos dentro do *array* são:
* `value`: É a variável responsável por armazenar o valor e portanto, ser utilizada no meu componente.
* `setValue`: É o método responsável por atualizar o valor da variável de estado.

Ou seja, assim como não podia alterar o `this.state` diretamente, também não posso simplesmente alterar o valor da variável `value`, pois isto não ira "re-renderizar" meu componente. Para que o componente atualize com o novo valor da minha variável de estado, é necessário chamar o método de atualização correspondente. No caso acima `setValue`.

As outras alterações que fiz são:

- Importação do *hook* `useState` pela biblioteca `react`.
- Remoção do desnecessário método `constructor`. Se faz necessário apenas dentro de componentes classe.
- Edição do método `onChangeValue` para usarmos `setValue` ao invés do `setState`.

A nível de simplicidade e legibilidade eu acho *hooks* incríveis. No entanto, o que mais me impressiona - e também onde vemos o seu verdadeiro poder - é quando criamos nossos próprios *hooks*. Mas isto é um artigo para outro momento.😊

## E aí!? `setState` ou `useState`?

Se existe a necessidade de criar um componente classe, então não tem jeito, tem que ser `setState`. No entanto, em todos os outros casos a recomendação é que se crie um *function component* e utilize `useState` *hook*.

`useState` tem um sintaxe mais simples e uma funcionalidade mais poderosa, sendo - ao meu ver - a melhor escolha. Além do mais, permite que eu escreva mais componentes função do que classes.

Outro fator determinante, é a quantidade de bibliotecas que estão usando *hooks* e disponibilizando os mesmos para uso. Tal fato contribui para um código muito mais consistente.

E como sempre, a melhor forma de realmente compreender é colocando a mão na massa. Pegue aquela classe simples do seu app e transforme em uma função, utilizando *hooks* no caminho. Ou então, implemente um novo componente e utilize apenas *hooks*.💪

Espero que se divirta no processo!! 😃









Se gostou desse artigo, se inscreva e receba semanalmente este e outros conteúdos diretamente no seu email. Sem spam! 😎
