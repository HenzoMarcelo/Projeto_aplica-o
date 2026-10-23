# Projeto Prisma — Backend

API REST desenvolvida com TypeScript, Express e PostgreSQL para autenticação de usuários e gerenciamento de publicações.

## Tecnologias

* Node.js
* TypeScript
* Express
* PostgreSQL
* `pg` para acesso ao banco de dados
* `bcrypt` para hash de senhas
* `jsonwebtoken` para autenticação JWT
* `dotenv` para carregar variáveis de ambiente

## Requisitos

* Node.js e npm instalados
* PostgreSQL instalado e em execução
* Um banco de dados criado para o projeto

## Configuração

1. Entre na pasta `backend`.
2. Instale as dependências:

```powershell
   npm install
   ```

3. Crie ou revise o arquivo `.env` na pasta `backend`. Configure as variáveis abaixo com os valores do seu ambiente:

```env
   DATABASE\_URL=postgresql://USUARIO:SENHA@localhost:5432/NOME\_DO\_BANCO
   JWT\_SECRET=COLOQUE\_UM\_SEGREDO\_FORTE\_AQUI
   PORT=3000
   ```

   Substitua os valores de exemplo. Não compartilhe o arquivo `.env` nem envie seus segredos ao GitHub.

4. Confira se o banco de dados e as tabelas foram criados. As migrations estão na pasta `migrations`; o arquivo `seed.sql` contém dados iniciais. Consulte o procedimento de migração já adotado no projeto antes de executar scripts em um banco que contenha dados.

## Executar a API

Na pasta `backend`, execute:

```powershell
npm run dev
```

A API usa a porta `3000` por padrão, ou o valor definido em `PORT`.

Para verificar a conexão:

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/health"
```

Uma resposta bem-sucedida inclui `status: ok` e `database: connected`.

Para compilar o TypeScript:

```powershell
npm run build
```

## Endpoints

Base URL local: `http://localhost:3000`

### Verificação de saúde

|Método|Endpoint|Autenticação|Descrição|
|-|-|-|-|
|GET|`/`|Não|Mensagem de funcionamento da API|
|GET|`/health`|Não|Verifica a conexão com o PostgreSQL|

### Autenticação

Prefixo: `/api/auth`

|Método|Endpoint|Autenticação|Descrição|
|-|-|-|-|
|POST|`/api/auth/register`|Não|Cadastra um usuário|
|POST|`/api/auth/login`|Não|Autentica um usuário e retorna token JWT|
|GET|`/api/auth/profile`|Bearer token|Retorna informações do usuário autenticado|

#### Cadastro — exemplo

`POST /api/auth/register`

```json
{
  "username": "usuario\_teste",
  "email": "usuario@example.com",
  "password": "UmaSenhaForte123"
}
```

#### Login — exemplo

`POST /api/auth/login`

```json
{
  "email": "usuario@example.com",
  "password": "UmaSenhaForte123"
}
```

A resposta de login inclui os dados do usuário e um token JWT. Use esse token nas rotas protegidas.

#### Perfil — exemplo de cabeçalho

```http
Authorization: Bearer SEU\_TOKEN\_JWT
```

### Publicações

Prefixo: `/api/posts`

Todas as rotas de publicações exigem autenticação com JWT no cabeçalho `Authorization: Bearer SEU\_TOKEN\_JWT`.

|Método|Endpoint|Descrição|
|-|-|-|
|GET|`/api/posts`|Lista as publicações|
|GET|`/api/posts/:id`|Busca uma publicação pelo ID|
|POST|`/api/posts`|Cria uma publicação para o usuário autenticado|
|PUT|`/api/posts/:id`|Atualiza uma publicação do usuário autenticado|
|DELETE|`/api/posts/:id`|Exclui uma publicação do usuário autenticado|

#### Criar publicação — exemplo

`POST /api/posts`

```json
{
  "title": "Minha publicação",
  "description": "Descrição da publicação",
  "image": null
}
```

O campo `title` é obrigatório. `description` e `image` podem ser textos ou `null`.

#### Atualizar publicação — exemplo

`PUT /api/posts/1`

```json
{
  "title": "Título atualizado",
  "description": "Descrição atualizada"
}
```

Envie pelo menos um campo para atualizar. A API restringe a atualização e a exclusão ao autor da publicação.

## Códigos HTTP usados

* `200 OK`: operação concluída.
* `201 Created`: publicação criada.
* `204 No Content`: publicação excluída.
* `400 Bad Request`: dados ou ID inválidos.
* `401 Unauthorized`: token ausente/inválido ou credenciais incorretas.
* `404 Not Found`: publicação não encontrada ou não pertence ao usuário autenticado.
* `409 Conflict`: conflito no cadastro, como e-mail duplicado.
* `500 Internal Server Error`: erro inesperado no servidor.

As respostas exatas podem variar conforme a operação e os erros tratados no controlador.

## Organização do código

```text
src/
├── controllers/   # Tratamento das requisições e respostas HTTP
├── middlewares/   # Autenticação JWT
├── repositories/  # Consultas ao PostgreSQL
├── routes/        # Definição dos endpoints
├── services/      # Fluxo e regras da aplicação
├── app.ts          # Configuração e inicialização do Express
└── db.ts           # Pool de conexões PostgreSQL
```

O fluxo esperado das operações é:

`Route → Controller → Service → Repository → PostgreSQL`



\## Modelagem do Banco de Dados



O projeto possui um arquivo de modelagem do banco de dados no formato Draw.io, armazenado em:



`backend/docs/DER\_Prisma\_BancoDeDados.drawio`



O arquivo contém o modelo visual do banco de dados do Projeto Prisma e pode ser aberto e editado utilizando o \[Draw.io](https://app.diagrams.net/).



\### Como visualizar a modelagem



1\. Acesse o \[Draw.io](https://app.diagrams.net/).

2\. Escolha a opção para abrir um diagrama existente no dispositivo.

3\. Selecione o arquivo `DER\_Prisma\_BancoDeDados.drawio`, localizado na pasta `backend/docs/` do projeto.



O arquivo original também está disponível no repositório do projeto, no GitHub.



## Observações para a entrega

* Não versionar o `.env` nem publicar senhas ou o segredo JWT.
* Confirmar que as migrations e a seed podem ser executadas conforme as instruções do projeto.
* Revisar a modelagem conceitual e o script do banco exigidos pela atividade.
* Executar `npm run build` e testar cadastro, login, perfil e as operações do CRUD antes da entrega.
* O script `npm test` atualmente é apenas um placeholder e não executa testes automatizados.

