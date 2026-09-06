CREATE TABLE favorites (
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,

    CONSTRAINT fk_favorites_user
        FOREIGN KEY (user_id)
        REFERENCES users(id),

    CONSTRAINT fk_favorites_post
        FOREIGN KEY (post_id)
        REFERENCES posts(id),

    CONSTRAINT unique_user_post_favorite
        UNIQUE (user_id, post_id)
);