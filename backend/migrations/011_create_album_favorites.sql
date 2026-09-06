CREATE TABLE album_favorites (
    user_id INTEGER NOT NULL,
    album_id INTEGER NOT NULL,

    CONSTRAINT fk_album_favorites_user
        FOREIGN KEY (user_id)
        REFERENCES users(id),

    CONSTRAINT fk_album_favorites_album
        FOREIGN KEY (album_id)
        REFERENCES albums(id),

    CONSTRAINT unique_user_album_favorite
        UNIQUE (user_id, album_id)
);