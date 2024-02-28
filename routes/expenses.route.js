import express from "express";
import expenseController from "../controllers/expenses.controller.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.route("/").post(auth, expenseController.addExpense);
router.route("/").get(auth, expenseController.viewExpense);
router.route("/total").get(auth, expenseController.ExpenseByMonth);
router.route("/category").get(auth, expenseController.ExpenseByCategory);
router.route("/:id").delete(auth, expenseController.deleteExpense);
router.route("/:id").put(auth, expenseController.updateExpense);

export default router;
