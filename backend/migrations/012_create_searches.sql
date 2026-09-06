CREATE TABLE searches (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    term VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_searches_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
);