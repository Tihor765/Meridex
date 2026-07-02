const User = require("../models/User");

// Add Address
const addAddress = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      house,
      area,
      city,
      state,
      pincode,
      landmark,
    } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const newAddress = {
      fullName,
      phone,
      house,
      area,
      city,
      state,
      pincode,
      landmark,
      isDefault: user.addresses.length === 0,
    };

    user.addresses.push(newAddress);

    await user.save();

    res.status(201).json({
      message: "Address added successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
// Get All Addresses
const getAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("addresses");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user.addresses);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  addAddress,
  getAddresses,
};