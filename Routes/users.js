const Router = require("express").Router;
const router = Router();
const Users = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const createUserToken = (userId) => {
  return jwt.sign({ id: userId }, config.jwt_pass, {
    expiresIn: config.jwt_expires_in,
  });
};

router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    return res.json(users);
  } catch (err) {
    return res.status(200).json({ error: "Erro na consulta de usuários" });
  }
});

router.post("/create", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.json({ error: "Dados insuficientes" });

  try {
    if (await Users.findOne({ email }))
      return res.json({ error: "Usuário já resgistrado" });

    const user = await Users.create(req.body);
    user.password = undefined;

    return res.status(400).json({ user, token: createUserToken(user.id) });
  } catch (error) {
    return res.status(400).json({ error: "Error ao cadastrar usuário" });
  }
});

router.post("/auth", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.json({ error: "Dados insuficientes" });

  try {
    Users.findOne({ email }, (err, data) => {
      if (err) return res.json({ error: "Erro ao buscar usuário" });
      if (!data) return res.json({ error: "Usuário não resgistrado" });

      // const user = await Users.findOne({ email }).select("+password");
      // if (!user) return res.json({ error: "Usuário não registrado" });

      // const checkPassword = await bcrypt.compare(password, user.password);

      // if (!checkPassword)
      //   return res.json({ error: "Erro ao autenticar usuário" });

      // return res.json(user);

      bcrypt.compare(password, data.password, (err, same) => {
        data.password = undefined;
        return res.json({ data, token: createUserToken(data.id) });
      });
    }).select("+password");
  } catch (error) {}
});

module.exports = router;
