const express = require("express");
const cors = require("cors");
const { v4: uuid } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

/* ================== In-Memory Stores ================== */
const users = [];
const tokens = {};
const organizerRequests = [];
const events = [];
const registrations = [];

/* ================== Seed Admin ================== */
const adminUser = {
  id: uuid(),
  name: "Admin",
  email: "crio.do.test@example.com",
  password: "12345678",
  role: "admin",
};
users.push(adminUser);

/* ================== Helpers ================== */
function generateToken(user) {
  const token = uuid();
  tokens[token] = user;
  return token;
}

function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "Unauthorized" });

  const token = header.split(" ")[1];
  const user = tokens[token];
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  req.user = user;
  next();
}

function adminOnly(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
}

/* ================== AUTH ROUTES ================== */

// Register
app.post("/api/auth/register", (req, res) => {
  const { name, email, password, avatar } = req.body;

  const user = {
    id: uuid(),
    name,
    email,
    password,
    avatar,
    role: "user",
  };

  users.push(user);
  const token = generateToken(user);

  res.status(201).json({
    user: { name: user.name, email: user.email },
    token,
  });
});

// Login
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user);

  res.status(200).json({
    user: { id: user.id, name: user.name, email: user.email },
    token,
  });
});

/* ================== USER ROUTES ================== */

app.put("/api/users/request-organizer", auth, (req, res) => {
  organizerRequests.push(req.user.id);
  res.status(200).json({
    message: "Organizer request submitted successfully",
  });
});

app.put("/api/users/profile", auth, (req, res) => {
  req.user.name = req.body.name;
  res.status(200).json({ name: req.user.name });
});

/* ================== ADMIN ROUTES ================== */

app.get("/api/admin/organizer-requests", auth, adminOnly, (req, res) => {
  res.status(200).json(organizerRequests);
});

app.put(
  "/api/admin/users/:id/approve-organizer",
  auth,
  adminOnly,
  (req, res) => {
    const user = users.find((u) => u.id === req.params.id);
    if (user) user.role = "organizer";

    res.status(200).json({
      message: "User approved as Organizer",
    });
  },
);

/* ================== EVENT ROUTES ================== */

app.post("/api/events", auth, (req, res) => {
  const event = {
    _id: uuid(),
    ...req.body,
    organizer: req.user.id,
  };
  events.push(event);

  res.status(201).json(event);
});

app.put("/api/events/:id", auth, (req, res) => {
  const event = events.find((e) => e._id === req.params.id);
  if (req.body.title) event.title = req.body.title;

  res.status(200).json({
    message: "Event updated",
    event,
  });
});

app.get("/api/events/:id", auth, (req, res) => {
  const event = events.find((e) => e._id === req.params.id);
  res.status(200).json(event);
});

/* ================== REGISTRATION ROUTES ================== */

app.post("/api/registration/:eventId", auth, (req, res) => {
  registrations.push({
    userId: req.user.id,
    eventId: req.params.eventId,
  });

  res.status(201).json({
    message: "Registered successfully",
  });
});

app.delete("/api/registration/:eventId", auth, (req, res) => {
  res.status(200).json({
    message: "Registration cancelled",
  });
});

/* ================== START SERVER ================== */

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
