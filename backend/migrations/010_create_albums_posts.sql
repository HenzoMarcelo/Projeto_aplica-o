CREATE TABLE album_posts (
    album_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,

    CONSTRAINT fk_album_posts_album
        FOREIGN KEY (album_id)
        REFERENCES albums(id),

    CONSTRAINT fk_album_posts_post
        FOREIGN KEY (post_id)
        REFERENCES posts(id),

    CONSTRAINT unique_album_post
        UNIQUE (album_id, post_id)
);