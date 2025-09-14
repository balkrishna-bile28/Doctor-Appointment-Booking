import jwt from "jsonwebtoken";

//Doctor authentication middleware
const authUser = async (req, res, next) => {
  try {
    //console.log(req.headers);
    const dtoken = req.headers["dtoken"];
    //console.log(dtoken);
    if (!dtoken) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }
    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);
    //console.log(token_decode);

    req.body.docId = token_decode.id;
    //req.user = { id: token_decode.id };
    //console.log(req.body.docId);

    next();
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: err.message });
  }
};

export default authUser;
