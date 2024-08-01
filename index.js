const express = require('express');
const app = express();
const cors = require('cors');
const { sequelize } = require('./models');
require('dotenv').config();

app.use(cors());
app.use(express.json());


const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const balanceSheetRoutes = require('./routes/balanceSheetRoutes');


app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api', balanceSheetRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
});
