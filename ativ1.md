# Atividade 1

## 1. Quais tabelas você definiu inicialmente?

Inicialmente, foram definidas 15 tabelas funcionais para o banco de dados do Prisma: `users`, `posts`, `comments`, `likes`, `favorites`, `tags`, `user_tags`, `post_tags`, `albums`, `album_posts`, `album_favorites`, `searches`, `point_transactions`, `profile_items` e `user_profile_items`. Essas tabelas foram definidas para representar as principais funcionalidades da aplicação, como usuários, publicações, comentários, interações, interesses, álbuns, pesquisas, sistema de pontos e personalização dos perfis.

## 2. Você utilizou migrations? Se sim, quantas migrations? Descreva em uma frase o que cada uma faz.

Sim. Foram utilizadas 16 migrations:

* `001_create_users.sql` — cria a tabela de usuários.
* `002_create_posts.sql` — cria a tabela de publicações.
* `003_create_comments.sql` — cria a tabela de comentários.
* `004_create_likes.sql` — cria a tabela de curtidas.
* `005_create_favorites.sql` — cria a tabela de favoritos.
* `006_create_tags.sql` — cria a tabela de tags.
* `007_create_user_tags.sql` — relaciona usuários às suas tags e interesses.
* `008_create_post_tags.sql` — relaciona publicações às suas tags.
* `009_create_albums.sql` — cria a tabela de álbuns.
* `010_create_album_posts.sql` — relaciona publicações aos álbuns.
* `011_create_album_favorites.sql` — cria a tabela de favoritos de álbuns.
* `012_create_searches.sql` — registra as pesquisas realizadas pelos usuários.
* `013_create_point_transactions.sql` — registra as transações de pontos dos usuários.
* `014_create_profile_items.sql` — cria os itens de personalização de perfil.
* `015_create_user_profile_items.sql` — relaciona usuários aos itens de perfil adquiridos.
* `016_add_equipped_profile_items.sql` — adiciona à tabela `users` as referências aos itens de perfil atualmente equipados.

## 3. Qual o caminho do arquivo que gera a seed do seu banco?

O arquivo responsável pela seed do banco está localizado em:

`backend/seed.sql`

Ele contém dados iniciais de teste para as principais tabelas do banco, permitindo popular o banco de dados para desenvolvimento e testes.

## 4. Quais os endpoints que você irá implementar inicialmente? Cada endpoint deve ser um método e um path. Explique em um parágrafo por que você resolveu priorizar a implementação desses endpoints.

Inicialmente, serão implementados os seguintes endpoints:

* `POST /api/users` — criação de usuários.
* `GET /api/posts` — listagem das publicações.
* `GET /api/posts/:id` — visualização de uma publicação específica.
* `POST /api/posts` — criação de publicações.
* `POST /api/posts/:id/comments` — criação de comentários em uma publicação.
* `POST /api/posts/:id/likes` — curtida de uma publicação.
* `POST /api/posts/:id/favorites` — favoritar uma publicação.

Esses endpoints foram priorizados porque representam o fluxo principal da aplicação: permitir que usuários sejam cadastrados, criem e visualizem publicações e possam interagir com elas. A implementação inicial desse conjunto permite construir uma primeira versão funcional do Prisma e, posteriormente, adicionar funcionalidades como álbuns, pesquisas, sistema de pontos, personalização de perfil e recomendações.

## 5. Você está usando algum framework para escrever os endpoints da sua API? Se sim, qual?

Sim. A API será desenvolvida utilizando o **Express**, com **Node.js e TypeScript**. Para a comunicação com o banco de dados PostgreSQL será utilizada a biblioteca **pg (node-postgres)**.
