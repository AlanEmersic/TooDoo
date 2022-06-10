const bcrypt = require("bcrypt");

module.exports = function (express, pool, jwt, secret) {
  const router = express.Router();

  router.route("/register").post(async function (req, res) {
    try {      
      const hashPass = await bcrypt.hash(req.body.password, 10);      
      
      const user = {
        username: req.body.username,
        password: hashPass,
        email: req.body.email,
      };

      let connection = await pool.getConnection();
      let queryUser = await connection.query("insert into users set ?;", user);

      connection.release();
      res.json(queryUser.insertId);
    } catch (error) {
      console.log(error);
    }
  });

  router.route("/login").post(async function (req, res) {
    try {
      let connection = await pool.getConnection();
      let rows = await connection.query(
        "select id, username, password, email from users where username = ?;",
        req.body.username
      );
      connection.release();
      const userDb = rows[0];

      bcrypt.compare(
        req.body.password,
        userDb.password,
        function (err, response) {
          if (err) {
            console.log("login error");
          }
          if (response) {
            const user = {
              id: userDb.id,
              username: userDb.username,
              email: userDb.email,
            };

            const token = jwt.sign(user, secret, {
              expiresIn: "60m",
            });
            res.json({ token: token });
          } else {
            res.json({ success: false, message: "passwords do not match" });
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  });

  return router;
};
