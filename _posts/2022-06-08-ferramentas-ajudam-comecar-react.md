---
layout: post
title: "Ferramentas que te ajudam a começar com React 🛠"
tags: [frontend, programação, javascript, react]
excerpt: "Alguns caminhos possíveis no seu começo com React"
date: 2022-06-08 17:05:55
permalink: /:title
comments: true
---

![]({{ site.url }}/assets/img/cover-2022-06-08.jpeg)

# Ferramentas que te ajudam a começar com *React*

Criar seu primeiro aplicativo com *React* pode ser uma tarefa árdua e cansativa. Inclusive, muito antes de escrever a primeira linha de código. Isso porque antes mesmo de criar algum componente, o desenvolvimento frontend exige várias configurações iniciais. E isso pode se tornar pesadelo.

Vimos em alguns outros [posts](https://www.nelio.me/conectando-componentes-em-react) sobre a necessidade de ferramentas como um [servidor web](https://expressjs.com/pt-br/), [webpack](https://webpack.js.org/), [babel](https://babeljs.io/), [lint](https://eslint.org/) e várias outras que nem mesmo comentei sobre. Já adianto que algumas delas não são divertidas de configurar. E ter todo esse arsenal de ferramentas para estudar logo de cara, pode ser bastante desmotivador.

Outros desenvolvedores que também tiveram tais dores, criaram ferramentas incríveis que nos possibilita ter uma excelente configuração *out of the box*, e assim, podermos iniciar com a parte mais divertida: escrever código!

Desde scripts simples, até frameworks mais avançados, vou descrever um pouco sobre algumas das principais ferramentas que vão te ajudar a iniciar seu projeto frontend com React.

## Estratégias de construção de aplicativos frontend

Mas antes vamos entender 3 estratégias de construção de aplicativos frontend: SPA, SSR, SSG

### SPA: Single Page Applications

Single Page Applications são aplicativos web de página única. Ou seja, todo o código é carregado uma única vez (no primeiro carregamento da página) e a partir daí, qualquer envio e recebimento de dados e feito através de API requests.

Este tipo de aplicativo visa trazer uma experiência similar a um aplicativo nativo. SPAs tentam criar uma navegação mais fluida através de um carregamento particionado, ou seja, apenas partes da página que necessitam ser atualizadas o são. O que difere de uma página web tradicional, onde ações e cliques, levam ao carregamento de outra página.

*React* e seus conceitos de *componentização* e de atualização baseado em mudança de estado, facilitaram e muito o desenvolvimento das SPAs. Com a sua chegada e popularização, ficou mais fácil criar aplicativos com inúmeros componentes individuais e que eram atualizados, de acordo com estado de cada  um dos componentes.

A partir daí, inúmeras outras bibliotecas foram criadas para auxiliar no desenvolvimento de SPAs, como: react-router, redux, axios e tantas outras.

### SSR: Server Side Rendering

A maioria das páginas de internet são montadas no servidor e este, apenas as serve para os navegadores através de arquivos HTML. A grande sacada do *Server Side Rendering* foi utilizar o melhor dos dois mundos. Faz-se um carregamento inicial da página pelo servidor e, após a pagina carregada, quaisquer novas alterações são feitas através do lado do cliente. Diferentemente de uma SPA, a qual utiliza o navegador para a criação da página HTML.

Com isso, um aplicativo SSR tem algumas vantagens, como diminuir (algumas vezes muito) o tempo de espera de carregamento da página, ter um melhor ranking nos buscadores, facilitar o uso de tags *open graph* e muitas outras.

*React* por si só não consegue realizar tais façanhas. Ele roda apenas no navegador e portanto, se faz necessário ter algo rodando no lado do servidor, que vai renderizar o conteúdo inicial. Frameworks *server side* como *NodeJS* e *Ruby on Rails* podem ser necessários para que o *Server Side Rendering* aconteça.

### SSG

*Static Site Generator* como o nome já diz, é um *framework* que cria páginas HTML a partir de *templates* ou *componentes* de uma dada fonte. Estes são uma alternativa aos websites dirigidos por banco de dados.

Em páginas web e aplicativos que necessitam que seus dados sejam imediatamente acessados, a toda requisição, pois mudam com frequência, se faz necessário um banco de dados. Já páginas que que tem um conteúdo estático e sem mudanças com alta frequência, *SSG* é perfeito. Pois, com a geração das páginas estática, elimina-se o intervalo necessário para a comunicação com o banco de dados.

As páginas são geradas no momento do *build* do site. Ou seja, os arquivos HTML gerados estarão prontos quando requisitados. Desta maneira, páginas são carregadas com muito mais velocidade, evitando quedas por picos de acesso.

Tal estratégia é perfeita para blogs e *landing pages*.

## Ferramentas para criação de Apps com React

### [Create React App](https://create-react-app.dev/)

A primeira e mais popular ferramenta - que nada mais é do que um *boilerplate* - é o `create-react-app`. Com ele é possível ter uma configuração inicial para criar um aplicativo *React*. Ele já vem com vários pacotes e *scripts* que vão te ajudar na parte inicial do seu projeto. É uma maneira muito simples de criar um SPA com React.

Após a criação de seu projeto com `create-react-app`, já é possível ir direto ao código e então rodar tudo no browser sem qualquer dificuldade. Ferramentas como *eslint*, *webpack*, *babel*, *jest*, *hotreload* e *env vars* já vem incluso e pronto para ser usado. E essa é a principal vantagem quando usamos *boilerplates*: reduzir algum tipo de trabalho inicial para que possamos começar o projeto passos a frente.

A grande vantagem do *Create React App* é ter a equipe que criou o *React* - e do Facebook - por trás. Além do fato de ser código aberto.

Outra característica importante é o fato do projeto conter apenas uma dependência inicial: `react-scripts`. Este pacote é o responsável por manter funcionando todos os outros pacotes de configuração do seu projeto. Através dele também é possível gerar seu app com todas as configurações para produção, como *[minification](https://www.toptal.com/developers/javascript-minifier)*, *[code splitting](https://developer.mozilla.org/en-US/docs/Glossary/Code_splitting)*, *compression* e muito mais.

Talvez a sua maior desvantagem seja a dificuldade de customização. Por manter tudo encapsulado dentro de um único pacote, *Create React App* dificulta a inserção e remoção de outros pacotes que, porventura, necessitamos utilizar. Isso prova ser excelente para aplicações comuns, mas não para aplicações que tenham um escopo diferente da maioria e exigem configurações avançadas.

A boa notícia é que ele oferece o recurso [`eject`](https://create-react-app.dev/docs/available-scripts#npm-run-eject). Tal recurso permite que o desenvolvedor possa se desvincular do pacote [`react-scripts`](https://www.npmjs.com/package/react-scripts) e então, editar diretamente todos os arquivos de configurações. No entanto, após o *eject*, não é mais possível voltar para o *Create React App* e todas as configurações, desde atualizações à correções de segurança, ficam na mão do time de desenvolvimento.

### [Vite](https://vitejs.dev/)

Este tem sido amplamente adotado nos últimos tempos e o hype é justificável. **Vite é rápido**!

Frontend nunca teve tanta relevância no desenvolvimento web como nos últimos anos. Consequentemente, *Javascript* nunca foi tão importante. Aplicações de todos os tipos e complexidades tem usado frameworks frontend. Não é raro encontrar repositórios enormes em que *Javascript* é a linguagem principal. E com esse montante de código só aumentando, velocidade e performance tende a cair.

Felizmente os navegadores também vêm se desenvolvendo e as ferramentas de *bundling* tem se aproveitado disso. Esse é o caso do [Vite](https://vitejs.dev/). Ele tenta resolver os problemas de modularização de grandes aplicações utilizando as novas ferramentas nativas dos navegadores - as quais não existiam antes.

As suas principais vantagens são:

* Melhora na velocidade de inicialização do servidor de desenvolvimento

		Quando em um projeto medio/grande porte, iniciar o servidor pode levar um tempo considerável. Vite atua pra diminuir esse tempo.
		
	
* Melhora na velocidade de atualização do *build* quando em desenvolvimento

		Quando editamos arquivos em projetos frontend, o *build* deve acontecer novamente. Este processo pode ser um pouco mais demorado se o projeto é maior. Vite deixa tudo mais rápido.

Se você está começando no mundo *React*, vale a pena começar com *Vite*. Retirar gargalos já no início do processo de desenvolvimento, pode deixar o caminho muito mais fácil.

### [NextJS](https://nextjs.org/)

Mais do que os outros dois *boilerplates*, [NextJS](https://nextjs.org/) é um framework. Ele não só vai te ajudar com as configurações e códigos iniciais no seu projeto, como vai te dar também, uma estrutura completa.

No *NextJS* a estrutura de pastas já é definida. O roteamento do seu aplicativo, suporte para *TypeScript* e otimização de imagens também já está lá. Além de tudo isso, ainda é possível escrever código backend com *NodeJS*. Páginas podem ser geradas do lado do servidor de uma maneira bem simples. Com isso podemos utilizar de estratégias como SSR e SSG.

Ele também te permite construir sua API no mesmo projeto. Tal característica permite ir além do frontend, e assim, integrar seu aplicativo com banco de dados, meios de pagamentos e outras APIs de terceiros. Tudo dentro do mesmo projeto.

Tais características fazem do *NextJS* um framework *React* robusto e de muita qualidade. Aliado com a plataforma [Vercel](https://vercel.com/), é possível criar aplicativos prontos para produção de maneira muito rápida.

Apesar de ser um framework ainda novo, ele ganhou força e vem entregando o que promote. Ele tem inúmeros comentários positivos da comunidade frontend e vem crescendo cada dia mais. Tem sido a minha escolha na criação de novos projetos React.

### [Gatsby](https://www.gatsbyjs.com/)

Gatsby é outro framework frontend muito poderoso. A sua proposta é facilitar o desenvolvimento de páginas web através da técnica de *SSG*. Utilizando *React* e outras tecnologias top de mercado como GraphQL e Webpack, é possível criar páginas extremamente rápidas e escaláveis. Talvez por isso este framework tem sido o preferido quando o assunto é Marketing websites.

Gatsby permite que o desenvolvedor combine dados coletados de diferentes lugares em uma única página. Por exemplo, é possível carregar produtos de uma loja Shopify e um formulário Mailchimp.

Outro fator que salta os olhos é sua velocidade. Por conta da estratégia de *SSR*, combinada com algumas outras, Gatsby te dá a possibilidade de construir um site performático e rápido, ajudando a melhorar tráfegos orgânicos.

Com tantas características disponíveis de imediato e de fácil configuração, Gatsby é super popular. Vale a pena dar uma olhada  em seus [casos de sucesso](https://www.gatsbyjs.com/use-cases/) e conferir se é uma boa idéia para você.

## Por onde começar

Direto ao código!! 👨‍💻

Quando no início, o que mais deixa um programador feliz é programar. Isso significa que dado as inúmeras ferramentas presentes no desenvolvimento frontend, tentar eliminar a maior quantidade possível de trabalho que não seja código, vai ajudar o programador iniciante no seu aprendizado.

Não me entenda errado!! Saber sobre ferramentas, servidores, bibliotecas e editores faz parte do mundo da programação. Eventualmente vai se tornar imprescindível conhecer sobre os diferentes cantos deste universo. No entanto, alguns destes conceitos podem ser cansativos e desanimadores no início.

Minha dica é: escolha um framework que te dê as configurações prontas e comece a escrever código *Javascript* usando *React* no dia 1. E então, conforme vá evoluindo, se aprofunde no mundo a sua volta.

Bons estudos!

Se gostou desse artigo, se inscreva e receba semanalmente este e outros conteúdos diretamente no seu email. Sem spam! 😎
