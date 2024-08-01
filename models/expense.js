module.exports = (sequelize, DataTypes) => {
    const Expense = sequelize.define('Expense', {
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      splitMethod: {
        type: DataTypes.ENUM('equal', 'exact', 'percentage'),
        allowNull: false
      }
    });
  
    Expense.associate = (models) => {
      Expense.belongsToMany(models.User, { through: models.ExpenseParticipant });
    };
  
    return Expense;
  };
  