const User = require("../models/Users");
// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add New User
const createUser = async (req, res) => {
  const user = req.body;
  const query = { costumerName: user.costumerName };
  try {
    const existingUser = await User.findOne(query);
    if (existingUser) {
      return res.status(302).json({ message: "User already exists!" });
    }
    const result = await User.create(user);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Find User
const findUser = async (req, res) => {
  const usedId = req.params.id;
  try {
    const existingUser = await User.findById(usedId);
    res.status(200).json(existingUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete a user
const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    // if user not found
    if (!deletedUser) {
      return res.status(404).json({ message: "hay User not found!" });
    }
    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update single Client item
const updateClient = async (req, res) => {
  const clientId = req.params.id;
  try {
    const updatedClient = await User.findByIdAndUpdate(clientId, req.body, {
      new: true,
      runValidator: true,
    });

    if (!updatedClient) {
      return res.status(404).json({ message: "Clint not found" });
    }

    res.status(200).json(updatedClient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// convert data to  exel and download 
const doanloadExelData = async (req, res) => {
  try {
    const data = await User.find({}); // Fetch data from MongoDB

    // Create a worksheet from the data
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

    // Convert workbook to buffer
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

    // Set response headers for file download
    res.setHeader('Content-Disposition', 'attachment; filename="data.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    // Send the buffer as a response
    res.send(excelBuffer);
  } catch (error) {
    res.status(500).send('Error generating Excel file');
  }
};


module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  findUser,
  updateClient,
  doanloadExelData,
};
