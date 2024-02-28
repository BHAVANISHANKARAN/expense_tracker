import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";

const Expenses = sequelize.define(
  "Expenses",
  {
    // Model attributes are defined here
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: new Date().toString(),
    },
  },
  {
    // Other model options go here
  }
);

export { Expenses };
