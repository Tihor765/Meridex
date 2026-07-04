const User = require("../models/User");


// ========================
// ADD ADDRESS
// ========================

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

      isDefault:
        user.addresses.length === 0,

    };


    user.addresses.push(newAddress);


    await user.save();


    res.status(201).json({

      message:
        "Address added successfully",

      addresses: user.addresses,

    });



  } catch (error) {


    console.error(error);


    res.status(500).json({
      message: "Server Error",
    });


  }
};




// ========================
// GET ADDRESSES
// ========================

const getAddresses = async (req, res) => {

  try {


    const user =
      await User.findById(
        req.user.id
      ).select("addresses");



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





// ========================
// DELETE ADDRESS
// ========================


const deleteAddress = async (req, res) => {


  try {


    const user =
      await User.findById(
        req.user.id
      );



    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });

    }



    user.addresses =
      user.addresses.filter(

        (address) =>
          address._id.toString()
          !==
          req.params.id

      );



    await user.save();



    res.json({

      message:
        "Address deleted successfully",

      addresses: user.addresses,

    });



  } catch (error) {


    console.error(error);


    res.status(500).json({
      message: "Server Error",
    });


  }

};
// =========================
// UPDATE ADDRESS
// =========================

const updateAddress = async (req, res) => {

  try {

    const user =
      await User.findById(req.user.id);


    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });

    }


    const address =
      user.addresses.id(
        req.params.id
      );


    if (!address) {

      return res.status(404).json({
        message: "Address not found",
      });

    }



    Object.assign(
      address,
      req.body
    );



    await user.save();



    res.json({

      message:
        "Address updated successfully",

      addresses:
        user.addresses,

    });



  } catch (error) {


    res.status(500).json({
      message: error.message,
    });


  }

};




module.exports = {

  addAddress,

  getAddresses,

  deleteAddress,

  updateAddress,

};