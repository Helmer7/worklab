# Worklab - Gerenciador Simples

Worklab é um sistema simples para gerenciar pacientes e exames, desenvolvido utilizando **React** no frontend e **Express.js** no backend, com **SQLite** como banco de dados.

## Sumário

1. [Introdução](#introdução)
2. [Pré-requisitos](#pré-requisitos)
3. [Configuração do Projeto](#configuração-do-projeto)
4. [Execução](#execução)
5. [Funcionalidades](#funcionalidades)
6. [Estrutura de Pastas](#estrutura-de-pastas)
7. [Contribuição](#contribuição)
8. [Licença](#licença)

---

## Introdução

Este projeto permite o gerenciamento de pacientes e exames. Ele é dividido em duas partes principais:
- **Backend**: Responsável por processar as requisições, gerenciar os dados e fornecer APIs.
- **Frontend**: Interface para os usuários interagirem com o sistema.

---

## Pré-requisitos

Certifique-se de que as seguintes ferramentas estão instaladas no seu computador:
- [Node.js](https://nodejs.org) (v14 ou superior)
- [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

---

## Configuração do Projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/worklab.git
   cd worklab

2. Instale as dependências do backend:

   cd worklab-backend
   npm install

3. Instale as dependências do frontend:
   
   cd ../worklab-frontend
   npm install

## Execução / Rodando o backend

1. Acesse a pasta do backend:
  
   cd worklab-backend

2. Inicie o servidor:
   
   npm start

3. O backend estará rodando em: http://localhost:3000


## Execução / Rodando o Frontend

1. Acesse a pasta do frontend:
   
   cd worklab-frontend

2. Inicie o frontend:

   npm start

3. A aplicação estará acessível em: http://localhost:3001


## Execução / Instalar o Concurrently / funcionando tudo junto

1. No terminal, dentro do diretório principal do projeto (Onde estão as pastas Front e Back) instale o pacote: 

   npm install concurrently --save-dev

2. A aplicação estará acessível em: http://localhost:3001

## Funcionalidades

1. Cadastro de Pacientes:
   
   Nome completo, sexo, e-mail e celular.

2. Cadastro de Exames:

   Código, descrição e valor.

3. Vincular Exame a Paciente:

   Seleção de paciente e código do exame.

4. Editar e Excluir Pacientes.

5. Relatórios de Pacientes com Exames:
   
   Exibe os exames vinculados a um paciente.


