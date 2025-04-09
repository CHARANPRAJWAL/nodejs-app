const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
  origin: "*" 
}));


// Database connection
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "postgres",
  logging: false,
});

const User = sequelize.define("User", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
});

// Seed data function
const seedDatabase = async () => {
  await sequelize.sync({ force: true }); // Resets the DB
  await User.bulkCreate([
    { name: "Alice Johnson", email: "alice@example.com" },
    { name: "Bob Smith", email: "bob@example.com" },
    { name: "Charlie Brown", email: "charlie@example.com" }
  ]);
  console.log("Seed data inserted");
};

// CRUD Routes
app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

app.get("/users/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) res.json(user);
  else res.status(404).json({ error: "User not found" });
});

app.put("/users/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.update(req.body);
    res.json(user);
  } else res.status(404).json({ error: "User not found" });
});

app.delete("/users/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.destroy();
    res.json({ message: "User deleted" });
  } else res.status(404).json({ error: "User not found" });
});

// Sync DB, Seed Data, and Start Server
seedDatabase().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
