module.exports = function (express, pool, jwt, secret) {
  const router = express.Router();

  function authenticateToken(req, res, next) {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];

    if (token == null) {
      return res.sendStatus(401);
    }

    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  }

  router
    .route("/")
    .get(authenticateToken, async function (req, res) {
      try {
        let connection = await pool.getConnection();

        let rows = await connection.query(
          "select l.id, l.name from users join lists l on users.id = l.userId where users.username = ?;",
          req.user.username
        );
        connection.release();

        res.json(rows);
      } catch (error) {
        console.log(error);
        return res.json({ code: 100, status: "Error get lists" });
      }
    })
    .post(authenticateToken, async function (req, res) {
      const list = {
        name: req.body.name,
        userId: req.user.id,
        uuid: req.body.uuid,
      };

      try {
        let connection = await pool.getConnection();
        let query = await connection.query("insert into lists set ?;", list);
        connection.release();

        res.json({ status: "OK", insertId: query.insertId });
      } catch (error) {
        console.log(error);
      }
    });

  router.route("/share/:id").get(async function (req, res) {
    try {
      let connection = await pool.getConnection();

      let rows = await connection.query(
        "select lists.id as listId, userId, name, t.id as todoId, text, completed from lists left join todos t on lists.id = t.listId where lists.uuid = ?;",
        req.params.id
      );
      connection.release();

      res.json(rows);
    } catch (error) {
      console.log(error);
      return res.json({ code: 100, status: "Error get share" });
    }
  });

  router
    .route("/:id")
    .get(authenticateToken, async function (req, res) {
      try {
        let connection = await pool.getConnection();

        let rows = await connection.query(
          "select lists.id as listId, userId, name, uuid, t.id as todoId, text, completed from lists left join todos t on lists.id = t.listId where lists.id = ?;",
          req.params.id
        );
        connection.release();

        res.json(rows);
      } catch (error) {
        console.log(error);
        return res.json({ code: 100, status: "Error get lists" });
      }
    })
    .put(authenticateToken, async function (req, res) {
      const list = {
        name: req.body.name,
        userId: req.user.id,
      };

      try {
        let connection = await pool.getConnection();
        let query = await connection.query(
          "update lists set name = ? where id = ?;",
          [list.name, req.params.id]
        );
        connection.release();

        res.json({ status: "OK", changedRows: query.changedRows });
      } catch (error) {
        console.log(error);
      }
    })
    .delete(authenticateToken, async function (req, res) {
      try {
        let connection = await pool.getConnection();
        let query = await connection.query(
          "delete from lists where id = ?;",
          req.params.id
        );
        connection.release();
        
        res.json({ status: "OK", affectedRows: query.affectedRows });
      } catch (error) {
        console.log(error);
      }
    });

  return router;
};
