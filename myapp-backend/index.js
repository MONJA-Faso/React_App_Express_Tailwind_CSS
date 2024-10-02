const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Corrected spelling from 'bycrypt' to 'bcrypt'
const db = require('./db');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post("/api/adduser", async (req, res) => {
  const sql = "INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)";

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const values = [req.body.name, req.body.email, req.body.username, hashedPassword];

    db.query(sql, values, (err, result) => {
      if (err) return res.json({ message: "Something unexpected has occurred: " + err });
      return res.json({ success: "New User added successfully" });
    });
  } catch (error) {
    return res.json({ message: "Error hashing password: " + error });
  }
});

app.get("/api/users", (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error fetching users: ", err);  // Ajoutez cette ligne
        return res.json({ message: "Server error: " + err.message });
      }
      return res.json(result);
    });
  });
  

app.get("/api/getuser/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM users WHERE id= ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ message: "Server error" });
    return res.json(result);
  });
});

app.put("/api/edit/:id", (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE users SET name=?, email=?, username=? WHERE id=?";

  const values = [
    req.body.name,
    req.body.email,
    req.body.username,
    id,
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.json({ message: "Something unexpected has occurred: " + err });
    return res.json({ success: "User updated successfully" });
  });
});

app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM users WHERE id=?";
  const values = [id];
  db.query(sql, values, (err, result) => {
    if (err) return res.json({ message: "Something unexpected has occurred: " + err });
    return res.json({ success: "User successfully deleted" });
  });
});

app.listen(3001, '0.0.0.0', () => {
  console.log('Server started on port 3001');
});
