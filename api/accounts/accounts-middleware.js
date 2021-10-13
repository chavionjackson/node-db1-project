const Accounts = require("./accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  if (!req.body.name || (!req.body.budget && isNaN(req.body.budget))) {
    return res.status(400).json({ message: "name and budget are required" });
  } else if (typeof req.body.name != "string") {
    return res
      .status(400)
      .json({ message: "name of account must be a string" });
  } else if (
    req.body.name.trim().length < 3 ||
    req.body.name.trim().length > 100
  ) {
    return res
      .status(400)
      .json({ message: "name of account must be between 3 and 100" });
  } else if (typeof req.body.budget != "number") {
    return res
      .status(400)
      .json({ message: "budget of account must be a number" });
  } else if (req.body.budget < 0 || req.body.budget > 1000000) {
    return res
      .status(400)
      .json({ message: "budget of account is too large or too small" });
  }
  req.body.name = req.body.name.trim();
  next();
};

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const allAccounts = await Accounts.getAll();
  if (
    allAccounts.some(
      (account) =>
        account.name == req.body.name.trim() && account.id != req.params.id
    )
  ) {
    return res.status(400).json({ message: "that name is taken" });
  }
  next();
};

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const { id } = req.params;
    const account = await Accounts.getById(id);
    if (!account) {
      res.status(404).json({ message: "account not found" });
    } else {
      req.account = account;
      next();
    }
  } catch (err) {
    next();
  }
};
