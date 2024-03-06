const express = require("express");
const cors = require("cors");
const path = require("path");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3008;
    this.paths = {
      auth: "/api/auth",
      homepage: "/api/homepage",
    };

    //paths.auth
    //auth.homepage

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
/*
    // Pick up React index.html file
    this.app.use(
      express.static(path.join(__dirname, "../../client/build"))
    );
    */
  }

  // Bind controllers to routes
  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.homepage, require("../routes/homepage"));
    this.app.use(this.paths.users, require("../controllers/users"));
    // Catch all requests that don't match any route
    this.app.get("*", (req, res) => {
      res.send("<h1>Hello, This is API Back-end008.</h1>");
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port: ", this.port);
    });
  }
}

module.exports = Server;
