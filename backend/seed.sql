TRUNCATE TABLE
    user_profile_items,
    album_favorites,
    album_posts,
    searches,
    point_transactions,
    comments,
    likes,
    favorites,
    post_tags,
    user_tags,
    albums,
    posts,
    profile_items,
    tags,
    users
RESTART IDENTITY CASCADE;

INSERT INTO users (
    username,
    email,
    password,
    profile_image,
    bio
) VALUES
(
    'henzo',
    'henzo@prisma.com',
    'senha_teste_123',
    NULL,
    'Explorando novas ideias e inspirações.'
),
(
    'marina',
    'marina@prisma.com',
    'senha_teste_456',
    NULL,
    'Apaixonada por arte, fotografia e viagens.'
),
(
    'lucas',
    'lucas@prisma.com',
    'senha_teste_789',
    NULL,
    'Compartilhando projetos e referências.'
);

INSERT INTO tags (name) VALUES
    ('Tecnologia'),
    ('Programação'),
    ('Design'),
    ('Fotografia'),
    ('Viagens'),
    ('Arte'),
    ('Música'),
    ('Games'),
    ('Natureza'),
    ('Arquitetura');

    INSERT INTO profile_items (name, type, cost) VALUES
    ('Moldura Azul', 'frame', 100),
    ('Moldura Roxa', 'frame', 150),
    ('Moldura Dourada', 'frame', 250),
    ('Fonte Pixel', 'font', 100),
    ('Fonte Manuscrita', 'font', 150),
    ('Fonte Moderna', 'font', 200),
    ('Bio Azul', 'bio_color', 80),
    ('Bio Roxa', 'bio_color', 120),
    ('Bio Verde', 'bio_color', 120);

    INSERT INTO posts (
    author_id,
    image,
    title,
    description
) VALUES
(
    1,
    'https://exemplo.com/imagem-tecnologia.jpg',
    'Meu setup para programação',
    'Um espaço simples para estudar programação e desenvolver projetos.'
),
(
    2,
    'https://exemplo.com/fotografia-japao.jpg',
    'Arquitetura no Japão',
    'Uma coleção de referências de arquitetura e ruas japonesas.'
),
(
    3,
    'https://exemplo.com/design-interface.jpg',
    'Inspirações para interfaces',
    'Algumas referências de design para criação de interfaces modernas.'
),
(
    1,
    'https://exemplo.com/natureza.jpg',
    'Paisagens naturais',
    'Referências de paisagens e lugares para conhecer.'
);

INSERT INTO user_tags (user_id, tag_id) VALUES
    (1, 1), -- Henzo - Tecnologia
    (1, 2), -- Henzo - Programação
    (1, 8), -- Henzo - Games

    (2, 4), -- Marina - Fotografia
    (2, 5), -- Marina - Viagens
    (2, 6), -- Marina - Arte

    (3, 3), -- Lucas - Design
    (3, 10), -- Lucas - Arquitetura
    (3, 1); -- Lucas - Tecnologia

INSERT INTO post_tags (post_id, tag_id) VALUES
    (1, 1), -- Setup - Tecnologia
    (1, 2), -- Setup - Programação
    (1, 8), -- Setup - Games

    (2, 4), -- Japão - Fotografia
    (2, 5), -- Japão - Viagens
    (2, 10), -- Japão - Arquitetura

    (3, 3), -- Interfaces - Design
    (3, 1), -- Interfaces - Tecnologia

    (4, 9); -- Paisagens - Natureza

INSERT INTO comments (
    author_id,
    post_id,
    content
) VALUES
(
    2,
    1,
    'Gostei bastante dessa ideia de setup!'
),
(
    3,
    1,
    'Esse espaço parece ótimo para estudar.'
),
(
    1,
    2,
    'Essa arquitetura é uma ótima referência.'
),
(
    3,
    4,
    'Essas paisagens são muito bonitas.'
);

INSERT INTO likes (user_id, post_id) VALUES
    (2, 1), -- Marina curtiu o setup
    (3, 1), -- Lucas curtiu o setup
    (1, 2), -- Henzo curtiu a publicação sobre o Japão
    (3, 2), -- Lucas curtiu a publicação sobre o Japão
    (1, 3), -- Henzo curtiu a publicação sobre interfaces
    (2, 3), -- Marina curtiu a publicação sobre interfaces
    (2, 4); -- Marina curtiu a publicação sobre natureza

INSERT INTO favorites (user_id, post_id) VALUES
    (1, 3),
    (2, 1),
    (3, 2),
    (1, 4);

-- Álbuns
INSERT INTO albums (user_id, name, description) VALUES
    (1, 'Tecnologia', 'Referências de tecnologia e programação.'),
    (2, 'Japão', 'Lugares e referências do Japão.'),
    (3, 'Design', 'Inspirações para interfaces e projetos.');

-- Publicações dentro dos álbuns
INSERT INTO album_posts (album_id, post_id) VALUES
    (1, 1),
    (1, 3),
    (2, 2),
    (2, 4),
    (3, 3);

-- Álbuns favoritados
INSERT INTO album_favorites (user_id, album_id) VALUES
    (2, 1),
    (3, 1),
    (1, 2);

-- Pesquisas realizadas
INSERT INTO searches (user_id, term) VALUES
    (1, 'programação'),
    (1, 'tecnologia'),
    (2, 'Japão'),
    (2, 'fotografia'),
    (3, 'design'),
    (3, 'interfaces');

-- Pontos obtidos pelos usuários
INSERT INTO point_transactions (user_id, amount, type) VALUES
    (1, 100, 'publication'),
    (1, 50, 'search'),
    (2, 100, 'publication'),
    (2, 50, 'search'),
    (3, 100, 'publication'),
    (3, 50, 'search');

-- Itens adquiridos pelos usuários
INSERT INTO user_profile_items (user_id, item_id) VALUES
    (1, 1),
    (1, 4),
    (2, 2),
    (2, 5),
    (3, 3),
    (3, 6);

-- Itens equipados nos perfis
UPDATE users
SET equipped_frame_id = 1,
    equipped_font_id = 4,
    equipped_bio_color_id = 7
WHERE id = 1;

UPDATE users
SET equipped_frame_id = 2,
    equipped_font_id = 5,
    equipped_bio_color_id = 8
WHERE id = 2;

UPDATE users
SET equipped_frame_id = 3,
    equipped_font_id = 6,
    equipped_bio_color_id = 9
WHERE id = 3;