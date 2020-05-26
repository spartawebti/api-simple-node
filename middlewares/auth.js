const jwt = require("jsonwebtoken");
const config = require("../config/config");

const auth = (req, res, next) => {
  const token = req.headers.auth;
  if (!token) return res.json({ error: "Token não enviado " });

  jwt.verify(token, config.jwt_pass, (err, decoded) => {
    if (err) return res.json({ error: "Token inválido" });
    res.locals.auth_data = decoded;
    return next();
  });
};

module.exports = auth;
