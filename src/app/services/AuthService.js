const UserModel = require("../models/User");
const authConfig = require("../../config/auth.json");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthService {
  async authentication(email, password) {
    try {
      if (!email || !password) {
        throw new Error("E-mail ou senha inválidos");
      }

      let token = undefined;

      const user = await UserModel.findOne({ email }).select("+password");

      if (!user) {
        throw new Error("E-mail não cadastrado");
      }

      if (!(await bcrypt.compare(password, user.password))) {
        throw new Error("Senha incorreta");
      } else {
        user.password = undefined;

        token = jwt.sign({ id: user.id }, authConfig.secret, {
          expiresIn: 86400,
        });

        return {
          fullName: user.fullName,
          token,
        };
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async register(user) {
    try {
      const { fullName, email, password, repeatPassword } = user;
      if (!email || !password || !fullName || !repeatPassword) {
        throw new Error("Campos inválidos");
      }

      if (password.length < 4) {
        throw new Error("Senha deve ter ao menos 4 caracteres");
      }

      if (password !== repeatPassword) {
        throw new Error("Senhas não conferem");
      }

      if (await UserModel.findOne({ email })) {
        throw new Error("E-mail já cadastrado");
      }

      let cryptHash = bcrypt.hashSync(password, 10);

      return await UserModel.create({
        fullName,
        email,
        password: cryptHash,
      })
        .then(() => {
          console.log(`Created user ${email}`);
        })
        .catch((error) => {
          throw new Error(error);
        });
    } catch (err) {
      throw new Error(err);
    }
  }

  async tokenValidator(tokenJwt) {
    try {
      const tokenFormated = "Bearer " + tokenJwt;

      if (!tokenFormated) throw new Error("Expect to receive a token");

      const parts = tokenFormated.split(" ");

      if (!parts.length === 2) {
        throw new Error("Invalid token");
      }

      const [scheme, token] = parts;

      if (!/^Bearer$/i.test(scheme)) {
        throw new Error("Invalid token");
      }

      let userId = undefined;
      let validToken = false;

      jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) throw new Error("Invalid token");

        userId = decoded.id;

        validToken = true;
      });

      if (validToken) {
        return { userId };
      } else {
        throw new Error("Invalid token");
      }
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = AuthService;
