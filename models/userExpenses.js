module.exports = (sequelize, DataTypes) => {
    const UserExpenses = sequelize.define('UserExpenses', {
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      percentage: {
        type: DataTypes.FLOAT
      }
    });
  
    return UserExpenses;
  };
  