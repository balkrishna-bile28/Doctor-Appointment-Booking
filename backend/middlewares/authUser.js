import jwt from "jsonwebtoken";

//User authentication middleware
const authUser = async (req, res, next) => {
  try {
    //console.log(req.headers);
    const token = req.headers["token"];
    //console.log(token);
    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(token_decode);

    //req.body.userId = token_decode.id;
    req.user = { id: token_decode.id };
    //console.log(req.body.userId);

    next();
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: err.message });
  }
};

export default authUser;
