ALTER TABLE users
    ADD COLUMN equipped_frame_id INTEGER,
    ADD COLUMN equipped_font_id INTEGER,
    ADD COLUMN equipped_bio_color_id INTEGER;

ALTER TABLE users
    ADD CONSTRAINT fk_users_equipped_frame
        FOREIGN KEY (equipped_frame_id)
        REFERENCES profile_items(id);

ALTER TABLE users
    ADD CONSTRAINT fk_users_equipped_font
        FOREIGN KEY (equipped_font_id)
        REFERENCES profile_items(id);

ALTER TABLE users
    ADD CONSTRAINT fk_users_equipped_bio_color
        FOREIGN KEY (equipped_bio_color_id)
        REFERENCES profile_items(id);