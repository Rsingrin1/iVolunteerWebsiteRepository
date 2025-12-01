//handle user input and interactions in controller folder

//tutorial - define schema, insert data
//https://www.youtube.com/watch?v=oYoe8PDAXi0&list=PL1oBBulPlvs97CWAXfqLJra7TamlwsfdS&index=5

import User from "../model/userModel.js";

//function to create new user instance
export const create = async(req, res) =>{
    try{
        const newUser = new User(req.body); //req.body --> sending info from client to server
        const {email} = newUser;
        const userExist = await User.findOne({email}); //define condition to check validity
        if(userExist){
            return res.status(400).json({message: "User already exists."});
        }

        const savedData = await newUser.save();
        res.status(200).json(savedData);

    } catch (error) {
        res.status(500).json({errorMessage:error.message});
    }
}


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



export const getUserById = async(req, res) =>{
    try{
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(400).json({message: "User not found."});
        }
        res.status(200).json(userExist);

    } catch (error) {
        res.status(500).json({errorMessage:error.message});
    }
}


export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "User not found." });
    }
    const updatedData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // res.status(200).json(updatedData);
    res.status(200).json({ message: "User Updated successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};