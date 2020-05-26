const Router = require("express").Router;
const router = Router();
const auth = require("../middlewares/auth");

router.get("/", auth, (req, res) => {
  console.log(res.locals.auth_data);
  return res.json({ message: "ok" });
});

router.post("/", (req, res) => {
  return res.json({ message: "ok" });
});

module.exports = router;
