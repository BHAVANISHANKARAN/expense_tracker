import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";

const EndUser = sequelize.define(
  "EndUser",
  {
    // Model attributes are defined here
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
    },
  },
  {
    // Other model options go here
  }
);

export { EndUser };
