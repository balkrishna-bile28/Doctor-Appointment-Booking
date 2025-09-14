import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import razorpay from "razorpay";

//API to register user
const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password" });
    }

    //hashing of password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      fullName,
      email,
      password: hashedPassword,
    };

    const newuser = new userModel(userData);
    const user = await newuser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

//API for userLogin
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentilals" });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: true, message: err.message });
  }
};

//API to get user profile data
const getProfile = async (req, res) => {
  try {
    //const { userId } = req.body;
    const userId = req.user.id;
    const userData = await userModel.findById(userId).select("-password");

    return res.json({ success: true, userData });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: err.message });
  }
};

//API to update user profile
const updateProfile = async (req, res) => {
  try {
    //console.log(req.body);
    const userId = req.user.id;
    const { name, phone, address, dob, gender } = req.body;
    const imgFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data missing" });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: address || "{}",
      //address: address ? JSON.stringify(address) : "{}",
      dob,
      gender,
    });

    if (imgFile) {
      //Upload img to cloudinary and store url in db
      const imageUpload = await cloudinary.uploader.upload(imgFile.path, {
        resource_type: "image",
      });
      const imgURL = imageUpload.secure_url;
      await userModel.findByIdAndUpdate(userId, { image: imgURL });
    }
    return res.json({ success: true, message: "User Profile Updated" });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: err.message });
  }
};

//API to book appointment
const bookAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { docId, slotDate, slotTime } = req.body;
    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not available !" });
    }

    let slots_booked = docData.slots_booked;

    //checking for slots availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot not available !" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");

    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fee,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    //save new slots
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Booked !" });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: err.message });
  }
};

//API to get user appointments on my-appointment page
const listAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const appointments = await appointmentModel.find({ userId });

    res.json({ success: true, appointments });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: err.message });
  }
};

//API to cancle appointment
const cancleAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    //verify appointment user
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized User !" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    //making free that slot from doctor model

    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Cancelled !" });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: err.message });
  }
};

// const razorpayInstance = new razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });
// //API to make online payment
// const paymentOnline = async (req, res) => {
//   try {
//     const { appointmentId } = req.body;
//     const appointmentData = await appointmentModel.findById(appointmentId);

//     if (!appointmentData || appointmentData.cancelled) {
//       return res.json({
//         success: false,
//         message: "Appointment Cancelled or Not Found",
//       });
//     }

//     //Creating options for razorpay payment
//     const options = {
//       amount: appointmentData.amount * 100,
//       currency: process.env.CURRENCY,
//       receipt: appointmentId,
//     };

//     //creating order
//     const order = await razorpayInstance.orders.create(options);

//     res.json({ success: true, order });
//   } catch (err) {
//     console.log(err);
//     return res.json({ success: false, message: err.message });
//   }
// };

// //API to verify payment
// const verifyRazorpay = async (req, res) => {
//   try {
//     const { razorpay_order_id } = req.body;
//     const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

//     console.log(orderInfo);

//     if (orderInfo.status === "paid") {
//       await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {
//         payment: true,
//       });
//       res.json({ success: true, message: "Payment Successfull" });
//     } else {
//       res.json({ success: false, message: "Payment Failed" });
//     }
//   } catch (err) {
//     console.log(err);
//     return res.json({ success: false, message: err.message });
//   }
// };

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancleAppointment,
  //paymentOnline,
};
