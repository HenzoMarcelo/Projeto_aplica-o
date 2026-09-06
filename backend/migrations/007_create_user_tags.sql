CREATE TABLE user_tags (
    user_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,

    CONSTRAINT fk_user_tags_user
        FOREIGN KEY (user_id)
        REFERENCES users(id),

    CONSTRAINT fk_user_tags_tag
        FOREIGN KEY (tag_id)
        REFERENCES tags(id),

    CONSTRAINT unique_user_tag
        UNIQUE (user_id, tag_id)
);