import { EndUser } from "../models/enduser.model.js";
import { Session } from "../models/session.model.js";

async function createUserQuery({ username, password, role_id }) {
  try {
    // console.log(username, password);
    return await EndUser.create({ username, password, role_id });
  } catch (error) {
    // return { msg: error.errors.map((val) => val.message).join() };
    return { msg: error };
  }
}

async function getUserByName({ username }) {
  return await EndUser.findOne({
    where: { username },
  });
}

async function addToken(userID, token) {
  return await Session.create({ userID, token });
}

async function getIDByToken(tokenKey) {
  return await Session.findOne({
    where: {
      token: tokenKey,
    },
  });
}

async function updateExpiry(id) {
  return await Session.update({ expired: "yes" }, { where: { userID: id } });
}

async function getRoleId(id) {
  return await EndUser.findOne({
    where: {
      id,
    },
  });
}

async function getRoleName(id) {
  return await Roles.findOne({
    where: {
      role_id: id,
    },
  });
}

async function getUserDetails() {
  return await EndUser.findAll();
}

export default {
  createUserQuery,
  getUserByName,
  addToken,
  getIDByToken,
  updateExpiry,
  getUserDetails,
  getRoleId,
  getRoleName,
};
