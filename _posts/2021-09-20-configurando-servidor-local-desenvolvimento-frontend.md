---
layout: post
title: "Configurando um servidor local para desenvolvimento frontend 💾"
tags: [frontend, programação, javascript, servidor, express, yarn]
excerpt: "Instalando express para servir seus aplicativos React de um servidor
local"
date: 2021-09-20 00:25:55
permalink: /:title
comments: true
tweet: true
---

![]({{ site.url }}/assets/img/first-09-20.jpeg)

Quando entramos no mundo de desenvolvimento web eventualmente vamos precisar configurar um servidor local. É muito comum no início do aprendizado, apenas abrir arquivos *HTML* no navegador. Mas eu, como desenvolvedor frontend, não posso simplesmente continuar abrindo o arquivo *HTML* diretamente do meu diretório em uma página web? Sim! No entanto, existem limitações que me impediria de criar um aplicativo ou uma página mais complexa.

Um servidor local me aproxima do ambiente de produção - ambiente o qual irá hospedar meu aplicativo (ou página) e será acessado pelos usuários finais - e também, habilita o browser a utilizar mais recursos do que se rodo o arquivo de um diretório comum.

## Instalando o servidor

Existem inúmeros servidores e frameworks web gratuitos e de fácil instalação. Dentre os mais famosos posso citar: [Apache](https://apache.org/), [nginx](https://nginx.org/en/) e [Puma](https://puma.io/). Cada um com a sua especificidade.

Como o meu objetivo é rodar uma aplicação JavaScript, usando React, vou utilizar o *[Express](https://expressjs.com/)*. Ele pode ser utilizado em conjunto com o [Node.js](https://nodejs.org/en/) para servir páginas estáticas. E este é o nosso objetivo. 

Sendo assim, vou precisar instalar algumas outras ferramentas.

## Instalando Node.js

Existem algumas maneiras de instalar o *Node.js*. É possível realizar a instalação simplesmente baixando o *Node.js* através do site oficial. A meu ver a maneira mais fácil é utilizar o *Node Version Manager* - [nvm](https://github.com/nvm-sh/nvm).

Após a instalação do *nvm* abri o terminal e digitei o seguinte comando para instalar a versão mais recente do *Node.js*:

```
nvm install node
```

Depois:

```
node -v
```

E a versão instalada foi `v14.0.0`.

Pronto, agora posso seguir com a instalação do *Express*.

## Instalando o *yarn*

[yarn](https://yarnpkg.com/) é um gerenciador de pacotes que me permite utilizar e compartilhar códigos de outros desenvolvedores de uma maneira super fácil. Vou utilizá-lo, pois facilita a instalação do *Express*, bem como de outros pacotes necessários durante o desenvolvimento com *React*.

No site oficial existem diferentes maneiras de como instalar o yarn, baseado no sistema operacional. Como estou em um macOS instalei utilizando o *Homebrew*:

```
brew install yarn
```

*yarn* instalado! Agora posso enfim instalar o *Express*.

## Instalando *Express*

Primeiro, através do terminal, vou criar uma nova pasta para a minha aplicação:

```
mkdir ~/react-app
cd ~/react-app
```

Já dentro da pasta criada, vou iniciar o *yarn*

```
yarn init -y
```

Este comando cria o arquivo `package.json`, responsável por organizar os pacotes instalados através do *yarn*.

Agora, vou instalar o *Express*

```
yarn add express
```

*Express* foi instalado com sucesso!

## Configurando e iniciando meu servidor

Com o *Express* instalado vou criar o arquivo responsável por configurar e iniciar o servidor que irá servir o meu aplicativo *React*. Ainda dentro da pasta `react-app` irei criar o arquivo `index.js`:

{% highlight javascript %}
// importa o framework Express
const express = require('express');
// cria uma instância do express
const app = express();

// Cria uma regra para requisições GET à pagina inicial
// do aplicativo
app.get('/', (req, res) => {
  // Envia uma resposta ao navegador
  res.send('Do nosso servidor recém criado');
});

// Inicia o servidor Express na porta 3000
app.listen(3000, () => {
  console.log('servidor iniciado na porta 3000');
});
{% endhighlight %}

Adicionei comentários ao código acima para que fique compreensível cada linha. Mas, este simples trecho de código, é responsável por servir o nosso aplicativo *React*.

Vou agora adicionar uma entrada *script* no arquivo *package.json* para que possamos iniciar nosso servidor.

O meu *package.json* até o momento está assim:

	{
	  "name": "react-app",
	  "version": "1.0.0",
	  "main": "index.js",
	  "license": "MIT",
	  "dependencies": {
	    "express": "^4.17.1"
	  },
	  "scripts": {
		  "start": "node index.js"
	  }
	}

Adicionando o trecho `"start": "node index.js"` me permite iniciar o servidor através do seguinte comando no terminal:

```
yarn start
```

E esta foi a resposta:

![]({{ site.url }}/assets/img/screenshot-09-20-1.png)

Ao abri meu navegador e acessar o endereço *http://localhost:3000* vejo a seguinte mensagem:

![]({{ site.url }}/assets/img/screenshot-09-20-2.png)

Tudo como deveria ser! Nosso servidor está funcionando!! 🎉

Mas espera! Como vou rodar minha aplicação *React*!?

## Como rodar minha aplicação *React* no servidor

Ao invés de simplesmente retornar uma mensagem do servidor quando acessar minha página no navegador, eu preciso retornar minha aplicação. Isso se dá através do arquivo *index.html* que criei [anteriormente](https://www.nelio.me/criando-sua-primeira-aplicacao-react).

Primeiro, vou criar uma pasta chamada `public/` que vai conter meu arquivo `index.html` e também, meus arquivos *Javascript*.

	mkdir public
	
Então, vou copiar o *index.html* para a pasta `public`, que está dessa maneira:

{% highlight html %}
<html>
  <head>
  </head>
  </body>
    <div id="react-container"></div>

    <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
    
    <!-- Load our React component. -->
    <script src="Button.js"></script>
  </body>
</html>
{% endhighlight %}

Feito isso, preciso agora alterar o arquivo `index.js` responsável por rodar o nosso servidor para que ao invés de retornar uma simples mensagem, ele possa retornar o nosso arquivo `index.html`.

Adiciono o *import* da modulo `path` que é necessário para ler as pastas do sistema:

{% highlight javascript %}
const path = require("path");
{% endhighlight %}

E depois, substituo a mensagem de retorno pelo caminho do nosso arquivo `index.html`:

{% highlight javascript %}
res.sendFile(path.join(__dirname, "public", "index.html"));
{% endhighlight %}

Ficando assim:

{% highlight javascript %}
// importa o framework Express
const express = require("express");
// cria uma instância do express
const app = express();

const path = require("path");

// Cria uma regra para requisições GET na pagina inicial
// do aplicativo
app.get("/", (req, res) => {
  // Carrega o arquivo index.html dentro da pasta public
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Inicia o servidor Express na porta 3000
app.listen(3000, () => {
  console.log("servidor iniciado na porta 3000");
});
{% endhighlight %}

E o resultado:

![]({{ site.url }}/assets/img/screenshot-09-20-3.png)

Aparentemente funcionou. Mas onde está o nosso botão em *React*!? 🤔
Com um pouco de pesquisa descobri que da maneira como carregamos o nosso *index.html*, não será possível carregar também os arquivos *Javascript* ou *CSS*, pois *Express* não consegue renderizar arquivos apenas com o método `sendFile`.

Ainda é preciso fazer uma pequena mudança. Vou substituir a linha com o `sendFile` por esta:

{% highlight javascript %}
app.use(express.static("public"));
{% endhighlight %}

E ficou assim:

{% highlight javascript %}
// importa o framework Express
const express = require("express");
// cria uma instância do express
const app = express();

const path = require("path");

// Cria uma regra para requisições GET à pagina inicial
// do aplicativo
app.get("/", (req, res) => {
  // Carrega o arquivo index.html dentro da pasta public
  app.use(express.static("public"));
});

// Inicia o servidor Express na porta 3000
app.listen(3000, () => {
  console.log("servidor iniciado na porta 3000");
});
{% endhighlight %}

Pronto! Agora a minha página *React* está sendo apresentada diretamente de um servidor.

![]({{ site.url }}/assets/img/screenshot-09-20-4.gif)

## Próximos Passos

A seguir vou criar um aplicativo mais robusto, com componentes independentes, mas conectados através de um outro componente de hierarquia maior. O fato de rodar a página de um servidor me dá inúmeras opções as quais eu não tinha, por rodar diretamente do browser. Uma delas é fazer importações diretamente dos arquivos *Javascript*.

Se gostou desse artigo, se inscreva e receba semanalmente este e outros conteúdos diretamente no seu email. Sem spam! 😎 
