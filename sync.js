const db = require('./models');

(async () => {
  try {
    await db.sequelize.query('SET foreign_key_checks = 0', { raw: true });
    await db.sequelize.sync({ force: true });
    await db.sequelize.query('SET foreign_key_checks = 1', { raw: true });
    console.log('Database & tables created!');
  } catch (error) {
    console.error('Error creating database:', error);
  }
})();
