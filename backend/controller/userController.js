//handle user input and interactions in controller folder

//tutorial - define schema, insert data
//https://www.youtube.com/watch?v=oYoe8PDAXi0&list=PL1oBBulPlvs97CWAXfqLJra7TamlwsfdS&index=5

import User from "../model/userModel.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";


// function to create new user instance
export const create = async (req, res) => {
  try {
    // HASH PASSWORD
    console.log("password:", req.body.hash);
    const password = req.body.hash;
    const hash = await bcrypt.hash(password, 13);
    console.log("hash:", hash);
    req.body.hash = hash;

    const newUser = new User(req.body); // req.body --> sending info from client to server
    const { username, email } = newUser;
    const userExist =
      (await User.findOne({ username })) || (await User.findOne({ email })); // define condition to check validity
    if (userExist) {
      return res.status(400).json({ message: "User already exists." });
    }

    const savedData = await newUser.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData || userData.length === 0) {
      return res.status(404).json({ message: "User data not found." });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = req.user.id;
    if (!id) {
      return res.status(401).json({ message: "User not authenticated." });
    }
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(userExist);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};


export const update = async (req, res) => {
  try {
    const id = req.user.id;
    if (!id) {
      return res.status(401).json({ message: "User not authenticated." });
    }
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "User not found." });
    }
    const updatedData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "User Updated successfully.", user: updatedData });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.user.id;
    if (!id) {
      return res.status(401).json({ message: "User not authenticated." });
    }
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "User not found." });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if ((!username && !email) || !password) {
      return res
        .status(400)
        .json({ message: "Username or email and password are required." });
    }

    const user = username
      ? await User.findOne({ username })
      : await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.hash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const payload = {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      userType: user.userType,
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || "dev_secret_key_change_me",
      { expiresIn: "7d" }
    );

    // COOKIE-ONLY: set HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set true in prod with HTTPS
      sameSite: "lax",
      path: "/",     // important: send cookie on all API routes
    });

    return res.status(200).json({
      message: "Login successful.",
      user: payload,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error during login." });
  }
};
