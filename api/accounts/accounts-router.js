const router = require("express").Router();
const Accounts = require("./accounts-model");
const {
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
} = require("./accounts-middleware");

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

router.get("/:id", checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params;
  Accounts.getById(id)
    .then((acc) => {
      res.status(200).json(acc);
    })
    .catch((error) => {
      next(error);
    });
});

router.post(
  "/",
  checkAccountPayload,
  checkAccountNameUnique,
  (req, res, next) => {
    // DO YOUR MAGIC
    Accounts.create(req.body)
      .then((account) => {
        res.status(201).json(account);
      })
      .catch((error) => {
        next(error);
      });
  }
);

router.put(
  "/:id",
  checkAccountPayload,
  checkAccountId,
  async (req, res, next) => {
    // DO YOUR MAGIC
    Accounts.updateById(req.params.id, req.body)
      .then(async () => {
        const account = await Accounts.getById(req.params.id);
        res.status(200).json(account);
      })
      .catch((error) => {
        next(error);
      });
  }
);

router.delete("/:id", checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.deleteById(req.params.id)
    .then((account) => {
      res.status(200).json(account);
    })
    .catch((error) => {
      next(error);
    });
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json(err);
});

module.exports = router;
