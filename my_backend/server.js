const express = require("express");
const app = express();
const { pool } = require("./dbConfig");
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");

const initializePassport = require("./passportConfig");

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
initializePassport(passport);

app.get("/", (req, res) => {
  res.send("okay");
});

app.get("/users/health", (req, res) => {
  pool.query
})

app.post("/users/register", async (req, res) => {
  let { firstName, lastName, email, password, confirmPassword } = req.body;
  hashedPassword = await bcrypt.hash(password, 10);

  pool.query(
    `SELECT * FROM users
    WHERE email = $1`,
    [email],
    (err, results) => {
      if (err) {
        throw err;
      }
      if (results.rows.length > 0) {
        res.json({ status: 401, message: "Email already registered" });
      } else {
        pool.query(
          `INSERT INTO users (first_name, last_name, email, password)
          VALUES ($1, $2, $3, $4)
          RETURNING id, password`,
          [firstName, lastName, email, hashedPassword],
          (err, results) => {
            if (err) {
              throw err;
            }
          }
        );

          

        res.json({
          status: 200,
          message: "You are now registered. Please log in.",
        });
      }
    }
  );
});

app.post("/users/login", passport.authenticate("local"), (req, res) => {
  res.json({
    status: 200,
    message: "You are now logged in.",
  });
});

app.get("/users/logout", (req, res) => {
  req.logOut();
  res.json({
    status: 200,
    message: "You are now logged out.",
  });
})

function checkAuthenticated(req, res, next) {
  if(req.isAuthenticated()){
    res.json({
      status: 300,
      message: "User authenticated",
    });
  }
  next();
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
