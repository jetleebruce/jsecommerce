const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const usersRepo = require("./repositories/users");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["45665455544558855"],
  })
);

app.get("/", (req, res) => {
  res.send(`
  <div>
  You id is ${req.session.userId}
  <form method="POST">
  <input name="email" placeholder="email">
  <input name="password" placeholder="password">
  <input name="passwordConfirmation" placeholder="password confirmation">
  <button>Sign Up</button>
  </form>
  </div>
    `);
});

app.post("/", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;

  const existingUser = await usersRepo.getOneBy({ email });
  if (existingUser) {
    return res.send("Email in use");
  }
  if (password !== passwordConfirmation) {
    return res.send("Password must match");
  }
  // create a usre in our repo to represent this person
  const user = await usersRepo.create({ email, password });
  // Store the id that user inside the users cookie
  req.session.userId = user.id;

  res.send("Account created!");
});

app.listen(3000, () => {
  console.log("Listening");
});
