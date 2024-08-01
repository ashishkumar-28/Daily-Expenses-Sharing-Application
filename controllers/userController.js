const db = require('../models');
const User = db.User; 
exports.createUser = async (req, res) => {
  try {
    const { email, name, mobile } = req.body;

    if (!email || !name || !mobile) {
      return res.status(400).send({ message: 'All fields are required' });
    }

    const user = await User.create({ email, name, mobile });
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
