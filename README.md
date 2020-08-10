<h1 align="center">Quake III Log Parser</h1>

<p align="center"> Uma simples aplicação para parser do arquivo de log do jogo Quake 3.
    <br>
</p>

## Conteúdo

- [Começando](#getting_started)
- [Construído usando](#built_using)
- [Encontrando alguns arquivos importantes](#detail)

## Começando <a name = "getting_started"></a>

Essas instruções vão te permitir baixar uma cópia do código fonte da aplicação e depois rodar na sua maquina.

### Pré-requisitos

- A primeira ação é baixar o código fonte da aplicação, para isso clone o repositório com o seguinte comando:.

```
git clone https://github.com/kelsonpalharini/quake-III-parser.git
```

- A segunda ação é verificar se você possui a versão do Node.JS esperada para rodar a aplicação(12.16.1),
  para isso, acesso o console no diretório da aplicação e execute o comando:

```
nvm use
```

Se tudo correr bem, ele vai passar a usar a versão esperada, ou se não, vai te avisar para instalar a mesma. Caso
acontença isso, use o comando:

```
nvm install 12.16.1
```

### Rodando a aplicação

Dentro do arquivo de configuração, package.json, existem 3 script's, dev, test, start, que você executa assim:

```
yarn dev
```

Executa a aplicação em modo de desenvolvimento, e chama o nodemon para autoreload;

```
yarn start
```

Executa a aplicação em modo de produção;

```
yarn test
```

Executa os testes usando Jasmine;

E se nada acontecer de errado, você vai ter duas rotas prontas para acesso:

-A primeira, lista o resultado do parser do arquivo de log, em formato JSON.

[http://localhost:3000/api/games](http://localhost:3000/api/games).

-A segunda, gera um report em formato PDF, para facilitar a visualização do parser do arquivo.

[http://localhost:3000/api/games/report](http://localhost:3000/api/games/report).

## Construído usando <a name = "built_using"></a>

- [Node.JS](https://nodejs.org/) - JavaScript runtime
- [Express](https://expressjs.com/) - Rest Framework
- [Jasmine](https://jasmine.github.io/) - JavaScript Testing Framework

A aplicação seguiu o style guide de desenvolvimento da [AirBnB](https://github.com/airbnb/javascript)

## Encontrando alguns arquivos importantes <a name = "detail"></a>

O código do controller que gera o parser do arquivo Log pode ser encontrado em:

```
/src/controllers/LogParserController.js
```

Os arquivos de testes estão no diretório:

```
/spec/
```

O arquivo de configuração do servidor pode ser encontrado em:

```
/src/app.js
```
