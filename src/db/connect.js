import mongoose from "mongoose";

const startDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/unit")
    .then(() => {
      console.log("Database is connected SuccessFully");
    })
    .catch((err) => {
      console.log(err);
    });

  mongoose.connection.on("error", () => {
    console.log("An Error Has Occured In the Database");
  });
  mongoose.connection.on("disconnected", () => {
    console.log("Database is Disconnected Successfully");
  });
};

export default startDB;

// const UserMoe
