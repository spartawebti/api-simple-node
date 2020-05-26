const env = process.env.NODE_ENV || "dev";

const config = () => {
  switch (env) {
    case "dev":
      return {
        bd_string: "mongodb://localhost:27017/cursonodebasico",
        jwt_pass: "a856670480468ca3f6458dd08b35a6ca",
        jwt_expires_in: "7d",
      };
    case "hml":
      return {
        bd_string: "mongodb://localhost:27017/cursonodebasico",
      };
    case "prod":
      return {
        bd_string: "mongodb://localhost:27017/cursonodebasico",
      };
  }
};

console.log(`Iniciando a Api em ambiente ${env.toUpperCase()}`);

module.exports = config();
