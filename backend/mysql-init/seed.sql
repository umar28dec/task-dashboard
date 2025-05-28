CREATE TABLE IF NOT EXISTS tasks (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('todo', 'in-progress', 'done') DEFAULT 'todo',
  dueDate DATE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO tasks (title, description, status, dueDate, createdAt, updatedAt) VALUES
  ('First Task', 'This is the first seeded task', 'todo', '2024-06-01', NOW(), NOW()),
  ('Second Task', 'This is the second seeded task', 'in-progress', '2024-06-05', NOW(), NOW()),
  ('Third Task', 'This is the third seeded task', 'done', '2024-06-10', NOW(), NOW());
