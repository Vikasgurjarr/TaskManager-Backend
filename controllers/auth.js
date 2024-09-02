const UserSchemaModel = require("../models/user");


const register = async (req, res, next) => {
  try {
    const { name, email, mobile, password, address, city, gender } = req.body;
    const userExist = await UserSchemaModel.findOne({ email });

    if (userExist) {
      return res.status(400).json({ msg: "Email already Exists" });
    }

    const userCreated = await UserSchemaModel.create({
      name,
      email,
      mobile,
      password,
      city,
      address,
      gender,
      status: 0,
      role: "user",
      info: Date(),
    });

    res.status(201).json({
      msg: "Registration Successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userExist = await UserSchemaModel.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isPasswordValid = await userExist.comparePassword(password);

    if (isPasswordValid) {
      res.status(200).json({
        msg: "Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    next(error);
  }
};

const user = async (req, res) => {
  try {
    const userData = req.user;
    res.status(200).json(userData); // Return user data fetched from middleware
  } catch (error) {
    console.log(`Error fetching user data: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { name, mobile, address, city } = req.body;
    const userId = req.userID; // Extract user ID from middleware

    const updatedUser = await UserSchemaModel.findByIdAndUpdate(
      userId,
      { name, mobile, address, city },
      { new: true } // To return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    next(error);
  }
};

module.exports = {  register, login, user, updateUser };
