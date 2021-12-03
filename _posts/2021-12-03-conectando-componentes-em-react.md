---
layout: post
title: "Conectando componentes em React 🔗"
tags: [frontend, programação, javascript, react, componentes]
excerpt: "Criando uma aplicação com múltiplos componentes"
date: 2021-12-03 14:25:55
permalink: /:title
comments: true
---

![]({{ site.url }}/assets/img/cover-12-03.jpeg)

Uma das grandes vantagens de adotar a biblioteca [React](https://reactjs.org) é a reutilização de código. E isso se dá através de seus componentes. React é extremamente poderoso nesse sentindo.

Você pode reutilizar componentes inúmeras vezes, evitando a repetição de código desnecessária e facilitando a manutenção do mesmo. E isso se dá com alguns simples passos.

No [primeiro post](https://nelio.me/criando-sua-primeira-aplicacao-react) criei uma aplicação React bem simples. No [último post](https://www.nelio.me/dando-super-poderes-reactjs-jsx) evoluí a aplicação inicial com o uso de JSX. Agora vou conectar diferentes componentes e formar uma aplicação um pouco mais complexa. Para isso, vou criar um simples formulári com um _input_ para email, outro para senha e um botão de "Enviar".

Vamos dar uma olhada como está o nosso arquivo _index.html_ do [post anterior](https://www.nelio.me/dando-super-poderes-reactjs-jsx):

{% highlight html %}
<html>
  <head>
  </head>
  <body>
    <div id="react-container"></div>

    <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <script src="Button.js"></script>

  </body>
</html>
{% endhighlight %}

Até o momento tenho apenas um único componente: `Button.js`. Para que o formulário possa ser criado vou precisar de mais 3 componentes:

- Input email
- Input password
- Formulário (responsável por englobar os outros componentes)

É claro que esta é apenas uma maneira de fazer um formulário. Eu poderia criar um único componente e colocar tudo lá (o que acaba deixando difícil de manter).

No entanto, o nosso objetivo hoje é criar componentes que possam ser reutilizados.

Um componente _Email_ pode ser utilizado em várias partes de uma aplicação, assim como um componente _Button_. Porém, se eu fizer tudo em um só componente veremos que ele não vai ser tão reutilizável assim, pois terá características exclusivas. Vamos ver na prática como isso se dá!?

## Iniciando o servidor

Antes de iniciar com o código, preciso rodar o servidor local responsável por servir a página _html_ e meus componentes _React_. Seguindo os passos do post de [como configurar um servidor local](https://www.nelio.me/configurando-servidor-local-desenvolvimento-frontend), rapidamente consigo levantar um servidor _Express_ e rodar minha aplicação.

Assim ficou a configuração do meu servidor:

{% highlight javascript %}
// index.js
// importa o framework Express
const express = require("express");
// cria uma instância do express
const app = express();

// Carrega o arquivo index.html dentro da pasta dist
app.use("/", express.static(__dirname + "/dist"));

// Inicia o servidor Express na porta 5000
app.listen(5000, () => {
  console.log("servidor iniciado na porta 5000");
});
{% endhighlight %}

E assim está o meu `package.json`:

{% highlight json %}
{
  "name": "form-react",
  "version": "1.0.0",
  "main": "index.js",
  "author": "Nelio",
  "license": "MIT",
  "dependencies": {
    "express": "^4.17.1"
  },
  "scripts": {
    "start": "node index.js"
  }
}
{% endhighlight %}

Agora basta rodar:

`yarn start`

E o meu servidor está pronto e esperando pela minha aplicação _React_.

## Criando o campo email

Vou criar o novo componente `EmailInput.js`.

{% highlight jsx %}
import React from "react";

class EmailInput extends React.Component {
  render() {
    return (
      <div>
        <label>Email: </label>
        <input type="email" />
      </div>
    );
  }
}

export default EmailInput;
{% endhighlight %}

Na maior parte do componente não vemos nada de novo.

- Defini a nossa classe `EmailInput`
- Criei o método `render` responsável por retornar os elementos que serão renderizados na pagina.

Na última linha, escrevi algo que ainda não tinha mostrado.

`export default EmailInput;`

O `export` diz ao compilador que este arquivo pode ser importado dentro de algum outro.

O `default` deixa claro qual classe (função ou variável) será, por padrão, chamada quando for importada. No caso acima a class `EmailInput`.

## Criando o campo _password_

Agora vou criar o segundo componente: `PasswordInput.js`.

{% highlight jsx %}
import React from "react";

class PasswordInput extends React.Component {
  render() {
    return (
      <div>
        <label>Senha: </label>
        <input type="password" />
      </div>
    );
  }
}

export default PasswordInput;
{% endhighlight %}

Muito parecido com o componente email, não é mesmo!? A única diferença é o atributo `type` do `input` _HTML_.

E por último, vou criar o componente que irá importar `EmailInput`, `PasswordInput` e `Button`.

## Criando o formulário

Por último, preciso de um componente que seja capaz de renderizar os outros dois componentes criados e, também, o componente `Button`, criado anteriormente.

Vou chamá-lo de `Form.js`:

{% highlight jsx %}
import React from "react";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import Button from "./Button";

class Form extends React.Component {
  render() {
    return (
      <div>
        <h1>Meu primeiro formulário</h1>
        <form name="first-form">
          <EmailInput />
          <br />
          <PasswordInput />
          <br />
          <Button />
        </form>
      </div>
    );
  }
}

export default Form;
{% endhighlight %}

Na segunda e terceira linha importei os componentes _inputs_ criados ao longo do post. Este é o motivo pelo qual adicionei `export default` e declarei exatamente qual classe gostaria de exportar. Desta maneira, os fiz "exportáveis".

Após as importações, posso enfim, utilizá-los em outro componente - no caso, o `Form`.

Dentro do método `render` adicionei uma tag `<form>` para deixar claro para o navegador sobre o bloco que estou construindo. Então, adiciono `EmailInput` e `PasswordInput` da mesma maneira que escrevo qualquer outra tag _HTML_.

## Carregando meu formulário no HTML

Para que o meu arquivo `Form.js` seja carregado, preciso chamá-lo dentro do arquivo `index.js` principal.

Este é o arquivo inicial e será o primeiro arquivo a ser carregado quando a aplicação estiver rodando. A partir deste arquivo inicial os outros componentes serão carregados.

Assim ficou o `index.js`:

{% highlight javascript %}
import Form from "./Form";

const domContainer = document.querySelector("#react-container");
ReactDOM.render(React.createElement(Form), domContainer);
{% endhighlight %}

Vamos ao resultado:

![]({{ site.url }}/assets/img/screen-shot-2021-12-03.png)

Claramente não era isso que eu esperava! 😔

Aparentemente o browser não consegue lidar com os _imports_ e com a modularização da nossa aplicação.

Para resolver isso vamos precisar de outra ferramenta muito utilizada no mundo frontend: [Webpack](https://webpack.js.org/).

## Instalando, configurando e utilizando o Webpack

_Webpack_ é definido como um empacotador estático de módulos. Ele processa a minha aplicação e, internamente, cria um grafo de dependência com um ou mais pontos de entrada e então, combina cada módulo do projeto em um ou mais pacotes que serão servidos através do navegador.

Ou seja, ele facilita a modularização de uma aplicação, criando maneiras mais eficientes de acessar cada um dos muitos módulos criados.

Vamos à prática. Instale o webpack:

```
yarn add webpack webpack-cli --dev
```

Crie uma pasta chamada `dist` na raiz do seu projeto:

```
mdkir dist
```

Copie o `index.html` para a pasta `dist`

```
mv index.html dist/.
```

Assim está a estrutura do meu projeto:

```
react-app
|- package.json
|- index.js
|- /src
   |- Button.js
   |- index.js
   |- Form.js
   |- EmailInput.js
   |- PasswordInput.js
|- /dist
   |- index.html
|- /node_modules
```

Todo o código _React_ da minha aplicação está dentro da pasta `/src`. O primeiro `index.js`, que está na raiz do projeto, é responsável pelo nosso servidor _Express_.

Um último passo para utilizar _webpack_ com _React_ é configurar como o processamento vai ser feito. Para isso vou criar um arquivo de configuração na raiz do meu projeto:

```
touch webpack.config.js
```

Ao abrir o arquivo `webpack.config.js` vou adicionar as seguintes linhas:

{% highlight javascript %}
module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" },
      },
    ],
  },
};
{% endhighlight %}

Com isso eu garanto que _webpack_ vai sempre iniciar o processamento do meu código pelo arquivo `src/index.js` e vai utilizar o [Babel](https://babeljs.io/) - falo mais sobre ele [aqui](https://www.nelio.me/dando-super-poderes-reactjs-jsx) - para entender meu código _React_.

Por último é só utilizar o _webpack_ para processar minha aplicação e gerar o código que vou utilizar em minha página.

```
npx webpack
```

Pronto! Meu arquivo JS foi gerado na pasta `/dist` com o nome `main.js`.

Hora de testar! 🥁

## Rodando o aplicativo

Será preciso uma pequena alteração no meu arquivo `/dist/index.html` lá do começo do post para que meu aplicativo rode corretamente. Vou substituir a tag `script` que está chamando o `Button` para que carregue o arquivo `index.js` gerado pelo _webpack_:

{% highlight html %}
<html>
  <head>
  </head>
  <body>
	  <div id="react-container"></div>

	  <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
	  <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
	  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

	  <script src="./main.js"></script>
  </body>
</html>
{% endhighlight %}

Pronto! Agora já posso testar no navegador.

Primeiro inicio o meu [servidor local](https://www.nelio.me/configurando-servidor-local-desenvolvimento-frontend):

`yarn start`

Então, acesso a página _localhost:5000_

e... 🎉:

![]({{ site.url }}/assets/img/screen-shot-2021-12-03_2.png)

## Concluindo

Uma das principais vantagens de utilizar _React_ e poder criar componentes que serão reutilizados em outras partes da aplicação. A famosa _componentização_ que sempre vemos por aí. Cria-se uma vez e utiliza-se várias.

Tal vantagem facilita o desenvolvimento e o deixa mais rápido! 👨‍💻💪

## Próximos passos

Convenhamos que desenvolver software da maneira como fizemos neste post não é tão ágil assim. Por isso a comunidade _JavaScript_ e _React_ criaram ferramentas que vão nos ajudar a desenvolver _apps_ _React_ de modo muito mais rápido.

No próximo post vamos dar uma olhada no [_Create React App_](https://create-react-app.dev/).

Até a próxima!

Se gostou desse artigo, se inscreva e receba semanalmente este e outros conteúdos diretamente no seu email. Sem spam! 😎
