module.exports = (sequelize, DataTypes) => {
    const ExpenseParticipant = sequelize.define('ExpenseParticipant', {
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      percentage: {
        type: DataTypes.FLOAT,
        allowNull: true
      }
    });
  
    return ExpenseParticipant;
  };
  