import userModel from "../models/model.js";
export const getAlluser = async (req, res, next) => {
  try {
    let emptyObject = {};

    const findAlluser = await userModel.find({});

    if (!findAlluser) {
      return res.status(403).json({
        Error: true,
        message: "The user Cannot be Retrieve from the database",
      });
    }
    res.status(201).json({
      message: "Here are all the Users",
      UserData: {
        findAlluser,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { name } = req.body;
    const findTheUser = await userModel.findOne({ name: name });
    if (!findTheUser) {
      return res.status(403).json({
        message: "The User You want to Delete is unavailable",
      });
    }
    await userModel.deleteOne({ name: name });
    return res.status(201).json({
      message: "The User has been Deleted",
    });
  } catch (err) {
    next(err);
  }
};

export const deleteAllUser = async (req, res, next) => {
  try {
    let emptyObject = {};
    await userModel.deleteMany(emptyObject);
    return res.status(201).json({
      Success: true,
      message: "All User has Been Deleted SuccessFully",
    });
  } catch (err) {
    next(err);
  }
};
