const sequelize = require("./ConnectDB");
const { DataTypes } = require("sequelize");

const User = sequelize.define("User", {
   username : {
    type : DataTypes.STRING,
    unique : true,
    allowNull: false
   },
   email : {
    type : DataTypes.STRING,
    unique : true,
    allowNull: false
   },
   password : {
    type : DataTypes.STRING,
    unique : true,
    allowNull: false
   },
   isAdmin : {
    type : DataTypes.BOOLEAN,
    defaultValue : false,
    allowNull: false
   }
});
module.exports = User;
