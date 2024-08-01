module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    User.associate = (models) => {
      User.belongsToMany(models.Expense, { through: models.ExpenseParticipant });
    };
  
    return User;
  };
  