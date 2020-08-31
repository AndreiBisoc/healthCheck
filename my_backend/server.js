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

app.get("/users/health/:email", (req, res) => {
  const email = req.params.email;
  pool.query(
    `SELECT h.health
		  FROM health AS h, users AS u
	    WHERE h.user_id = u.id AND email = $1`,
    [email],
    (err, results) => {
      if (err) {
        throw err;
      }
      if (results.rows.length > 0) {
        res.json({ status: 302, health: results.rows[0].health });
      }
    }
  );
});

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
        let user_id;
        pool.query(
          `INSERT INTO users (first_name, last_name, email, password)
          VALUES ($1, $2, $3, $4)
          RETURNING id, password`,
          [firstName, lastName, email, hashedPassword],
          (err, results) => {
            if (err) {
              throw err;
            }
            user_id = results.rows[0].id;

            pool.query(
              `INSERT INTO health (user_id, health)
              VALUES ($1, $2)`,
              [user_id, 100],
              (err, results) => {
                if (err) {
                  throw err;
                }
              }
            );
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
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
