import { sequelize } from "../config.js";
import { Expenses } from "../models/expenses.model.js";
import { Op, Sequelize } from "sequelize";

async function addExpenseQuery(id, amount, reason, description, date) {
  return await Expenses.create({
    user_id: id,
    amount,
    reason,
    description,
    date,
  });
}

async function AllExpenseQuery(id) {
  return await Expenses.findAll({
    where: {
      user_id: id,
    },
    order: [["date", "DESC"]],
  });
}

async function TotalExpenseQuery(querys, id) {
  return await Expenses.sum("amount", {
    where: {
      [Op.and]: [
        { date: { [Op.like]: `%${querys.month}%` } },
        { user_id: id },
        { date: { [Op.like]: `%${querys.year}%` } },
      ],
    },
  });
}

async function getExpenseByMonth(querys, id) {
  return await Expenses.findAll({
    where: {
      [Op.and]: [
        { date: { [Op.like]: `%${querys.month}%` } },
        { user_id: id },
        { date: { [Op.like]: `%${querys.year}%` } },
      ],
    },
    order: [["date", "DESC"]],
  });
}

async function updateExpenseIDQuery(query, id, user_id) {
  return await Expenses.update(query, {
    where: {
      id: id,
      user_id: user_id,
    },
  });
}

async function deleteExpenseIDQuery(id, user_id) {
  return await Expenses.destroy({
    where: {
      id: id,
      user_id: user_id,
    },
  });
}

// async function categoryExpenseQuery(querys, user_id) {
//   return await Expenses.findAll({
//     where: {
//       [Op.and]: [
//         { date: { [Op.like]: `%${querys.month}%` } },
//         { date: { [Op.like]: `%${querys.year}%` } },
//         // { reason: querys.reason },
//         { user_id },
//       ],
//     },

//     attributes: [
//       "reason",
//       [sequelize.fn("sum", sequelize.col("amount")), "total_amount"],
//     ],

//     group: "reason",
//     // having: {
//     //   reason: "Fee",
//     // },
//   });
// }

async function categoryExpenseQuery(querys, user_id, limit) {
  const expenses = await Expenses.findAll({
    where: {
      [Op.and]: [
        { date: { [Op.like]: `%${querys.month}%` } },
        { date: { [Op.like]: `%${querys.year}%` } },
        { user_id },
      ],
    },
    attributes: [
      "reason",
      [sequelize.fn("sum", sequelize.col("amount")), "total_amount"],
    ],
    group: "reason",
    order: [[sequelize.literal("total_amount"), "DESC"]],
    limit,
  });
  // console.log(expenses);

  return expenses.length ? expenses : null;
}

export default {
  addExpenseQuery,
  AllExpenseQuery,
  getExpenseByMonth,
  TotalExpenseQuery,
  categoryExpenseQuery,
  updateExpenseIDQuery,
  deleteExpenseIDQuery,
};
