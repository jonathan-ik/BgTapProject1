CREATE TABLE IF NOT EXISTS Operator_Registration (
  Reg_id SERIAL PRIMARY KEY, 
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  user_id INTEGER REFERENCES users(user_id),
  created_at TIMESTAMP DEFAULT NOW()
);
