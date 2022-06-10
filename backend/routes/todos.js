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

  router.route("/").post(authenticateToken, async function (req, res) {
    const todo = {
      text: req.body.text,
      listId: req.body.listId,
    };

    try {
      let connection = await pool.getConnection();
      let query = await connection.query("insert into todos set ?;", todo);
      connection.release();
      res.json({ status: "OK", insertId: query.insertId });
    } catch (error) {
      console.log(error);
    }
  });

  router
    .route("/:id")
    .get(authenticateToken, async function (req, res) {
      try {
        let connection = await pool.getConnection();

        let rows = await connection.query(
          "select id, listId, text from todos where id = ?;",
          req.params.id
        );
        connection.release();

        res.json(rows);
      } catch (error) {
        console.log(error);
        return res.json({ code: 100, status: "Error get todos" });
      }
    })
    .put(authenticateToken, async function (req, res) {
      const todo = {
        text: req.body.text,
        listId: req.body.listId,
      };

      try {
        let connection = await pool.getConnection();
        let query = await connection.query(
          "update todos set text = ? where id = ?;",
          [todo.text, req.params.id]
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
          "delete from todos where id = ?;",
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
