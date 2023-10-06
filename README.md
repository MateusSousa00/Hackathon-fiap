# Hackathon FIAP / PASSOS MÁGICOS

Este projeto MVP faz parte do Hackathon da [FIAP](https://www.fiap.com.br/) com parceria da [Passos Mágicos](https://passosmagicos.org.br/) sobre o Município de Embu Guaçu

# Sobre o Projeto

Imagine morar em uma cidade onde chove 70% dos dias do ano porém grande parte da população não tem acesso a água com qualidade? Nós viemos para mudar essa história.

# Frontend:

O frontend encontra-se na pasta `nossa-agua-app`

## Foram utilizados as Tecnologias abaixo:

- Node: ambiente de execução do código Javascript
- Typescript: linguagem utilizada, o superset do Javascript
- TailwindCSS: framework para utilização do CSS na própia pagina HTML
- React: framework para criação de páginas HTML
- Next: framework complementar do React para criação de páginas HTML
- Prettier: para organização e padronização do codigo
- Eslint: para organização e padronização do código auxiliando Prettier

## O que é necessário para iniciar o projeto?

- Node

## Instalação e execução do projeto:

- clone o projeto com sua chave ssh e utilize no terminal o comando `git clone "git@github..."`
- entre no projeto `cd frontend`
- execute os comandos `npm install && npm run dev`
- acesse o projeto em `http://localhost:3000`
- divirta-se!
  

# Backend:

O backend encontra-se na pasta `nossa-agua-api` no nosso projeto.

## Foram utilizados as Tecnologias abaixo:

- Python: Liguagem para desenvolvimento da aplicação
- Django: Para a contrução interna da aplicação
- Django Rest Framework: Ferramentas que nos permitem contruir API's:
   - API navegável para desenvolvedor
   - Sistema de autentificação
   - Serialização de dados   
- Virtualenv: Para criar um ambiente virtual, em que possamos instalar as bibliotecas necessárias sem que surjam conflitos.
- Serializers: Para conversão dos dados em JSON ou xml


## O que é necessário para inciar o projeto?

 - Clone o projeto com sua chave ssh e utilize no terminal o comando `git clone "git@github..."`
 - Python
 - Django
 - Django Rest Framework
 - Certifique-se de rodar versões compatíveis da instancias conforme utilizado no projeto.
 - Pacotes pip:
      - python3 -m pip install --user --upgrade pip
      - python3 -m pip --version
 - Instalar todas as dependências que constam no Requirements.txt.
 - Instalar a Virtualenv:
      - py -m pip install --user virtualenv
 - Ativar a Virtualenv:
      - .\env\Scripts\activate


## Para mais informações, consulte as documentações oficiais:
- <a>https://packaging.python.org/pt_BR/latest/guides/installing-using-pip-and-virtual-environments/</a>
- <a>https://www.django-rest-framework.org/</a>
- <a>https://docs.djangoproject.com/en/4.2/</a>
