const bcrypt = require("bcrypt-nodejs");
module.exports = (app) => {
  const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation;

  const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  const save = async (req, res) => {
    const user = { ...req.body };
    if (req.params.id) user.id = req.params.id;

    //se tiver um id ele vai validar apenas nome, email e se as senhas batem
    if (user.id) {
      try {
        existsOrError(user.name, "Nome não informado");
        existsOrError(user.email, "E-mail não informado");
        equalsOrError(
          user.password,
          user.confirmPassword,
          "Senhas não conferem"
        );

        const userFromDB = await app
          .db("users")
          .where({
            email: user.email,
          })
          .first();
        if (!user.id) {
          notExistsOrError(userFromDB, "Usuário já cadastrado");
        }
      } catch (msg) {
        return res.status(400).send(msg);
      }
    } else {
      try {
        //se Não tiver um id ele vai validar tudo
        existsOrError(user.name, "Nome não informado");
        existsOrError(user.email, "E-mail não informado");
        existsOrError(user.password, "Senha não informada");
        existsOrError(user.confirmPassword, "Confirmação de Senha inválida");
        equalsOrError(
          user.password,
          user.confirmPassword,
          "Senhas não conferem"
        );

        const userFromDB = await app
          .db("users")
          .where({ email: user.email })
          .first();
        if (!user.id) {
          notExistsOrError(userFromDB, "Usuário já cadastrado");
        }
      } catch (msg) {
        return res.status(400).send(msg);
      }
    }

    user.password = encryptPassword(user.password); //criptografa
    delete user.confirmPassword;

    if (user.id && req.body.password) {
      //se a tiver um id settado e a senha vier na requisição, ele atualiza tudo
      //estamos falando de atualizar
      app
        .db("users")
        .update(user)
        .where({ id: user.id })
        .whereNull("deletedAt")
        .then(() => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } else if (user.id && !req.body.password) {
      //se a tiver um id settado, mas não vier a senha, provavelmente o usuário
      //não quer alterar a senha, então ele atualiza apenas email, nome e estado admin;
      //estamos falando de atualizar
      app
        .db("users")
        .update({
          name: user.name,
          email: user.email,
          admin: user.admin,
        })
        .where({ id: user.id })
        .whereNull("deletedAt")
        .then(() => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } else if (!user.id) {
      //se a tiver um id settado, não vier a senha, provavelmente o usuário não existe
      //então ai, criamos um.
      //estamos falando de inserir.
      app
        .db("users")
        .insert(user)
        .then(() => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    }
  };
  const limit = 100 // usado para paginação
  const get = async (req, res) => {
    const page = req.query.page || 1

        const result = await app.db('users').count('id').first()
        const count = parseInt(result.count)
    app
      .db("users")
      .select("id", "name", "email", "admin")
      .whereNull("deletedAt")
      .limit(limit).offset(page * limit - limit)
      .then((users) => res.json({ data: users, count, limit }))
      .catch((err) => res.status(500).send(err));
  };
  const getById = (req, res) => {
    app
      .db("users")
      .select("id", "name", "email", "admin")
      .where({ id: req.params.id })
      .whereNull("deletedAt")
      .first()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).send(err));
  };
  const remove = async (req, res) => {
    try {
      const rowsDeletedUser = await app
        .db("users")
        .update({ deletedAt: new Date() })
        .where({ id: req.params.id });

      try {
        existsOrError(rowsDeletedUser, "Usuário não foi encontrado.");
      } catch (msg) {
        return res.status(400).send(msg);
      }

      res.status(204).send();
    } catch (msg) {
      res.status(500).send(msg);
    }

    try {
      const rowsDeleted = await app
        .db("articles")
        .where({ userId: req.params.id })
        .del();

      try {
        existsOrError(rowsDeleted, "Artigo não foi encontrado.");
      } catch (msg) {
        return res.status(400).send(msg);
      }

      res.status(204).send();
    } catch (msg) {
      res.status(500).send(msg);
    }
  };
  return {
    save,
    get,
    getById,
    remove,
  };
};
