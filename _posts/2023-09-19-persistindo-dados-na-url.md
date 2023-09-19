---
layout: post
image: "/assets/img/persistindo-dados-url-0.jpeg"
title: "React - Persistindo dados na URL  💾"
description: "Como guardar dados na URL em sua aplicação React."
tags: [frontend, programação, javascript, react]
excerpt: "Como guardar dados na URL em sua aplicação React."
date: 2023-09-19 09:00:00
permalink: /:title
comments: true
tweet: true
---

![]({{ site.url }}/assets/img/persistindo-dados-url-0.jpeg)


Compartilhar conteúdo é o que há de mais comum na internet e em aplicativos. Compartilhamos fotos, mensagens e tudo mais que podemos. Dentre o que mais compartilhamos estão as *[URLs](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL)*.

Abaixo, vou mostrar como podemos guardar e recuperar informações via *URL* em aplicações [React](https://react.dev). Dessa maneira usuários podem compartilhar a URL mantendo o mesmo estado da página compartilhada.

## Uma lista com filtros

Uma implementação bem comum quando desenvolvendo um aplicativo, é aplicar filtros em uma lista de dados. Por exemplo, uma tabela com dados pessoais e filtros por coluna ou, uma página de produtos de um *E-commerce* que contém filtros para cada atributo de seus items. Ser capaz de compartilhar a página em questão com todos os filtros aplicados é fundamental.

Vamos ao código:

Abaixo tenho a minha aplicação: Uma lista com dados de pessoas como nome, sobrenome, idade e profissão. A aplicação tem 2 componentes importantes:
- App (Principal)
- List (Componente genérico de lista)

O componente `App` importa os dados da lista - que no caso abaixo é apenas um arquivo com dados aleatórios contendo nome, idade e cidade. Poderia também ser dados de uma API qualquer.

{% highlight jsx %}
import List from './List';

import { LIST_HEADERS, PERSONAL_DATA_LIST } from './data';

function App() {
  return (
    <div className="App">
      <List headers={LIST_HEADERS} data={PERSONAL_DATA_LIST} />
    </div>
  );
}

export default App;
{% endhighlight %}

O component `List` recebe os dados da lista, bem como o cabeçalho a ser mostrado. Baseado nestas duas informações a tabela é montada.

{% highlight jsx %}
const List = ({ headers = [], data = [] }) => {
  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header.toUpperCase()}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {headers.map((header) => (
              <td key={header}>{item[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;
{% endhighlight %}

O resultado é:

![]({{ site.url }}/assets/img/persistindo-dados-url-1.png)

O meu próximo passo é fazer com que a usuário consiga ordenar a tabela simplesmente clicando em um dos items do cabeçalho. Ou seja, ordenar a tabela por uma de suas colunas.

Para chegar lá vou separar o cabeçalho da minha tabela em um componente próprio e fazer com que cada item seja *clicável*. Vou criar o componente `Headers`:

{% highlight jsx %}
const Headers = ({ headers = [] }) => {
  const headerClick = (header) => {
    console.log(header);
  };

  return (
    <thead>
      <tr>
        {headers.map((header) => (
          <th onClick={() => headerClick(header)} key={header}>{header.toUpperCase()}</th>
        ))}
      </tr>
    </thead>
  );
}

export default Headers;
{% endhighlight %}

E então, atualizar o componente `List` para importar o novo componente `Headers`

{% highlight jsx %}
import Headers from "./Headers";

const List = ({ headers = [], data = [] }) => {
  return (
    <table>
      {<Headers headers={headers} />}
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {headers.map((header) => (
              <td key={header}>{item[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;
{% endhighlight %}

Ao clicar em algum dos items do cabeçalho, imprimo um log com o respectivo `header` clicado:

![]({{ site.url }}/assets/img/persistindo-dados-url-2.png)


### Manipulando a URL

Agora vou atualizar o método `headerClick` para guardar na *URL* qual o último cabeçalho foi clicado. Para isso vamos utilizar o construtor *‌[URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams)*. Veja como ficou:

{% highlight jsx %}
const headerClick = (header) => {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set('sort', header);
  window.location.search = urlParams;
};
{% endhighlight %}

Na primeira linha recupero todas a variáveis de URL disponíveis, ou seja, tudo do tipo: `?variavel=1`.

Na segunda linha definimos o parâmetro `sort` com o valor do cabeçalho clicado. Ex: `?sort=name`.

E por fim, na terceira linha, escrevo minha alteração na URL.

A partir deste momento, qualquer clique em um dos items do cabeçalho vai resultar na alteração da URL, com o parâmetro `sort` sendo atualizado de acordo.

![]({{ site.url }}/assets/img/persistindo-dados-url-3.png)

### Lendo os parâmetros da URL

Meu último passo é ler o parâmetro `sort` da URL e então ordenar a minha lista de acordo com este parâmetro. Para isso vou utilizar o mesmo construtor utilizado anteriormente, com a diferença do método `get` ao invés do método `set`. Veja como ficaram as alterações no component `List`:

{% highlight jsx %}
import Headers from './Headers';

const List = ({ headers = [], data = [] }) => {
  const urlParams = new URLSearchParams(window.location.search);
  const sort = urlParams.get('sort');
  
  ...
{% endhighlight %}

Agora que sei exatamente qual item foi clicado, posso ordenar a lista de acordo:

{% highlight jsx %}
const urlParams = new URLSearchParams(window.location.search);
const sort = urlParams.get('sort');
const dataSorted = data.sort((a, b) => {
  if (a[sort] < b[sort]) {
    return -1;
  }
  if (a[sort] > b[sort]) {
    return 1;
  }
  return 0;
});
{% endhighlight %}

Fiz uso do método `sort` para ordenar a lista. No método em questão, eu comparo os valores da lista para a propriedade selecionada e retorno um número positivo ou negativo, baseado no resultado desta comparação.

Por exemplo, se minha variável `sort` tem como valor `name`, vou então comparar apenas os items da propriedade `name` (`a[sort]`). Vejo então que *João* vem antes (é menor) que *Maria* e portanto, deve aparecer primeiro na lista.

Este é o resultado após clicar no cabeçalho `name`:

![]({{ site.url }}/assets/img/persistindo-dados-url-4.png)

## Ir além

Guardar dados na URL é extremamente efetivo quando sabemos que o usuário deseja compartilhar a página em questão da maneira como ele vê. E não se limita apenas a listas. É possível utilizar esta técnica de inúmeras maneiras diferentes.

Por exemplo, quando utilizamos a ferramenta Jira, é possível compartilhar uma URL com um parâmetro para que o modal do ticket esteja aberto. Desta maneira, o usuário que receber a URL compartilhada saberá exatamente o que o outro usuário está compartilhando.

Aproveite então desta técnica, utilize a sua criatividade e faça páginas com melhor usabilidade.


> Veja o código deste post [aqui](https://github.com/neliojrr/blog-posts/tree/main/persistindo-dados-na-url)
