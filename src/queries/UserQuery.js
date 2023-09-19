export const getUser =
  "SELECT id, firstname, lastname, username, is_verified,profile_picture FROM users WHERE firstname ILIKE $1 OR username ILIKE $1";
export const getUserById1 = "SELECT * FROM users WHERE id = $1";
export const postUser =
  "INSERT INTO users (firstName, lastName, username, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *";
export const removeUser = "DELETE FROM users Where id = $1";
export const checkEmail = "SELECT * FROM users WHERE email = $1";
export const makeConversation =
  "INSERT INTO messages (sender_user_id, sent_user_id) VALUES ($1, $2) RETURNING *";
export const getConversation =
  "SELECT u.* FROM users u JOIN messages m ON m.sender_user_id = u.id WHERE u.id = $1 and m.sent_user_id = $2";
