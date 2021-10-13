const router = require("express").Router();
const Accounts = require("./accounts-model");

router.get("/", (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getAll()
    .then((acc) => {
      res.status(200).json(acc);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id", (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params;
  Accounts.getById(id).then((acc) => {
    if (acc) {
      res.status(200).json(acc);
    } else {
      res.status(404).json({
        message: "account not found",
      });
    }
  });
});

router.post("/", (req, res, next) => {
  // DO YOUR MAGIC
});

router.put("/:id", (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete("/:id", (req, res, next) => {
  // DO YOUR MAGIC
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // DO YOUR MAGIC
});

module.exports = router;
