import moment from "moment";
import { Expenses } from "../models/expenses.model.js";
import enduserService from "../services/enduser.service.js";
import expenseService from "../services/expenses.service.js";
import { Op } from "sequelize";

async function addExpense(request, response) {
  // console.log(request.body);

  const { amount, reason, description, date } = request.body;
  const token_key = request.header("x-auth-token");
  const id = await enduserService.getIDByToken(token_key);

  const Date = moment(date, "MM-DD-YYYY");
  const formattedDate = Date.format("MMM-DD-YYYY");

  var insertExpense = await expenseService.addExpenseQuery(
    id.id,
    amount,
    reason,
    description,
    date ? formattedDate : date
  );

  response.send(insertExpense);
}

async function viewExpense(request, response) {
  var querys = request.query;
  const token_key = request.header("x-auth-token");
  const id = await enduserService.getIDByToken(token_key);

  if ("month" in querys && "year" in querys) {
    var result = await expenseService.getExpenseByMonth(querys, id.userID);
    response.send(result);
  } else {
    var getExpense = await expenseService.AllExpenseQuery(id.userID);
    response.send(getExpense);
  }
}

async function ExpenseByMonth(request, response) {
  var querys = request.query;
  const token_key = request.header("x-auth-token");
  const id = await enduserService.getIDByToken(token_key);

  if ("month" in querys && "year" in querys) {
    var total = await expenseService.TotalExpenseQuery(querys, id.userID);
    response.send({ total });
  } else {
    response.send({ msg: "errorrrrrrrrrrrrrrrrr" });
  }
}

async function ExpenseByCategory(request, response) {
  var querys = request.query;
  const token_key = request.header("x-auth-token");
  const id = await enduserService.getIDByToken(token_key);

  if ("month" in querys && "year" in querys) {
    var limit = "category" in querys ? 1 : null;
    var total = await expenseService.categoryExpenseQuery(
      querys,
      id.userID,
      limit
    );
    response.send({ total });
  } else {
    response.send({ msg: "errorrrrrrrrrrrrrrrrr" });
  }
}

async function deleteExpense(request, response) {
  //   console.log(request.params.id);
  const { id } = request.params;
  // const msg = { msg: "not found" };
  var deleteExpenseID = await expenseService.deleteExpenseIDQuery(id);
  response.send({ msg: "Deleted successfully" });
}

async function updateExpense(request, response) {
  //   console.log(request.params.id);
  const { id } = request.params;
  const token_key = request.header("x-auth-token");
  const user_id = await enduserService.getIDByToken(token_key);
  const msg = { msg: "Update failed" };
  const ans = request.body;
  var updateExpenseID = await expenseService.updateExpenseIDQuery(
    ans,
    id,
    user_id.userID
  );
  console.log(updateExpenseID);
  updateExpenseID[0] > 0
    ? response.send({ msg: "Updated successfully" })
    : response.send(msg);
}

export default {
  addExpense,
  viewExpense,
  ExpenseByMonth,
  ExpenseByCategory,
  updateExpense,
  deleteExpense,
};
