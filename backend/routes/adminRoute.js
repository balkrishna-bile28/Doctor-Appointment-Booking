import express from "express";
import {
  addDoctor,
  adminDashboard,
  allDoctors,
  appointmentCancle,
  appointmentsAdmin,
  loginAdmin,
} from "../controllers/adminController.js";
import { changeAvailability } from "../controllers/doctorController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/all-doctors", authAdmin, allDoctors);
adminRouter.post("/change-availability", authAdmin, changeAvailability);
adminRouter.get("/appointments", authAdmin, appointmentsAdmin);
adminRouter.post("/cancle-appointment", authAdmin, appointmentCancle);
adminRouter.get("/admin-dashboard", authAdmin, adminDashboard);

export default adminRouter;
