import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";

const Roles = sequelize.define(
  "Roles",
  {
    // Model attributes are defined here
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

export { Roles };
