const express = require('express');
const app = express();
const port = 9876;
const routes = require("./routes/route");
const session = require('express-session');


app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: true
  }
}))

app.use("/", routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});