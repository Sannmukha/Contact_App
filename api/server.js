var swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const users = require("./routes/api/users");
const contacts = require("./routes/api/contacts");

const app = express();
var cors = require('cors');

app.use(cors());

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;
const keys = require("./config/keys");

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// auth middleware
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, keys.secretOrKey, (err, user) => {
          if (err) {
              return res.sendStatus(403);
          }

          req.user = user;
          next();
      });
  } else {
      res.sendStatus(401);
  }
};


// Routes
app.use("/api/users", users);
app.use("/api/contacts",contacts);
//authenticateJWT,
 

const port = process.env.PORT || 5000;

// Swagger config

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Contact API",
      version: "0.1.0",
      description:
        "Contact API",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "myc0p",
        url: "",
        email: "",
      },
    },
    servers: [
      {
        url: "http://localhost:5000/api/users",
      },
    ],
  },
  apis: ["./routes/api/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true }),
  swaggerUi.setup(specs)
);

app.listen(port, () => console.log(`Server up and running on port ${port} !`));


