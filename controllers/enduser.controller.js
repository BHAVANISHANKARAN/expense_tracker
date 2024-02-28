import enduserService from "../services/enduser.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function genHashPassword(userPassword) {
  const NO_OF_ROUNDS = 10;

  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);

  const hashedPassword = await bcrypt.hash(userPassword, salt);
  console.log(salt);
  console.log(hashedPassword);
  return hashedPassword;
}

async function signup(request, response) {
  //   console.log(request.body);

  const { username, password, role_id } = request.body;
  //   console.log(query);

  if (password.length <= 8) {
    response
      .status(400)
      .send({ msg: "Password should be more than 8 characters" });
  } else {
    const hashedPassword = await genHashPassword(password);
    console.log(hashedPassword);
    response.send(
      await enduserService.createUserQuery({
        username,
        password: hashedPassword,
        role_id,
      })
    );
  }
}

async function login(request, response) {
  // console.log(request.body);

  const { username, password } = request.body;
  const userFromDB = await enduserService.getUserByName({ username });
  // console.log(userFromDB);
  const errorMsg = { msg: "Invalid credentials" };

  if (!userFromDB) {
    response.status(401).send(errorMsg);
  } else {
    const storedDBPassword = userFromDB.password;
    const isPasswordCheck = await bcrypt.compare(password, storedDBPassword);
    console.log(isPasswordCheck);

    if (isPasswordCheck) {
      const token = jwt.sign({ id: userFromDB.id }, process.env.SECRET_KEY);
      enduserService.addToken(userFromDB.id, token);
      response.send({ msg: "Successful login", token });
    } else {
      response.status(404).send(errorMsg);
    }
  }
}

async function logout(request, response) {
  const token_key = request.header("x-auth-token");
  const id = await enduserService.getIDByToken(token_key);
  await enduserService.updateExpiry(id.userID);
  response.send("token expired");
}

async function getUser(request, response) {
  const token_key = request.header("x-auth-token");
  const id = await enduserService.getIDByToken(token_key);
  const roleid = await enduserService.getRoleId(id.userID);
  const roleName = await enduserService.getRoleName(roleid.role_id);
  if (roleName.role_name == "super user" || roleName.role_name == "admin") {
    response.send(await enduserService.getUserDetails());
  }
}

export default { signup, login, logout, getUser };
