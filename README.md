# Worklab - Gerenciador Simples

Worklab é um sistema simples para gerenciar pacientes e exames, desenvolvido utilizando **React** no frontend e **Express.js** no backend, com **SQLite** como banco de dados.

## Sumário

1. [Introdução](#introdução)
2. [Pré-requisitos](#pré-requisitos)
3. [Configuração do Projeto](#configuração-do-projeto)
4. [Execução](#execução)
   - [Rodando Backend](#rodando-o-backend)
   - [Rodando Frontend](#rodando-o-frontend)
   - [Rodando Tudo Junto](#rodando-tudo-junto)
5. [Funcionalidades](#funcionalidades)
6. [Estrutura de Pastas](#estrutura-de-pastas)
7. [Contribuição](#contribuição)
8. [Licença](#licença)

---

## Introdução

O **Worklab** é uma aplicação voltada para o gerenciamento de pacientes e exames médicos, composta por:
- **Backend**: API para manipulação de dados de pacientes e exames.
- **Frontend**: Interface interativa para cadastro, edição e relatórios.

---

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:
- [Node.js](https://nodejs.org) (v14 ou superior)
- [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

---

## Configuração do Projeto

1. Clone este repositório:
   ```bash
   git clone https://github.com/Helmer7/worklab.git
   cd worklab

2. Instale as dependências do backend:
    ```bash
    cd worklab-backend
    npm install

3. Instale as dependências do frontend:
   ```bash
   cd ../worklab-frontend
   npm install

##    Execução / Rodando o Backend

1. Acesse a pasta do backend:
   ```bash
   cd worklab-backend

3. Inicie o servidor:
   ```bash
   npm start

4. O backend estará rodando em: http://localhost:5000   


## Execução / Rodando o Frontend

1. Acesse a pasta do frontend:
   ```bash
   cd worklab-frontend

3. Inicie o frontend:
   ```bash
   npm start

4. A aplicação estará acessível em: http://localhost:3001


## Execuçãp / Rodando Tudo Junto

1. No diretório principal (worklab), instale o concurrently:
   ```bash
   npm install concurrently --save-dev

3. No arquivo package.json da pasta principal, adicione o script ou veja se já está configurado, para rodar os dois servidores:

   
    "scripts": {
  "start": "concurrently \\"cd worklab-backend && npm start\\" \\"cd worklab-frontend && npm start\\""
}

4. Inicie ambos os servidores:
   ```bash
   npm start

5. O backend estará em http://localhost:5000 e o frontend em http://localhost:3001

6. funcionando na porta http://localhost:3001.

## Funcionalidades

1. Cadastro de Pacientes:

   Informações: Nome completo, sexo, e-mail e celular.

2. Cadastro de Exames:

   Informações: Código, descrição e valor.

3.Vincular Exame a Paciente:

   Seleção de um paciente e código do exame.

4. Editar e Excluir Pacientes:

   Atualize ou remova registros de pacientes existentes.

5. Relatórios de Pacientes com Exames:

   Visualize os exames vinculados a um paciente específico.

## Estrutura de Pastas
```bash
   worklab/
├── worklab-backend/       # Código do backend (API Express.js)
│   ├── index.js           # Arquivo principal do servidor
│   ├── package.json       # Dependências do backend
│   ├── database.sqlite    # Banco de dados SQLite
│   └── ...
├── worklab-frontend/      # Código do frontend (React)
│   ├── src/               # Código-fonte do React
│   ├── public/            # Arquivos públicos (HTML, ícones)
│   ├── package.json       # Dependências do frontend
│   └── ...
└── package.json           # Configuração principal para rodar os dois servidores



## Contribuição // Contribuições são bem-vindas! Siga estas etapas:

1. Faça um fork do projeto.

2. Crie uma nova branch: git checkout -b minha-feature.

3. Faça suas alterações e commit: git commit -m 'Adicionei uma nova feature'.

4. Envie para o repositório remoto: git push origin minha-feature.

5. Abra um Pull Request no GitHub.

