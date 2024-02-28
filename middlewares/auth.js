// import { request, response } from 'express'
import jwt from "jsonwebtoken";
// import { UserToken } from "../models/userToken.model.js";
import { Session } from "../models/session.model.js";

const auth = async (request, response, next) => {
  try {
    const token = request.header("x-auth-token");
    console.log(token);
    jwt.verify(token, process.env.SECRET_KEY);
    const tokenCheck = await Session.findOne({
      where: {
        token: token,
        expired: "No",
      },
    });
    if (tokenCheck) {
      next();
    } else {
      response.status(401).send({ msg: "Login expired" });
    }
  } catch (error) {
    response.status(401).send({ msg: error.message });
  }
};

export { auth };
