import express from "express";
import {
  appointmentCancle,
  appointmentComplete,
  appointmentsDoctor,
  doctorList,
  loginDoctor,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
} from "../controllers/doctorController.js";

import authDoctor from "../middlewares/authDoctor.js";
const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);
doctorRouter.post("/login-doctor", loginDoctor);
doctorRouter.get("/appointments-doctor", authDoctor, appointmentsDoctor);
doctorRouter.post("/appointment-cancle", authDoctor, appointmentCancle);
doctorRouter.post("/appointment-complete", authDoctor, appointmentComplete);
doctorRouter.get("/doctor-dashboard", authDoctor, doctorDashboard);
doctorRouter.get("/doctor-profile", authDoctor, doctorProfile);
doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile);

export default doctorRouter;
