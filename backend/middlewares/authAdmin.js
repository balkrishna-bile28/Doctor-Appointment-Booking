import jwt from "jsonwebtoken";

//Admin authentication middleware
const authAdmin = async (req, res, next) => {
  try {
    //console.log(req.headers);
    const atoken = req.headers["atoken"];
    //console.log(atoken);
    if (!atoken) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }
    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
    //console.log(token_decode);

    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    next();
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

export default authAdmin;
