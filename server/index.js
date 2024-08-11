const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const mysql = require("mysql");
const cors = require("cors");
const util = require("util");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "Spartificialdb",
});

const query = util.promisify(db.query).bind(db);

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});

app.post("/register", async (req, res) => {
  const { Email, UserName, Password } = req.body;

  try {
    const selectQuery = "SELECT * FROM AUTH WHERE userName = ?";
    const users = await query(selectQuery, [UserName]);

    if (users.length > 0) {
      return res.status(400).send("User already exists");
    }

    if (Password.length <= 5) {
      return res.status(400).send("Password is too short");
    }

    const hashPassword = await bcrypt.hash(Password, 10);

    const insertQuery =
      "INSERT INTO AUTH (email, userName, password) VALUES (?, ?, ?)";
    const DbResponse = await query(insertQuery, [
      Email,
      UserName,
      hashPassword,
    ]);

    res.status(200).send("User created successfully");

    console.log(DbResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.post("/login", async (req, res) => {
  const { UserName, Password } = req.body;

  try {
    const selectQuery = "SELECT * FROM AUTH WHERE userName = ?";
    const users = await query(selectQuery, [UserName]);
    const dbUser = users[0];

    if (!dbUser) {
      return res.status(400).send("Invalid user");
    }

    const isPasswordMatch = await bcrypt.compare(Password, dbUser.password);
    console.log(isPasswordMatch);

    if (isPasswordMatch) {
      const payload = { userName: UserName };
      const jwtToken = jwt.sign(payload, "My_Secrete_Token");
      res.send({ jwtToken });
    } else {
      res.status(400).send("Invalid password");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, "My_Secrete_Token", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.get("/getUser", authenticateToken, (req, res) => {
  const query = `SELECT * FROM AUTH`;

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    res.json(result); 
  });
});

app.put("/edit", authenticateToken, async (req, res) => {
  const { Id, UserName, Email } = req.body;

  try {
    const updateQuery = "UPDATE AUTH SET userName = ?, email = ? WHERE id = ?";
    const result = await query(updateQuery, [UserName, Email, Id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


app.delete("/deleteUser/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const selectQuery = "SELECT * FROM AUTH WHERE id = ?";
    const users = await query(selectQuery, [id]);

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const deleteQuery = "DELETE FROM AUTH WHERE id = ?";
    await query(deleteQuery, [id]);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
