-- Создание таблицы для хранения желаний на ёлке
CREATE TABLE IF NOT EXISTS wishes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(50) NOT NULL,
    wish TEXT NOT NULL,
    position_x INTEGER NOT NULL,
    position_y INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание индекса для быстрого поиска по позициям
CREATE INDEX IF NOT EXISTS idx_wishes_position ON wishes(position_x, position_y);
