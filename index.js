import express from "express"; // "type": "module"
import enduserRouter from "./routes/enduser.route.js";
import expenseRouter from "./routes/expenses.route.js";
import { sequelize } from "./config.js";
import { Roles } from "./models/roles.model.js";

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
  await sequelize.sync();
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const app = express();
app.use(express.json());

app.use("/enduser", enduserRouter);
app.use("/expense", expenseRouter);

// Roles.create({ role_id: 2, role_name: " Normal user" });

const PORT = 4000;
app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
