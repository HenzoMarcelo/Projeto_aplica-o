CREATE TABLE user_profile_items (
    user_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    acquired_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_user_profile_items_user
        FOREIGN KEY (user_id)
        REFERENCES users(id),

    CONSTRAINT fk_user_profile_items_item
        FOREIGN KEY (item_id)
        REFERENCES profile_items(id),

    CONSTRAINT unique_user_profile_item
        UNIQUE (user_id, item_id)
);